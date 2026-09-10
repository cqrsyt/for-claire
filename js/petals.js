/**
 * Falling petals and sparkles for For Claire.
 * Honors prefers-reduced-motion.
 */
(function () {
  "use strict";
  function spawn() {
    var root = document.getElementById("ambient-petals");
    if (!root || root.querySelector(".ambient-petal--fall")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var narrow = window.matchMedia("(max-width: 700px)").matches;
    var floatCount = root.querySelector(".ambient-petal:not(.ambient-petal--fall)") ? 0 : (narrow ? 8 : 12);
    var fallCount = narrow ? 8 : 14;
    var sparkleCount = narrow ? 8 : 16;
    var i, el, size;

    for (i = 0; i < floatCount; i++) {
      el = document.createElement("span");
      el.className = "ambient-petal";
      size = 6 + Math.random() * 10;
      el.style.width = size + "px";
      el.style.height = size * (0.65 + Math.random() * 0.5) + "px";
      el.style.left = 4 + Math.random() * 92 + "%";
      el.style.top = 6 + Math.random() * 88 + "%";
      el.style.animationDuration = 16 + Math.random() * 18 + "s";
      el.style.animationDelay = -Math.random() * 18 + "s";
      el.style.opacity = String(0.12 + Math.random() * 0.16);
      root.appendChild(el);
    }

    for (i = 0; i < fallCount; i++) {
      el = document.createElement("span");
      el.className = "ambient-petal ambient-petal--fall";
      size = 7 + Math.random() * 13;
      el.style.width = size + "px";
      el.style.height = size * (0.55 + Math.random() * 0.55) + "px";
      el.style.left = Math.random() * 100 + "%";
      el.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");
      el.style.animationDuration = 14 + Math.random() * 18 + "s";
      el.style.animationDelay = -Math.random() * 20 + "s";
      root.appendChild(el);
    }

    for (i = 0; i < sparkleCount; i++) {
      el = document.createElement("span");
      el.className = "ambient-sparkle";
      size = 3 + Math.random() * 5;
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.style.left = Math.random() * 100 + "%";
      el.style.top = Math.random() * 100 + "%";
      el.style.animationDuration = 3.2 + Math.random() * 4.5 + "s";
      el.style.animationDelay = -Math.random() * 6 + "s";
      root.appendChild(el);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", spawn);
  } else {
    spawn();
  }
})();
