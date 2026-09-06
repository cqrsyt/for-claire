/**
 * For Claire / 写给秋然 — album app
 */
(function () {
  "use strict";

  const data = window.ALBUM_DATA;
  const config = window.SITE_CONFIG || { basePath: "" };

  function normalizeBase(path) {
    if (!path || path === "./") return "";
    return path.endsWith("/") ? path : path + "/";
  }

  const BASE = normalizeBase(config.basePath);

  function asset(rel) {
    if (!rel) return "";
    if (/^https?:\/\//i.test(rel) || rel.startsWith("data:")) return rel;
    const clean = String(rel).replace(/^\.\//, "").replace(/^\//, "");
    return BASE + clean;
  }

  // Flat list of album pages: { chapter, pageIndexInChapter, photos }
  function buildFlatPages() {
    const pages = [];
    data.chapters.forEach((ch) => {
      ch.pages.forEach((pg, i) => {
        pages.push({
          chapter: ch,
          pageIndexInChapter: i,
          photos: pg.photos || [],
        });
      });
    });
    return pages;
  }

  const flatPages = buildFlatPages();

  const state = {
    lang: localStorage.getItem("claire-album-lang") || "zh",
    view: "cover", // cover | story | album
    pageIndex: 0,
    lightbox: null,
  };

  const els = {};

  function t(zhKey, enKey) {
    return state.lang === "zh" ? zhKey : enKey;
  }

  function ui(key) {
    const zh = data.ui[key + "Zh"] ?? data.ui[key];
    const en = data.ui[key + "En"] ?? data.ui[key];
    return state.lang === "zh" ? zh : en;
  }

  function fmt(template, vars) {
    return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
  }

  function setLang(lang) {
    state.lang = lang;
    localStorage.setItem("claire-album-lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
    document.documentElement.setAttribute("data-lang", lang);
    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    renderAll();
  }

  function setView(view) {
    state.view = view;
    document.querySelectorAll(".view").forEach((v) => {
      v.classList.toggle("active", v.dataset.view === view);
    });
    document.querySelectorAll(".nav-pills button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === view);
    });
    const controls = document.getElementById("album-controls");
    if (controls) {
      controls.style.display = view === "album" ? "flex" : "none";
    }
    if (view === "album") renderAlbumPage(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goPage(index, direction) {
    if (index < 0 || index >= flatPages.length) return;
    state.pageIndex = index;
    renderAlbumPage(direction || false);
  }

  function nextPage() {
    if (state.pageIndex < flatPages.length - 1) goPage(state.pageIndex + 1, "next");
  }

  function prevPage() {
    if (state.pageIndex > 0) goPage(state.pageIndex - 1, "prev");
  }

  function openLightbox(photo) {
    state.lightbox = photo;
    const lb = els.lightbox;
    const frame = els.lightboxFrame;
    const cap = els.lightboxCaption;
    frame.innerHTML = "";

    if (photo.src) {
      const img = document.createElement("img");
      img.src = asset(photo.src);
      img.alt = state.lang === "zh" ? photo.captionZh : photo.captionEn;
      frame.appendChild(img);
    } else {
      const ph = document.createElement("div");
      ph.className = "lightbox-placeholder";
      ph.innerHTML =
        '<span class="' +
        (state.lang === "zh" ? "zh" : "en") +
        '">' +
        ui("placeholder") +
        "</span>";
      frame.appendChild(ph);
    }

    const caption = state.lang === "zh" ? photo.captionZh : photo.captionEn;
    cap.textContent = caption || "";
    cap.className = "lightbox-caption " + (state.lang === "zh" ? "zh" : "en");
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    state.lightbox = null;
    els.lightbox.classList.remove("open");
    els.lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function renderCover() {
    const m = data.meta;
    const c = data.cover;
    const root = els.cover;
    const langCls = state.lang === "zh" ? "zh" : "en";

    root.innerHTML = `
      <div class="cover-frame">
        <p class="cover-dedication ${langCls}">${escapeHtml(
      state.lang === "zh" ? m.occasionZh : m.occasionEn
    )}</p>
        <h1 class="cover-title ${langCls}">${escapeHtml(
      state.lang === "zh" ? m.titleZh : m.titleEn
    )}</h1>
        <p class="cover-subtitle ${langCls}">${escapeHtml(
      state.lang === "zh" ? m.subtitleZh : m.subtitleEn
    )}</p>
        <div class="cover-ornament"></div>
        <div class="cover-avatars" aria-hidden="false">
          ${m.avatarHim ? `<img class="cover-avatar" src="${escapeAttr(asset(m.avatarHim))}" alt="" />` : ""}
          <span class="cover-avatar-heart">♥</span>
          ${m.avatarHer ? `<img class="cover-avatar" src="${escapeAttr(asset(m.avatarHer))}" alt="" />` : ""}
        </div>
        <p class="cover-names ${langCls}">${escapeHtml(
      state.lang === "zh"
        ? m.fromZh + " × " + m.toZh
        : m.fromEn + " × " + m.toEn
    )}</p>
        <p class="cover-date ${langCls}">${escapeHtml(
      state.lang === "zh" ? c.dateLineZh : c.dateLineEn
    )}</p>
        <button type="button" class="cover-open ${langCls}" data-action="open-story">
          ${escapeHtml(state.lang === "zh" ? c.hintZh : c.hintEn)}
        </button>
      </div>
      <p class="cover-hint ${langCls}">${escapeHtml(
      state.lang === "zh" ? "一份小小的心意" : "A small keepsake"
    )}</p>
    `;

    root.querySelector("[data-action=open-story]").addEventListener("click", () => {
      setView("story");
    });
  }

  function renderStory() {
    const s = data.story;
    const m = data.meta;
    const langCls = state.lang === "zh" ? "zh" : "en";
    const paras = s.paragraphs
      .map((p) => {
        const text = state.lang === "zh" ? p.zh : p.en;
        return `<p class="story-para ${langCls}">${escapeHtml(text)}</p>`;
      })
      .join("");

    els.story.innerHTML = `
      <div class="story-card">
        <h2 class="story-title ${langCls}">${escapeHtml(
      state.lang === "zh" ? s.titleZh : s.titleEn
    )}</h2>
        <div class="story-ornament"></div>
        ${paras}
        <div class="story-dedication ${langCls}">${escapeHtml(
      state.lang === "zh" ? m.dedicationZh : m.dedicationEn
    )}</div>
      </div>
      <div class="story-actions">
        <button type="button" class="cover-open ${langCls}" data-action="open-album">
          ${escapeHtml(state.lang === "zh" ? "翻开相册" : "Open the album")}
        </button>
      </div>
    `;

    els.story
      .querySelector("[data-action=open-album]")
      .addEventListener("click", () => {
        state.pageIndex = 0;
        setView("album");
      });
  }

  function renderAlbumPage(direction) {
    const entry = flatPages[state.pageIndex];
    if (!entry) return;

    const langCls = state.lang === "zh" ? "zh" : "en";
    const ch = entry.chapter;

    els.chapterHeader.innerHTML = `
      <div class="chapter-dots" role="tablist" aria-label="chapters"></div>
      <h2 class="chapter-title ${langCls}">${escapeHtml(
      state.lang === "zh" ? ch.titleZh : ch.titleEn
    )}</h2>
      <p class="chapter-intro ${langCls}">${escapeHtml(
      state.lang === "zh" ? ch.introZh : ch.introEn
    )}</p>
    `;

    const dots = els.chapterHeader.querySelector(".chapter-dots");
    data.chapters.forEach((c, ci) => {
      const firstIdx = flatPages.findIndex((p) => p.chapter.id === c.id);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chapter-dot" + (c.id === ch.id ? " active" : "");
      btn.title = state.lang === "zh" ? c.titleZh : c.titleEn;
      btn.setAttribute("aria-label", btn.title);
      btn.addEventListener("click", () => goPage(firstIdx, "next"));
      dots.appendChild(btn);
    });

    const pageEl = els.bookPage;
    pageEl.classList.remove("flip-next", "flip-prev");
    if (direction === "next") {
      void pageEl.offsetWidth;
      pageEl.classList.add("flip-next");
    } else if (direction === "prev") {
      void pageEl.offsetWidth;
      pageEl.classList.add("flip-prev");
    }

    const photosHtml = entry.photos
      .map((photo, i) => {
        const caption = state.lang === "zh" ? photo.captionZh : photo.captionEn;
        const note = state.lang === "zh" ? photo.noteZh : photo.noteEn;
        let media;
        if (photo.src) {
          media = `<img src="${escapeAttr(asset(photo.src))}" alt="${escapeAttr(
            caption || ""
          )}" loading="lazy" />`;
        } else {
          media = `
            <div class="photo-placeholder">
              <div class="photo-placeholder-icon" aria-hidden="true">❀</div>
              <div class="photo-placeholder-text ${langCls}">${escapeHtml(
            ui("placeholder")
          )}</div>
            </div>`;
        }
        return `
          <article class="photo-card">
            <div class="photo-frame" tabindex="0" role="button" data-photo-index="${i}" aria-label="${escapeAttr(
          caption || ui("placeholder")
        )}">
              ${media}
            </div>
            ${
              caption
                ? `<h3 class="photo-caption ${langCls}">${escapeHtml(caption)}</h3>`
                : ""
            }
            ${note ? `<p class="photo-note ${langCls}">${escapeHtml(note)}</p>` : ""}
          </article>`;
      })
      .join("");

    pageEl.innerHTML = `<div class="photo-stack">${photosHtml}</div>`;

    pageEl.querySelectorAll("[data-photo-index]").forEach((frame) => {
      const idx = Number(frame.dataset.photoIndex);
      const open = () => openLightbox(entry.photos[idx]);
      frame.addEventListener("click", open);
      frame.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });

    // Controls
    const indicator = fmt(ui("pageOf"), {
      current: state.pageIndex + 1,
      total: flatPages.length,
    });
    els.pageIndicator.textContent = indicator;
    els.pageIndicator.className = "page-indicator " + langCls;
    els.prevBtn.disabled = state.pageIndex === 0;
    els.nextBtn.disabled = state.pageIndex >= flatPages.length - 1;
    els.prevBtn.setAttribute("aria-label", ui("prev"));
    els.nextBtn.setAttribute("aria-label", ui("next"));
    els.swipeHint.textContent = ui("swipeHint");
    els.swipeHint.className = "swipe-hint " + langCls;
  }

  function renderTopbar() {
    const m = data.meta;
    const langCls = state.lang === "zh" ? "zh" : "en";
    els.brandTitle.textContent =
      state.lang === "zh" ? m.titleZh : m.titleEn;
    els.brandTitle.className = "brand-title " + langCls;
    els.brandSub.textContent =
      state.lang === "zh" ? m.subtitleZh : m.subtitleEn;
    els.brandSub.className = "brand-sub " + langCls;

    const labels = [
      ["cover", "coverLabel"],
      ["story", "storyLabel"],
      ["album", "albumLabel"],
    ];
    els.navPills.querySelectorAll("button").forEach((btn, i) => {
      const key = labels[i][1];
      btn.textContent = ui(key);
      btn.className = btn.className.replace(/\b(zh|en)\b/g, "").trim() + " " + langCls;
    });
  }

  function renderFooter() {
    const m = data.meta;
    const langCls = state.lang === "zh" ? "zh" : "en";
    els.footer.innerHTML =
      state.lang === "zh"
        ? `<span class="zh">—— ${escapeHtml(m.fromZh)} 敬上 · 九月二十二日 ——</span>`
        : `<span class="en">—— With love, ${escapeHtml(m.fromEn)} · September 22 ——</span>`;
    els.footer.className = "site-footer " + langCls;
  }

  function renderAll() {
    document.title =
      (state.lang === "zh"
        ? data.meta.titleZh + " · " + data.meta.subtitleZh
        : data.meta.titleEn + " · " + data.meta.subtitleEn) +
      " | " +
      (state.lang === "zh" ? data.meta.toZh : data.meta.toEn);
    renderTopbar();
    renderCover();
    renderStory();
    if (state.view === "album") renderAlbumPage(false);
    renderFooter();
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, "&#39;");
  }

  function bindSwipe(target) {
    let startX = 0;
    let startY = 0;
    let tracking = false;

    target.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length !== 1) return;
        tracking = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      },
      { passive: true }
    );

    target.addEventListener(
      "touchend",
      (e) => {
        if (!tracking) return;
        tracking = false;
        const tch = e.changedTouches[0];
        const dx = tch.clientX - startX;
        const dy = tch.clientY - startY;
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
        if (dx < 0) nextPage();
        else prevPage();
      },
      { passive: true }
    );
  }

  function init() {
    els.cover = document.getElementById("view-cover");
    els.story = document.getElementById("view-story");
    els.album = document.getElementById("view-album");
    els.chapterHeader = document.getElementById("chapter-header");
    els.bookPage = document.getElementById("book-page");
    els.bookStage = document.getElementById("book-stage");
    els.prevBtn = document.getElementById("btn-prev");
    els.nextBtn = document.getElementById("btn-next");
    els.pageIndicator = document.getElementById("page-indicator");
    els.swipeHint = document.getElementById("swipe-hint");
    els.lightbox = document.getElementById("lightbox");
    els.lightboxFrame = document.getElementById("lightbox-frame");
    els.lightboxCaption = document.getElementById("lightbox-caption");
    els.brandTitle = document.getElementById("brand-title");
    els.brandSub = document.getElementById("brand-sub");
    els.navPills = document.getElementById("nav-pills");
    els.footer = document.getElementById("site-footer");

    // Fix stylesheet / script paths if basePath set (HTML uses relative paths)
    const baseTag = document.querySelector("base");
    if (BASE && !baseTag) {
      // Assets in HTML are relative (css/, js/) so they work with both root and subpath
      // when the site is served from the correct folder. No <base> needed for relative URLs.
    }

    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });

    els.navPills.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.dataset.view === "album" && state.view !== "album") {
          state.pageIndex = Math.min(state.pageIndex, flatPages.length - 1);
        }
        setView(btn.dataset.view);
      });
    });

    els.prevBtn.addEventListener("click", prevPage);
    els.nextBtn.addEventListener("click", nextPage);

    document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
    els.lightbox.addEventListener("click", (e) => {
      if (e.target === els.lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (els.lightbox.classList.contains("open")) {
        if (e.key === "Escape") closeLightbox();
        return;
      }
      if (state.view !== "album") return;
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
    });

    bindSwipe(els.bookStage);

    setLang(state.lang);
    setView("cover");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
