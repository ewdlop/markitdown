const translations = {
    zh: {
        subtitle: '將各種文件格式轉換為 Markdown',
        dropTitle: '拖放文件到這裡',
        dropOr: '或',
        chooseFile: '選擇文件',
        supportedFormats: '支援格式: PDF, Word, PowerPoint, Excel, 圖片, HTML, CSV, JSON, XML, ZIP, EPUB 等',
        filesSelectedTitle: '已選擇的文件',
        convertButton: '開始轉換',
        resultsTitle: '轉換結果',
        footerLine1: '基於 <a href="https://github.com/microsoft/markitdown" target="_blank">Microsoft MarkItDown</a> 項目',
        footerLine2: '在瀏覽器中使用 <a href="https://pyodide.org" target="_blank">Pyodide</a> 運行',
        limitationsTitle: '⚠️ Microsoft MarkItDown 靜態版限制',
        limitationsText1: '此瀏覽器版僅支援純文字與部分簡單格式。PDF、Office、圖片、音訊等進階格式需要於完整的 Microsoft MarkItDown Python/CLI 環境中執行。',
        limitationsText2: '若需完整轉換能力，請在本機安裝套件或使用命令列：markitdown your-file.pdf -o output.md',
        limitationsReasonIntro: '⚠️ AI 生成警示：以下限制說明涵蓋瀏覽器版無法支援進階格式的原因。',
        limitationsReason1: '缺乏原生依賴支援：MarkItDown 的 PDF、Office、圖片、音訊轉換需要多個 C/C++ 套件，而 Pyodide 只能載入純 Python 或 WebAssembly 套件。',
        limitationsReason2: '瀏覽器沙箱限制：靜態頁面無法呼叫系統工具或存取作業系統資源，許多高階功能因此受限。',
        limitationsReason3: '資源與效能考量：即使轉成 WebAssembly，載入體積與初始化時間也過大，且仍有功能無法完整運作。',
        status: {
            initializing: '初始化 Python 環境中...',
            loadingPython: '正在載入 Python 環境...',
            installingPackage: '正在安裝 MarkItDown 套件...',
            ready: '環境已就緒！請選擇文件開始轉換',
            initFailed: '初始化失敗: {error}',
            convertingTotal: '正在轉換 {count} 個文件...',
            convertingFile: '正在轉換 {current}/{total}: {fileName}...',
            convertDone: '轉換完成！',
            copySuccess: '已複製到剪貼簿',
            copyFail: '複製失敗',
            downloadSuccess: '下載完成'
        },
        actions: {
            copy: '📋 複製',
            download: '💾 下載'
        },
        remote: {
            title: '連線本機 MarkItDown MCP 伺服器',
            description: '啟動 <code>markitdown-mcp --http --host 127.0.0.1 --port 3001</code> 後，可透過本節設定以 AJAX 呼叫完整轉換能力。',
            proxyHint: '⚠️ 瀏覽器請求需與 MCP 伺服器同源，或透過本機代理轉送至 <code>/mcp/</code>，才能避免預檢請求 (OPTIONS) 被 405 擋下。',
            proxySummary: '如何設定簡易代理？',
            proxyOptionExpress: 'Node.js + Express + http-proxy-middleware',
            proxyOptionFastapi: 'Python + FastAPI + Uvicorn',
            toggleLabel: '使用本機 MCP 伺服器進行轉換',
            serverLabel: '伺服器位址',
            testButton: '測試連線',
            statusDisabled: '尚未啟用 MCP 伺服器',
            statusIdle: '尚未測試連線',
            statusConnecting: '正在測試 MCP 連線...',
            statusSuccess: '已成功連線至 MCP 伺服器',
            statusError: 'MCP 連線失敗：{message}'
        },
        errors: {
            errorLabel: '錯誤: ',
            unknown: '未知錯誤',
            timeout: '連線逾時',
            mcpUnavailable: '無法連線到 MCP 伺服器：{message}',
            mcpBadResponse: 'MCP 伺服器回傳未知格式，請檢查伺服器版本。',
            mcpConversionFailed: 'MCP 轉換失敗：{message}',
            mcpDisabled: '此格式需要啟用 MCP 伺服器後才能轉換。'
        },
        fallbackMessage:
            `⚠️ 此文件格式 (.{ext}) 需要完整的 MarkItDown Python 環境才能轉換。\n\n` +
            `由於瀏覽器環境的限制，建議使用以下方法之一：\n\n` +
            `1. 使用 MarkItDown 命令行工具：\n` +
            '```bash\n' +
            `markitdown {fileName} -o output.md\n` +
            '```\n\n' +
            `2. 使用 Python API：\n` +
            '```python\n' +
            'from markitdown import MarkItDown\n' +
            'md = MarkItDown()\n' +
            `result = md.convert("{fileName}")\n` +
            'print(result.text_content)\n' +
            '```\n\n' +
            `文件大小: {fileSize}\n` +
            `文件類型: .{ext}`
    },
    en: {
        subtitle: 'Convert multiple file formats to Markdown',
        dropTitle: 'Drop files here',
        dropOr: 'or',
        chooseFile: 'Select files',
        supportedFormats: 'Supported formats: PDF, Word, PowerPoint, Excel, images, HTML, CSV, JSON, XML, ZIP, EPUB and more',
        filesSelectedTitle: 'Selected files',
        convertButton: 'Start conversion',
        resultsTitle: 'Conversion results',
        footerLine1: 'Powered by <a href="https://github.com/microsoft/markitdown" target="_blank">Microsoft MarkItDown</a>',
        footerLine2: 'Runs in your browser with <a href="https://pyodide.org" target="_blank">Pyodide</a>',
        limitationsTitle: '⚠️ Microsoft MarkItDown Static Version Limitations',
        limitationsText1: 'This browser-only build supports plain text and a few lightweight formats. Advanced formats such as PDF, Office documents, images, and audio require the full Microsoft MarkItDown Python/CLI environment.',
        limitationsText2: 'For full conversion support, install the package locally or use the CLI: markitdown your-file.pdf -o output.md',
        limitationsReasonIntro: '⚠️ AI-generated warning: the explanation below outlines why the browser build cannot support advanced formats.',
        limitationsReason1: 'Lack of native dependency support: the PDF/Office/image/audio pipelines depend on multiple C/C++ libraries, while Pyodide can only load pure Python or WASM packages.',
        limitationsReason2: 'Browser sandbox constraints: static pages cannot call system tools or access OS-level resources, so many advanced features are blocked.',
        limitationsReason3: 'Resource and performance trade-offs: even with WASM, payload size and startup time would be excessive and key features would still be missing.',
        status: {
            initializing: 'Initializing Python environment...',
            loadingPython: 'Loading the Python environment...',
            installingPackage: 'Installing the MarkItDown package...',
            ready: 'Environment ready! Select files to start.',
            initFailed: 'Initialization failed: {error}',
            convertingTotal: 'Converting {count} file(s)...',
            convertingFile: 'Converting {current}/{total}: {fileName}...',
            convertDone: 'Conversion finished!',
            copySuccess: 'Copied to clipboard.',
            copyFail: 'Copy failed.',
            downloadSuccess: 'Download complete.'
        },
        actions: {
            copy: '📋 Copy',
            download: '💾 Download'
        },
        remote: {
            title: 'Connect to the local MarkItDown MCP server',
            description: 'After running <code>markitdown-mcp --http --host 127.0.0.1 --port 3001</code>, configure AJAX access below to unlock full conversion.',
            proxyHint: '⚠️ To avoid 405 responses on the preflight (OPTIONS) request, serve the UI from the same origin as the MCP server or proxy <code>/mcp/</code> locally.',
            proxySummary: 'How to configure a simple proxy?',
            proxyOptionExpress: 'Node.js + Express + http-proxy-middleware',
            proxyOptionFastapi: 'Python + FastAPI + Uvicorn',
            toggleLabel: 'Use the local MCP server for conversion',
            serverLabel: 'Server URL',
            testButton: 'Test connection',
            statusDisabled: 'MCP server disabled',
            statusIdle: 'Connection not tested yet',
            statusConnecting: 'Testing MCP connection...',
            statusSuccess: 'Connected to the MCP server successfully',
            statusError: 'MCP connection failed: {message}'
        },
        errors: {
            errorLabel: 'Error: ',
            unknown: 'Unknown error',
            timeout: 'Request timed out',
            mcpUnavailable: 'Unable to reach the MCP server: {message}',
            mcpBadResponse: 'Unexpected response returned by the MCP server. Please verify the server version.',
            mcpConversionFailed: 'MCP conversion failed: {message}',
            mcpDisabled: 'This format requires the MCP server to be enabled.'
        },
        fallbackMessage:
            `⚠️ This file format (.{ext}) requires the full MarkItDown Python environment to convert.\n\n` +
            `Because of browser limitations, please try one of the following options:\n\n` +
            `1. Use the MarkItDown CLI:\n` +
            '```bash\n' +
            `markitdown {fileName} -o output.md\n` +
            '```\n\n' +
            `2. Use the Python API:\n` +
            '```python\n' +
            'from markitdown import MarkItDown\n' +
            'md = MarkItDown()\n' +
            `result = md.convert("{fileName}")\n` +
            'print(result.text_content)\n' +
            '```\n\n' +
            `File size: {fileSize}\n` +
            `File type: .{ext}`
    }
};

