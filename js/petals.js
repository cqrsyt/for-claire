/**
 * Ambient floating petals for For Claire (honors prefers-reduced-motion).
 * Spawn after unlock, and keep the count low on phones.
 */
(function () {
  "use strict";

  function coarse() {
    return window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 720;
  }

  function spawn() {
    var root = document.getElementById("ambient-petals");
    if (!root || root.dataset.spawned) return;
    if (document.body.classList.contains("locked")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.dataset.spawned = "1";

    var mobile = coarse();
    var nPetal = mobile ? 4 : 8;
    var nMaple = mobile ? 3 : 6;
    var extras = mobile ? ["🍁", "🧸", "🍊"] : ["🍅", "🫑", "🍆", "🍊", "🫐", "🧸", "🍁"];
    var i;

    for (i = 0; i < nPetal; i++) {
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

    for (i = 0; i < nMaple; i++) {
      var maple = document.createElement("span");
      maple.className = "maple-leaf maple-leaf--drift maple-leaf--" + (i % 4);
      maple.style.left = 3 + Math.random() * 94 + "%";
      maple.style.top = "-8%";
      maple.style.setProperty("--drift", Math.random() * 120 - 50 + "px");
      maple.style.animationDuration = 14 + Math.random() * 16 + "s";
      maple.style.animationDelay = -Math.random() * 18 + "s";
      maple.style.opacity = String(0.28 + Math.random() * 0.32);
      root.appendChild(maple);
    }

    for (i = 0; i < extras.length; i++) {
      var fall = document.createElement("span");
      fall.className = "ambient-petal--fall";
      fall.textContent = extras[i];
      fall.style.left = 6 + Math.random() * 88 + "%";
      fall.style.fontSize = 12 + Math.random() * 8 + "px";
      fall.style.setProperty("--drift", Math.random() * 80 - 30 + "px");
      fall.style.animationDuration = 16 + Math.random() * 14 + "s";
      fall.style.animationDelay = -Math.random() * 18 + "s";
      fall.style.background = "transparent";
      root.appendChild(fall);
    }
  }

  function schedule() {
    var idle = window.requestIdleCallback || function (fn) { window.setTimeout(fn, 280); };
    idle(spawn, { timeout: 1400 });
  }

  function whenUnlocked() {
    if (!document.body.classList.contains("locked")) {
      schedule();
      return;
    }
    var obs = new MutationObserver(function () {
      if (!document.body.classList.contains("locked")) {
        obs.disconnect();
        schedule();
      }
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", whenUnlocked);
  } else {
    whenUnlocked();
  }
})();
