# 晤談與行程紀錄

> 115 學年度上學期 晤談、小團體、研習行程紀錄工具。
> PWA 網頁 App，可加入手機主畫面、離線使用。

🌐 **線上版本**：https://hungwei62-blip.github.io/consultation-web/

一個輕量級的純前端工具，給學校輔導老師記錄與管理一週晤談、團體諮詢、研習等行程。

---

## ✨ 特色

- 📱 **PWA 網頁 App**：可加入 iPhone / Android 主畫面，全螢幕使用
- 🔌 **離線可用**：Service Worker 快取，沒網路也能開
- 💾 **本機儲存**：資料存在瀏覽器 `localStorage`，**不上傳任何雲端**
- 📤 **完整備份**：JSON / CSV 匯出，一鍵還原
- 🎨 **三類紀錄**：晤談（藍）、小團體（綠）、研習（橘）
- 🔁 **連續重複**：填一格可一次填滿未來 N 週同節次
- 🔍 **對象搜尋**：依班級、姓名、會議名稱快速找紀錄

---

## 📱 在手機上使用

1. 用 Safari / Chrome 開 [線上版本](https://hungwei62-blip.github.io/consultation-web/)
2. **加入主畫面**：
   - **iPhone**（Safari）：分享 → 「加入主畫面」
   - **Android**（Chrome）：自動跳出安裝橫幅，或從選單 → 「安裝應用程式」
3. 從主畫面圖示開啟，就像原生 App 一樣全螢幕、沒有網址列

開過一次後，**即使沒網路也能開啟**（Service Worker 已快取頁面）。

---

## 💾 備份與還原

App 內有完整的備份機制（滑到「本學期累計」那塊）：

| 按鈕 | 功能 |
|---|---|
| **顯示 CSV** | 複製成 Excel 可貼上的格式（Tab 分欄） |
| **顯示備份碼** | 複製一份 JSON，貼到別台裝置還原 |
| **下載備份檔** | 下載完整 JSON 備份檔（建議存到雲端硬碟） |
| **選取備份檔還原** | 從 JSON 檔案還原 |
| **從下面的框還原** | 貼上備份碼還原 |

> ⚠️ **建議每週或每月固定按一次「下載備份檔」**，存到雲端硬碟或 LINE Keep。
> 清除瀏覽器資料、換手機、iOS 自動清理本機儲存……都會讓資料不見，**備份是唯一保障**。

---

## 🔒 隱私

- ✅ 所有資料只存在你的裝置 / 瀏覽器
- ✅ 沒有任何資料上傳到伺服器（連這個 repo 的擁有者都看不到）
- ⚠️ 清除瀏覽器資料 = 資料不見
- ⚠️ 換裝置、新瀏覽器 = 看不到舊資料

這個 repo 的存在只是讓 App 透過 HTTPS 跑起來（Service Worker 必須 HTTPS）。程式碼完全公開，但**不會有任何使用者資料**經過 GitHub。

---

## 🛠 技術

- **純前端**：HTML + CSS + JS，無後端、無資料庫、無第三方追蹤
- **單檔 HTML**：`index.html` 內含所有 CSS 與 JS
- **PWA**：Web App Manifest + Service Worker（cache-first）
- **儲存**：瀏覽器 `localStorage`，key 為 `counsel-schedule-115-1`
- **學期設定**：寫死於 JS — 115 學年度上學期，`START = 2026/8/31`，21 週

---

## 📂 檔案結構

```
.
├── index.html              # 主檔（單檔 HTML，CSS 與 JS 全內嵌）
├── manifest.webmanifest    # PWA manifest
├── sw.js                   # Service Worker（離線快取）
├── icons/
│   ├── icon.svg            # 原始向量圖
│   ├── icon-192.png        # PWA / Android
│   ├── icon-512.png        # PWA / Splash
│   ├── apple-touch-icon.png# iOS（180×180）
│   ├── favicon-32.png      # 瀏覽器 tab
│   └── favicon-16.png
├── README.md
└── .gitignore
```

---

## 🧑‍💻 本機開發

直接用瀏覽器開：

```bash
# Windows
start index.html
# macOS
open index.html
```

或起個本地 server（推薦，Service Worker 才能完整運作）：

```bash
npx serve .
# 或
python3 -m http.server 8000
```

然後開 `http://localhost:8000`。

> ℹ️ Service Worker 需要 HTTPS 或 localhost 才能註冊。用 `file://` 直接開啟 SW 會註冊失敗，但 App 本身仍可使用（資料照常儲存）。

---

## 🚀 部署

透過 GitHub Pages 自動部署：push 到 `main` 即生效。

```bash
git add .
git commit -m "..."
git push origin main
```

部署後約 30 秒內會在 Pages 上 rebuild 完成。

> ⚠️ **每次修改 `index.html` 後，記得把 `sw.js` 裡的 `CACHE` 版本號往上 bump 一號**（例如 `v3` → `v4`）。
> 否則手機開 App 仍會載到 Service Worker 快取的舊版（SW 沒失效）。

---

## 📝 授權

MIT License。歡迎複製、修改、自架部署。

---

## 🙏 致謝

設計與程式碼為 [hungwei62-blip](https://github.com/hungwei62-blip)，供國高中輔導老師使用。