const LANGUAGE_STORAGE_KEY = 'markitdown-lang';
const TEXT_EXTENSIONS = ['txt', 'md', 'json', 'xml', 'csv', 'html'];
const DEFAULT_MCP_URL = 'http://127.0.0.1:3001';
const MCP_STORAGE_KEY = 'markitdown-mcp-config';
const MCP_REQUEST_TIMEOUT_MS = 15000;
const MCP_TEST_DATA_URI = 'data:text/plain;base64,SGVsbG8sIE1hcmtJdERvd24h';
const MIME_TYPES = {
    pdf: 'application/pdf',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    doc: 'application/msword',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ppt: 'application/vnd.ms-powerpoint',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    xls: 'application/vnd.ms-excel',
    csv: 'text/csv',
    json: 'application/json',
    xml: 'application/xml',
    html: 'text/html',
    htm: 'text/html',
    txt: 'text/plain',
    md: 'text/markdown',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    bmp: 'image/bmp',
    heic: 'image/heic',
    heif: 'image/heif',
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    m4a: 'audio/m4a',
    zip: 'application/zip',
    epub: 'application/epub+zip'
};

let currentLanguage = 'zh';
let pyodide = null;
let selectedFiles = [];
let isConverting = false;
let lastStatus = { key: 'status.initializing', type: 'loading', params: {} };
let mcpConfig = { enabled: false, baseUrl: DEFAULT_MCP_URL };
let lastMcpStatus = 'disabled';

