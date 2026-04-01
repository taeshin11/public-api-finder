# PRD: Public API Finder

## Directory of Free Public APIs for Developers

---

## 1. Product Overview

### Service Name
Public API Finder

### Short Title
Directory of Free Public APIs for Developers

### Description
Public API Finder is a searchable, categorized directory of free public APIs designed for developers, hobbyists, and students. The data is derived from the popular public-apis GitHub repository and served as a static JSON file, ensuring zero API costs and lightning-fast performance. Users can browse by category, search with instant filtering, save favorites, and discover random APIs for inspiration.

### Target Audience
- Frontend and backend developers looking for free APIs to integrate
- Coding bootcamp students building portfolio projects
- Hackathon participants seeking data sources
- API enthusiasts and tech bloggers

### Target Keywords (SEO)
- "free public APIs"
- "API directory"
- "open APIs for developers"
- "public API list"
- "free REST APIs"
- "API database for developers"

---

## 2. Harness Design Methodology

### Agent Workflow

```
Planner Agent
  --> Analyze PRD, break into milestones and tasks
  --> Output: milestone_plan.json

Initializer Agent
  --> Generate feature_list.json
  --> Generate claude-progress.txt
  --> Generate init.sh (project scaffold)
  --> Bootstrap project structure

Fixed Session Routine
  --> Each session: read claude-progress.txt
  --> Pick next incomplete task
  --> Build -> Test -> Commit
  --> Update claude-progress.txt

Builder Agent
  --> Implements features per milestone
  --> Writes code, tests locally

Reviewer Agent
  --> Reviews code quality, accessibility, SEO
  --> Validates against PRD requirements
  --> Confirms milestone completion
```

### Initializer Agent Outputs

#### feature_list.json
```json
{
  "project": "PublicAPIFinder",
  "features": [
    {
      "id": "F01",
      "name": "Project Scaffold & Tailwind Setup",
      "milestone": 1,
      "status": "pending"
    },
    {
      "id": "F02",
      "name": "Static JSON Data File (public-apis)",
      "milestone": 1,
      "status": "pending"
    },
    {
      "id": "F03",
      "name": "Category Sidebar/Tabs Navigation",
      "milestone": 2,
      "status": "pending"
    },
    {
      "id": "F04",
      "name": "Search with Instant Filter",
      "milestone": 2,
      "status": "pending"
    },
    {
      "id": "F05",
      "name": "API Cards Display",
      "milestone": 2,
      "status": "pending"
    },
    {
      "id": "F06",
      "name": "Random API Button",
      "milestone": 3,
      "status": "pending"
    },
    {
      "id": "F07",
      "name": "Favorites System (localStorage)",
      "milestone": 3,
      "status": "pending"
    },
    {
      "id": "F08",
      "name": "Auto i18n (8+ Languages)",
      "milestone": 4,
      "status": "pending"
    },
    {
      "id": "F09",
      "name": "SEO Optimization",
      "milestone": 4,
      "status": "pending"
    },
    {
      "id": "F10",
      "name": "Ad Integration (Adsterra + AdSense)",
      "milestone": 5,
      "status": "pending"
    },
    {
      "id": "F11",
      "name": "Google Sheets Webhook",
      "milestone": 5,
      "status": "pending"
    },
    {
      "id": "F12",
      "name": "Visitor Counter (Today + Total)",
      "milestone": 5,
      "status": "pending"
    },
    {
      "id": "F13",
      "name": "Feedback & Social Sharing",
      "milestone": 6,
      "status": "pending"
    },
    {
      "id": "F14",
      "name": "Static Pages (About, FAQ, Privacy, Terms)",
      "milestone": 6,
      "status": "pending"
    },
    {
      "id": "F15",
      "name": "Deployment to Vercel",
      "milestone": 7,
      "status": "pending"
    }
  ]
}
```

