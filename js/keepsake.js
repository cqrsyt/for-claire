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
    var close = document.getElementById("chapter-drawer-close");
    if (close) close.focus();
  }

  function closeDrawer() {
    var drawer = document.getElementById("chapter-drawer");
    if (drawer) drawer.hidden = true;
  }

  function bindLikes() {
    document.querySelectorAll("[data-like]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-like");
        var item = LIKES[key];
        if (!item) return;
        burst(item.glyph, key === "dog" ? 10 : 16);
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
  }

  function sprinklePaws() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
    if (langBtn) window.setTimeout(syncDrawerLang, 30);
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
    ready(function () {});
  }
})();
