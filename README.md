# 🎬 MultiStream — Stremio Addon

Stream movies & TV shows from **10 different servers** inside Stremio!

## Included Servers
| # | Server | Quality |
|---|--------|---------|
| 1 | 🟢 VidSrc | HD |
| 2 | 🟢 VidSrc.me | HD |
| 3 | 🟡 2Embed | HD |
| 4 | 🟠 MoviesAPI | HD |
| 5 | 🔵 Vidlink | HD |
| 6 | 🟣 VidSrc Embed | HD |
| 7 | 🟤 FlaxMovies | HD |
| 8 | ⚪ Videasy | HD |
| 9 | 🔴 111Movies | HD |
| 10 | 🟢 SuperEmbed | HD |

---

## 🚀 How to Run

### Prerequisites
- [Node.js](https://nodejs.org/) v14+
- [Stremio](https://www.stremio.com/)

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Start the addon
node index.js
```

### Install in Stremio

**Option A — Local (on your PC):**
1. Run `node index.js`
2. Open Stremio → Addons → click the 🔧 icon (top right)
3. Paste: `http://localhost:7000/manifest.json`
4. Click Install ✅

**Option B — Deploy to the web (so any device works):**

Deploy free on [Railway](https://railway.app) or [Render](https://render.com):
1. Push this folder to a GitHub repo
2. Connect the repo to Railway/Render
3. Set start command: `node index.js`
4. Use the public URL: `https://your-app.railway.app/manifest.json`

---

## 📱 Works on
- Stremio Desktop (Windows, Mac, Linux)
- Stremio Android / iOS
- Stremio Web

---

## ⚠️ Notes
- Streams open in your browser (external player) since these are embed sources
- If one server is down, just pick another from the list
- No account or subscription needed
