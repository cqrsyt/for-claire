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
  var api = window.ClaireAlbum;
  if (!api) return;
  try {
    if (window.ClaireTurnClear) window.ClaireTurnClear();
  } catch (err) {}
  try {
    api.go(0);
  } catch (err2) {}
  try {
    api.open("album");
  } catch (err3) {}
};
