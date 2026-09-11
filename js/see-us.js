/**
 * Story → album. Single click path on #btn-see-us.
 * Document capture handlers must ignore this button.
 */
(function () {
  "use strict";

  function onSeeUsClick(e) {
    if (e.cancelable) e.preventDefault();
    e.stopPropagation();
    if (typeof window.openAlbumFromStory === "function") {
      window.openAlbumFromStory();
      return;
    }
    if (typeof window.claireOpenAlbum === "function") {
      window.claireOpenAlbum();
      return;
    }
    console.error("[for-claire] openAlbumFromStory is missing");
  }

  function bind() {
    var btn = document.getElementById("btn-see-us");
    if (!btn || btn._seeUsBound) return;
    btn._seeUsBound = true;
    btn.addEventListener("click", onSeeUsClick);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
