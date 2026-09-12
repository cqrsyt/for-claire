/**
 * Extra keepsake interactions: Claire's likes, chapter drawer, easier paging.
 */
(function () {
  "use strict";

  var LIKES = {
    tomato: { glyph: "🍅", zh: "大宝爱吃番茄。我记得。", en: "Da Bao loves tomatoes. I remember." },
    pepper: { glyph: "🫑", zh: "青椒给小朋友留着。", en: "A green pepper, saved for our little one." },
    eggplant: { glyph: "🍆", zh: "茄子来了，给大宝。", en: "Here — eggplant, for Da Bao." },
    fruit: { glyph: "🍊", zh: "随便摘一颗。小朋友爱吃的水果，我都想备着。", en: "Pick one. I want to keep the fruits our little one likes close." },
    berry: { glyph: "🫐", zh: "蓝蓝的一颗，像你喜欢的颜色。", en: "A little blue berry — like the color you love." },
    dog: { glyph: "🐶", zh: "汪。我们自己也是狗狗。金毛路过，摇了摇尾巴。", en: "Woof. We are puppies too. A golden retriever passed by, tail wagging." },
    plush: { glyph: "🧸", zh: "给大宝抱一只。", en: "A plush one, for Da Bao to hold." },
    maple: { glyph: "🍁", zh: "枫叶落下来。秋天到了，大宝。", en: "Maple leaves falling. Autumn is here, Da Bao." },
    blue: { glyph: "💙", zh: "大宝喜欢的蓝。我把天光再调亮了一点。", en: "The blue Da Bao likes. I let a little more of it in." }
  };

  function zh() {
    return document.documentElement.getAttribute("data-lang") !== "en";
  }

  function album() {
    return window.ClaireAlbum;
  }

  function toast(text) {
    var el = document.getElementById("claire-toast");
    if (!el) return;
    el.hidden = false;
    el.textContent = text;
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      el.hidden = true;
    }, 2400);
  }

  function burst(glyph, n) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var root = document.getElementById("claire-burst");
    if (!root) return;
    n = n || 14;
    for (var i = 0; i < n; i++) {
      var bit = document.createElement("span");
      bit.className = "burst-bit";
      bit.textContent = glyph;
      bit.style.left = 8 + Math.random() * 84 + "%";
      bit.style.top = 8 + Math.random() * 18 + "%";
      bit.style.setProperty("--dx", (Math.random() * 140 - 70) + "px");
      bit.style.animationDuration = 1.05 + Math.random() * 0.7 + "s";
      root.appendChild(bit);
      window.setTimeout(function (node) {
        node.remove();
      }, 1600, bit);
    }
  }

  function ready(fn) {
    if (album()) {
      fn();
      return;
    }
    var n = 0;
    var t = window.setInterval(function () {
      n += 1;
      if (album() || n > 80) {
        window.clearInterval(t);
        if (album()) fn();
      }
    }, 120);
  }

  function fillDrawer() {
    var data = window.ALBUM_DATA;
    var list = document.getElementById("chapter-drawer-list");
    if (!data || !list || list.childElementCount) return;
    data.chapters.forEach(function (ch, idx) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chapter-jump";
      btn.dataset.chapterIndex = String(idx);
      var title = document.createElement("span");
      title.className = "chapter-jump-title zh";
      title.textContent = (idx + 1) + " · " + ch.titleZh;
      var intro = document.createElement("span");
      intro.className = "chapter-jump-intro";
      intro.textContent = ch.introZh || "";
      btn.appendChild(title);
      btn.appendChild(intro);
      btn.addEventListener("click", function () {
        jumpChapter(idx);
        closeDrawer();
      });
      list.appendChild(btn);
    });
  }

  function jumpChapter(idx) {
    var api = album();
    var data = window.ALBUM_DATA;
    if (!api || !data) return;
    var page = 0;
    for (var i = 0; i < idx; i++) page += data.chapters[i].pages.length;
    api.open("album");
    api.go(page, "next");
  }

  function openDrawer() {
    var drawer = document.getElementById("chapter-drawer");
    if (!drawer) return;
    fillDrawer();
    drawer.hidden = false;
    drawer.removeAttribute("aria-hidden");
    drawer.style.pointerEvents = "";
    drawer.style.display = "";
    var close = document.getElementById("chapter-drawer-close");
    if (close) close.focus();
  }

  function closeDrawer() {
    var drawer = document.getElementById("chapter-drawer");
    if (!drawer) return;
    drawer.hidden = true;
    drawer.setAttribute("aria-hidden", "true");
    drawer.style.pointerEvents = "none";
  }

  function bindLikes() {
    document.querySelectorAll("[data-like]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-like");
        var item = LIKES[key];
        if (!item) return;
        burst(item.glyph, key === "dog" ? 10 : key === "maple" ? 18 : 16);
        toast(zh() ? item.zh : item.en);
        if (key === "blue") {
          document.body.classList.toggle("claire-blue");
        }
      });
    });
  }

  function bindAlbumExtras() {
    var first = document.getElementById("btn-first");
    var last = document.getElementById("btn-last");
    var random = document.getElementById("btn-random");
    var toc = document.getElementById("btn-toc");
    if (first) first.addEventListener("click", function () {
      var api = album();
      if (api) api.go(0, "prev");
    });
    if (last) last.addEventListener("click", function () {
      var api = album();
      if (api) api.go(api.count() - 1, "next");
    });
    if (random) random.addEventListener("click", function () {
      var api = album();
      if (!api) return;
      var n = api.count();
      var cur = api.page();
      var next = Math.floor(Math.random() * n);
      if (n > 1) {
        while (next === cur) next = Math.floor(Math.random() * n);
      }
      api.go(next, next > cur ? "next" : "prev");
      toast(zh() ? "翻到一页，给小朋友看。" : "A page for our little ones to see again.");
    });
    if (toc) toc.addEventListener("click", openDrawer);
    var close = document.getElementById("chapter-drawer-close");
    if (close) close.addEventListener("click", closeDrawer);
    var drawer = document.getElementById("chapter-drawer");
    if (drawer) {
      drawer.addEventListener("click", function (e) {
        if (e.target === drawer) closeDrawer();
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });
    elevateControls();
  }

  function elevateControls() {
    var bar = document.getElementById("album-controls");
    if (!bar) return;
    var on = document.documentElement.getAttribute("data-screen") === "album";
    bar.style.zIndex = on ? "280" : "0";
    var inner = bar.querySelector(".album-controls-inner");
    if (inner) inner.style.pointerEvents = on ? "auto" : "none";
    bar.querySelectorAll(".ctrl-btn").forEach(function (btn) {
      btn.style.pointerEvents = on ? "auto" : "none";
      btn.style.position = "relative";
      btn.style.zIndex = on ? "282" : "0";
    });
  }

  function sprinklePaws() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 720) return;
    var root = document.getElementById("ambient-petals");
    if (!root) return;
    for (var i = 0; i < 5; i++) {
      var paw = document.createElement("span");
      paw.className = "paw-print";
      paw.style.left = 8 + Math.random() * 84 + "%";
      paw.style.top = 18 + Math.random() * 62 + "%";
      paw.style.animationDelay = -Math.random() * 4 + "s";
      root.appendChild(paw);
    }
  }

  function dressCover() {
    var view = document.getElementById("view-cover");
    var frame = view && view.querySelector(".cover-frame");
    if (!frame) return;
    if (!frame.closest(".cover-book-3d")) {
      var wrap = document.createElement("div");
      wrap.className = "cover-book-3d";
      var spine = document.createElement("div");
      spine.className = "cover-book-spine";
      spine.setAttribute("aria-hidden", "true");
      var pages = document.createElement("div");
      pages.className = "cover-book-pages";
      pages.setAttribute("aria-hidden", "true");
      frame.parentNode.insertBefore(wrap, frame);
      wrap.appendChild(spine);
      wrap.appendChild(frame);
      wrap.appendChild(pages);
    }
    var wrapEl = frame.closest(".cover-book-3d");
    if (wrapEl && !wrapEl.querySelector(".cover-book-leaf")) {
      var leaf = document.createElement("div");
      leaf.className = "cover-book-leaf";
      leaf.setAttribute("aria-hidden", "true");
      leaf.setAttribute("data-label", zh() ? "我们的故事" : "Our Story");
      wrapEl.insertBefore(leaf, frame);
    }
    if (!frame.querySelector(".cover-sketch")) {
      var sketch = document.createElement("div");
      sketch.className = "cover-sketch";
      sketch.setAttribute("aria-hidden", "true");
      frame.insertBefore(sketch, frame.firstChild);
    }
    if (!frame.querySelector(".cover-frame-back")) {
      var back = document.createElement("div");
      back.className = "cover-frame-back";
      back.setAttribute("aria-hidden", "true");
      frame.appendChild(back);
    }
  }

  function watchCover() {
    var view = document.getElementById("view-cover");
    if (!view || view._coverWatch) return;
    view._coverWatch = true;
    dressCover();
    var mo = new MutationObserver(function () {
      dressCover();
    });
    mo.observe(view, { childList: true, subtree: true });
  }

  var coverOpening = false;
  var coverOpenedAt = 0;
  var coverRaf = 0;
  var coverLockTimer = 0;
  var COVER_LOCK_MS = 2500;

  function coverEls() {
    var book = document.querySelector(".cover-book-3d");
    return {
      book: book,
      frame: book && book.querySelector(".cover-frame"),
      leaf: book && book.querySelector(".cover-book-leaf")
    };
  }

  function enterStory() {
    var api = album();
    if (api) api.open("story");
    warmupAlbum();
    coverOpening = false;
  }

  function prefetchFirstPage() {
    var data = window.ALBUM_DATA;
    if (!data || !data.chapters || !data.chapters[0] || !data.chapters[0].pages[0]) return;
    var photos = data.chapters[0].pages[0].photos || [];
    var base = (window.SITE_CONFIG && window.SITE_CONFIG.basePath) || "";
    if (base && base !== "./") base = base.endsWith("/") ? base : base + "/";
    else base = "";
    photos.slice(0, 3).forEach(function (ph) {
      if (!ph || !ph.src) return;
      var src = String(ph.src).replace(/^\.\//, "").replace(/^\//, "");
      src = src.replace(/(^|\/)photos\/(?!web\/|thumbs\/)(e\d+\.(?:jpe?g|png|webp))/i, "$1photos/web/$2");
      var img = new Image();
      img.decoding = "async";
      img.src = base + src;
    });
  }

  function warmupAlbum() {
    prefetchFirstPage();
    var run = function () {
      var api = album();
      if (!api) return;
      var page = document.getElementById("book-page");
      if (page && page.querySelector(".photo-stack") && api.page() === 0) return;
      try {
        api.go(0);
      } catch (err) {}
    };
    if (window.requestIdleCallback) window.requestIdleCallback(run, { timeout: 800 });
    else window.setTimeout(run, 160);
  }

  function resetCoverMotion() {
    if (coverRaf) window.cancelAnimationFrame(coverRaf);
    coverRaf = 0;
    if (coverLockTimer) {
      window.clearTimeout(coverLockTimer);
      coverLockTimer = 0;
    }
    var els = coverEls();
    if (els.book) {
      els.book.classList.remove("is-opening");
      els.book.style.transform = "";
    }
    if (els.frame) {
      els.frame.style.animation = "";
      els.frame.style.transition = "";
      els.frame.style.transform = "";
    }
    if (els.leaf) els.leaf.style.filter = "";
    coverOpening = false;
  }

  function finishCover(openStory) {
    if (openStory) enterStory();
    resetCoverMotion();
    coverOpening = false;
  }

  function armCoverLock() {
    if (coverLockTimer) window.clearTimeout(coverLockTimer);
    coverLockTimer = window.setTimeout(function () {
      coverLockTimer = 0;
      finishCover(true);
    }, COVER_LOCK_MS);
  }

  function playCoverReveal() {
    if (coverOpening && coverLockTimer) return;
    if (coverOpening) resetCoverMotion();
    var api = album();
    if (!api) {
      coverOpening = true;
      coverOpenedAt = Date.now();
      armCoverLock();
      ready(function () {
        if (!coverOpening) return;
        resetCoverMotion();
        playCoverReveal();
      });
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      enterStory();
      return;
    }
    coverOpening = true;
    coverOpenedAt = Date.now();
    armCoverLock();
    try {
      var els = coverEls();
      var book = els.book;
      var frame = els.frame;
      var leaf = els.leaf;
      if (coverRaf) window.cancelAnimationFrame(coverRaf);
      if (frame) {
        frame.style.animation = "none";
        frame.style.transition = "none";
        frame.style.transform = "rotateY(0deg)";
        void frame.offsetWidth;
      }
      if (book) book.classList.add("is-opening");
      var start = performance.now();
      var duration = 2100;
      var opened = false;
      function easeCover(t) {
        if (t < 0.12) return (t / 0.12) * (t / 0.12) * 0.04;
        var u = (t - 0.12) / 0.88;
        return 0.04 + 0.96 * (1 - Math.pow(1 - u, 2.8));
      }
      function tick(now) {
        if (!coverOpening) return;
        try {
          var t = Math.min(1, (now - start) / duration);
          var p = easeCover(t);
          var angle = p * -162;
          var lift = Math.sin(p * Math.PI) * 14;
          var tilt = 6 + p * 10;
          if (book) {
            book.style.transform = "rotateX(" + (7 - p * 2) + "deg) rotateY(" + tilt + "deg)";
          }
          if (frame) {
            frame.style.transform =
              "translate3d(0," +
              -lift * 0.25 +
              "px," +
              lift +
              "px) rotateY(" +
              angle +
              "deg)";
          }
          if (leaf) leaf.style.filter = "brightness(" + (0.88 + p * 0.16) + ")";
          if (!opened && t > 0.72) {
            opened = true;
            enterStory();
          }
          if (t < 1) {
            coverRaf = window.requestAnimationFrame(tick);
          } else {
            finishCover(!opened);
          }
        } catch (err) {
          finishCover(true);
        }
      }
      coverRaf = window.requestAnimationFrame(tick);
    } catch (err) {
      finishCover(true);
    }
  }

  function bindCoverOpen() {
    if (document._coverOpenBound) return;
    document._coverOpenBound = true;
    var lastCover = 0;

    function onCoverIntent(e) {
      var el = e.target;
      if (el && el.nodeType === 3) el = el.parentElement;
      if (el && el.closest && el.closest("#btn-see-us, .story-actions")) return;
      if (e.type === "pointerup" && e.pointerType === "mouse") return;
      var storyBtn = el && el.closest && el.closest("[data-action=open-story]");
      if (!storyBtn) return;
      if (coverOpening) {
        if (Date.now() - coverOpenedAt > 2500) {
          coverOpening = false;
          resetCoverMotion();
          var stuckApi = album();
          if (stuckApi) stuckApi.open("story");
        }
        if (e.cancelable) e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      var now = Date.now();
      if (now - lastCover < 480) {
        if (e.cancelable) e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      lastCover = now;
      if (e.cancelable) e.preventDefault();
      e.stopImmediatePropagation();
      playCoverReveal();
    }

    document.addEventListener("pointerup", onCoverIntent, true);
    document.addEventListener("click", onCoverIntent, true);
  }

  function bindBookTilt() {
    var stage = document.getElementById("book-stage");
    var book = document.getElementById("book-3d");
    if (!stage || !book) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    stage.addEventListener("mousemove", function (e) {
      if (e.target.closest && e.target.closest("#album-controls, .ctrl-btn")) return;
      var r = stage.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      book.classList.add("is-tilting");
      book.style.transform =
        "rotateX(" + (8 - y * 7) + "deg) rotateY(" + (x * 10 - 5) + "deg)";
    });
    stage.addEventListener("mouseleave", function () {
      book.classList.remove("is-tilting");
      book.style.transform = "";
    });
  }

  var eggSeenNine = false;
  var eggFired = false;

  function eggLang() {
    var text = document.querySelector(".birthday-egg-text");
    var sub = document.querySelector(".birthday-egg-sub");
    var credit = document.querySelector(".sketch-credit");
    var coverTitle = document.querySelector(".book-3d-cover-title");
    var leaf = document.querySelector(".cover-book-leaf");
    if (zh()) {
      if (text) text.textContent = "生日快乐";
      if (sub) sub.textContent = "大宝，第九页走到第二十二页";
      if (credit) credit.textContent = "左页素描：1908 年明信片（公有领域）· 玫瑰铅笔稿：Wellcome Collection（Public Domain Mark）";
      if (coverTitle) coverTitle.textContent = "写给秋然";
      if (leaf) leaf.setAttribute("data-label", "我们的故事");
    } else {
      if (text) text.textContent = "Happy Birthday";
      if (sub) sub.textContent = "Da Bao — page nine, then twenty-two";
      if (credit) credit.textContent = "Left sketch: 1908 postcard (public domain) · Rose pencil drawing: Wellcome Collection (Public Domain Mark)";
      if (coverTitle) coverTitle.textContent = "For Claire";
      if (leaf) leaf.setAttribute("data-label", "Our Story");
    }
  }

  function closeEgg() {
    var egg = document.getElementById("birthday-egg");
    if (!egg) return;
    egg.hidden = true;
    egg.setAttribute("aria-hidden", "true");
    egg.style.pointerEvents = "none";
    var hearts = egg.querySelector(".birthday-egg-hearts");
    if (hearts) hearts.innerHTML = "";
  }

  function spawnEggHearts() {
    var root = document.querySelector(".birthday-egg-hearts");
    if (!root) return;
    root.innerHTML = "";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    var glyphs = ["♥", "♡", "💕", "💗", "💙"];
    for (var i = 0; i < 28; i++) {
      var h = document.createElement("span");
      h.className = "egg-heart";
      h.textContent = glyphs[i % glyphs.length];
      h.style.setProperty("--x", 4 + Math.random() * 92 + "%");
      h.style.setProperty("--dx", Math.random() * 80 - 40 + "px");
      h.style.setProperty("--s", 0.9 + Math.random() * 1.4 + "rem");
      h.style.setProperty("--d", 3.2 + Math.random() * 2.8 + "s");
      h.style.animationDelay = Math.random() * 1.4 + "s";
      root.appendChild(h);
    }
  }

  function fireEgg() {
    if (eggFired) return;
    try {
      if (sessionStorage.getItem("claire-egg-922") === "1") return;
    } catch (e) {}
    eggFired = true;
    try {
      sessionStorage.setItem("claire-egg-922", "1");
    } catch (e2) {}
    var egg = document.getElementById("birthday-egg");
    if (!egg) return;
    eggLang();
    spawnEggHearts();
    egg.hidden = false;
    egg.setAttribute("aria-hidden", "false");
    egg.style.pointerEvents = "";
    egg.style.display = "";
    burst("♥", 18);
    burst("💙", 10);
    clearTimeout(fireEgg._t);
    fireEgg._t = window.setTimeout(closeEgg, 6800);
  }

  var lastAlbumPage = -1;

  function noteAlbumPage() {
    var api = album();
    if (!api) return;
    var display = api.page() + 1;
    lastAlbumPage = display;
    if (display === 9) eggSeenNine = true;
    if (display === 22 && eggSeenNine) fireEgg();
  }

  function bindEasterEgg() {
    var indicator = document.getElementById("page-indicator");
    if (indicator && !indicator._eggWatch) {
      indicator._eggWatch = true;
      var mo = new MutationObserver(noteAlbumPage);
      mo.observe(indicator, { childList: true, characterData: true, subtree: true });
    }
    var egg = document.getElementById("birthday-egg");
    if (egg && !egg._bound) {
      egg._bound = true;
      egg.addEventListener("click", closeEgg);
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeEgg();
      });
    }
    ready(function () {
      var api = album();
      if (!api || api._eggBound) {
        noteAlbumPage();
        return;
      }
      api._eggBound = true;
      var go = api.go;
      var next = api.next;
      var prev = api.prev;
      api.go = function (idx, dir) {
        go.call(api, idx, dir);
        noteAlbumPage();
      };
      api.next = function () {
        next.call(api);
        noteAlbumPage();
      };
      api.prev = function () {
        prev.call(api);
        noteAlbumPage();
      };
      noteAlbumPage();
    });
  }

  function syncDrawerLang() {
    var data = window.ALBUM_DATA;
    if (!data) return;
    var title = document.querySelector(".chapter-drawer-title");
    var sub = document.querySelector(".chapter-drawer-sub");
    var close = document.getElementById("chapter-drawer-close");
    var toc = document.getElementById("btn-toc");
    var random = document.getElementById("btn-random");
    if (zh()) {
      if (title) title.textContent = "目录";
      if (sub) sub.textContent = "点一章，就翻到那里";
      if (close) close.textContent = "收起";
      if (toc) toc.textContent = "目录";
      if (random) random.textContent = "随机";
    } else {
      if (title) title.textContent = "Chapters";
      if (sub) sub.textContent = "Tap a chapter to turn there";
      if (close) close.textContent = "Close";
      if (toc) toc.textContent = "Index";
      if (random) random.textContent = "Random";
    }
    document.querySelectorAll(".chapter-jump").forEach(function (btn, idx) {
      var ch = data.chapters[idx];
      if (!ch) return;
      var t = btn.querySelector(".chapter-jump-title");
      var i = btn.querySelector(".chapter-jump-intro");
      if (t) t.textContent = (idx + 1) + " · " + (zh() ? ch.titleZh : ch.titleEn);
      if (i) i.textContent = zh() ? ch.introZh : ch.introEn;
    });
  }

  document.addEventListener("click", function (e) {
    var langBtn = e.target.closest && e.target.closest("[data-lang]");
    if (langBtn) {
      window.setTimeout(function () {
        syncDrawerLang();
        eggLang();
      }, 30);
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    bindLikes();
    bindAlbumExtras();
    sprinklePaws();
    fillDrawer();
    syncDrawerLang();
    eggLang();
    watchCover();
    bindCoverOpen();
    bindBookTilt();
    bindEasterEgg();
    elevateControls();
    ready(function () {});
  }
})();
