/**
 * Ambient floating petals for For Claire (honors prefers-reduced-motion).
 */
(function () {
  "use strict";
  function spawn() {
    var root = document.getElementById("ambient-petals");
    if (!root || root.childElementCount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
    var extras = ["🍅", "🫑", "🍆", "🍊", "🫐", "🧸"];
    for (var j = 0; j < 6; j++) {
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
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", spawn);
  } else {
    spawn();
  }
})();
