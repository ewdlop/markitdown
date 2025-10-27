# MarkItDown 靜態網站

這是一個基於瀏覽器的靜態網站應用程式，可將各種文件格式轉換為 Markdown。它使用 [Pyodide](https://pyodide.org) 在瀏覽器中運行 Python 代碼，完全不需要後端伺服器。

## ✨ 功能特點

- 🌐 **完全靜態** - 無需後端伺服器，可直接在瀏覽器中運行
- 📁 **支援多種格式** - 支援 PDF、Word、PowerPoint、Excel、圖片、HTML、CSV、JSON、XML 等
- 🎨 **現代化界面** - 美觀且易於使用的用戶界面
- 📥 **拖放上傳** - 支援拖放文件或點擊選擇
- 💾 **下載/複製** - 可下載轉換後的 Markdown 文件或複製到剪貼簿
- 🔒 **隱私保護** - 所有處理都在本地瀏覽器中完成，文件不會上傳到服務器

## 📋 支援的文件格式

### 完整支援（文本格式）
- ✅ 純文本文件 (.txt)
- ✅ Markdown 文件 (.md)
- ✅ HTML 文件 (.html, .htm)
- ✅ CSV 文件 (.csv)
- ✅ JSON 文件 (.json)
- ✅ XML 文件 (.xml)

### 部分支援（需要完整 Python 環境）
由於瀏覽器環境的限制，以下格式需要使用完整的 MarkItDown CLI 或 Python API：
- ⚠️ PDF 文件 (.pdf)
- ⚠️ Word 文件 (.docx)
- ⚠️ PowerPoint 文件 (.pptx)
- ⚠️ Excel 文件 (.xlsx, .xls)
- ⚠️ 圖片文件 (.jpg, .png, .gif)
- ⚠️ 音頻文件 (.mp3, .wav, .m4a)
- ⚠️ EPUB 電子書 (.epub)
- ⚠️ ZIP 壓縮檔 (.zip)
- ⚠️ Outlook 郵件 (.msg)

## 🚀 使用方法

### 方法 1：直接在瀏覽器中打開

1. 下載或克隆此專案：
```bash
git clone https://github.com/microsoft/markitdown.git
cd markitdown/website
```

2. 直接在瀏覽器中打開 `index.html` 文件，或使用任何 HTTP 伺服器：

使用 Python 的內建伺服器：
```bash
# Python 3
python -m http.server 8000

# 或使用 Python 2
python -m SimpleHTTPServer 8000
```

使用 Node.js 的 `http-server`：
```bash
npx http-server -p 8000
```

使用 PHP：
```bash
php -S localhost:8000
```

3. 在瀏覽器中訪問 `http://localhost:8000`

### 方法 2：部署到靜態網站託管服務

您可以將 `website` 文件夾部署到任何靜態網站託管服務：

- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Cloudflare Pages**
- **AWS S3 + CloudFront**
- **Azure Static Web Apps**

只需將 `website` 文件夾的內容上傳即可！

## 📖 使用說明

1. **選擇文件**
   - 點擊「選擇文件」按鈕，或
   - 將文件拖放到上傳區域

2. **開始轉換**
   - 點擊「開始轉換」按鈕
   - 等待轉換完成

3. **查看結果**
   - 在結果區域查看轉換後的 Markdown
   - 點擊「複製」按鈕將內容複製到剪貼簿
   - 點擊「下載」按鈕下載為 .md 文件

## ⚙️ 技術架構

### 前端技術
- **HTML5** - 結構化標記
- **CSS3** - 現代化樣式設計，包含響應式佈局
- **JavaScript (ES6+)** - 應用程式邏輯

### 核心依賴
- **Pyodide** - 在瀏覽器中運行 Python
- **MarkItDown** - Microsoft 的文件轉換庫

### 工作原理

1. 頁面載入時，從 CDN 載入 Pyodide
2. 初始化 Python 環境並安裝必要的套件
3. 用戶上傳文件後，文件在客戶端讀取為二進位數據
4. 根據文件類型，使用相應的轉換器：
   - 文本類型：使用 JavaScript 直接轉換
   - 二進位類型：顯示提示信息，建議使用完整版本
5. 顯示轉換結果，提供複製和下載功能

## 🔧 自定義與擴展

### 修改樣式
編輯 `style.css` 文件來自定義外觀：
- 修改 `:root` 中的 CSS 變數來改變配色方案
- 調整各個組件的樣式

### 添加新的轉換器
編輯 `app.js` 中的 `convertFileToMarkdown` 函數：
```javascript
async function convertFileToMarkdown(file, uint8Array) {
    const ext = file.name.split('.').pop().toLowerCase();
    
    // 添加您的自定義轉換邏輯
    if (ext === 'yourformat') {
        return convertYourFormat(uint8Array);
    }
    
    // ... 現有代碼
}
```

## 🌐 瀏覽器兼容性

- ✅ Chrome/Edge (推薦)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

**注意**：需要現代瀏覽器支援以下功能：
- ES6+ JavaScript
- WebAssembly
- File API
- Clipboard API

## 📝 限制說明

### 文件大小
由於在瀏覽器中運行，建議：
- 文本文件：< 10 MB
- 其他文件：< 5 MB

大文件可能導致瀏覽器變慢或崩潰。

### 功能限制
1. **OCR 功能**：圖片中的文字識別需要完整版本
2. **音頻轉錄**：語音轉文字需要完整版本
3. **PDF 處理**：複雜的 PDF 需要完整版本
4. **Office 文件**：Word、Excel、PowerPoint 需要完整版本

### 解決方案
對於上述限制，建議使用完整的 MarkItDown：

```bash
# 安裝 MarkItDown
pip install markitdown[all]

# 使用命令行
markitdown your-file.pdf -o output.md

# 或使用 Python API
from markitdown import MarkItDown
md = MarkItDown()
result = md.convert("your-file.pdf")
print(result.text_content)
```

## 🔗 相關連結

- [MarkItDown GitHub](https://github.com/microsoft/markitdown)
- [Pyodide 文檔](https://pyodide.org)
- [Markdown 指南](https://www.markdownguide.org/)

## 📄 授權

本項目遵循 MIT 授權條款。詳見 [LICENSE](../LICENSE) 文件。

## 🤝 貢獻

歡迎提交問題和拉取請求！請查看主專案的貢獻指南。

## ⚠️ 免責聲明

這是一個簡化版本的實現，主要用於演示和輕量級使用。對於生產環境和複雜文件處理，建議使用完整的 MarkItDown Python 庫。

---

**由 Microsoft AutoGen 團隊開發的 MarkItDown 提供支持** ❤️

