/* ==========================================================================
   frame-resize.js — sizes a same-origin calculator iframe to its content so
   there is no inner scrollbar. Re-measures on load, on interaction (the
   calculators change height as fields toggle), and on window resize.

   Progressive enhancement: if anything fails (JS off, cross-origin), the
   iframe keeps its CSS min-height and the calculator still works.
   ========================================================================== */
(function () {
  "use strict";

  var frame = document.getElementById("calcFrame");
  if (!frame) return;

  var raf = window.requestAnimationFrame || function (fn) { return setTimeout(fn, 16); };
  var scheduled = false;

  function innerDoc() {
    try {
      return frame.contentDocument || (frame.contentWindow && frame.contentWindow.document) || null;
    } catch (e) {
      return null; // cross-origin — leave fallback height in place
    }
  }

  function measure() {
    scheduled = false;
    var doc = innerDoc();
    if (!doc || !doc.documentElement) return;
    var b = doc.body, h = doc.documentElement;
    var height = Math.max(
      b ? b.scrollHeight : 0, b ? b.offsetHeight : 0,
      h.scrollHeight, h.offsetHeight, h.clientHeight
    );
    if (height > 0) frame.style.height = height + "px";
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    raf(measure);
  }

  function wireInner() {
    var doc = innerDoc();
    if (!doc) return;

    // recompute after fonts settle
    if (doc.fonts && doc.fonts.ready && doc.fonts.ready.then) {
      doc.fonts.ready.then(schedule).catch(function () {});
    }

    // the calculators reflow on user input — re-measure after each
    ["input", "change", "click", "keyup"].forEach(function (evt) {
      doc.addEventListener(evt, schedule, true);
    });

    // catch programmatic layout changes (show/hide rows, etc.)
    var win = frame.contentWindow;
    if (win && "ResizeObserver" in win) {
      try {
        var ro = new win.ResizeObserver(schedule);
        if (doc.documentElement) ro.observe(doc.documentElement);
        if (doc.body) ro.observe(doc.body);
      } catch (e) {}
    } else if (win && "MutationObserver" in win && doc.body) {
      try {
        new win.MutationObserver(schedule).observe(doc.body, {
          childList: true, subtree: true, attributes: true
        });
      } catch (e) {}
    }

    // a few staggered passes to absorb late layout/font shifts
    [60, 200, 500, 1200].forEach(function (t) { setTimeout(schedule, t); });
  }

  frame.addEventListener("load", function () { wireInner(); schedule(); });
  window.addEventListener("resize", schedule);
  window.addEventListener("orientationchange", function () { setTimeout(schedule, 120); });

  // if the iframe was already loaded (cache) before this ran
  if (innerDoc() && innerDoc().readyState === "complete") { wireInner(); schedule(); }
})();
