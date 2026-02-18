#!/usr/bin/env python3
"""
Envato Market API Scraper — ThemeForest Templates
Fetches top-selling themes from ThemeForest via the Envato Market API.
Outputs to public/data/templates.json (merges with existing data).
"""

import json
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List

import requests

# ── Config ──────────────────────────────────────────────────────────────────
API_BASE = "https://api.envato.com/v1/discovery/search/search/item"
OUTPUT_FILE = Path(__file__).parent.parent / "public" / "data" / "templates.json"

CATEGORIES = [
    {"term": "", "category": "wordpress", "tags": "technology,creative,portfolio,agency"},
    {"term": "startup", "category": "wordpress"},
    {"term": "saas", "category": "site-templates"},
]

MAX_PER_CATEGORY = 30
PLATFORM = "ThemeForest"

# Envato Impact Radius affiliate base (update with your tracking ID)
AFFILIATE_BASE = "https://1.envato.market/c/"


def get_token() -> str:
    """Get Envato API token from env or .env file."""
    token = os.environ.get("ENVATO_API_TOKEN")
    if token:
        return token

    env_path = Path(__file__).parent.parent / ".env"
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            line = line.strip()
            if line.startswith("ENVATO_API_TOKEN="):
                return line.split("=", 1)[1].strip()

    return ""


def fetch_items(token: str, term: str = "", category: str = "wordpress",
                tags: str = "", sort_by: str = "sales", page_size: int = 30) -> List[dict]:
    """Search ThemeForest via Envato API."""
    headers = {"Authorization": f"Bearer {token}"}
    params = {
        "site": "themeforest.net",
        "sort_by": sort_by,
        "sort_direction": "desc",
        "page_size": min(page_size, MAX_PER_CATEGORY),
    }
    if term:
        params["term"] = term
    if category:
        params["category"] = category
    if tags:
        params["tags"] = tags

    try:
        resp = requests.get(API_BASE, headers=headers, params=params, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        return data.get("matches", [])
    except requests.RequestException as e:
        print(f"  ⚠ API error for term='{term}' category='{category}': {e}", file=sys.stderr)
        return []


def transform_item(item: dict) -> dict:
    """Transform Envato API item into our unified template schema."""
    # Attributes can be a list of dicts or a dict
    raw_attrs = item.get("attributes", {})
    if isinstance(raw_attrs, list):
        attrs = {}
        for a in raw_attrs:
            if isinstance(a, dict):
                attrs.update(a)
    else:
        attrs = raw_attrs

    previews = item.get("previews", {})

    # Get thumbnail — try landscape_url first, then icon
    thumbnail = ""
    if "landscape_url" in previews:
        thumbnail = previews["landscape_url"].get("landscape_url", "")
    elif "icon_with_landscape_preview" in previews:
        preview = previews["icon_with_landscape_preview"]
        thumbnail = preview.get("landscape_url", preview.get("icon_url", ""))

    # Build URL (direct link — replace with affiliate link if you have one)
    url = item.get("url", "")

    # Extract rating
    rating_data = item.get("rating", {})
    rating = rating_data.get("rating", 0) if isinstance(rating_data, dict) else 0

    # Tags from the item — can be a list or comma-separated string
    raw_tags = item.get("tags", attrs.get("tags", []))
    if isinstance(raw_tags, str):
        tags_list = [t.strip() for t in raw_tags.split(",") if t.strip()]
    elif isinstance(raw_tags, list):
        tags_list = [str(t).strip() for t in raw_tags if t]
    else:
        tags_list = []

    # Add the category as a tag too
    category_name = attrs.get("category_name", item.get("classification", ""))
    if category_name and category_name not in tags_list:
        tags_list.insert(0, category_name)

    return {
        "id": f"envato-{item.get('id', '')}",
        "title": item.get("name", "Untitled"),
        "author": item.get("author_username", "Unknown"),
        "platform": PLATFORM,
        "category": attrs.get("category_name", "WordPress"),
        "price": f"${item.get('price_cents', 0) / 100:.0f}" if item.get("price_cents") else "$0",
        "rating": round(rating, 1),
        "sales": item.get("number_of_sales", 0),
        "tags": tags_list[:6],  # Limit to 6 tags
        "thumbnail": thumbnail,
        "url": url,
        "description": item.get("description_short", item.get("summary", ""))[:200],
        "scrapedAt": datetime.now(timezone.utc).isoformat(),
    }


def load_existing() -> dict:
    """Load existing templates.json, keeping non-Envato items."""
    if OUTPUT_FILE.exists():
        try:
            data = json.loads(OUTPUT_FILE.read_text())
            return data
        except (json.JSONDecodeError, KeyError):
            pass
    return {"lastUpdated": "", "source": "aggregated", "templates": []}


def save_templates(data: dict):
    """Save templates.json atomically."""
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    data["lastUpdated"] = datetime.now(timezone.utc).isoformat()
    OUTPUT_FILE.write_text(json.dumps(data, indent=2, ensure_ascii=False))


def main():
    token = get_token()
    if not token:
        print("⚠ No ENVATO_API_TOKEN found. Skipping Envato scraper.", file=sys.stderr)
        print("  Set it in .env or as an environment variable.")
        return

    print(f"🔍 Envato Scraper — fetching from ThemeForest API...")

    all_items: Dict[str, dict] = {}  # Deduplicate by ID

    for cat_config in CATEGORIES:
        term = cat_config.get("term", "")
        category = cat_config.get("category", "")
        tags = cat_config.get("tags", "")
        label = term or category or "all"
        print(f"  📦 Searching: {label}...")

        items = fetch_items(token, term=term, category=category, tags=tags)
        print(f"     Found {len(items)} items")

        for item in items:
            transformed = transform_item(item)
            all_items[transformed["id"]] = transformed

        time.sleep(0.5)  # Be nice to the API

    # Load existing data and merge
    existing = load_existing()
    non_envato = [t for t in existing.get("templates", [])
                  if not t.get("id", "").startswith("envato-")]

    envato_templates = list(all_items.values())
    # Sort by sales descending
    envato_templates.sort(key=lambda x: x.get("sales", 0), reverse=True)

    existing["templates"] = non_envato + envato_templates
    save_templates(existing)

    print(f"✅ Saved {len(envato_templates)} Envato templates ({len(existing['templates'])} total)")


if __name__ == "__main__":
    main()
