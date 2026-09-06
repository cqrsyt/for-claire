/**
 * Site base path — change this when deploying:
 *   "" or "./"     → Cloudflare Pages / custom domain at root
 *   "/for-claire/" → GitHub Pages project site
 *
 * sitePasswordHash: SHA-256 hex of the gate password (not the password itself).
 * To change password: sha256("your-password") and paste here; or ask me.
 *
 * bgMusicSrc: optional path or URL to a legally obtained audio file
 *   (e.g. "audio/kaze-no-uta.mp3"). Leave empty until you add your own file.
 *   Suggested piece: 押尾光太郎 Kotaro Oshio — 风之诗 / Kaze no Uta (Wind Song).
 *   Do NOT commit copyrighted audio without a license / purchase rights.
 */
window.SITE_CONFIG = {
  basePath: "/for-claire/", // GitHub Pages project site
  sitePasswordHash: "310f089018032ba50b85d43ed54f70c81cf8e8a4846b26bc2037274e56f1acd1",
  passwordStorageKey: "claire-album-unlocked",
  bgMusicSrc: "", // set to your own licensed file path when ready
  bgMusicTitleZh: "风之诗",
  bgMusicTitleEn: "Kaze no Uta",
  bgMusicArtist: "押尾光太郎 / Kotaro Oshio",
};
