/* ==========================================================================
   home.js — renders the calculator cards on the homepage from the manifest.
   No framework, no build. Reads window.CALCULATORS (assets/js/calculators.js).
   ========================================================================== */
(function () {
  "use strict";

  var grid = document.getElementById("cardGrid");
  var countEl = document.getElementById("calcCount");
  if (!grid) return;

  var list = Array.isArray(window.CALCULATORS) ? window.CALCULATORS : [];

  // right-arrow icon (matches the reference component's ArrowRight)
  var ARROW =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<line x1="5" y1="12" x2="19" y2="12"></line>' +
    '<polyline points="12 5 19 12 12 19"></polyline></svg>';

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function cardHTML(c) {
    var url = "/" + encodeURIComponent(c.slug) + "/";
    var cta = c.cta || "Open calculator";
    return (
      '<article class="card">' +
        '<div class="card__media">' +
          '<img src="' + esc(c.thumbnail) + '" alt="' + esc(c.title) + ' preview" loading="lazy" width="1600" height="900">' +
        "</div>" +
        '<div class="card__body">' +
          '<h3 class="card__title">' +
            '<a class="card__link" href="' + esc(url) + '">' + esc(c.title) + "</a>" +
          "</h3>" +
          '<p class="card__desc">' + esc(c.description) + "</p>" +
          '<span class="card__cta">' + esc(cta) + ARROW + "</span>" +
        "</div>" +
      "</article>"
    );
  }

  if (!list.length) {
    grid.innerHTML =
      '<div class="empty">No calculators yet — check back soon.</div>';
  } else {
    grid.innerHTML = list.map(cardHTML).join("");
  }

  if (countEl) {
    countEl.textContent =
      list.length + (list.length === 1 ? " calculator" : " calculators");
  }
})();
