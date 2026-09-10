/**
 * Ambient floating petals for For Claire (honors prefers-reduced-motion).
 */
(function () {
  "use strict";
  function spawn() {
    var root = document.getElementById("ambient-petals");
    if (!root || root.childElementCount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (var i = 0; i < 18; i++) {
      var el = document.createElement("span");
      el.className = "ambient-petal";
      var size = 6 + Math.random() * 10;
      el.style.width = size + "px";
      el.style.height = size * (0.65 + Math.random() * 0.5) + "px";
      el.style.left = 4 + Math.random() * 92 + "%";
      el.style.top = 6 + Math.random() * 88 + "%";
      el.style.animationDuration = 18 + Math.random() * 22 + "s";
      el.style.animationDelay = -Math.random() * 20 + "s";
      el.style.opacity = String(0.14 + Math.random() * 0.18);
      root.appendChild(el);
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", spawn);
  } else {
    spawn();
  }
})();