#### claude-progress.txt
```
# Public API Finder - Progress Tracker
# Updated: [timestamp]

## Current Milestone: 1
## Current Task: F01 - Project Scaffold & Tailwind Setup
## Status: NOT STARTED

### Milestone 1: Foundation [NOT STARTED]
- [ ] F01: Project Scaffold & Tailwind Setup
- [ ] F02: Static JSON Data File

### Milestone 2: Core Features [NOT STARTED]
- [ ] F03: Category Sidebar/Tabs
- [ ] F04: Search with Instant Filter
- [ ] F05: API Cards Display

### Milestone 3: Enhanced Features [NOT STARTED]
- [ ] F06: Random API Button
- [ ] F07: Favorites System

### Milestone 4: SEO & i18n [NOT STARTED]
- [ ] F08: Auto i18n
- [ ] F09: SEO Optimization

### Milestone 5: Monetization & Analytics [NOT STARTED]
- [ ] F10: Ad Integration
- [ ] F11: Google Sheets Webhook
- [ ] F12: Visitor Counter

### Milestone 6: Content Pages & Social [NOT STARTED]
- [ ] F13: Feedback & Social Sharing
- [ ] F14: Static Pages

### Milestone 7: Deployment [NOT STARTED]
- [ ] F15: Deploy to Vercel

### Notes:
```

#### init.sh
```bash
#!/bin/bash
# Public API Finder - Project Initializer

mkdir -p src/{css,js,data,images,pages}
touch src/index.html
touch src/css/styles.css
touch src/js/app.js
touch src/js/i18n.js
touch src/js/analytics.js
touch src/js/ads.js
touch src/data/apis.json
touch src/pages/about.html
touch src/pages/faq.html
touch src/pages/privacy.html
touch src/pages/terms.html
touch src/sitemap.xml
touch src/robots.txt

# Initialize Tailwind via CDN (no build step)
echo "Project scaffold created."
```

---

## 3. Technical Architecture

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Markup | Vanilla HTML5 (semantic) |
| Styling | Tailwind CSS (CDN), custom CSS |
| Logic | Vanilla JavaScript (ES6+) |
| Data | Static JSON file |
| Hosting | Vercel (free tier) |
| Ads | Adsterra (primary), Google AdSense (secondary) |
| Analytics | Google Sheets via Apps Script webhook |

### Infrastructure Cost
**$0 total** - All services use free tiers or static hosting.

### File Structure
```
PublicAPIFinder/
├── index.html                 # Main page
├── css/
│   └── styles.css             # Custom styles, soft palette
├── js/
│   ├── app.js                 # Core logic: search, filter, cards
│   ├── i18n.js                # Internationalization module
│   ├── analytics.js           # Visitor counter, Google Sheets webhook
│   └── ads.js                 # Ad slot injection (Adsterra/AdSense)
├── data/
│   └── apis.json              # Static API directory data
├── pages/
│   ├── about.html             # About page
│   ├── faq.html               # How to Use / FAQ
│   ├── privacy.html           # Privacy Policy
│   └── terms.html             # Terms of Service
├── images/
│   ├── og-image.png           # Open Graph image (1200x630)
│   └── favicon.ico            # Favicon
├── sitemap.xml                # SEO sitemap
├── robots.txt                 # SEO robots
├── feature_list.json          # Harness: feature tracking
├── claude-progress.txt        # Harness: session progress
├── init.sh                    # Harness: project initializer
├── vercel.json                # Vercel config
└── README.md                  # Project readme (internal)
```

---

## 4. Design System

### Color Palette (Soft Background)
| Role | Color | Hex |
|------|-------|-----|
| Background | Warm off-white | #F8F6F2 |
| Surface/Card | Soft cream | #FFFFFF with opacity 0.9 |
| Primary | Muted indigo | #5B6ABF |
| Primary Hover | Deeper indigo | #4A58A5 |
| Secondary | Soft teal | #4FBDBA |
| Text Primary | Dark charcoal | #2D2D2D |
| Text Secondary | Warm gray | #6B7280 |
| Border | Light warm gray | #E5E2DC |
| Accent/Highlight | Soft amber | #F5C542 |
| Error | Muted red | #D9534F |
| Success | Muted green | #5CB85C |

### Typography
- **Headings**: Inter or system sans-serif, weight 600-700
- **Body**: Inter or system sans-serif, weight 400
- **Monospace**: JetBrains Mono or system monospace (for API endpoints)
- **Base size**: 16px, scale: 1.25 ratio

