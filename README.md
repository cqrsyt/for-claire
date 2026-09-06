# 写给秋然 / For Claire

「四百多天」· Four Hundred Days

A static bilingual romantic photo album — a birthday keepsake from Jeffrey (孙郁桐) to Claire (陈秋然).

一份静态双语浪漫相册网站，生日礼物。

---

## Preview locally / 本地预览

Serve the folder with any static server (needed so ES/modules and paths behave correctly):

```bash
# Python
cd for-claire
python3 -m http.server 8080

# or Node
npx serve .
```

Open `http://localhost:8080`

---

## Deploy / 部署

### Cloudflare Pages（推荐 · 自定义域名）

1. 在 Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → 连接仓库或直接上传本文件夹。
2. Build settings：框架选 **None**；Build command 留空；**Output directory** 填 `/` 或项目根（本仓库根目录即站点根）。
3. 部署后，在 Cloudflare 为 Pages 项目绑定你购买的自定义域名（DNS 自动配置）。
4. 根路径托管时保持 `js/config.js` 里 `basePath: ""` 即可。

Brief English: upload or connect this folder to **Cloudflare Pages**, no build step, output = project root. Attach your Cloudflare domain. Keep `basePath: ""` for root hosting.

### GitHub Pages（项目站 · `/for-claire/`）

1. Push this folder as the repo root (or the `docs/` folder / `gh-pages` branch).
2. **Settings → Pages → Build and deployment → Source**: Deploy from branch `main` (or `master`), folder `/` (root).
3. If the site URL is `https://<user>.github.io/for-claire/`, set in `js/config.js`:

```js
window.SITE_CONFIG = {
  basePath: "/for-claire/",
};
```

4. HTML/CSS/JS already use **relative** links, so most assets work either way; `basePath` mainly ensures photo paths from `data/album.js` resolve correctly under a subpath.

---

## Base path / 路径配置

Edit **`js/config.js`**:

| Hosting | `basePath` |
|--------|------------|
| Cloudflare Pages / custom domain at root | `""` (default) |
| GitHub Pages project site | `"/for-claire/"` |
| Local preview at root | `""` |

The site is fully static and portable — no build step required.

---

## Add photos / 添加照片

1. Place images in `photos/` (see `photos/README.md`).
2. Edit **`data/album.js`**:
   - Add or edit chapters under `chapters`
   - Each chapter has `pages`; each page has `photos[]`
   - Fields: `src`, `captionZh`, `captionEn`, `noteZh`, `noteEn`
3. Leave `src: ""` for a soft placeholder frame until the real photo is ready.

Example:

```js
{
  src: "photos/claire-birthday.jpg",
  captionZh: "生日快乐",
  captionEn: "Happy birthday",
  noteZh: "愿这一天温柔而明亮。",
  noteEn: "May the day be gentle and bright.",
}
```

---

## Edit story & dedication / 编辑故事与题献

All copy lives in **`data/album.js`**:

- `meta` — titles, names, birthday dedication  
- `cover` — cover lines  
- `story.paragraphs` — Our Story bilingual text  
- `ui` — button / chrome labels  
- `chapters` — album structure  

Switch language in the top-right **中文 / EN** toggle (preference is saved in the browser).

---

## Features / 功能

- Cover → Our Story → flipable album (buttons + swipe + arrow keys)
- Click a frame to enlarge (lightbox)
- Warm blush / cream / soft rose palette, paper-keepsake feel
- English: Cormorant Garamond Italic · Chinese: Ma Shan Zheng (行楷风格)
- Mobile-friendly

---

## File tree / 文件结构

```
for-claire/
├── index.html
├── README.md
├── css/styles.css
├── js/config.js      ← base path for deploy
├── js/app.js
├── data/album.js     ← all content (edit me)
└── photos/           ← put images here
    └── README.md
```

---

以温柔，纪念四百多天。  
With tenderness — for four hundred days and counting.


---

## Site password / 网站密码

The album opens behind a password gate (`js/config.js` → `sitePasswordHash`).

当前密码（私下发给秋然）：`0922claire`

Browser keeps unlock in `sessionStorage` for the tab session.
这是前端门禁，能挡住随手打开的人；源码里仍可能被有心人绕过。更强保护可在 Cloudflare 再加一层。