// DOM elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const statusSection = document.getElementById('statusSection');
const statusMessage = document.getElementById('statusMessage');
const filesSection = document.getElementById('filesSection');
const filesList = document.getElementById('filesList');
const convertBtn = document.getElementById('convertBtn');
const resultsSection = document.getElementById('resultsSection');
const resultsList = document.getElementById('resultsList');
const langButtons = document.querySelectorAll('.lang-button');
const mcpSection = document.getElementById('mcpSection');
const useMcpToggle = document.getElementById('useMcpToggle');
const mcpSettings = document.getElementById('mcpSettings');
const mcpServerUrlInput = document.getElementById('mcpServerUrl');
const testMcpBtn = document.getElementById('testMcpBtn');
const mcpStatus = document.getElementById('mcpStatus');

function translate(lang, key, params = {}) {
    const segments = key.split('.');
    let value = translations[lang];

    for (const segment of segments) {
        if (value && Object.prototype.hasOwnProperty.call(value, segment)) {
            value = value[segment];
        } else {
            return key;
        }
    }

    if (typeof value !== 'string') {
        return key;
    }

    return value.replace(/\{(\w+)\}/g, (_, token) => {
        if (Object.prototype.hasOwnProperty.call(params, token)) {
            return params[token];
        }
        return `{${token}}`;
    });
}

function t(key, params = {}) {
    return translate(currentLanguage, key, params);
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.dataset.i18n;
        const translation = translate(currentLanguage, key);
        if (translation !== key) {
            element.innerHTML = translation;
        }
    });
}