### Spacing & Layout
- Mobile-first responsive breakpoints: 640px, 768px, 1024px, 1280px
- Container max-width: 1280px, centered
- Card padding: 1rem (mobile), 1.5rem (desktop)
- Grid: CSS Grid, 1 col mobile, 2 cols tablet, 3 cols desktop

### Component Patterns
- **Cards**: Rounded corners (0.75rem), subtle shadow, hover lift effect
- **Buttons**: Rounded (0.5rem), padding 0.75rem 1.5rem, clear hover states
- **Inputs**: Rounded (0.5rem), soft border, focus ring in primary color
- **Sidebar**: Sticky on desktop, collapsible drawer on mobile

---

## 5. Feature Specifications

### F01: Project Scaffold & Tailwind Setup
- Initialize project with proper directory structure
- Include Tailwind CSS via CDN link
- Set up base HTML template with semantic structure
- Configure viewport meta, charset, lang attribute
- Add soft background color to body

### F02: Static JSON Data File
- Derive data from the public-apis GitHub repository
- Structure each entry: `{ name, description, auth, https, cors, link, category }`
- Organize into categories (Weather, Finance, Movies, Sports, Music, Science, etc.)
- Minimum 200 API entries across 15+ categories
- Validate JSON format

### F03: Category Sidebar/Tabs Navigation
- Desktop: Fixed sidebar with category list, scrollable
- Mobile: Horizontal scrollable tabs or hamburger menu
- Category count badge next to each category name
- "All" category as default
- Active category highlighted visually
- Smooth transition when switching categories

### F04: Search with Instant Filter
- Prominent search bar at top of content area
- Instant filtering as user types (debounced 200ms)
- Search across name, description, and category fields
- Clear button (X) to reset search
- Result count display ("Showing 42 of 1,400 APIs")
- Empty state with helpful message if no results

### F05: API Cards Display
- Card layout with grid system
- Each card shows:
  - API name (bold, linked)
  - Description (2-line truncation)
  - Auth type badge (None, API Key, OAuth)
  - HTTPS badge (green check / red X)
  - CORS badge (Yes / No / Unknown)
  - External link button to API docs
  - Favorite (heart) toggle button
- Lazy loading / virtual scrolling for large lists
- Smooth entrance animation on filter change

### F06: Random API Button
- Floating or prominently placed "Discover Random API" button
- Selects a random API from the full dataset
- Displays in a modal or highlight card
- Option to "Roll Again" for another random pick
- Tracks randomized APIs to avoid immediate repeats

### F07: Favorites System (localStorage)
- Heart icon toggle on each card
- Favorites tab/section to view saved APIs
- Persist favorites in localStorage by API name
- Export favorites as JSON
- Badge count on Favorites tab
- Clear all favorites option with confirmation

### F08: Auto i18n (8+ Languages)
- Detect browser language via `navigator.language`
- Supported languages: EN, KO, JA, ZH, ES, DE, FR, PT
- Translate all UI strings (buttons, labels, headings, messages)
- Language switcher dropdown in header/footer
- Store language preference in localStorage
- Fallback to EN for unsupported languages
- JSON-based translation files

### F09: SEO Optimization
- Semantic HTML5 tags (header, nav, main, article, section, footer)
- Meta title: "Public API Finder - Directory of Free Public APIs for Developers"
- Meta description with target keywords
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card tags
- JSON-LD structured data (WebSite, SearchAction, ItemList)
- sitemap.xml with all pages
- robots.txt allowing all crawlers
- Canonical URL tags
- Alt text on all images
- Proper heading hierarchy (h1 > h2 > h3)

### F10: Ad Integration
- **Adsterra (Primary)**:
  - Banner ad slot in header area (728x90 desktop, 320x50 mobile)
  - Native ad slot between category sections
  - Placeholder divs with `data-adsterra-key` attribute for key injection
  - Non-intrusive placement that does not obstruct content
