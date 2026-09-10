/**
 * Ambient floating petals for For Claire (honors prefers-reduced-motion).
 */
(function () {
  "use strict";
  function spawn() {
    var root = document.getElementById("ambient-petals");
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!root.querySelector(".ambient-petal")) {
      for (var i = 0; i < 10; i++) {
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
    if (!root.querySelector(".maple-leaf--drift")) {
      for (var m = 0; m < 8; m++) {
        var maple = document.createElement("span");
        maple.className = "maple-leaf maple-leaf--drift maple-leaf--" + (m % 4);
        maple.style.left = 3 + Math.random() * 94 + "%";
        maple.style.top = "-8%";
        maple.style.setProperty("--drift", Math.random() * 120 - 50 + "px");
        maple.style.animationDuration = 14 + Math.random() * 16 + "s";
        maple.style.animationDelay = -Math.random() * 18 + "s";
        maple.style.opacity = String(0.28 + Math.random() * 0.32);
        root.appendChild(maple);
      }
    }
    if (!root.querySelector(".ambient-petal--fall")) {
      var extras = ["🍅", "🫑", "🍆", "🍊", "🫐", "🧸", "🍁"];
      for (var j = 0; j < extras.length; j++) {
        var fall = document.createElement("span");
        fall.className = "ambient-petal--fall";
        fall.textContent = extras[j];
        fall.style.left = 6 + Math.random() * 88 + "%";
        fall.style.fontSize = 12 + Math.random() * 8 + "px";
        fall.style.setProperty("--drift", Math.random() * 80 - 30 + "px");
        fall.style.animationDuration = 16 + Math.random() * 14 + "s";
        fall.style.animationDelay = -Math.random() * 18 + "s";
        fall.style.background = "transparent";
        root.appendChild(fall);
      }
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", spawn);
  } else {
    spawn();
  }
})();