function setActiveLanguageButton() {
    langButtons.forEach((button) => {
        if (button.dataset.lang === currentLanguage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function refreshStatus() {
    if (!lastStatus) {
        return;
    }
    const wasHidden = statusSection.style.display === 'none';
    updateStatus(lastStatus.key, lastStatus.type, lastStatus.params);
    if (wasHidden) {
        statusSection.style.display = 'none';
    }
}

function normalizeMcpUrl(url) {
    if (!url) {
        return '';
    }
    let trimmed = url.trim();
    if (!trimmed) {
        return '';
    }
    if (!/^https?:\/\//i.test(trimmed)) {
        trimmed = `http://${trimmed}`;
    }
    return trimmed.replace(/\/+$/, '');
}

function loadMcpConfig() {
    try {
        const stored = localStorage.getItem(MCP_STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed && typeof parsed === 'object') {
                mcpConfig = {
                    enabled: !!parsed.enabled,
                    baseUrl: normalizeMcpUrl(parsed.baseUrl) || DEFAULT_MCP_URL
                };
            }
        }
    } catch (error) {
        console.warn('Unable to load MCP configuration', error);
    }
}

function saveMcpConfig() {
    try {
        localStorage.setItem(
            MCP_STORAGE_KEY,
            JSON.stringify({
                enabled: !!mcpConfig.enabled,
                baseUrl: mcpConfig.baseUrl
            })
        );
    } catch (error) {
        console.warn('Unable to persist MCP configuration', error);
    }
}

function isMcpEnabled() {
    return !!mcpConfig.enabled;
}

function getMcpBaseUrl() {
    return normalizeMcpUrl(mcpConfig.baseUrl) || DEFAULT_MCP_URL;
}

function updateMcpStatus(state = 'idle', messageKey, params = {}) {
    lastMcpStatus = state;
    if (!mcpStatus) {
        return;
    }

    mcpStatus.dataset.state = state;
    mcpStatus.classList.remove('success', 'error');

    let key = messageKey;
    switch (state) {
        case 'connecting':
            key = key || 'remote.statusConnecting';
            break;
        case 'success':
            key = key || 'remote.statusSuccess';
            mcpStatus.classList.add('success');
            break;
        case 'error':
            key = key || 'remote.statusError';
            mcpStatus.classList.add('error');
            break;
        case 'disabled':
            key = key || 'remote.statusDisabled';
            break;
        default:
            key = key || 'remote.statusIdle';
            break;
    }

    mcpStatus.textContent = t(key, params);
}

function refreshMcpStatusText() {
    if (!mcpStatus) {
        return;
    }
    const state = mcpStatus.dataset.state || (isMcpEnabled() ? 'idle' : 'disabled');
    updateMcpStatus(state);
}

function applyMcpConfigToUi() {
    if (useMcpToggle) {
        useMcpToggle.checked = isMcpEnabled();
    }

    const baseUrl = getMcpBaseUrl();
    if (mcpServerUrlInput) {
        mcpServerUrlInput.value = baseUrl;
        mcpServerUrlInput.disabled = !isMcpEnabled();
    }

    if (testMcpBtn) {
        testMcpBtn.disabled = !isMcpEnabled();
    }

    if (mcpSettings) {
        mcpSettings.classList.toggle('disabled', !isMcpEnabled());
    }

    updateMcpStatus(isMcpEnabled() ? lastMcpStatus || 'idle' : 'disabled');
}

function setMcpEnabled(enabled) {
    mcpConfig.enabled = !!enabled;
    if (!mcpConfig.enabled) {
        lastMcpStatus = 'disabled';
    } else if (lastMcpStatus === 'disabled') {
        lastMcpStatus = 'idle';
    }
    applyMcpConfigToUi();
    saveMcpConfig();
}

function setMcpBaseUrl(url) {
    const normalized = normalizeMcpUrl(url) || DEFAULT_MCP_URL;
    mcpConfig.baseUrl = normalized;
    if (mcpServerUrlInput) {
        mcpServerUrlInput.value = normalized;
    }
    saveMcpConfig();
}

function setLanguage(lang, options = {}) {
    if (!translations[lang]) {
        return;
    }

    if (lang === currentLanguage && !options.force) {
        return;
    }

    currentLanguage = lang;

    if (!options.skipSave) {
        try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
        } catch (error) {
            console.warn('Unable to store language preference', error);
        }
    }

    document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';
    setActiveLanguageButton();
    applyTranslations();
    refreshStatus();
    refreshMcpStatusText();
}

function initLanguage() {
    let initial = 'zh';
    try {
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (stored && translations[stored]) {
            initial = stored;
        } else if (!stored) {
            const browserLang = navigator.language || navigator.userLanguage;
            if (browserLang && browserLang.toLowerCase().startsWith('en')) {
                initial = 'en';
            }
        }
    } catch (error) {
        console.warn('Unable to read language preference', error);
    }

    setLanguage(initial, { skipSave: true, force: true });
}

// Initialize Pyodide
async function initPyodide() {
    try {
        updateStatus('status.loadingPython', 'loading');
        pyodide = await loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
        });

        updateStatus('status.installingPackage', 'loading');

        await pyodide.loadPackage('micropip');
        const micropip = pyodide.pyimport('micropip');

        try {
            await micropip.install('markitdown');
        } catch (error) {
            console.warn('Unable to install full markitdown package, attempting minimal dependencies...', error);
            await micropip.install(['beautifulsoup4', 'requests', 'charset-normalizer']);
        }

        updateStatus('status.ready', 'success');
        hideStatusAfterDelay();
    } catch (error) {
        console.error('Initialization failed:', error);
        updateStatus('status.initFailed', 'error', { error: error.message });
    }
}

