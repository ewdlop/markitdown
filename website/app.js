// Global variables
let pyodide = null;
let selectedFiles = [];
let isConverting = false;

// DOM elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const statusSection = document.getElementById('statusSection');
const statusMessage = document.getElementById('statusMessage');
const statusText = document.getElementById('statusText');
const filesSection = document.getElementById('filesSection');
const filesList = document.getElementById('filesList');
const convertBtn = document.getElementById('convertBtn');
const resultsSection = document.getElementById('resultsSection');
const resultsList = document.getElementById('resultsList');

// Initialize Pyodide
async function initPyodide() {
    try {
        updateStatus('正在載入 Python 環境...', 'loading');
        pyodide = await loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
        });
        
        updateStatus('正在安裝 MarkItDown 套件...', 'loading');
        
        // Install micropip first
        await pyodide.loadPackage('micropip');
        const micropip = pyodide.pyimport('micropip');
        
        // Install markitdown and dependencies
        // Note: Some dependencies might not be available in Pyodide
        // We'll install what we can and handle gracefully
        try {
            await micropip.install('markitdown');
        } catch (e) {
            console.warn('無法安裝完整的 markitdown，嘗試基本安裝...', e);
            // Try installing basic dependencies
            await micropip.install(['beautifulsoup4', 'requests', 'charset-normalizer']);
        }
        
        updateStatus('✅ 環境已就緒！請選擇文件開始轉換', 'success');
        hideStatusAfterDelay();
        
    } catch (error) {
        console.error('初始化失敗:', error);
        updateStatus(`❌ 初始化失敗: ${error.message}`, 'error');
    }
}

// Update status message
function updateStatus(text, type = 'loading') {
    statusText.textContent = text;
    statusMessage.className = `status-message ${type}`;
    
    if (type === 'loading') {
        statusMessage.innerHTML = `
            <div class="loading-spinner"></div>
            <span id="statusText">${text}</span>
        `;
    } else if (type === 'success') {
        statusMessage.innerHTML = `
            <span>✅</span>
            <span id="statusText">${text}</span>
        `;
    } else if (type === 'error') {
        statusMessage.innerHTML = `
            <span>❌</span>
            <span id="statusText">${text}</span>
        `;
    }
    
    statusSection.style.display = 'block';
}

function hideStatusAfterDelay() {
    setTimeout(() => {
        statusSection.style.display = 'none';
    }, 3000);
}

// File handling
function handleFiles(files) {
    selectedFiles = Array.from(files);
    displayFiles();
    filesSection.style.display = 'block';
}

function displayFiles() {
    filesList.innerHTML = '';
    
    selectedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const ext = file.name.split('.').pop().toUpperCase();
        const size = formatFileSize(file.size);
        
        fileItem.innerHTML = `
            <div class="file-info">
                <div class="file-icon">${ext}</div>
                <div class="file-details">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${size}</div>
                </div>
            </div>
            <button class="remove-file" onclick="removeFile(${index})" title="移除">
                ✕
            </button>
        `;
        
        filesList.appendChild(fileItem);
    });
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    displayFiles();
    
    if (selectedFiles.length === 0) {
        filesSection.style.display = 'none';
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Convert files
async function convertFiles() {
    if (isConverting || selectedFiles.length === 0) return;
    
    isConverting = true;
    convertBtn.disabled = true;
    resultsSection.style.display = 'none';
    resultsList.innerHTML = '';
    
    updateStatus(`正在轉換 ${selectedFiles.length} 個文件...`, 'loading');
    
    const results = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        
        try {
            updateStatus(`正在轉換 ${i + 1}/${selectedFiles.length}: ${file.name}...`, 'loading');
            
            // Read file as array buffer
            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            
            // Create a simple converter based on file type
            let markdown = await convertFileToMarkdown(file, uint8Array);
            
            results.push({
                fileName: file.name,
                markdown: markdown,
                success: true
            });
            
        } catch (error) {
            console.error(`轉換失敗 ${file.name}:`, error);
            results.push({
                fileName: file.name,
                error: error.message,
                success: false
            });
        }
    }
    
    displayResults(results);
    updateStatus('✅ 轉換完成！', 'success');
    hideStatusAfterDelay();
    
    isConverting = false;
    convertBtn.disabled = false;
}

// Convert file to markdown using simple converters
async function convertFileToMarkdown(file, uint8Array) {
    const ext = file.name.split('.').pop().toLowerCase();
    
    // For text-based files, use simple conversion
    if (['txt', 'md', 'json', 'xml', 'csv', 'html'].includes(ext)) {
        const text = new TextDecoder().decode(uint8Array);
        return convertTextFile(text, ext);
    }
    
    // For binary files, show a message
    return `# ${file.name}\n\n⚠️ 此文件格式 (.${ext}) 需要完整的 MarkItDown Python 環境才能轉換。\n\n` +
           `由於瀏覽器環境的限制，建議使用以下方法之一：\n\n` +
           `1. 使用 MarkItDown 命令行工具：\n` +
           '```bash\n' +
           `markitdown ${file.name} -o output.md\n` +
           '```\n\n' +
           `2. 使用 Python API：\n` +
           '```python\n' +
           'from markitdown import MarkItDown\n' +
           'md = MarkItDown()\n' +
           `result = md.convert("${file.name}")\n` +
           'print(result.text_content)\n' +
           '```\n\n' +
           `文件大小: ${formatFileSize(file.size)}\n` +
           `文件類型: .${ext}`;
}

