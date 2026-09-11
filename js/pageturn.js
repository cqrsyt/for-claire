/**
 * Physical 3D page turns.
 * Clone the current leaf before the album swaps HTML, then rotate a
 * two-sided sheet so the new page is revealed underneath.
 */
(function () {
  "use strict";

  var DURATION = 1180;
  var turning = false;
  var started = false;
  var armedDir = null;
  var sheet = null;
  var underlay = null;
  var cast = null;
  var raf = 0;
  var abortTimer = 0;

  function reduce() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function api() {
    return window.ClaireAlbum;
  }

  function lightboxOpen() {
    var box = document.getElementById("lightbox");
    return !!(box && box.classList.contains("open"));
  }

  function albumViewActive() {
    var view = document.getElementById("view-album");
    return !!(view && view.classList.contains("active"));
  }

  /**
   * Slow peel, accelerate through the fold, tiny overshoot, settle.
   */
  function easeTurn(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    if (t < 0.14) {
      var a = t / 0.14;
      return 0.045 * a * a;
    }
    if (t < 0.78) {
      var b = (t - 0.14) / 0.64;
      return 0.045 + 0.995 * (1 - Math.pow(1 - b, 2.55));
    }
    var c = (t - 0.78) / 0.22;
    var over = 1.04 - 0.04 * (1 - Math.pow(1 - c, 2.1));
    return over;
  }

  function stripFlip() {
    var page = document.getElementById("book-page");
    if (page) page.classList.remove("flip-next", "flip-prev");
  }

  function block() {
    return document.querySelector(".book-3d-block");
  }

  function placeOver(el, page, host) {
    var x = 0;
    var y = 0;
    var node = page;
    while (node && node !== host) {
      x += node.offsetLeft;
      y += node.offsetTop;
      node = node.offsetParent;
      if (node === document.body || node === document.documentElement) break;
    }
    el.style.position = "absolute";
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.width = page.offsetWidth + "px";
    el.style.height = page.offsetHeight + "px";
    el.style.willChange = "transform";
  }

  function pageClasses(page) {
    var extra = page.className || "book-page";
    if (extra.indexOf("book-page") === -1) extra += " book-page";
    return extra.replace(/\bflip-next\b/g, "").replace(/\bflip-prev\b/g, "").replace(/\s+/g, " ").trim();
  }

  function makeSheet(page, withGhost) {
    var node = document.createElement("div");
    node.className = "turn-sheet";
    node.setAttribute("aria-hidden", "true");

    var front = document.createElement("div");
    front.className = "turn-sheet-front " + pageClasses(page);
    front.innerHTML = page.innerHTML;

    var shade = document.createElement("div");
    shade.className = "turn-sheet-shade";
    front.appendChild(shade);

    var glint = document.createElement("div");
    glint.className = "turn-sheet-glint";
    front.appendChild(glint);

    var back = document.createElement("div");
    back.className = "turn-sheet-back";
    if (withGhost) {
      var ghost = document.createElement("div");
      ghost.className = "turn-sheet-ghost";
      ghost.innerHTML = page.innerHTML;
      back.appendChild(ghost);
    }
    var backShade = document.createElement("div");
    backShade.className = "turn-sheet-shade turn-sheet-shade--back";
    back.appendChild(backShade);

    var crease = document.createElement("div");
    crease.className = "turn-sheet-crease";

    var edge = document.createElement("div");
    edge.className = "turn-sheet-edge";

    node.appendChild(front);
    node.appendChild(back);
    node.appendChild(crease);
    node.appendChild(edge);
    return node;
  }

  function makeCast() {
    var node = document.createElement("div");
    node.className = "turn-cast";
    node.setAttribute("aria-hidden", "true");
    return node;
  }

  function clearTurn() {
    if (raf) window.cancelAnimationFrame(raf);
    raf = 0;
    if (abortTimer) {
      window.clearTimeout(abortTimer);
      abortTimer = 0;
    }
    if (sheet && sheet.parentNode) sheet.parentNode.removeChild(sheet);
    if (underlay && underlay.parentNode) underlay.parentNode.removeChild(underlay);
    if (cast && cast.parentNode) cast.parentNode.removeChild(cast);
    sheet = null;
    underlay = null;
    cast = null;
    armedDir = null;
    turning = false;
    started = false;
    var host = block();
    if (host) host.classList.remove("is-turning", "is-turning-next", "is-turning-prev");
  }

  function mountOutgoing() {
    var page = document.getElementById("book-page");
    var host = block();
    if (!page || !host || sheet) return false;
    host.classList.add("is-turning");
    sheet = makeSheet(page, true);
    placeOver(sheet, page, host);
    host.appendChild(sheet);
    cast = makeCast();
    placeOver(cast, page, host);
    host.appendChild(cast);
    return true;
  }

  function mountIncoming() {
    var page = document.getElementById("book-page");
    var host = block();
    if (!page || !host || !sheet) return;
    sheet.classList.add("turn-underlay");
    sheet.style.transform = "none";
    underlay = sheet;
    var incoming = makeSheet(page, true);
    placeOver(incoming, page, host);
    incoming.style.transform = "rotateY(-178deg)";
    host.appendChild(incoming);
    sheet = incoming;
    if (cast) placeOver(cast, page, host);
  }

  function maple(dir) {
    if (reduce()) return;
    var root = document.getElementById("ambient-petals");
    if (!root) return;
    var sign = dir === "prev" ? -1 : 1;
    var i;
    for (i = 0; i < 3; i++) {
      var leaf = document.createElement("span");
      leaf.className = "maple-leaf maple-leaf--flip maple-leaf--" + ((i % 3) + 1);
      leaf.style.left = 42 + Math.random() * 18 + "%";
      leaf.style.top = 32 + Math.random() * 22 + "%";
      leaf.style.setProperty("--dx", sign * (28 + Math.random() * 48) + "px");
      leaf.style.setProperty("--dy", 18 + Math.random() * 36 + "px");
      leaf.style.setProperty("--rot", Math.random() * 180 - 90 + "deg");
      leaf.style.animationDuration = 1.05 + Math.random() * 0.4 + "s";
      root.appendChild(leaf);
      window.setTimeout(function (node) {
        if (node && node.parentNode) node.parentNode.removeChild(node);
      }, 1700, leaf);
    }
  }

  function lightSheet(node, angle) {
    if (!node) return;
    var a = Math.abs(angle);
    var fold = Math.sin((Math.min(a, 178) / 178) * Math.PI);
    var shade = node.querySelector(".turn-sheet-shade:not(.turn-sheet-shade--back)");
    var backShade = node.querySelector(".turn-sheet-shade--back");
    var glint = node.querySelector(".turn-sheet-glint");
    var crease = node.querySelector(".turn-sheet-crease");
    var edge = node.querySelector(".turn-sheet-edge");
    if (shade) shade.style.opacity = String(0.06 + fold * 0.62);
    if (backShade) backShade.style.opacity = String(0.1 + fold * 0.4);
    if (glint) {
      glint.style.opacity = String(fold * 0.42);
      glint.style.transform = "translateX(" + (8 + fold * 28) + "%)";
    }
    if (crease) crease.style.opacity = String(0.1 + fold * 0.55);
    if (edge) edge.style.opacity = String(0.15 + fold * 0.85);
  }

  function animate(dir) {
    if (!sheet) {
      turning = false;
      return;
    }
    stripFlip();
    maple(dir);
    var start = performance.now();
    function tick(now) {
      var t = Math.min(1, (now - start) / DURATION);
      var p = easeTurn(t);
      var angle = dir === "prev" ? -178 + p * 178 : p * -178;
      var lift = Math.sin(p * Math.PI) * 18;
      var flutter = Math.sin(p * Math.PI * 2.15) * (1 - p) * 1.65;
      var skew = Math.sin(p * Math.PI) * 3.2;
      sheet.style.transform =
        "translate3d(0," +
        -lift * 0.35 +
        "px," +
        lift * 1.25 +
        "px) rotateY(" +
        angle +
        "deg) rotateX(" +
        skew +
        "deg) rotateZ(" +
        flutter +
        "deg)";
      lightSheet(sheet, angle);
      if (cast) {
        var fold = Math.sin((Math.min(Math.abs(angle), 178) / 178) * Math.PI);
        cast.style.opacity = String(fold * 0.55);
        var spread = 18 + (1 - fold) * 70;
        cast.style.background =
          "linear-gradient(90deg, rgba(42, 34, 28, " +
          (0.1 + fold * 0.32) +
          ") 0, rgba(42, 34, 28, 0.06) " +
          spread +
          "%, transparent 100%)";
      }
      if (t < 1) {
        raf = window.requestAnimationFrame(tick);
      } else {
        clearTurn();
      }
    }
    raf = window.requestAnimationFrame(tick);
  }

  function arm(dir) {
    if (reduce() || turning) return;
    if (lightboxOpen() || !albumViewActive()) return;
    var album = api();
    if (!album) return;
    if (dir === "next" && album.page() >= album.count() - 1) return;
    if (dir === "prev" && album.page() <= 0) return;
    if (!mountOutgoing()) return;
    armedDir = dir;
    turning = true;
    var host = block();
    if (host) host.classList.add(dir === "prev" ? "is-turning-prev" : "is-turning-next");
    if (abortTimer) window.clearTimeout(abortTimer);
    abortTimer = window.setTimeout(function () {
      if (armedDir && sheet && !started) clearTurn();
    }, 220);
  }

  function beginArmed() {
    if (!armedDir || !sheet || started) return;
    started = true;
    if (abortTimer) {
      window.clearTimeout(abortTimer);
      abortTimer = 0;
    }
    stripFlip();
    if (armedDir === "prev") mountIncoming();
    animate(armedDir);
  }

  function navTarget(el) {
    if (!el || !el.closest) return null;
    return el.closest("#btn-next, #btn-last, #btn-prev, #btn-first, #btn-random, #btn-toc, .chapter-jump");
  }

  function onClickCapture(e) {
    var nav = navTarget(e.target);
    if (turning && nav) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
    if (e.target.closest && e.target.closest("#btn-next, #btn-last")) arm("next");
    else if (e.target.closest && e.target.closest("#btn-prev, #btn-first")) arm("prev");
  }

  function onKeyCapture(e) {
    if (!albumViewActive() || lightboxOpen()) return;
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    if (turning) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
    arm(e.key === "ArrowRight" ? "next" : "prev");
  }

  function bindSwipe() {
    var stage = document.getElementById("book-stage");
    if (!stage || stage._turnSwipe) return;
    stage._turnSwipe = true;
    var x0 = 0;
    var y0 = 0;
    stage.addEventListener(
      "touchstart",
      function (e) {
        if (e.touches.length === 1) {
          x0 = e.touches[0].clientX;
          y0 = e.touches[0].clientY;
        }
      },
      true
    );
    stage.addEventListener(
      "touchend",
      function (e) {
        if (turning) return;
        var t = e.changedTouches[0];
        if (!t) return;
        var dx = t.clientX - x0;
        var dy = t.clientY - y0;
        if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
        arm(dx < 0 ? "next" : "prev");
      },
      true
    );
  }

  function wrapApi() {
    var album = api();
    if (!album || album._turnBound) return;
    album._turnBound = true;
    var go = album.go;
    var next = album.next;
    var prev = album.prev;
    album.go = function (idx, hint) {
      var cur = album.page();
      if (idx !== cur) arm(idx > cur ? "next" : "prev");
      go.call(album, idx, hint);
      stripFlip();
      beginArmed();
    };
    album.next = function () {
      arm("next");
      next.call(album);
      stripFlip();
      beginArmed();
    };
    album.prev = function () {
      arm("prev");
      prev.call(album);
      stripFlip();
      beginArmed();
    };
  }

  function watchPage() {
    var page = document.getElementById("book-page");
    if (!page || page._turnWatch) return;
    page._turnWatch = true;
    var mo = new MutationObserver(function () {
      stripFlip();
      if (armedDir && sheet) beginArmed();
    });
    mo.observe(page, { childList: true, subtree: false, attributes: true, attributeFilter: ["class"] });
  }

  function ready(fn) {
    if (api()) {
      fn();
      return;
    }
    var n = 0;
    var t = window.setInterval(function () {
      n += 1;
      if (api() || n > 80) {
        window.clearInterval(t);
        if (api()) fn();
      }
    }, 120);
  }

  function init() {
    document.addEventListener("click", onClickCapture, true);
    document.addEventListener("keydown", onKeyCapture, true);
    bindSwipe();
    ready(function () {
      wrapApi();
      watchPage();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