function updateStatus(key, type = 'loading', params = {}) {
    const message = t(key, params);
    lastStatus = { key, type, params };
    statusMessage.className = `status-message ${type}`;

    if (type === 'loading') {
        statusMessage.innerHTML = `
            <div class="loading-spinner"></div>
            <span class="status-text">${message}</span>
        `;
    } else {
        const iconMap = {
            success: '✅',
            error: '❌',
            warning: '⚠️'
        };
        const icon = iconMap[type] || 'ℹ️';
        statusMessage.innerHTML = `
            <span>${icon}</span>
            <span class="status-text">${message}</span>
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
    filesSection.style.display = selectedFiles.length > 0 ? 'block' : 'none';
}

function displayFiles() {
    filesList.innerHTML = '';

    selectedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';

        const ext = file.name.includes('.') ? file.name.split('.').pop().toUpperCase() : '';
        const size = formatFileSize(file.size);

        fileItem.innerHTML = `
            <div class="file-info">
                <div class="file-icon">${ext}</div>
                <div class="file-details">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${size}</div>
                </div>
            </div>
            <button class="remove-file" onclick="removeFile(${index})" title="Remove">
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
    return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
}

// Convert files
async function convertFiles() {
    if (isConverting || selectedFiles.length === 0) return;

    isConverting = true;
    convertBtn.disabled = true;
    resultsSection.style.display = 'none';
    resultsList.innerHTML = '';

    updateStatus('status.convertingTotal', 'loading', { count: selectedFiles.length });

    const results = [];

    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];

        try {
            updateStatus('status.convertingFile', 'loading', {
                current: i + 1,
                total: selectedFiles.length,
                fileName: file.name
            });

            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            const markdown = await convertFileToMarkdown(file, uint8Array);

            results.push({
                fileName: file.name,
                markdown,
                success: true
            });
        } catch (error) {
            console.error(`Failed to convert ${file.name}:`, error);
            results.push({
                fileName: file.name,
                error: error.message,
                success: false
            });
        }
    }

    displayResults(results);
    updateStatus('status.convertDone', 'success');
    hideStatusAfterDelay();

    isConverting = false;
    convertBtn.disabled = false;
}

function safeErrorMessage(error) {
    if (!error) {
        return t('errors.unknown');
    }

    if (typeof error === 'object' && error !== null && error.name === 'AbortError') {
        return t('errors.timeout');
    }

    if (typeof error === 'string') {
        return error.trim() || t('errors.unknown');
    }

    if (error instanceof Error) {
        const msg = error.message || error.toString();
        return msg ? msg.trim() : t('errors.unknown');
    }

    if (typeof error === 'object' && error !== null && 'message' in error) {
        const msg = error.message;
        return typeof msg === 'string' && msg.trim() ? msg.trim() : t('errors.unknown');
    }

    const fallback = String(error);
    return fallback.trim() || t('errors.unknown');
}

async function fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), MCP_REQUEST_TIMEOUT_MS);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        return response;
    } finally {
        clearTimeout(timeoutId);
    }
}

function generateJsonRpcId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return `call-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

async function executeMcpTool(uri) {
    const jsonRpcRequest = {
        jsonrpc: '2.0',
        id: generateJsonRpcId(),
        method: 'tools/call',
        params: {
            name: 'convert_to_markdown',
            arguments: {
                uri
            }
        }
    };

    let response;
    try {
        response = await fetchWithTimeout(`${getMcpBaseUrl()}/mcp/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json, text/event-stream',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonRpcRequest)
        });
    } catch (error) {
        throw new Error(t('errors.mcpUnavailable', { message: safeErrorMessage(error) }));
    }

    if (!response.ok) {
        const text = await response.text().catch(() => '');
        let message = `${response.status} ${response.statusText}`;
        if (text) {
            message += ` - ${text}`;
        }
        throw new Error(message);
    }

    try {
        return await response.json();
    } catch (error) {
        throw new Error(t('errors.mcpBadResponse'));
    }
}

