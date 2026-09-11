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

window.claireOpenAlbum = function () {
  function run(api) {
    try {
      if (window.ClaireTurnClear) window.ClaireTurnClear();
    } catch (err) {}
    try {
      api.go(0);
    } catch (err2) {}
    try {
      api.open("album");
    } catch (err3) {}
  }
  var api = window.ClaireAlbum;
  if (api) {
    run(api);
    return;
  }
  var n = 0;
  var t = window.setInterval(function () {
    n += 1;
    api = window.ClaireAlbum;
    if (api || n > 40) {
      window.clearInterval(t);
      if (api) run(api);
    }
  }, 50);
};
