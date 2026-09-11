/**
 * Site base path — change this when deploying:
 *   "" or "./"     → Cloudflare Pages / custom domain at root
 *   "/for-claire/" → GitHub Pages project site
 *
 * sitePasswordHash: SHA-256 hex of the gate password (not the password itself).
 * To change password: sha256("your-password") and paste here; or ask me.
 */
window.SITE_CONFIG = {
  basePath: "/for-claire/", // GitHub Pages project site
  sitePasswordHash: "310f089018032ba50b85d43ed54f70c81cf8e8a4846b26bc2037274e56f1acd1",
  passwordStorageKey: "claire-album-unlocked",
};

window.openAlbumFromStory = function () {
  var btn = document.getElementById("btn-see-us");
  var en = document.documentElement.getAttribute("data-lang") === "en";
  var label = btn ? btn.textContent : "";

  function restore() {
    if (!btn) return;
    btn.classList.remove("is-opening", "is-error");
    if (label) btn.textContent = label;
    btn.removeAttribute("aria-busy");
    btn.disabled = false;
  }

  function fail(msg) {
    console.error("[for-claire] openAlbumFromStory:", msg);
    if (!btn) return;
    btn.classList.remove("is-opening");
    btn.classList.add("is-error");
    btn.textContent = en ? "Couldn’t open" : "没打开，再点一次";
    btn.removeAttribute("aria-busy");
    btn.disabled = false;
    window.setTimeout(restore, 1600);
  }

  function run(api) {
    try {
      if (window.ClaireTurnClear) window.ClaireTurnClear();
    } catch (err) {
      console.error("[for-claire] ClaireTurnClear", err);
    }
    try {
      api.go(0);
    } catch (err2) {
      console.error("[for-claire] ClaireAlbum.go", err2);
    }
    try {
      api.open("album");
    } catch (err3) {
      fail(err3);
      return;
    }
    restore();
  }

  if (btn) {
    btn.classList.add("is-opening");
    btn.setAttribute("aria-busy", "true");
  }

  var api = window.ClaireAlbum;
  if (api && typeof api.open === "function") {
    run(api);
    return;
  }

  var n = 0;
  var timer = window.setInterval(function () {
    n += 1;
    api = window.ClaireAlbum;
    if (api && typeof api.open === "function") {
      window.clearInterval(timer);
      run(api);
      return;
    }
    if (n > 40) {
      window.clearInterval(timer);
      fail("ClaireAlbum is not ready");
    }
  }, 50);
};

window.claireOpenAlbum = window.openAlbumFromStory;