function extractMarkdownFromMcpPayload(payload) {
    if (payload == null) {
        return null;
    }

    if (payload.error) {
        const message = typeof payload.error.message === 'string' ? payload.error.message : t('errors.mcpConversionFailed', { message: t('errors.unknown') });
        throw new Error(message);
    }

    if (payload.result && Array.isArray(payload.result.content)) {
        const textParts = payload.result.content
            .filter((item) => item && item.type === 'text' && typeof item.text === 'string')
            .map((item) => item.text);
        if (textParts.length > 0) {
            return textParts.join('\n');
        }
    }

    if (typeof payload === 'string') {
        return payload;
    }

    if (payload.result) {
        if (typeof payload.result === 'string') {
            return payload.result;
        }
        if (payload.result.markdown && typeof payload.result.markdown === 'string') {
            return payload.result.markdown;
        }
        if (payload.result.text && typeof payload.result.text === 'string') {
            return payload.result.text;
        }
    }

    if (payload.data) {
        if (typeof payload.data === 'string') {
            return payload.data;
        }
        if (payload.data.markdown && typeof payload.data.markdown === 'string') {
            return payload.data.markdown;
        }
    }

    return null;
}

function uint8ArrayToBase64(uint8Array) {
    let binary = '';
    const { length } = uint8Array;
    for (let i = 0; i < length; i += 1) {
        binary += String.fromCharCode(uint8Array[i]);
    }
    return btoa(binary);
}

function getFileMimeType(file, ext) {
    if (file && file.type) {
        return file.type;
    }
    if (!ext) {
        return 'application/octet-stream';
    }
    return MIME_TYPES[ext.toLowerCase()] || 'application/octet-stream';
}

function buildDataUri(file, uint8Array, ext) {
    const mimeType = getFileMimeType(file, ext);
    const base64 = uint8ArrayToBase64(uint8Array);
    return `data:${mimeType};base64,${base64}`;
}

async function convertFileWithMcp(file, uint8Array, ext) {
    updateMcpStatus('connecting');
    const dataUri = buildDataUri(file, uint8Array, ext);
    const payload = await executeMcpTool(dataUri);
    const markdown = extractMarkdownFromMcpPayload(payload);
    if (typeof markdown !== 'string') {
        throw new Error(t('errors.mcpBadResponse'));
    }
    updateMcpStatus('success');
    return markdown;
}

async function performMcpConnectionTest() {
    updateMcpStatus('connecting');
    const payload = await executeMcpTool(MCP_TEST_DATA_URI);
    const markdown = extractMarkdownFromMcpPayload(payload);
    if (typeof markdown !== 'string') {
        throw new Error(t('errors.mcpBadResponse'));
    }
    updateMcpStatus('success');
    return true;
}

function initMcpIntegration() {
    loadMcpConfig();
    applyMcpConfigToUi();

    if (useMcpToggle) {
        useMcpToggle.addEventListener('change', (event) => {
            setMcpEnabled(event.target.checked);
        });
    }

    if (mcpServerUrlInput) {
        const handleUrlUpdate = () => {
            setMcpBaseUrl(mcpServerUrlInput.value);
        };
        mcpServerUrlInput.addEventListener('blur', handleUrlUpdate);
        mcpServerUrlInput.addEventListener('change', handleUrlUpdate);
        mcpServerUrlInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleUrlUpdate();
                if (isMcpEnabled()) {
                    performMcpConnectionTest().catch(() => {
                        /* handled via status */
                    });
                }
            }
        });
    }

    if (testMcpBtn) {
        testMcpBtn.addEventListener('click', async () => {
            if (!isMcpEnabled()) {
                updateMcpStatus('disabled');
                return;
            }

            if (mcpServerUrlInput) {
                setMcpBaseUrl(mcpServerUrlInput.value);
            }

            const originalDisabledState = testMcpBtn.disabled;
            testMcpBtn.disabled = true;

            try {
                await performMcpConnectionTest();
            } catch (error) {
                updateMcpStatus('error', 'remote.statusError', { message: safeErrorMessage(error) });
            } finally {
                testMcpBtn.disabled = originalDisabledState || !isMcpEnabled();
            }
        });
    }
}

