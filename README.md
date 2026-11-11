# SkillMap UG - Kampala Youth Resource Directory
Week 1 - Ishvexa Hub Internship

Scope: 6-week directory for free youth resources in Kampala. Fits 5-8 hrs/week. Week 1 = semantic home page only.

Setup: Open index.html in browser. No build. VS Code Live Server optional.

Folder Structure:
- index.html: Semantic home page with nav, main, sections, footer
- css/style.css: To be added Week 2
- assets/images/: Placeholder images with alt text

Commits:
- feat: add project brief and sitemap
- feat: build semantic home page
- docs: add asset source log and link-check

Next: Add CSS, detail page, filter JS.
# SkillMap UG - Week 2

## What I Built in Week 2

I built all the planned pages from my Week 1 sitemap and wireframes so they work as one website with the same design.

### Pages

1. `index.html` - Home
      - Hero: "Find Free Youth Resources in Kampala" + Button: View Resources
      - Filters: All (selected) / Tech / Business / Creative
      - Resources (3) cards: Youth Coding Bootcamp, Business Startup Workshop, Creative Workshop

2. `resources/ishvexa-hub.html` - Resource Detail
      - ISH Vexa Hub, Cost: Free, Open: Mon - Fri, What you get
      - Button: Enquire Now -> goes to Enquire page

3. `about.html` - About
      - What SkillMap UG is, Quick Facts, What we do

4. `enquire.html` - Enquire
      - Form: Your Name, What do you need?, Message, Send Enquiry

User flow: Home -> View Details -> Resource Detail -> Enquire

## Wireframes I Followed

- `wireframe1.jpg` = Home on Desktop
    - LOGO left, Home / Resources / About / Enquire right
    - Hero + Filters side-by-side
    - 3 cards in a row

- `wireframe2.jpg` = Home on Mobile
    - LOGO + hamburger menu (☰)
    - Search bar: "Search resources..."
    - Filter pills: All / Tech / Business / Creative
    - Cards stacked, 1 per row
    - Bottom nav: Home / Saved / Profile

All pages use the same header, footer, nav, and bottom nav on mobile.

## Design Tokens - style.css

All pages share one file: `style.css`

- Colours: `--main: #0f4c3a`, `--light: #eef5f1`, `--bg: #f2f2f2`, `--white: #fff`, `--text: #222`, `--line: #ccc`
- Font: `--font: Arial, sans-serif`
- Spacing: `--gap: 12px`, `--padding: 20px`
- Borders: `--radius: 6px`, `--border: 1px solid var(--line)`
- Focus: `--focus: 2px solid #ff8c00`

Active page: The current page link has `class="active"` and gets a green background.

## Responsive Design

I tested in Chrome > Inspect > Toggle device toolbar:

| Width | What happens |
| --- | --- |
| 1440px - Desktop | Hero + Filters side-by-side, 3 cards in a row, full nav |
| 768px - Tablet | Filters move below hero, 2 cards in a row |
| 360px - Phone | Hamburger menu, search + pills show, 1 card per row, bottom nav shows, no sideways scroll |

Responsive images: All images use `max-width: 100%; height: auto;` so they never overflow on phone.

## Navigation

- On Home, Resources is `index.html#resources`
- On About / Enquire, Resources is `index.html#resources`
- On Resource Detail (inside `resources/` folder), links use `../` - e.g. `../index.html`, `../style.css`

## How to Run

```bash
python3 -m http.server 8000