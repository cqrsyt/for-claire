/**
 * First-registered capture handler so cover/story/album controls
 * still work when later scripts stop the event.
 */
(function () {
  "use strict";

  function go(view) {
    var api = window.ClaireAlbum;
    if (!api || typeof api.open !== "function") return false;
    try {
      if (view === "album" && window.ClaireTurnClear) window.ClaireTurnClear();
    } catch (err) {}
    try {
      if (view === "album" && typeof api.go === "function") api.go(0);
    } catch (err2) {}
    api.open(view);
    return true;
  }

  function onClick(e) {
    var el = e.target;
    if (!el) return;
    if (el.nodeType === 3) el = el.parentElement;
    if (!el || !el.closest) return;
    if (el.closest("#password-gate")) return;

    if (el.closest("#btn-see-us") || el.closest(".nav-pills [data-view=album]")) {
      if (window.claireOpenAlbum) window.claireOpenAlbum();
      else go("album");
      return;
    }
    if (el.closest("[data-action=open-story]") || el.closest(".nav-pills [data-view=story]")) {
      go("story");
      return;
    }
    if (el.closest(".nav-pills [data-view=cover]")) {
      go("cover");
    }
  }

  document.addEventListener("click", onClick, true);

  function fromHash() {
    var h = (location.hash || "").replace("#", "");
    if (h === "album" || h === "story" || h === "cover") go(h);
  }
  window.addEventListener("hashchange", fromHash);
  window.addEventListener("load", fromHash);
})();