async function convertFileToMarkdown(file, uint8Array) {
    const ext = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : '';
    const isTextExtension = TEXT_EXTENSIONS.includes(ext);

    if (isMcpEnabled()) {
        try {
            return await convertFileWithMcp(file, uint8Array, ext);
        } catch (error) {
            console.error(`MCP conversion failed for ${file.name}`, error);
            const message = safeErrorMessage(error);
            updateMcpStatus('error', 'remote.statusError', { message });

            if (!isTextExtension) {
                throw new Error(t('errors.mcpConversionFailed', { message }));
            }
        }
    }

    if (isTextExtension) {
        const text = new TextDecoder().decode(uint8Array);
        return convertTextFile(text, ext);
    }

    const header = `# ${file.name}\n\n`;
    const params = {
        ext,
        fileName: file.name,
        fileSize: formatFileSize(file.size)
    };
    const fallbackZh = translate('zh', 'fallbackMessage', params);
    const fallbackEn = translate('en', 'fallbackMessage', params);
    return `${header}${fallbackZh}\n\n---\n\n${fallbackEn}`;
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
            } catch (error) {
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
    const lines = csv.split('\n').filter((line) => line.trim());
    if (lines.length === 0) return '';

    const rows = lines.map((line) => line.split(',').map((cell) => cell.trim()));

    let markdown = '| ' + rows[0].join(' | ') + ' |\n';
    markdown += '| ' + rows[0].map(() => '---').join(' | ') + ' |\n';

    for (let i = 1; i < rows.length; i++) {
        markdown += '| ' + rows[i].join(' | ') + ' |\n';
    }

    return markdown;
}

function convertHtmlToMarkdown(html) {
    let markdown = html;

    markdown = markdown.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    markdown = markdown.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

    markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n');
    markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n');
    markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n');
    markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n');
    markdown = markdown.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n');
    markdown = markdown.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n');

    markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');

    markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
    markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
    markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
    markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');

    markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

    markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)');
    markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, '![]($1)');

    markdown = markdown.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
    markdown = markdown.replace(/<ul[^>]*>/gi, '\n');
    markdown = markdown.replace(/<\/ul>/gi, '\n');
    markdown = markdown.replace(/<ol[^>]*>/gi, '\n');
    markdown = markdown.replace(/<\/ol>/gi, '\n');

    markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
    markdown = markdown.replace(/<pre[^>]*>(.*?)<\/pre>/gi, '```\n$1\n```');

    markdown = markdown.replace(/<br\s*\/?>/gi, '\n');

    markdown = markdown.replace(/<[^>]*>/g, '');

    const textarea = document.createElement('textarea');
    textarea.innerHTML = markdown;
    markdown = textarea.value;

    markdown = markdown.replace(/\n{3,}/g, '\n\n');

    return markdown.trim();
}

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
                            ${t('actions.copy')}
                        </button>
                        <button class="action-button secondary" onclick="downloadMarkdown(${index})">
                            ${t('actions.download')}
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
                <div class="result-content">${t('errors.errorLabel')}${escapeHtml(result.error)}</div>
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
        updateStatus('status.copySuccess', 'success');
        hideStatusAfterDelay();
    } catch (error) {
        console.error('Copy failed:', error);
        updateStatus('status.copyFail', 'error');
        hideStatusAfterDelay();
    }
}

function downloadMarkdown(index) {
    const resultElement = document.getElementById(`result-${index}`);
    const text = resultElement.textContent;
    const fileName = selectedFiles[index].name.replace(/\.[^/.]+$/, '') + '.md';

    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);

    updateStatus('status.downloadSuccess', 'success');
    hideStatusAfterDelay();
}

// Event listeners
fileInput.addEventListener('change', (event) => {
    if (event.target.files.length > 0) {
        handleFiles(event.target.files);
    }
});

dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropZone.classList.remove('drag-over');

    if (event.dataTransfer.files.length > 0) {
        handleFiles(event.dataTransfer.files);
    }
});

convertBtn.addEventListener('click', convertFiles);

document.addEventListener('dragover', (event) => event.preventDefault());
document.addEventListener('drop', (event) => event.preventDefault());

langButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const { lang } = button.dataset;
        setLanguage(lang);
    });
});

window.addEventListener('load', () => {
    initLanguage();
    initMcpIntegration();
    initPyodide();
});

