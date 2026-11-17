// --- Week 2: Mobile Menu ---
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

// --- Week 3: Search + Filter ---
const searchInput = document.getElementById("search-input");
const cards = document.querySelectorAll(".card");
const resultCount = document.getElementById("result-count");
const noResults = document.getElementById("no-results");
const pills = document.querySelectorAll(".pill");
const radios = document.querySelectorAll('input[name="filter"]');

let activeFilter = "all";

function applyFilters() {
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
  let visibleCount = 0;

  cards.forEach((card) => {
    const category = card.dataset.category;
    const text = card.textContent.toLowerCase();
    const matchesFilter = activeFilter === "all" || category === activeFilter;
    const matchesSearch = text.includes(query);

    if (matchesFilter && matchesSearch) {
      card.style.display = "";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  if (resultCount) resultCount.textContent = visibleCount + " results found";
  if (noResults) noResults.hidden = visibleCount !== 0;
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

applyFilters();