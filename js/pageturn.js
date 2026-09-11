/**
 * 3D page curl along the spine.
 * Nested strips rotate so the leaf bends, the reverse shows past 90°,
 * and the incoming page is already underneath.
 */
(function () {
  "use strict";

  var DURATION = 1040;
  var FADE_MS = 220;
  var ANGLE = -170;
  var turning = false;
  var started = false;
  var fadeOnly = false;
  var skipArm = false;
  var armedDir = null;
  var sheet = null;
  var underlay = null;
  var cast = null;
  var raf = 0;
  var abortTimer = 0;
  var fadeTimer = 0;
  var lockTimer = 0;
  var TURN_LOCK_MS = 1700;
  var dragP = 0;
  var dragFrom = 0;
  var pageGo = null;
  var cheapPaint = false;

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

  function easeTurn(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    var u;
    if (t < 0.15) {
      u = t / 0.15;
      return 0.05 * u * u * u;
    }
    if (t < 0.55) {
      u = (t - 0.15) / 0.4;
      return 0.05 + 0.45 * (u * u * (1.35 - 0.35 * u));
    }
    if (t < 0.78) {
      u = (t - 0.55) / 0.23;
      return 0.5 + 0.38 * (1 - Math.pow(1 - u, 1.12));
    }
    if (t < 0.9) {
      u = (t - 0.78) / 0.12;
      return 0.88 + 0.155 * (1 - (1 - u) * (1 - u));
    }
    u = (t - 0.9) / 0.1;
    return 1.035 - 0.035 * (u * u * (3 - 2 * u));
  }

  function easeReturn(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    var c1 = 1.22;
    var c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  function shadowAmount(p) {
    if (p <= 0 || p >= 1) return 0;
    if (p < 0.45) return Math.pow(p / 0.45, 1.12);
    if (p <= 0.7) return 1;
    return Math.pow((1 - p) / 0.3, 2.45);
  }

  function bendAmount(p) {
    if (p <= 0 || p >= 1) return 0;
    var mid = Math.sin(p * Math.PI);
    if (p > 0.62) {
      var k = (p - 0.62) / 0.38;
      mid *= (1 - k) * (1 - k);
    }
    return Math.min(1, mid * 1.08);
  }

  function flattenAmount(p) {
    if (p <= 0.78) return 0;
    if (p >= 1) return 1;
    var k = (p - 0.78) / 0.22;
    return k * k;
  }

  function paperCrack(p) {
    if (p <= 0.46 || p >= 0.6) return 0;
    return Math.sin(((p - 0.46) / 0.14) * Math.PI);
  }

  function stripFlip() {
    var page = document.getElementById("book-page");
    if (page) page.classList.remove("flip-next", "flip-prev");
  }

  function block() {
    return document.querySelector(".book-3d-block");
  }

  function placeOver(el, page, host) {
    el.style.position = "absolute";
    el.style.left = page.offsetLeft + "px";
    el.style.top = page.offsetTop + "px";
    el.style.width = page.offsetWidth + "px";
    el.style.height = page.offsetHeight + "px";
    el.style.willChange = "transform";
  }

  function pageClasses(page) {
    var extra = page.className || "book-page";
    if (extra.indexOf("book-page") === -1) extra += " book-page";
    return extra.replace(/\bflip-next\b/g, "").replace(/\bflip-prev\b/g, "").replace(/\bis-fade-turn\b/g, "").replace(/\s+/g, " ").trim();
  }

  function makeCurl(page) {
    var n = 6;
    var w = page.offsetWidth;
    var h = page.offsetHeight;
    var slice = w / n;
    var html = page.innerHTML;
    var cls = pageClasses(page);
    var pad = window.getComputedStyle(page).padding;
    var wrap = document.createElement("div");
    wrap.className = "turn-curl";
    wrap.setAttribute("aria-hidden", "true");
    wrap.style.width = w + "px";
    wrap.style.height = h + "px";

    var parent = wrap;
    var segs = [];
    var i;
    for (i = 0; i < n; i++) {
      var isLast = i === n - 1;
      var sw = isLast ? w - slice * (n - 1) : slice;
      var seg = document.createElement("div");
      seg.className = "turn-seg" + (i === 0 ? " turn-seg--spine" : "") + (isLast ? " turn-seg--edge" : "");
      seg.style.width = sw + "px";
      seg.style.height = h + "px";

      var face = document.createElement("div");
      face.className = "turn-seg-face";

      var inner = document.createElement("div");
      inner.className = "turn-seg-inner " + cls;
      inner.innerHTML = html;
      inner.style.width = w + "px";
      inner.style.height = h + "px";
      inner.style.padding = pad;
      inner.style.boxSizing = "border-box";
      inner.style.transform = "translateX(" + (-i * slice) + "px)";

      var shade = document.createElement("div");
      shade.className = "turn-seg-shade";
      var glint = document.createElement("div");
      glint.className = "turn-seg-glint";

      face.appendChild(inner);
      face.appendChild(shade);
      face.appendChild(glint);

      var back = document.createElement("div");
      back.className = "turn-seg-back";
      var thick = document.createElement("div");
      thick.className = "turn-seg-thickness";

      seg.appendChild(face);
      seg.appendChild(back);
      seg.appendChild(thick);
      parent.appendChild(seg);
      parent = seg;
      segs.push({ node: seg, shade: shade, glint: glint, thick: thick, back: back });
    }
    wrap._segs = segs;
    wrap._n = n;
    return wrap;
  }

  function makeUnderlay(html, cls) {
    var node = document.createElement("div");
    node.className = "turn-underlay";
    node.setAttribute("aria-hidden", "true");
    var inner = document.createElement("div");
    inner.className = "turn-underlay-inner " + cls;
    inner.innerHTML = html;
    node.appendChild(inner);
    return node;
  }

  function makeCast() {
    var node = document.createElement("div");
    node.className = "turn-cast";
    node.setAttribute("aria-hidden", "true");
    return node;
  }

  function armLock() {
    if (lockTimer) window.clearTimeout(lockTimer);
    lockTimer = window.setTimeout(function () {
      lockTimer = 0;
      clearTurn();
    }, TURN_LOCK_MS);
  }

  function clearTurn() {
    if (raf) window.cancelAnimationFrame(raf);
    raf = 0;
    if (abortTimer) {
      window.clearTimeout(abortTimer);
      abortTimer = 0;
    }
    if (fadeTimer) {
      window.clearTimeout(fadeTimer);
      fadeTimer = 0;
    }
    if (lockTimer) {
      window.clearTimeout(lockTimer);
      lockTimer = 0;
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
    fadeOnly = false;
    var host = block();
    if (host) host.classList.remove("is-turning", "is-turning-next", "is-turning-prev");
    releaseFollow();
  }

  function followBook(dir) {
    if (reduce()) return;
    var book = document.getElementById("book-3d");
    if (!book) return;
    book.classList.remove("is-follow-next", "is-follow-prev");
    book.classList.add(dir === "prev" ? "is-follow-prev" : "is-follow-next");
  }

  function releaseFollow() {
    var book = document.getElementById("book-3d");
    if (!book) return;
    book.classList.remove("is-follow-next", "is-follow-prev");
  }

  function playFade() {
    stripFlip();
    var page = document.getElementById("book-page");
    if (page) {
      page.classList.remove("is-fade-turn");
      void page.offsetWidth;
      page.classList.add("is-fade-turn");
    }
    if (fadeTimer) window.clearTimeout(fadeTimer);
    fadeTimer = window.setTimeout(function () {
      fadeTimer = 0;
      if (page) page.classList.remove("is-fade-turn");
      clearTurn();
    }, FADE_MS + 40);
  }

  function mountOutgoing() {
    var page = document.getElementById("book-page");
    var host = block();
    if (!page || !host || sheet) return false;
    host.classList.add("is-turning");
    cheapPaint = window.innerWidth < 720;
    sheet = makeCurl(page);
    sheet._flatHtml = page.innerHTML;
    sheet._flatCls = pageClasses(page);
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
    if (!page || !host || !sheet) {
      clearTurn();
      return;
    }
    var flatHtml = sheet._flatHtml || "";
    var flatCls = sheet._flatCls || pageClasses(page);
    underlay = makeUnderlay(flatHtml, flatCls);
    placeOver(underlay, page, host);
    host.insertBefore(underlay, sheet);
    if (sheet.parentNode) sheet.parentNode.removeChild(sheet);
    var incoming = makeCurl(page);
    placeOver(incoming, page, host);
    host.appendChild(incoming);
    sheet = incoming;
    poseCurl(sheet, ANGLE, 1);
    if (cast) placeOver(cast, page, host);
  }

  function poseCurl(wrap, total, p) {
    if (!wrap || !wrap._segs) return;
    var segs = wrap._segs;
    var n = segs.length;
    var p01 = p < 0 ? 0 : p > 1 ? 1 : p;
    var bend = bendAmount(p01);
    var flat = flattenAmount(p01);
    var lift = bend * 28;
    var zTwist = (total < 0 ? 1.7 : -1.7) * bend;
    var crack = paperCrack(p01);
    var edgeFlash = 0;
    if (p01 > 0.5 && p01 < 0.8) {
      edgeFlash = Math.sin(((p01 - 0.5) / 0.3) * Math.PI);
    }
    var backDim = p01 > 0.5 ? 0.22 * Math.min(1, (p01 - 0.5) / 0.22) : 0;
    wrap.style.transform =
      "translate3d(0," +
      (-lift * 0.38) +
      "px," +
      (10 + lift) +
      "px) rotateX(" +
      (bend * -10.5) +
      "deg) rotateZ(" +
      zTwist +
      "deg)";
    var i;
    var weights = [];
    var sumW = 0;
    for (i = 0; i < n; i++) {
      var u = n === 1 ? 1 : i / (n - 1);
      var lag = (1 - u) * 0.16;
      var local = (p01 - lag) / (1 - lag);
      if (local < 0) local = 0;
      if (local > 1) local = 1;
      var localEase = local * local * (3 - 2 * local);
      var w = 0.16 + localEase * (0.35 + 2.7 * u * u);
      weights[i] = w;
      sumW += w;
    }
    var sh = shadowAmount(p01);
    var shade = 0.05 + sh * 0.64 + crack * 0.18;
    var glint = sh * 0.62 + edgeFlash * 0.55 + crack * 0.28;
    var thick = 0.18 + bend * 0.92 + sh * 0.1 + crack * 0.5;
    for (i = 0; i < n; i++) {
      var spread = total * (weights[i] / sumW);
      var rigid = i === 0 ? total : 0;
      var rot = spread * (1 - flat) + rigid * flat;
      segs[i].node.style.transform =
        "translate3d(0," +
        (bend * uLift(i, n)) +
        "px," +
        (0.7 + bend * 1.35) +
        "px) rotateY(" +
        rot +
        "deg)";
      if (cheapPaint && i !== 0 && i !== n - 1) continue;
      var uShade = n === 1 ? 1 : i / (n - 1);
      if (segs[i].shade) segs[i].shade.style.opacity = String(shade * (0.62 + 0.38 * uShade));
      if (segs[i].glint) {
        segs[i].glint.style.opacity = String(i === n - 1 ? glint : glint * 0.32);
      }
      if (segs[i].thick) segs[i].thick.style.opacity = String(thick);
      if (segs[i].back) {
        segs[i].back.style.filter = backDim ? "brightness(" + (1 - backDim) + ")" : "";
      }
    }
  }

  function uLift(i, n) {
    if (n <= 1) return 0;
    return (i / (n - 1)) * 1.4;
  }

  function updateCast(p) {
    if (!cast) return;
    var p01 = p < 0 ? 0 : p > 1 ? 1 : p;
    var crack = paperCrack(p01);
    cast.style.opacity = String(Math.min(1, shadowAmount(p01) * 0.64 + crack * 0.28));
  }

  function animate(dir, fromP, reverse) {
    if (!sheet) {
      clearTurn();
      return;
    }
    stripFlip();
    followBook(dir);
    if (fromP == null) fromP = 0;
    var endP = reverse ? 0 : 1;
    var span = Math.abs(endP - fromP);
    if (span < 0.001) {
      if (reverse) restoreDrag();
      else {
        poseCurl(sheet, dir === "prev" ? 0 : ANGLE, 1);
        clearTurn();
      }
      return;
    }
    var ease = reverse ? easeReturn : easeTurn;
    var dur = reverse
      ? 280 + Math.min(1, span / 0.2) * 80
      : Math.max(420, DURATION * span);
    var start = performance.now();
    function tick(now) {
      var t = Math.min(1, (now - start) / dur);
      var p = fromP + (endP - fromP) * ease(t);
      if (t >= 1) p = endP;
      var angle = dir === "prev" ? ANGLE + p * -ANGLE : p * ANGLE;
      poseCurl(sheet, angle, p);
      updateCast(p);
      if (t < 1) {
        raf = window.requestAnimationFrame(tick);
      } else if (reverse) {
        restoreDrag();
      } else {
        poseCurl(sheet, dir === "prev" ? 0 : ANGLE, 1);
        updateCast(0);
        clearTurn();
      }
    }
    raf = window.requestAnimationFrame(tick);
  }

  function restoreDrag() {
    var album = api();
    if (album && pageGo && album.page() !== dragFrom) {
      skipArm = true;
      pageGo.call(album, dragFrom);
      skipArm = false;
    }
    clearTurn();
  }

  function applyDragP(p) {
    if (p < 0) p = 0;
    if (p > 0.95) p = 0.95;
    dragP = p;
    var angle = armedDir === "prev" ? ANGLE + p * -ANGLE : p * ANGLE;
    poseCurl(sheet, angle, p);
    updateCast(p);
  }

  function startDrag(dir) {
    if (turning || reduce() || lightboxOpen() || !albumViewActive()) return false;
    if (!canTurn(dir)) return false;
    var album = api();
    if (!album || !pageGo) return false;
    if (!mountOutgoing()) return false;
    armedDir = dir;
    turning = true;
    started = true;
    fadeOnly = false;
    armLock();
    followBook(dir);
    dragP = 0;
    dragFrom = album.page();
    var host = block();
    if (host) host.classList.add(dir === "prev" ? "is-turning-prev" : "is-turning-next");
    skipArm = true;
    pageGo.call(album, dir === "next" ? dragFrom + 1 : dragFrom - 1);
    skipArm = false;
    stripFlip();
    if (dir === "prev") mountIncoming();
    applyDragP(0);
    return true;
  }

  function canTurn(dir) {
    var album = api();
    if (!album) return false;
    if (dir === "next" && album.page() >= album.count() - 1) return false;
    if (dir === "prev" && album.page() <= 0) return false;
    return true;
  }

  function arm(dir) {
    if (turning) return;
    if (lightboxOpen() || !albumViewActive()) return;
    if (!canTurn(dir)) return;
    if (reduce()) {
      armedDir = dir;
      turning = true;
      fadeOnly = true;
      armLock();
      return;
    }
    if (!mountOutgoing()) {
      clearTurn();
      return;
    }
    armedDir = dir;
    turning = true;
    fadeOnly = false;
    armLock();
    var host = block();
    if (host) host.classList.add(dir === "prev" ? "is-turning-prev" : "is-turning-next");
    if (abortTimer) window.clearTimeout(abortTimer);
    abortTimer = window.setTimeout(function () {
      if (armedDir && sheet && !started) clearTurn();
    }, 360);
  }

  function beginArmed() {
    if (!armedDir || started) return;
    if (fadeOnly) {
      started = true;
      playFade();
      return;
    }
    if (!sheet) {
      clearTurn();
      return;
    }
    started = true;
    if (abortTimer) {
      window.clearTimeout(abortTimer);
      abortTimer = 0;
    }
    stripFlip();
    if (armedDir === "prev") mountIncoming();
    animate(armedDir);
  }

  var ignoreClick = false;

  function navTarget(el) {
    if (!el || !el.closest) return null;
    return el.closest("#btn-next, #btn-last, #btn-prev, #btn-first, #btn-random, #btn-toc, .chapter-jump");
  }

  function isControls(el) {
    return !!(el && el.closest && el.closest("#album-controls, .ctrl-btn"));
  }

  function isPhotoHotspot(el) {
    return !!(el && el.closest && el.closest("img, .photo-frame"));
  }

  function isPaper(el) {
    return !!(el && el.closest && el.closest("#book-page, .book-3d-block, .book-3d-foreedge, .book-3d-thickness"));
  }

  function pointOverControls(x, y) {
    var bar = document.getElementById("album-controls");
    if (!bar || bar.style.display === "none") return false;
    var inner = bar.querySelector(".album-controls-inner") || bar;
    var r = inner.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  }

  function requestTurn(dir) {
    if (turning || lightboxOpen() || !albumViewActive()) return;
    if (!canTurn(dir)) return;
    var album = api();
    if (!album) return;
    if (dir === "next") album.next();
    else album.prev();
  }

  function turnFromPoint(clientX) {
    var page = document.getElementById("book-page");
    if (!page) return;
    var r = page.getBoundingClientRect();
    requestTurn(clientX >= r.left + r.width * 0.5 ? "next" : "prev");
  }

  function onClickCapture(e) {
    if (!albumViewActive()) return;
    if (e.target.closest && e.target.closest("#btn-see-us, .story-actions, [data-action=open-album], .nav-pills [data-view=album]")) {
      if (turning) clearTurn();
      return;
    }
    if (isControls(e.target) || pointOverControls(e.clientX, e.clientY)) {
      var keepGoing = e.target.closest && e.target.closest("#btn-toc, #btn-random, .chapter-jump");
      if (keepGoing) {
        if (turning) clearTurn();
        return;
      }
      var nav = navTarget(e.target);
      if (turning && nav) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      if (e.target.closest && e.target.closest("#btn-next, #btn-last")) arm("next");
      else if (e.target.closest && e.target.closest("#btn-prev, #btn-first")) arm("prev");
      return;
    }
    if (turning) return;
    if (!albumViewActive() || lightboxOpen()) return;
    if (ignoreClick) {
      ignoreClick = false;
      return;
    }
    if (isPhotoHotspot(e.target)) return;
    if (!isPaper(e.target)) return;
    turnFromPoint(e.clientX);
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
    var tracking = false;
    var dragging = false;
    var pointerId = null;
    var span = 200;

    function progressFromDx(dx) {
      if (armedDir === "next") return Math.max(0, Math.min(0.95, -dx / span));
      return Math.max(0, Math.min(0.95, dx / span));
    }

    stage.addEventListener("pointerdown", function (e) {
      if (turning || lightboxOpen() || !albumViewActive()) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (e.target.closest && e.target.closest("button, a, input, .ctrl-btn, #album-controls")) return;
      if (pointOverControls(e.clientX, e.clientY)) return;
      x0 = e.clientX;
      y0 = e.clientY;
      tracking = true;
      dragging = false;
      pointerId = e.pointerId;
      var page = document.getElementById("book-page");
      span = Math.max(140, ((page && page.offsetWidth) || 280) * 0.72);
    });

    stage.addEventListener(
      "pointermove",
      function (e) {
        if (!tracking || e.pointerId !== pointerId) return;
        if (reduce()) return;
        var dx = e.clientX - x0;
        var dy = e.clientY - y0;
        if (!dragging) {
          if (Math.abs(dx) < 16 || Math.abs(dx) < Math.abs(dy) * 1.15) return;
          if (!startDrag(dx < 0 ? "next" : "prev")) {
            tracking = false;
            return;
          }
          dragging = true;
          try {
            stage.setPointerCapture(e.pointerId);
          } catch (err) {}
        }
        e.preventDefault();
        applyDragP(progressFromDx(dx));
      },
      { passive: false }
    );

    function finishPointer(e) {
      if (!tracking || (e && e.pointerId !== pointerId)) return;
      tracking = false;
      pointerId = null;
      if (!dragging) return;
      dragging = false;
      ignoreClick = true;
      if (dragP >= 0.2) animate(armedDir, dragP, false);
      else animate(armedDir, dragP, true);
    }

    stage.addEventListener("pointerup", finishPointer);
    stage.addEventListener("pointercancel", finishPointer);

    stage.addEventListener(
      "touchend",
      function (e) {
        if (reduce()) {
          if (turning) return;
          var t = e.changedTouches[0];
          if (!t) return;
          var dx = t.clientX - x0;
          var dy = t.clientY - y0;
          if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
          arm(dx < 0 ? "next" : "prev");
        }
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
    pageGo = go;
    album.go = function (idx, hint) {
      if (skipArm) {
        go.call(album, idx, hint);
        stripFlip();
        return;
      }
      if (!albumViewActive()) {
        go.call(album, idx, hint);
        return;
      }
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
      if (armedDir) beginArmed();
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
    window.ClaireTurnClear = clearTurn;
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
