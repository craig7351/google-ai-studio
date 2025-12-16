<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AI Studio App Showcase

[English](#english) | [中文](#中文)

---

<a id="english"></a>

## 🇬🇧 English

### Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

### Deployment

This app is configured to be deployed to GitHub Pages.

1. Push your code to GitHub.
2. Go to your repository **Settings** -> **Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.

### How to Submit Your App

We welcome community contributions! To add your app:

1.  **Create a JSON file** in `src/content/apps/` (e.g., `my-cool-app.json`).
    ```json
    {
      "name": "My Cool App",
      "description": "Short description properly capitalized.",
      "category": "Productivity",
      "link": "https://link-to-your-app.com",
      "images": [
         "https://example.com/screenshot.png",   // External URL
         "/apps/my-cool-app/screenshot1.png"     // OR Local path in public/apps/
      ],
      "prompt": "Optional: The prompt you used to generate this app."
    }
    ```
2.  **(Optional) Add Screenshots**:
    *   Create a folder `public/apps/<your-app-name>/`.
    *   Add your images there.
    *   Reference them in JSON as `/apps/<your-app-name>/filename.png`.

3.  **Submit a Pull Request**. No TypeScript code changes required!

### Supported Categories

When defining the `"category"` field, please use one of the following values (Case-Sensitive):

- `Games`
- `Education`
- `Productivity`
- `Social Networking`
- `Utilities`
- `Health & Fitness`
- `Entertainment`
- `Photo & Video`
- `Finance`
- `Lifestyle`

---

<a id="中文"></a>

## 🇹🇼 中文

### 本地執行

**前置需求:**  Node.js

1. 安裝相依套件:
   `npm install`
2. 啟動應用程式:
   `npm run dev`

### 部屬方法

本專案已設定好可自動部屬至 GitHub Pages。

1. 將程式碼推送 (Push) 至 GitHub。
2. 進入 Repository 的 **Settings** -> **Pages**。
3. 在 **Build and deployment** 下方，選擇 **GitHub Actions** 作為來源。

### 如何提交您的 App

我們歡迎社群貢獻！請依照以下步驟新增您的 App：

1.  在 `src/content/apps/` 目錄下 **建立一個 JSON 檔案** (例如 `my-cool-app.json`)。
    ```json
    {
      "name": "我的 App",
      "description": "簡短的描述。",
      "category": "Productivity",
      "link": "https://link-to-your-app.com",
      "images": [
         "https://example.com/screenshot.png",   // 外部圖片連結
         "/apps/my-cool-app/screenshot1.png"     // 或本地圖片 (放在 public/apps/ 下)
      ],
      "prompt": "選填: 生成此 app 所使用的 prompt"
    }
    ```
2.  **(選用) 新增截圖**:
    *   在 `public/apps/` 建立一個新資料夾，例如 `public/apps/<your-app-name>/`。
    *   將圖片放入該資料夾。
    *   在 JSON 中引用它： `/apps/<your-app-name>/filename.png`。

3.  **提交 Pull Request (MR)**。無需修改任何 TypeScript 程式碼！

### 支援的分類 (Categories)

填寫 `category` 欄位時，請使用以下數值 (大小寫需一致)：

- `Games` (遊戲)
- `Education` (教育)
- `Productivity` (生產力)
- `Social Networking` (社交)
- `Utilities` (工具)
- `Health & Fitness` (健康)
- `Entertainment` (娛樂)
- `Photo & Video` (影音)
- `Finance` (財經)
- `Lifestyle` (生活)
