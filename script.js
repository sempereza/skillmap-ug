// ============================================
// SkillMap UG - Week 3
// DATA is separate from DISPLAY
// ============================================

// --- 1. DATA ONLY (fictional / public sample data) ---
// WEEK 4 - Data comes from resources.json, not hard-coded
let resources = [];

const statusEl = document.getElementById('status');
const cardsEl = document.getElementById('cards');
const retryBtn = document.getElementById('retry-btn');
const resultCountEl = document.getElementById('result-count');
const noResultsEl = document.getElementById('no-results');

async function loadResources() {
  if (statusEl) statusEl.textContent = "Loading resources...";
  if (retryBtn) retryBtn.hidden = true;

  try {
    const res = await fetch('resources.json');
    if (!res.ok) throw new Error('Failed to load');
    const data = await res.json();

    // Validate + handle missing fields - don't crash
    resources = data.filter(r => r && r.id && r.title).map(r => ({
      id: r.id,
      title: r.title || "Untitled",
      category: r.category || "general",
      location: r.location || "Location not listed",
      desc: r.desc || r.description || "No description available.",
      link: r.link || "enquire.html",
      linkText: r.linkText || "Enquire",
      image: r.image || "assets/placeholder.jpg",
      alt: r.alt || r.title || "Resource image"
    }));

    if (resources.length === 0) {
      if (statusEl) statusEl.textContent = "";
      if (noResultsEl) noResultsEl.hidden = false;
      if (resultCountEl) resultCountEl.textContent = "0 results found";
      if (cardsEl) cardsEl.innerHTML = "";
      return;
    }

    if (noResultsEl) noResultsEl.hidden = true;
    renderCards(resources);

  } catch (err) {
    if (statusEl) statusEl.textContent = "Could not load resources. Please check your connection.";
    if (retryBtn) retryBtn.hidden = false;
  }
}

if (retryBtn) retryBtn.addEventListener('click', loadResources);

// --- 2. MENU (Week 2) ---
const menuBtn = document.querySelector(".menu-btn");
const menu = document.getElementById("main-menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      menu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.focus();
    }
  });
}

// --- 3. DISPLAY LOGIC: Search + Filter ---
const searchInput = document.getElementById("search-input");
const cardsContainer = document.querySelector(".cards");
const resultCount = document.getElementById("result-count");
const noResults = document.getElementById("no-results");
const pills = document.querySelectorAll(".pill");
const radios = document.querySelectorAll('input[name="filter"]');
const searchClear = document.querySelector(".search-clear");
const resourceSearch = document.getElementById("resource-search");

let activeFilter = "all";

// DISPLAY: Build cards from data - no data logic here, only HTML
function renderCards(list) {
  if (!cardsContainer) return;

  // Error state: data failed / empty array
  if (!resources || resources.length === 0) {
    cardsContainer.innerHTML = "";
    if (resultCount) resultCount.textContent = "0 results found";
    if (noResults) {
      noResults.textContent = "Could not load resources. Please refresh the page.";
      noResults.hidden = false;
    }
    return;
  }

  // Empty state: filter/search found nothing
  if (list.length === 0) {
    cardsContainer.innerHTML = "";
    if (resultCount) resultCount.textContent = "0 results found";
    if (noResults) {
      noResults.textContent = "No resources found. Try another filter or clear search.";
      noResults.hidden = false;
    }
    return;
  }

  // Successful state
  if (noResults) noResults.hidden = true;
  if (resultCount) resultCount.textContent = list.length + " results found";

  cardsContainer.innerHTML = list.map((r) => `
    <article class="card" data-category="${r.category}">
      <img src="${r.image}" alt="${r.alt}">
      <h3>${r.title}</h3>
      <p><strong>${r.category}</strong> • ${r.location}</p>
      <p>${r.desc}</p>
      <a href="${r.link}" class="btn">${r.linkText}</a>
    </article>
  `).join("");
}

function applyFilters() {
  if (!cardsContainer) return;
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const terms = query.split(/\s+/).filter(Boolean);
  if (searchClear) searchClear.hidden = query.length === 0;

  const filtered = resources.filter((r) => {
    const matchesFilter = activeFilter === "all" || r.category === activeFilter;
    const text = (r.title + " " + r.desc + " " + r.location + " " + r.category).toLowerCase();
    const matchesSearch = terms.every((term) => text.includes(term));
    return matchesFilter && matchesSearch;
  });

  renderCards(filtered);
}

function setFilter(filter) {
  activeFilter = filter;
  pills.forEach((p) => p.classList.toggle("active", p.dataset.filter === filter));
  radios.forEach((r) => { r.checked = r.value === filter; });
  applyFilters();
}

pills.forEach((pill) => {
  pill.addEventListener("click", () => setFilter(pill.dataset.filter));
});

radios.forEach((radio) => {
  radio.addEventListener("change", () => setFilter(radio.value));
});

if (searchInput) searchInput.addEventListener("input", applyFilters);

function clearSearch() {
  if (!searchInput) return;
  searchInput.value = "";
  if (searchClear) searchClear.hidden = true;
  applyFilters();
  searchInput.focus();
}

if (searchClear) {
  searchClear.addEventListener("click", clearSearch);
}

if (resourceSearch) {
  resourceSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("resources")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

document.addEventListener("keydown", (event) => {
  const target = event.target;
  const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
  if (event.key === "/" && !isTyping && searchInput) {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape" && document.activeElement === searchInput && searchInput.value) {
    clearSearch();
  }
});

// Initial state: show all
applyFilters();

// Note: Data is local sample data, no fetch, so no loading / retry state needed.
// If this was fetched from an API, we would show loading + retry here.

// --- 4. ENQUIRE FORM DEMO (Requirement 4) ---
const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const msg = document.getElementById("form-message");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";

    if (!msg) return;

    // Validation - PRESERVE entries on error, do NOT reset
    if (!name || !email || !email.includes("@")) {
      msg.textContent = "Please enter your name and a valid email. Your entries are kept, please fix and try again.";
      if (!name && nameInput) nameInput.focus();
      else if (emailInput) emailInput.focus();
      return;
    }

    // Success - announce accessibly via aria-live
    msg.textContent = `Thanks ${name}! Demo received. This does not send a real application or enquiry.`;
    form.reset();
  });
}
loadResources();