- **Google AdSense (Secondary)**:
  - Publisher ID: `ca-pub-7098271335538021`
  - Auto ad script in head
  - Manual ad slot in sidebar (desktop)
  - Responsive ad unit below content

### F11: Google Sheets Webhook
- Google Apps Script endpoint for data collection
- Auto POST when user performs key actions:
  - Searches for an API (debounced, max 1 per session)
  - Clicks through to an API link
  - Saves a favorite
- Payload: `{ timestamp, action, query_or_api_name, language, referrer }`
- Silent fire-and-forget fetch (no blocking UI)
- Respect user privacy, no PII collected

### F12: Visitor Counter
- Display in footer: "Today: X | Total: Y"
- Use localStorage + external free counter API or Google Sheets increment
- Non-intrusive, small text in footer
- Update on page load

### F13: Feedback & Social Sharing
- **Feedback**: Floating feedback button or footer link
  - Opens mailto link: `taeshinkim11@gmail.com`
  - Subject line pre-filled: "Public API Finder Feedback"
- **Social Sharing**:
  - Share buttons: Twitter/X, Facebook, LinkedIn, Reddit, Copy Link
  - Each button pre-fills relevant share text and URL
  - Share individual API cards via share icon on card

### F14: Static Pages
- **About**: Service description, purpose, data source credit, creator info
- **How to Use / FAQ**: Step-by-step usage guide, common questions
- **Privacy Policy**: Data collection disclosure, cookies, analytics
- **Terms of Service**: Usage terms, disclaimers, liability limitations
- Consistent header/footer across all pages
- Back-to-home navigation

---

## 6. Milestones & Git Strategy

### Milestone Plan

| Milestone | Features | Git Tag | Description |
|-----------|----------|---------|-------------|
| M1 | F01, F02 | v0.1.0 | Foundation: scaffold + data |
| M2 | F03, F04, F05 | v0.2.0 | Core features: browse + search + cards |
| M3 | F06, F07 | v0.3.0 | Enhanced: random + favorites |
| M4 | F08, F09 | v0.4.0 | SEO + internationalization |
| M5 | F10, F11, F12 | v0.5.0 | Monetization + analytics |
| M6 | F13, F14 | v0.6.0 | Content pages + social |
| M7 | F15 | v1.0.0 | Production deployment |

### Git Strategy
- Create GitHub repo via `gh repo create` (private)
- Branch: `main` only for simplicity (solo project)
- Commit after each feature completion
- Push at every milestone boundary
- Tag releases at milestones
- Commit message format: `feat(F0X): description` or `fix(F0X): description`

```bash
# Repo creation
gh repo create PublicAPIFinder --private --source=. --remote=origin
git init
git add .
git commit -m "feat(F01): initial project scaffold"
git push -u origin main

# At milestone
git tag v0.1.0
git push origin v0.1.0
```

---

## 7. Deployment Checklist

### Pre-Deployment
- [ ] All features implemented and tested
- [ ] Responsive design verified (mobile, tablet, desktop)
- [ ] SEO tags validated (meta, OG, JSON-LD)
- [ ] sitemap.xml and robots.txt present
- [ ] Ad slots configured with placeholders
- [ ] Google Sheets webhook tested
- [ ] Visitor counter functional
- [ ] i18n working for all 8 languages
- [ ] All static pages complete
- [ ] Favicon and OG image present
- [ ] No console errors
- [ ] Lighthouse score > 90 (Performance, SEO, Accessibility)

### Vercel Deployment
```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy
vercel --prod

# Note: Use Vercel URL publicly, do not expose GitHub username
```

### vercel.json
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

### Post-Deployment
- [ ] Verify live URL loads correctly
- [ ] Test all features on live site
- [ ] Submit sitemap to Google Search Console
- [ ] Verify ad slots render (once keys are injected)
- [ ] Monitor Google Sheets for incoming data
- [ ] Test social sharing links

---

## 8. Google Sheets Webhook Setup

