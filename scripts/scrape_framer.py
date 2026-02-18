#!/usr/bin/env python3
"""
Framer Marketplace Scraper
Scrapes popular templates from framer.com/marketplace/templates.
Outputs to public/data/templates.json (merges with existing data).
"""

import json
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, Optional
from urllib.parse import unquote, urlparse, parse_qs

import requests
from bs4 import BeautifulSoup

# ── Config ──────────────────────────────────────────────────────────────────
OUTPUT_FILE = Path(__file__).parent.parent / "public" / "data" / "templates.json"
PLATFORM = "Framer"

PAGES_TO_SCRAPE = [
    {
        "url": "https://framer.com/marketplace/templates/?sort=popular&period=7",
        "label": "Popular (7 days)",
    },
    {
        "url": "https://framer.com/marketplace/templates/?sort=popular&period=30",
        "label": "Popular (30 days)",
    },
    {
        "url": "https://framer.com/marketplace/templates/?sort=new",
        "label": "New",
    },
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/122.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "en-US,en;q=0.9",
}


def fetch_page(url: str) -> Optional[str]:
    """Fetch a page with error handling."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        return resp.text
    except requests.RequestException as e:
        print(f"  ⚠ Failed to fetch {url}: {e}", file=sys.stderr)
        return None


def resolve_image_url(raw_url: str) -> str:
    """Resolve Framer Next.js image proxy URLs to the actual image URL.
    
    Framer uses paths like /creators-assets/_next/image/?url=<encoded>&w=3840&q=100
    This extracts the actual image URL from the query param.
    """
    if not raw_url:
        return ""

    # If it's a Next.js image proxy path, extract the real URL
    if "/_next/image" in raw_url:
        parsed = urlparse(raw_url)
        params = parse_qs(parsed.query)
        if "url" in params:
            return unquote(params["url"][0])

    # If it's a relative path, make it absolute
    if raw_url.startswith("/"):
        return f"https://framer.com{raw_url}"

    return raw_url


def parse_templates(html: str, category: str = "General") -> list[dict]:
    """Parse Framer marketplace template cards from HTML."""
    soup = BeautifulSoup(html, "html.parser")
    templates = []

    # Look for links to marketplace templates
    cards = soup.select("a[href*='/marketplace/templates/']")
    if not cards:
        # Fallback: try finding any element with marketplace template links
        all_links = soup.find_all("a", href=re.compile(r"/marketplace/templates/[^?]"))
        cards = all_links

    seen_slugs = set()
    for card in cards:
        try:
            href = card.get("href", "")
            if not href or "/marketplace/templates/" not in href:
                continue

            # Skip category/filter links (those have query params only or no slug)
            slug_match = re.search(r"/marketplace/templates/([a-z0-9-]+)/?$", href)
            if not slug_match:
                continue

            slug = slug_match.group(1)
            if slug in seen_slugs or slug in ("", "?sort", "new"):
                continue
            seen_slugs.add(slug)

            template_id = f"framer-{slug}"

            # Normalize URL
            url = f"https://framer.com/marketplace/templates/{slug}/"

            # Get title from card text
            title = ""
            heading = card.find(["h2", "h3", "h4", "h5", "span", "p"])
            if heading:
                title = heading.get_text(strip=True)
            if not title:
                direct_text = card.get_text(strip=True)
                if direct_text and len(direct_text) < 100:
                    title = direct_text
            if not title:
                title = slug.replace("-", " ").title()

            # Clean title
            title = title.split("\n")[0].strip()

            # Get thumbnail — resolve proxy URLs to actual image URLs
            thumbnail = ""
            img = card.find("img")
            if img:
                raw_src = (img.get("src", "") or img.get("data-src", "")
                          or img.get("srcset", "").split(" ")[0])
                thumbnail = resolve_image_url(raw_src)

            # Get price (if visible)
            price = "Free"
            price_el = card.find(string=re.compile(r"\$\d+"))
            if price_el:
                price_match = re.search(r"\$\d+", price_el)
                if price_match:
                    price = price_match.group()

            # Get author
            author = ""
            # Author links are typically to framer.com/@username
            author_link = card.find("a", href=re.compile(r"framer\.com/@"))
            if author_link:
                author = author_link.get_text(strip=True)

            if not title or len(title) < 2:
                continue

            templates.append({
                "id": template_id,
                "title": title,
                "author": author or "Unknown",
                "platform": PLATFORM,
                "category": category,
                "price": price,
                "rating": 0,
                "ratingCount": 0,
                "sales": 0,
                "tags": [PLATFORM, "Website", category],
                "thumbnail": thumbnail,
                "url": url,
                "previewUrl": url,
                "description": f"{title} — a {category.lower()} Framer template.",
                "compatibility": "Framer",
                "updatedAt": "",
                "scrapedAt": datetime.now(timezone.utc).isoformat(),
            })

        except Exception as e:
            print(f"  ⚠ Error parsing card: {e}", file=sys.stderr)
            continue

    return templates


def load_existing() -> dict:
    """Load existing templates.json, keeping non-Framer items."""
    if OUTPUT_FILE.exists():
        try:
            return json.loads(OUTPUT_FILE.read_text())
        except (json.JSONDecodeError, KeyError):
            pass
    return {"lastUpdated": "", "source": "aggregated", "templates": []}


def save_templates(data: dict):
    """Save templates.json."""
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    data["lastUpdated"] = datetime.now(timezone.utc).isoformat()
    OUTPUT_FILE.write_text(json.dumps(data, indent=2, ensure_ascii=False))


def main():
    print("🔍 Framer Scraper — fetching templates from framer.com/marketplace...")

    all_templates: Dict[str, dict] = {}  # Deduplicate by ID

    for page_config in PAGES_TO_SCRAPE:
        url = page_config["url"]
        label = page_config["label"]
        print(f"  📦 Scraping: {label} ({url})...")

        html = fetch_page(url)
        if not html:
            continue

        templates = parse_templates(html, category=label)
        print(f"     Found {len(templates)} templates")

        for tpl in templates:
            all_templates[tpl["id"]] = tpl

        time.sleep(1)  # Be respectful

    # Load existing data and merge
    existing = load_existing()
    non_framer = [t for t in existing.get("templates", [])
                  if not t.get("id", "").startswith("framer-")]

    framer_templates = list(all_templates.values())

    existing["templates"] = non_framer + framer_templates
    save_templates(existing)

    print(f"✅ Saved {len(framer_templates)} Framer templates ({len(existing['templates'])} total)")


if __name__ == "__main__":
    main()
