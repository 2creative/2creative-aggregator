#!/usr/bin/env python3
"""
Webflow Template Marketplace Scraper
Scrapes featured and popular templates from webflow.com/templates.
Outputs to public/data/templates.json (merges with existing data).
"""

import json
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

import requests
from bs4 import BeautifulSoup

# ── Config ──────────────────────────────────────────────────────────────────
OUTPUT_FILE = Path(__file__).parent.parent / "public" / "data" / "templates.json"
PLATFORM = "Webflow"

PAGES_TO_SCRAPE = [
    {"url": "https://webflow.com/templates", "label": "Popular"},
    {"url": "https://webflow.com/templates/featured", "label": "Featured"},
    {"url": "https://webflow.com/templates/category/technology", "label": "Technology"},
    {"url": "https://webflow.com/templates/category/portfolio", "label": "Portfolio"},
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


def parse_templates(html: str, category: str = "General") -> list[dict]:
    """Parse Webflow template cards from HTML."""
    soup = BeautifulSoup(html, "html.parser")
    templates = []

    # Webflow template cards are typically links with template data
    # Try multiple selectors to be resilient to layout changes
    cards = soup.select("a[href*='/templates/html/']")
    if not cards:
        cards = soup.select(".tm-card, .template-card, [class*='template']")

    seen_urls = set()
    for card in cards:
        try:
            # Get URL
            href = card.get("href", "")
            if not href:
                link = card.find("a", href=True)
                href = link["href"] if link else ""

            if not href or "/templates/html/" not in href:
                continue

            # Normalize URL
            if href.startswith("/"):
                href = f"https://webflow.com{href}"

            if href in seen_urls:
                continue
            seen_urls.add(href)

            # Extract template slug for ID
            slug = href.rstrip("/").split("/")[-1]
            template_id = f"webflow-{slug}"

            # Get title — try the card text or nearby heading
            title = ""
            # Check if this element itself has text
            heading = card.find(["h3", "h4", "h5", "span", "p"])
            if heading:
                title = heading.get_text(strip=True)
            if not title:
                title = card.get_text(strip=True)[:80]
            if not title:
                title = slug.replace("-", " ").title()

            # Clean title — remove price and author from it
            title = re.sub(r"\$\d+.*$", "", title).strip()
            title = title.split("\n")[0].strip()

            # Get price
            price_text = ""
            price_el = card.find(string=re.compile(r"\$\d+"))
            if price_el:
                price_match = re.search(r"\$\d+", price_el)
                if price_match:
                    price_text = price_match.group()
            if not price_text:
                # Search siblings and parent
                parent = card.parent or card
                price_el = parent.find(string=re.compile(r"\$\d+"))
                if price_el:
                    price_match = re.search(r"\$\d+", price_el)
                    if price_match:
                        price_text = price_match.group()

            # Get thumbnail
            thumbnail = ""
            img = card.find("img")
            if img:
                thumbnail = img.get("src", "") or img.get("data-src", "") or img.get("srcset", "").split(" ")[0]

            # Get author
            author = ""
            author_link = card.find("a", href=lambda h: h and "/templates/designers/" in str(h))
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
                "price": price_text or "Free",
                "rating": 0,
                "sales": 0,
                "tags": [PLATFORM, category],
                "thumbnail": thumbnail,
                "url": href,
                "description": f"{title} — a {category.lower()} Webflow template.",
                "scrapedAt": datetime.now(timezone.utc).isoformat(),
            })

        except Exception as e:
            print(f"  ⚠ Error parsing card: {e}", file=sys.stderr)
            continue

    return templates


def load_existing() -> dict:
    """Load existing templates.json, keeping non-Webflow items."""
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
    print("🔍 Webflow Scraper — fetching templates from webflow.com...")

    all_templates: dict[str, dict] = {}  # Deduplicate by ID

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
    non_webflow = [t for t in existing.get("templates", [])
                   if not t.get("id", "").startswith("webflow-")]

    webflow_templates = list(all_templates.values())

    existing["templates"] = non_webflow + webflow_templates
    save_templates(existing)

    print(f"✅ Saved {len(webflow_templates)} Webflow templates ({len(existing['templates'])} total)")


if __name__ == "__main__":
    main()
