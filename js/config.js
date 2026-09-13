/**
 * Site base path — change this when deploying:
 *   "" or "./"     → Cloudflare Pages / custom domain at root
 *   "/for-claire/" → GitHub Pages project site
 */
window.SITE_CONFIG = {
  basePath: "/for-claire/",
  sitePasswordHash: "310f089018032ba50b85d43ed54f70c81cf8e8a4846b26bc2037274e56f1acd1",
  passwordStorageKey: "claire-album-unlocked",
};

window.claireOpenAlbum = function () {
  var api = window.ClaireAlbum;
  if (!api || typeof api.open !== "function") return;
  try {
    if (window.ClaireTurnClear) window.ClaireTurnClear();
  } catch (e) {}
  try {
    api.go(0);
  } catch (e2) {}
  api.open("album");
};
