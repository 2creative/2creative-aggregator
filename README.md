# 2Creative.net - The Automated Creative Aggregator

## 1. Project Overview

**2creative.net** is a high-performance aggregator hub for the creative industry. It automates the collection of resources to generate passive income through affiliate links, ad revenue, and digital asset sales.

**Core Mission:** To be the "Bloomberg Terminal" for creatives, consolidating jobs, AI tools, design templates, and tech deals into a single, highly aesthetic dashboard.

## 2. Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (static export → out/)
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

### Python Scrapers

```bash
cd scripts
pip install -r requirements.txt
python scrape_jobs.py
```

## 3. Architecture & Tech Stack

**The "Git-Based" Flat-File Architecture:**

1.  **Scrapers (Python):** Run on a schedule via GitHub Actions.
2.  **Storage (JSON):** Scrapers output data to `public/data/*.json` in the repo.
3.  **Frontend (Next.js):** At build time, Next.js reads these JSON files to generate static HTML pages.
4.  **Hosting (Firebase):** The static HTML is deployed to Firebase Hosting.

**Stack:**

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (Frontend), Python 3.10+ (Scrapers)
- **Styling:** MUI (Material UI) v5+
- **Hosting:** Firebase Hosting (Spark Plan - Free Tier)
- **Automation:** GitHub Actions (Cron Jobs)
- **Database:** None (Flat JSON files)

## 4. Data Sources & Modules (The "Pillars")

### Module A: Template Marketplace (Affiliate Income)

- **Goal:** Aggregate themes from Envato, Webflow, and Framer.
- **Source 1:** Envato Market API (ThemeForest).
  - _Filter:_ Category="Wordpress", Tags=["Portfolio", "Agency", "Tech"].
- **Source 2:** Webflow Template Marketplace (Scraping).
  - _Target:_ New & Popular templates.
- **Source 3:** Framer (Scraping).
- **Data Structure (`public/data/templates.json`):**
  ```json
  [
    {
      "id": "12345",
      "title": "CyberAgency - Tech Portfolio",
      "price": "$49",
      "thumbnail_url": "...",
      "affiliate_link": "https://1.envato.market/...",
      "platform": "WordPress",
      "category": "Technology"
    }
  ]
  ```

### Module B: The Job Board (Traffic Driver)

- **Goal:** High-quality remote creative/tech jobs.
- **Sources:**
  - WeWorkRemotely API (Design, Programming).
  - RemoteOK (RSS Feed).
  - Hacker News (Who is hiring).
- **Filters:** Must contain keywords: "Three.js", "WebGL", "AI", "Designer", "Frontend".
- **Data Structure (`public/data/jobs.json`):**
  - _Fields:_ `title`, `company`, `location` (Remote), `apply_link`, `posted_date`, `tags`.

### Module C: AI Tool Hunter (High Yield)

- **Goal:** Discovery engine for new AI creative tools.
- **Sources:** ProductHunt API (or scraping), FutureTools scraping.
- **Logic:**
  - Scrape tool details.
  - Check `config/affiliates.json` to see if we have a partnership.
  - If yes -> Use Affiliate Link.
  - If no -> Use Direct Link (fallback).

### Module D: Tech Deals & Trends (Engagement)

- **Goal:** Impulse buys and daily check-ins.
- **Sources:**
  - CoinGecko API (Fetch top 3 "Metaverse/Render" tokens).
  - Amazon Product Advertising API (Camera gear price drops).

## 5. Directory Structure

```
/
├── .github/workflows/
│   ├── action_scrape_jobs.yml      # Scrapes jobs at 06:00 UTC
│   ├── action_scrape_templates.yml # Scrapes templates at 07:00 UTC
│   └── action_build_deploy.yml     # Builds & deploys at 08:00 UTC
├── public/
│   └── data/                       # The "Database"
│       ├── jobs.json
│       └── templates.json
├── scripts/                        # Python Scrapers
│   ├── __init__.py
│   └── requirements.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (MUI ThemeProvider)
│   │   ├── page.tsx                # Landing / Dashboard
│   │   └── globals.css
│   └── theme/
│       ├── theme.ts                # MUI theme config
│       └── ThemeRegistry.tsx       # Client-side theme provider
├── firebase.json                    # Firebase Hosting config
├── .firebaserc                      # Firebase project alias
├── next.config.ts                   # Static export config
└── package.json
```

## 6. Development Guidelines for AI Agent

### Step 1: The Scrapers (Python)

- Create a separate script for each module in `/scripts`.
- Scripts must handle errors gracefully (if Envato API is down, don't crash, just keep old data).
- Scripts must read existing JSON, update it with new items, remove items older than 30 days (to keep file size small), and save back to JSON.

### Step 2: The Frontend (Next.js)

- Use **Static Site Generation (SSG)**.
- In `page.tsx`, import the JSON files directly: `import templates from '@/public/data/templates.json'`.
- **Performance:** Use `next/image` for all thumbnails. Implement "Lazy Loading" for the grids.
- **Design:** Dark Mode default. Use a "Grid" layout for templates and a "List" layout for jobs.

### Step 3: Deployment

- Ensure `next.config.ts` is set to `output: 'export'` (required for Firebase static hosting).

## 7. Monetization Strategy (Implementation Details)

- **Affiliate links:** Must be marked with `rel="nofollow sponsored"`.
- **Ad Spots:** Reserve specific `<div>` slots in the layout for Carbon Ads or Google AdSense.
