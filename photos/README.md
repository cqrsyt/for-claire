# photos / 照片文件夹

Put your JPEG/PNG/WebP images here.

把照片（JPEG / PNG / WebP）放在这个文件夹里。

## How to use / 用法

1. Copy a file into this folder, e.g. `photos/birthday-01.jpg`
2. Open `data/album.js`
3. Set the photo’s `src` field, e.g. `src: "photos/birthday-01.jpg"`
4. Edit `captionZh` / `captionEn` and optional `noteZh` / `noteEn`

Leave `src: ""` (or omit `src`) to keep the elegant empty placeholder frame.

将 `src` 留空即可继续显示优雅的占位框。

## Tips / 提示

- Prefer landscape ~4:3 for the album frames.
- Keep file sizes reasonable (e.g. under ~800KB) for mobile.
- Paths are relative to the site root (`photos/...`), not absolute URLs.


> Note: the first photos are currently embedded as data URIs in `data/album.js` for easy GitHub deploy. You can later switch `src` back to `photos/...` paths and keep the JPG files here.