### Apps Script Configuration
```javascript
// Google Apps Script - Web App
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.action,
    data.detail,
    data.language,
    data.referrer,
    data.userAgent
  ]);
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

- Deploy as Web App with "Anyone" access
- Copy deployment URL into `analytics.js`
- Use `fetch()` with `mode: 'no-cors'` for silent POST

---

## 9. Ad Monetization Strategy

### Adsterra (Primary)
- Register at adsterra.com
- Create banner and native ad units
- Inject ad unit keys into placeholder `<div>` elements
- Placement:
  - Top banner: below header, above content
  - Sidebar ad: right column on desktop
  - In-feed native: every 12th API card
  - Footer banner: above footer

### Google AdSense (Secondary)
- Publisher ID: `ca-pub-7098271335538021`
- Add auto-ads script to `<head>`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021" crossorigin="anonymous"></script>
```
- Manual ad slots as backup if Adsterra underperforms

---

## 10. i18n Implementation

### Language Detection Flow
```
1. Check localStorage for saved preference
2. If none, detect navigator.language
3. Map to supported locale (e.g., "ko-KR" -> "KO")
4. Load translation JSON
5. Apply translations to all UI text nodes
6. Default to EN if unsupported
```

### Translation File Structure
```json
{
  "EN": {
    "title": "Public API Finder",
    "subtitle": "Directory of Free Public APIs for Developers",
    "search_placeholder": "Search APIs by name or description...",
    "categories": "Categories",
    "all": "All",
    "favorites": "Favorites",
    "random_api": "Discover Random API",
    "no_results": "No APIs found matching your search.",
    "auth": "Auth",
    "https": "HTTPS",
    "cors": "CORS",
    "visit_api": "Visit API",
    "today": "Today",
    "total": "Total",
    "about": "About",
    "faq": "How to Use",
    "privacy": "Privacy Policy",
    "terms": "Terms of Service",
    "feedback": "Send Feedback",
    "share": "Share"
  }
}
```

### Supported Languages
| Code | Language |
|------|----------|
| EN | English |
| KO | Korean |
| JA | Japanese |
| ZH | Chinese (Simplified) |
| ES | Spanish |
| DE | German |
| FR | French |
| PT | Portuguese |

---

## 11. Performance & Accessibility

### Performance Targets
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Bundle Size: < 500KB (including JSON data)
- No external JS frameworks (vanilla only)

### Accessibility
- WCAG 2.1 AA compliance target
- Keyboard navigation for all interactive elements
- ARIA labels on icons and buttons
- Focus indicators visible
- Color contrast ratio >= 4.5:1 for text
- Screen reader friendly card structure

---

## 12. Privacy & Data

### Data Collection
- Visitor count (anonymous, no IP stored)
- Search queries (anonymized, no PII)
- Click-through actions (API name only)
- Language preference (localStorage)
- Favorites (localStorage, never transmitted)

### No Cookies Policy
- No third-party cookies (except ad networks)
- localStorage only for user preferences
- Transparent disclosure in Privacy Policy

---

## 13. Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Static data becomes outdated | Medium | Low | Periodic manual updates, note "last updated" date |
| Adsterra approval delay | Low | Medium | AdSense as fallback, placeholder slots ready |
| Vercel free tier limits | Very Low | High | Static site, minimal bandwidth usage |
| JSON file too large | Low | Medium | Lazy load, virtual scrolling, category-based splitting |
| i18n translation quality | Medium | Low | Use established translation patterns, community feedback |

---

## 14. Success Metrics

| Metric | Target (Month 1) | Target (Month 3) |
|--------|------------------|------------------|
| Daily Visitors | 50 | 500 |
| Total Page Views | 1,500 | 15,000 |
| Avg Session Duration | > 2 min | > 3 min |
| Search Queries/Day | 20 | 200 |
| API Click-throughs/Day | 10 | 100 |
| Ad Revenue | $0-5 | $10-50 |
| Google Indexation | Top 50 for target KW | Top 20 for target KW |

---

## 15. Future Enhancements (Post-MVP)

- User-submitted API suggestions via form
- API status/uptime checker
- Weekly newsletter of new APIs
- API comparison feature
- Bookmark sync across devices (optional account)
- PWA support for offline browsing
- API playground / quick test feature

---

*Document Version: 1.0*
*Created: 2026-04-01*
*Methodology: Harness Design*
