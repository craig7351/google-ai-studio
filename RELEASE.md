# Release Notes

## 2024-12-17 - 點擊圖片放大 Lightbox

### 新功能
點擊卡片圖片可開啟全螢幕懸浮視窗查看大圖：
- **全螢幕 Modal**：深色背景 + 置中大圖
- **右上角 X 按鈕**：點擊關閉
- **點擊外圍關閉**：點擊圖片外的區域即可關閉
- **圖片計數器**：多張圖片時顯示「1 / 3」
- **輪播支援**：在 Lightbox 中也可左右切換和點擊圓點跳轉

### 變更檔案
- `components/AppCard.tsx` - 加入 `isLightboxOpen` state 和 Lightbox modal UI

---

## 2024-12-17 - 卡片圖片輪播功能

### 新功能
AppCard 元件現在支援多張圖片輪播：
- **左右箭頭按鈕**：hover 卡片時顯示，可切換到上/下一張圖片
- **底部圓點指示器**：顯示目前是第幾張圖片，可點擊直接跳轉
- 只有多張圖片的卡片才會顯示這些控制項

### 變更檔案
- `components/AppCard.tsx` - 加入 useState、ChevronLeft/ChevronRight icons、輪播邏輯

---

## 2024-12-17 - GitHub Pages 部署修復

### 問題
- GitHub Pages 顯示黑畫面
- 瀏覽器錯誤：`GET https://craig7351.github.io/index.tsx net::ERR_ABORTED 404 (Not Found)`

### 根本原因
GitHub Pages 的 **Source 設定錯誤**：
- ❌ 錯誤設定：Deploy from a branch（從 `main` 分支部署）
- ✅ 正確設定：GitHub Actions

由於專案使用 Vite + React + TypeScript，瀏覽器無法直接執行 `.tsx` 檔案，必須先透過 `npm run build` 編譯成 JavaScript。

### 解決方案
1. 前往 **https://github.com/craig7351/google-ai-studio/settings/pages**
2. 在 **Build and deployment > Source** 區塊
3. 將設定從 `Deploy from a branch` 改為 **GitHub Actions**
4. 儲存設定
5. 重新觸發 GitHub Actions workflow（push 一個小改動或手動重新執行）

### 技術說明
| Source 設定 | 部署內容 | 結果 |
|------------|---------|------|
| Deploy from a branch | 原始 `index.html`（引用 `/index.tsx`）| 404 錯誤 |
| GitHub Actions | `dist/` 目錄（包含編譯後的 JS）| 正常運作 |

專案已有正確的 GitHub Actions workflow (`.github/workflows/deploy.yml`)，會執行：
1. `npm ci` - 安裝相依套件
2. `npm run build` - 編譯專案到 `dist/` 目錄
3. 部署 `dist/` 目錄到 GitHub Pages
