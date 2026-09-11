/**
 * Story → album. Bound only to #btn-see-us so overlays and page-turn
 * capture handlers cannot steal or cancel the click.
 */
(function () {
  "use strict";

  function openAlbum(e) {
    if (e) {
      if (e.cancelable) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }
    if (typeof window.claireOpenAlbum === "function") {
      window.claireOpenAlbum();
      return;
    }
    var api = window.ClaireAlbum;
    if (!api) return;
    try {
      api.go(0);
    } catch (err) {}
    try {
      api.open("album");
    } catch (err2) {}
  }

  function bind() {
    var btn = document.getElementById("btn-see-us");
    if (!btn || btn._seeUsBound) return;
    btn._seeUsBound = true;
    btn.addEventListener("click", openAlbum);
    btn.addEventListener("pointerup", function (e) {
      if (e.pointerType === "mouse") return;
      openAlbum(e);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