function convertTextFile(text, ext) {
    switch (ext) {
        case 'txt':
        case 'md':
            return text;
        
        case 'json':
            try {
                const json = JSON.parse(text);
                return '```json\n' + JSON.stringify(json, null, 2) + '\n```';
            } catch (e) {
                return '```json\n' + text + '\n```';
            }
        
        case 'xml':
            return '```xml\n' + text + '\n```';
        
        case 'csv':
            return convertCsvToMarkdown(text);
        
        case 'html':
            return convertHtmlToMarkdown(text);
        
        default:
            return text;
    }
}

function convertCsvToMarkdown(csv) {
    const lines = csv.split('\n').filter(line => line.trim());
    if (lines.length === 0) return '';
    
    const rows = lines.map(line => {
        // Simple CSV parsing (doesn't handle complex cases)
        return line.split(',').map(cell => cell.trim());
    });
    
    let markdown = '| ' + rows[0].join(' | ') + ' |\n';
    markdown += '| ' + rows[0].map(() => '---').join(' | ') + ' |\n';
    
    for (let i = 1; i < rows.length; i++) {
        markdown += '| ' + rows[i].join(' | ') + ' |\n';
    }
    
    return markdown;
}

function convertHtmlToMarkdown(html) {
    // Very basic HTML to Markdown conversion
    let markdown = html;
    
    // Remove scripts and styles
    markdown = markdown.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    markdown = markdown.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    
    // Headers
    markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n');
    markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n');
    markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n');
    markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n');
    markdown = markdown.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n');
    markdown = markdown.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n');
    
    // Paragraphs
    markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
    
    // Bold and italic
    markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
    markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
    markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
    markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
    
    // Links
    markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
    
    // Images
    markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)');
    markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, '![]($1)');
    
    // Lists
    markdown = markdown.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
    markdown = markdown.replace(/<ul[^>]*>/gi, '\n');
    markdown = markdown.replace(/<\/ul>/gi, '\n');
    markdown = markdown.replace(/<ol[^>]*>/gi, '\n');
    markdown = markdown.replace(/<\/ol>/gi, '\n');
    
    // Code
    markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
    markdown = markdown.replace(/<pre[^>]*>(.*?)<\/pre>/gi, '```\n$1\n```');
    
    // Line breaks
    markdown = markdown.replace(/<br\s*\/?>/gi, '\n');
    
    // Remove remaining HTML tags
    markdown = markdown.replace(/<[^>]*>/g, '');
    
    // Decode HTML entities
    const textarea = document.createElement('textarea');
    textarea.innerHTML = markdown;
    markdown = textarea.value;
    
    // Clean up extra whitespace
    markdown = markdown.replace(/\n{3,}/g, '\n\n');
    
    return markdown.trim();
}

// Display results
function displayResults(results) {
    resultsSection.style.display = 'block';
    resultsList.innerHTML = '';
    
    results.forEach((result, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        
        if (result.success) {
            resultItem.innerHTML = `
                <div class="result-header">
                    <div class="result-title">${result.fileName}</div>
                    <div class="result-actions">
                        <button class="action-button" onclick="copyToClipboard(${index})">
                            📋 複製
                        </button>
                        <button class="action-button secondary" onclick="downloadMarkdown(${index})">
                            💾 下載
                        </button>
                    </div>
                </div>
                <div class="result-content" id="result-${index}">${escapeHtml(result.markdown)}</div>
            `;
        } else {
            resultItem.innerHTML = `
                <div class="result-header">
                    <div class="result-title">❌ ${result.fileName}</div>
                </div>
                <div class="result-content">錯誤: ${escapeHtml(result.error)}</div>
            `;
        }
        
        resultsList.appendChild(resultItem);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

async function copyToClipboard(index) {
    const resultElement = document.getElementById(`result-${index}`);
    const text = resultElement.textContent;
    
    try {
        await navigator.clipboard.writeText(text);
        updateStatus('✅ 已複製到剪貼簿', 'success');
        hideStatusAfterDelay();
    } catch (error) {
        console.error('複製失敗:', error);
        updateStatus('❌ 複製失敗', 'error');
        hideStatusAfterDelay();
    }
}

function downloadMarkdown(index) {
    const resultElement = document.getElementById(`result-${index}`);
    const text = resultElement.textContent;
    const fileName = selectedFiles[index].name.replace(/\.[^/.]+$/, '') + '.md';
    
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    
    updateStatus('✅ 下載完成', 'success');
    hideStatusAfterDelay();
}

// Event listeners
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFiles(e.target.files);
    }
});

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    
    if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
    }
});

convertBtn.addEventListener('click', convertFiles);

// Prevent default drag and drop on the whole page
document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());

// Initialize when page loads
window.addEventListener('load', () => {
    initPyodide();
});

