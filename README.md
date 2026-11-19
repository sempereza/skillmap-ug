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
python3 -m http.server 800
## WEEK 3 PROGRESS

### What I Built This Week

**1. Main Interaction: Search + Filter**
- Search input filters resources by title, description, location and category
- Pill filters: All / Tech / Business / Creative
- Radio filters: Same options, synced with pills
- Live result count: "3 results found" / "1 results found" / "0 results found"

**2. Data Separate From Display**
- All resources stored in one `resources` array in `script.js` (fictional / public sample data)
- One `renderCards()` function builds the HTML from that data
- No hard-coded cards in `index.html` anymore

**3. States Handled**
- **Initial:** All 3 resources shown on load
- **Successful:** e.g. search `coding` → 1 result
- **Empty:** e.g. search `zzzz` → 0 results + "No resources found. Try another filter..."
- **Error:** If data fails to load → "Could not load resources. Please refresh."
- **Loading / Retry:** Not needed — data is local sample data, no fetch / API call. If this used a real API, loading + retry would be added.

**4. Enquire Form Demo**
- Validates Name (required) and Email (must contain `@`)
- **Preserves entries on error** — form is NOT cleared if validation fails
- Result announced accessibly with `aria-live="polite"`
- Clearly states: **"Demo only: This form does not send a real application or enquiry."**

### Sample Data

| Resource | Category | Location |
|---|---|---|
| ISH Vexa Hub | Tech | Kampala |
| KCCA Youth Business Workshop | Business | Kampala |
| Bamunanika Creative Space | Creative | Luwero |

---

## How To Run

1. Clone: `git clone https://github.com/sempereza/skillmap-ug.git`
2. Open `index.html` in browser or use VS Code Live Server
3. Try search + filters
4. Go to Enquire page to test form validation

---

## Manual Testing — Week 3

Run in browser, no tools needed.

| ID | Case | Steps | Expected | Actual |
|---|---|---|---|---|
| TC1 | Search normal | Type `coding` | 1 result - ISH Vexa Hub | PASS |
| TC2 | Pill filter | Click `Business` pill | 1 result, radio syncs | PASS |
| TC3 | Radio filter | Click `Creative` radio | 1 result, pill syncs | PASS |
| TC4 | Blank search | Type then clear search | All 3 return | PASS |
| TC5 | No results | Type `zzzz` | 0 results + No results message | PASS |
| TC6 | Search + Filter combo | Tech filter + type `business` | 0 results | PASS |
| TC7 | Invalid email | Name=`Sempereza`, Email=`bademail`, Submit | Error, entries preserved | PASS |
| TC8 | Blank form | Leave blank, Submit | Error, focus on Name | PASS |
| TC9 | Keyboard: Tab + Enter | Tab to search, type, Tab to pill, Enter | Works without mouse | PASS |
| TC10 | Keyboard: Escape | Open Menu, press `Esc` | Menu closes, focus returns to Menu button | PASS |

### Defects Found & Fixed

1. **Search input hidden behind button** → Fixed with full-width CSS for `#search-input`
2. **Pills and radios out of sync** → Fixed with single `setFilter()` function that updates both
3. **Form cleared on error** → Fixed to preserve entries, only `form.reset()` on success

**Re-run:** After fixes, re-ran TC2, TC3, TC7 — all PASS.

---

## Accessibility

- Semantic HTML: `header`, `main`, `section`, `nav`, `footer`
- Labels for all inputs, `aria-live="polite"` for result count + form message
- Keyboard: Tab, Enter, Esc all work
- Alt text on all images

---

## LinkedIn Progress

**Wednesday:** Posted in-progress demo screenshot + bug (search hidden, filters out of sync, form clearing on error)

---

## Remaining Limitation

Data is still local sample data, not a real API. No loading / retry state yet. Next step: fetch from API + add loading spinner + retry button.

---

## Tech Stack

- HTML, CSS, JavaScript (no framework)
- Git + GitHub Pages

## Author

Sempereza — SkillMap UG, built for youth in Uganda.