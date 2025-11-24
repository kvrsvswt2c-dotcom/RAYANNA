// ===== Gestion des pages (feuilleter le carnet) =====
const notebook = document.getElementById("notebook");
const spreads = document.querySelectorAll(".spread");
const navButtons = document.querySelectorAll("[data-page-target]");
const arrows = document.querySelectorAll(".page-arrow");

function showPage(pageName) {
  spreads.forEach((spread) => {
    spread.classList.toggle("active", spread.dataset.page === pageName);
  });
  notebook.classList.add("turning");
  setTimeout(() => notebook.classList.remove("turning"), 500);
}

// navigation via nav bar et boutons avec data-page-target
navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-page-target");
    if (target) showPage(target);
  });
});

// flèches suivant / précédent
arrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    const explicitTarget = arrow.getAttribute("data-page-target");
    if (explicitTarget) {
      showPage(explicitTarget);
      return;
    }

    const direction = arrow.getAttribute("data-direction");
    const activeSpread = document.querySelector(".spread.active");
    if (!direction || !activeSpread) return;

    let newSpread =
      direction === "next"
        ? activeSpread.nextElementSibling
        : activeSpread.previousElementSibling;

    while (newSpread && !newSpread.classList.contains("spread")) {
      newSpread =
        direction === "next"
          ? newSpread.nextElementSibling
          : newSpread.previousElementSibling;
    }

    if (newSpread && newSpread.dataset.page) {
      showPage(newSpread.dataset.page);
    }
  });
});

// ===== Zoom sur les éléments type post-it / polaroid =====
const zoomables = document.querySelectorAll(".zoomable");
const body = document.body;

function clearZoom() {
  zoomables.forEach((el) => el.classList.remove("zoomed"));
  body.classList.remove("has-zoom");
}

zoomables.forEach((el) => {
  el.addEventListener("click", (event) => {
    event.stopPropagation();
    const isZoomed = el.classList.contains("zoomed");
    clearZoom();
    if (!isZoomed) {
      el.classList.add("zoomed");
      body.classList.add("has-zoom");
    }
  });
});

// fermer le zoom en cliquant en dehors
document.addEventListener("click", () => {
  clearZoom();
});

// fermer avec Échap
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") clearZoom();
});
