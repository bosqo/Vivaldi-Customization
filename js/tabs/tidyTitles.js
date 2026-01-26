// Vivaldi AI Title 
(function() {
    'use strict';

  // ========== CONFIG ==========
    const CONFIG = {
    
    // === GLM(free) ===
    BASE_URL: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    API_TOKEN: '',
    MODEL: 'glm-4.5-flash',

    // === Deepseek ===
    // BASE_URL: 'https://api.deepseek.com/v1/chat/completions',
    // API_TOKEN: '<token>',
    // MODEL: 'deepseek-chat',
    };

  // Store processed tab IDs to avoid duplicate processing
    const processedTabs = new Set();

    // Maximum size for processedTabs before cleanup
    const MAX_PROCESSED_TABS = 100;

    // URLs that cannot be accessed by extensions
    const RESTRICTED_URL_PREFIXES = [
        'chrome://',
        'chrome-extension://',
        'devtools://',
        'edge://',
        'about:',
        'vivaldi://',
        'data:',
        'javascript:',
        'file://'
    ];

    /**
     * Check if URL is restricted (cannot inject scripts)
     */
    const isRestrictedUrl = (url) => {
        if (!url) return true;
        return RESTRICTED_URL_PREFIXES.some(prefix => url.startsWith(prefix));
    };

    /**
     * Cleanup old entries from processedTabs to prevent memory leak
     */
    const cleanupProcessedTabs = () => {
        if (processedTabs.size > MAX_PROCESSED_TABS) {
            // Convert to array, keep only the last half
            const entries = Array.from(processedTabs);
            const toRemove = entries.slice(0, entries.length / 2);
            toRemove.forEach(id => processedTabs.delete(id));
            console.log(`Cleaned up ${toRemove.length} old entries from processedTabs`);
        }
    };

  // ========== UTILITY FUNCTIONS ==========

    // Get browser UI language
    const getBrowserLanguage = () => {
        return chrome.i18n.getUILanguage() || navigator.language || 'zh-CN';
    };

    // Convert language code to natural language name
    const getLanguageName = (langCode) => {
        const langMap = {
            'zh': '中文',
            'zh-CN': '简体中文',
            'zh-TW': '繁体中文',
            'en': 'English',
            'en-US': 'English',
            'en-GB': 'English',
            'ja': '日本語',
            'ja-JP': '日本語',
            'ko': '한국어',
            'ko-KR': '한국어',
            'es': 'Español',
            'fr': 'Français',
            'de': 'Deutsch',
            'ru': 'Русский',
            'pt': 'Português',
            'it': 'Italiano',
            'ar': 'العربية',
            'hi': 'हिन्दी'
        };

      // Try exact match first
        if (langMap[langCode]) {
            return langMap[langCode];
        }

        // Try matching main language code
        const mainLang = langCode.split('-')[0];
        return langMap[mainLang] || 'English';
    };

    /**
     * Call GLM API to generate an optimized title
     */
    async function generateOptimizedTitle(originalTitle, url, content) {
    // Get browser UI language
    const browserLang = getBrowserLanguage();
    const languageName = getLanguageName(browserLang);
    
    const prompt = `
你是一个专业的标签页标题优化助手。请根据提供的信息，生成一个简洁、统一、美观且高可读性的标签页标题。

**输入信息：**

* 原始标题: "${originalTitle}"
* 页面URL: "${url}"
* 页面正文摘要: "${content.substring(0, 400)}"
* 用户界面语言: "${languageName}"

**优化规则：**

1. **简洁性**：去除无意义或冗余词（如“首页”“官方”“欢迎来到”等）。

2. **可读性**：标题应短小直观，避免复杂句和多重修饰。

3. **统一性**：同类网站保持一致命名风格（如 GitHub、知乎、Medium、Bilibili）。

4. **美观性**：避免重复标点、符号或装饰性字符。

5. **信息保留**：优先保留关键信息（文章名、项目名、主题名）。

6. **保守原则**：若无可靠替代方案，返回原标题。

7. **标题提取逻辑：**

   * 若正文摘要中存在明显标题（如 H1、首句完整标题），优先使用。
   * 若正文摘要缺乏有效信息，则基于 URL 路径提取关键词（如 "/blog/css-performance-tips" → “css 性能优化”）。
   * URL 提取处理：

     * 全部小写化
     * 去除连字符、下划线、数字
     * 分词并自然化组合成短语
     * 英文标题自动首字母大写
   * 若 URL 关键词提取结果为空或无意义，则回退至 **原始标题** 提取核心短语。

     * 删除站点名、冗余副标题（如“ - 知乎”“ | GitHub”等）
     * 保留主体部分作为优化基础。

8. **网站识别逻辑：**

   * 允许根据 URL 自动识别网站类型（如 github.com → [GitHub]，zhihu.com → 知乎）。
   * 若域名不在已知列表中，则取域名首段并首字母大写作为网页标题（如 example.com → Example）。

9. **多语言命名逻辑：**

   * 若 **${languageName}** = 中文 → 输出中文标题，如 GitHub | CSS性能优化
   * 若 **${languageName}** = English → 输出英文标题，如 GitHub | CSS Optimization
   * 保持语言一致性，不混用中英文

10. **输出格式：**

网页标题|优化后的标签页标题

* “网页标题”为网站短标题或识别出的站点名；
* “优化后的标签页标题” ≤ 6个汉字或12个英文字母

11. **输出要求：**
    仅输出最终标题，不包含任何解释、标点或附加说明。

---

**示例输出：**

* 输入：

  * 原始标题: "Welcome to Google Developers - Home"
  * URL: "[https://developers.google.com/web/fundamentals/performance](https://developers.google.com/web/fundamentals/performance)"
  * 摘要: "This guide covers web performance optimization best practices..."
  * languageName: 中文
  * 输出 → Google | 网站性能优化

* 输入：

  * 原始标题: "GitHub - vercel/next.js: The React Framework"
  * URL: "[https://github.com/vercel/next.js](https://github.com/vercel/next.js)"
  * 摘要: "Next.js is a React framework for production..."
  * languageName: English
  * 输出 → GitHub | Next.js Framework

* 输入：

  * 原始标题: "ZHIHU - 如何高效学习编程？"
  * URL: "[https://www.zhihu.com/question/123456](https://www.zhihu.com/question/123456)"
  * 摘要: "本文探讨了快速学习编程的技巧与心态..."
  * languageName: 中文
  * 输出 → 知乎 | 编程学习

* 输入：

  * 原始标题: "My Blog - Post 2024/10/20/why-css-is-hard"
  * URL: "[https://example.com/2024/10/20/why-css-is-hard](https://example.com/2024/10/20/why-css-is-hard)"
  * 摘要: ""
  * languageName: English
  * 输出 → Example | Why CSS Is Hard

* 输入：

  * 原始标题: "Untitled | Example Site"
  * URL: "[https://example.com/home](https://example.com/home)"
  * 摘要: ""
  * languageName: English
  * 输出 → Example | home
`;

    // Debug: Output full prompt to console
    // console.log('=== Full prompt sent to AI ===');
    // console.log(prompt);
    // console.log('=== End of prompt ===');

    const requestBody = {
      model: CONFIG.MODEL,
      messages: [
        { role: "system", content: "你是一个专业的标签页标题优化助手。" },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 100,
      stream: false,
      thinking: { "type": "disabled" }
    };

    try {
      const response = await fetch(CONFIG.BASE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CONFIG.API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const optimizedTitle = data.choices?.[0]?.message?.content?.trim();
      
      if (optimizedTitle) {
        return optimizedTitle;
      } else {
        console.warn('AI returned empty title, keeping original');
        return originalTitle;
      }
    } catch (error) {
      console.error('GLM API call failed:', error);
      return originalTitle; // Return original title on failure
    }
  }

  /**
   * Get page body content summary
   */
  async function getPageContent(tabId, url) {
    // Skip content extraction for restricted URLs
    if (isRestrictedUrl(url)) {
      console.log(`Skipping content extraction for restricted URL: ${url}`);
      return '';
    }

    try {
      const results = await chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          const bodyText = document.body?.innerText || '';
          return bodyText.substring(0, 400);
        }
      });

      if (chrome.runtime.lastError) {
        console.warn('Unable to get page content:', chrome.runtime.lastError);
        return '';
      }

      // Results is an array of InjectionResult objects
      return results?.[0]?.result || '';
    } catch (error) {
      // Don't log error for expected permission issues
      if (!error.message?.includes('Cannot access')) {
        console.warn('Error getting page content:', error.message);
      }
      return '';
    }
  }

  /**
   * Update tab's fixedTitle property
   */
  function updateTabTitle(tabId, newTitle) {
    chrome.tabs.get(tabId, (tab) => {
      if (chrome.runtime.lastError) {
        console.error('Failed to get tab:', chrome.runtime.lastError);
        return;
      }

      let vivExtData = {};
      try {
        vivExtData = tab.vivExtData ? JSON.parse(tab.vivExtData) : {};
      } catch (e) {
        console.error('JSON parse error:', e);
      }

      // Set fixedTitle
      vivExtData.fixedTitle = newTitle;

      chrome.tabs.update(tabId, {
        vivExtData: JSON.stringify(vivExtData)
      }, () => {
        if (chrome.runtime.lastError) {
          console.error('Failed to update tab:', chrome.runtime.lastError);
        } else {
          console.log(`✓ Tab ${tabId} title optimized to: ${newTitle}`);
          processedTabs.add(tabId);
        }
      });
    });
  }

  /**
   * Process a single tab
   */
  async function processSingleTab(tabElement) {
    const tabIdStr = tabElement.getAttribute('data-id');
    if (!tabIdStr) {
      console.warn('Tab element missing data-id attribute, skipping');
      return;
    }

    const tabId = parseInt(tabIdStr.replace('tab-', ''));

    // Skip already processed tabs
    if (processedTabs.has(tabId)) {
      return;
    }

    // Periodic cleanup to prevent memory leak
    cleanupProcessedTabs();

    console.log(`Detected newly pinned tab ID: ${tabId}`);

    try {
      // Get tab information
      chrome.tabs.get(tabId, async (tab) => {
        if (chrome.runtime.lastError) {
          console.error('Failed to get tab:', chrome.runtime.lastError);
          return;
        }

        const tabUrl = tab.url || '';

        // Skip restricted URLs that can't be processed
        if (isRestrictedUrl(tabUrl)) {
          console.log(`Tab ${tabId} has restricted URL, skipping AI processing`);
          processedTabs.add(tabId);
          return;
        }

        // Check if fixedTitle is already set
        let vivExtData = {};
        try {
          vivExtData = tab.vivExtData ? JSON.parse(tab.vivExtData) : {};
        } catch (e) {
          console.error('JSON parse error:', e);
        }

        // Skip if fixedTitle already exists
        if (vivExtData.fixedTitle) {
          console.log(`Tab ${tabId} already has custom title, skipping`);
          processedTabs.add(tabId);
          return;
        }

        // Get page content (pass URL for validation)
        const content = await getPageContent(tabId, tabUrl);

        // Call AI to generate optimized title
        console.log(`Generating optimized title for tab ${tabId}...`);
        const optimizedTitle = await generateOptimizedTitle(
          tab.title || '',
          tabUrl,
          content
        );

        // Update tab title
        updateTabTitle(tabId, optimizedTitle);
      });
    } catch (error) {
      console.error(`Error processing tab ${tabId}:`, error);
    }
  }

  /**
   * Check and process pinned tabs (initialization only)
   */
  async function checkPinnedTabs() {
    // Exclude tab stacks: only select pinned tabs without .is-substack class
    const pinnedTabElements = document.querySelectorAll('.tab-position.is-pinned:not(.is-substack) .tab-wrapper');

    console.log(`Init: Detected ${pinnedTabElements.length} pinned tabs`);

    for (const tabElement of pinnedTabElements) {
      await processSingleTab(tabElement);
    }
  }

  /**
   * Listen for tab pinning events
   */
  function observePinnedTabs() {
    const tabStrip = document.querySelector('.tab-strip');
    if (!tabStrip) {
      console.warn('.tab-strip element not found, retrying later');
      setTimeout(observePinnedTabs, 1000);
      return;
    }

    // Use MutationObserver to watch for class attribute changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        // Only process class attribute changes
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;

          // Check if it's a .tab-position element
          if (!target.classList?.contains('tab-position')) {
            continue;
          }

          // Exclude tab stacks
          if (target.classList.contains('is-substack')) {
            continue;
          }

          // Check if tab just received is-pinned class
          const isPinnedNow = target.classList.contains('is-pinned');
          const wasPinnedBefore = mutation.oldValue?.includes('is-pinned') || false;

          // Only trigger when changing from unpinned to pinned
          if (isPinnedNow && !wasPinnedBefore) {
            console.log('Tab pinned detected');
            const tabWrapper = target.querySelector('.tab-wrapper');
            if (tabWrapper) {
              processSingleTab(tabWrapper);
            }
          }
        }
      }
    });

    // Observer config: watch attribute changes and record old values
    observer.observe(tabStrip, {
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
      attributeOldValue: true  // Important: record old class value
    });

    console.log('AI Tab Title Optimizer module started');

    // Initial check for already pinned tabs
    checkPinnedTabs();
  }

  // ========== MODULE STARTUP ==========
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observePinnedTabs);
  } else {
    observePinnedTabs();
  }

})();
