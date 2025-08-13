// OptionsPro Content Script
// Handles page-level interactions and content injection for options trading

class OptionsProContent {
    constructor() {
        this.enabled = true;
        this.financialTerms = [
            'call option', 'put option', 'strike price', 'expiration', 'premium',
            'delta', 'gamma', 'theta', 'vega', 'rho', 'intrinsic value', 'time value',
            'itm', 'otm', 'atm', 'implied volatility', 'options chain', 'greeks'
        ];
        
        this.init();
    }

    init() {
        console.log('OptionsPro content script initialized');
        
        // Set up message listeners
        this.setupMessageListeners();
        
        // Check if we should enable features on this page
        this.checkPageCompatibility();
        
        // Initialize page features
        this.initializeFeatures();
    }

    setupMessageListeners() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            switch (request.action) {
                case 'highlightTerms':
                    this.highlightOptionsTerms(request.terms);
                    sendResponse({ success: true });
                    break;
                
                case 'removeHighlights':
                    this.removeHighlights();
                    sendResponse({ success: true });
                    break;
                
                case 'injectWidget':
                    this.injectOptionsWidget(request.data);
                    sendResponse({ success: true });
                    break;
                
                case 'removeWidget':
                    this.removeWidget();
                    sendResponse({ success: true });
                    break;
                
                case 'getPageData':
                    const pageData = this.extractOptionsData();
                    sendResponse(pageData);
                    break;
                
                case 'getStockPrice':
                    const stockPrice = this.extractStockPrice();
                    sendResponse({ stockPrice });
                    break;
                
                default:
                    sendResponse({ error: 'Unknown action' });
            }
        });
    }

    checkPageCompatibility() {
        const url = window.location.href;
        
        // Enable features on financial sites
        const compatibleSites = [
            'finance.yahoo.com',
            'bloomberg.com',
            'marketwatch.com',
            'cnbc.com',
            'reuters.com',
            'wsj.com',
            'seekingalpha.com',
            'optionstrat.com',
            'thinkorswim.com',
            'tdameritrade.com',
            'schwab.com',
            ' fidelity.com'
        ];

        this.enabled = compatibleSites.some(site => url.includes(site));
        
        if (this.enabled) {
            console.log('OptionsPro features enabled for this page');
        }
    }

    initializeFeatures() {
        if (!this.enabled) return;

        // Add context menu for options terms
        this.addContextMenuFeatures();
        
        // Monitor for options-related content
        this.monitorOptionsContent();
        
        // Add page-level enhancements
        this.enhanceOptionsPages();
    }

    addContextMenuFeatures() {
        // Add right-click context menu for options terms
        document.addEventListener('contextmenu', (e) => {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();
            
            if (this.isOptionsTerm(selectedText)) {
                // Store selected term for potential use
                this.lastSelectedTerm = selectedText;
            }
        });
    }

    monitorOptionsContent() {
        // Monitor page for options terms and data
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.TEXT_NODE) {
                            this.checkTextNode(node);
                        } else if (node.nodeType === Node.ELEMENT_NODE) {
                            this.checkElementNode(node);
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });

        this.observer = observer;
    }

    enhanceOptionsPages() {
        // Add enhancements to options trading pages
        if (this.isOptionsPage()) {
            this.addOptionsEnhancements();
        } else if (this.isStockPage()) {
            this.addStockEnhancements();
        }
    }

    isOptionsTerm(text) {
        return this.financialTerms.some(term => 
            text.toLowerCase().includes(term.toLowerCase())
        );
    }

    checkTextNode(node) {
        const text = node.textContent;
        if (this.isOptionsTerm(text)) {
            this.highlightOptionsTerm(node);
        }
    }

    checkElementNode(element) {
        const text = element.textContent;
        if (this.isOptionsTerm(text)) {
            this.highlightOptionsTerm(element);
        }
    }

    highlightOptionsTerm(node) {
        // Simple highlighting for options terms
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            const highlightedText = this.wrapOptionsTerms(text);
            
            if (highlightedText !== text) {
                const wrapper = document.createElement('span');
                wrapper.innerHTML = highlightedText;
                node.parentNode.replaceChild(wrapper, node);
            }
        }
    }

    wrapOptionsTerms(text) {
        const terms = [
            { term: 'call option', class: 'call-term' },
            { term: 'put option', class: 'put-term' },
            { term: 'strike price', class: 'strike-term' },
            { term: 'expiration', class: 'expiration-term' },
            { term: 'premium', class: 'premium-term' },
            { term: 'delta', class: 'greek-term' },
            { term: 'gamma', class: 'greek-term' },
            { term: 'theta', class: 'greek-term' },
            { term: 'vega', class: 'greek-term' },
            { term: 'rho', class: 'greek-term' }
        ];

        let result = text;
        terms.forEach(({ term, class: className }) => {
            const regex = new RegExp(`\\b${term}\\b`, 'gi');
            result = result.replace(regex, `<span class="optionspro-highlight ${className}">${term}</span>`);
        });

        return result;
    }

    highlightOptionsTerms(terms) {
        // Remove existing highlights
        this.removeHighlights();

        // Add new highlights
        terms.forEach(term => {
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );

            const textNodes = [];
            let node;
            while (node = walker.nextNode()) {
                textNodes.push(node);
            }

            textNodes.forEach(textNode => {
                const text = textNode.textContent;
                if (text.toLowerCase().includes(term.toLowerCase())) {
                    this.highlightTerm(textNode, term);
                }
            });
        });
    }

    highlightTerm(textNode, term) {
        const text = textNode.textContent;
        const regex = new RegExp(`(${term})`, 'gi');
        const parts = text.split(regex);

        if (parts.length > 1) {
            const fragment = document.createDocumentFragment();
            parts.forEach(part => {
                if (part.toLowerCase() === term.toLowerCase()) {
                    const span = document.createElement('span');
                    span.className = 'optionspro-highlight';
                    span.style.backgroundColor = '#dbeafe';
                    span.style.padding = '2px 4px';
                    span.style.borderRadius = '3px';
                    span.style.cursor = 'pointer';
                    span.style.borderBottom = '2px solid #3b82f6';
                    span.title = `Click for info about ${part}`;
                    span.addEventListener('click', () => {
                        this.showTermInfo(part);
                    });
                    fragment.appendChild(span);
                } else {
                    fragment.appendChild(document.createTextNode(part));
                }
            });

            textNode.parentNode.replaceChild(fragment, textNode);
            this.highlights.push(fragment);
        }
    }

    removeHighlights() {
        this.highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            if (parent) {
                while (highlight.firstChild) {
                    parent.insertBefore(highlight.firstChild, highlight);
                }
                parent.removeChild(highlight);
            }
        });
        this.highlights = [];
    }

    showTermInfo(term) {
        // Show information about the options term
        const termInfo = this.getTermInfo(term);
        
        // Create and show tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'optionspro-tooltip';
        tooltip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            max-width: 300px;
            color: #1f2937;
        `;

        tooltip.innerHTML = `
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px;">${term}</h3>
            <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">${termInfo.description}</p>
            <button style="
                margin-top: 12px;
                padding: 6px 12px;
                background: #3b82f6;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
            ">Close</button>
        `;

        document.body.appendChild(tooltip);

        // Close button functionality
        tooltip.querySelector('button').addEventListener('click', () => {
            document.body.removeChild(tooltip);
        });

        // Close on outside click
        setTimeout(() => {
            document.addEventListener('click', function closeTooltip(e) {
                if (!tooltip.contains(e.target)) {
                    document.body.removeChild(tooltip);
                    document.removeEventListener('click', closeTooltip);
                }
            });
        }, 100);
    }

    getTermInfo(term) {
        const termDatabase = {
            'call option': {
                description: 'A call option gives the holder the right to buy an underlying asset at a specified price within a specific time period.'
            },
            'put option': {
                description: 'A put option gives the holder the right to sell an underlying asset at a specified price within a specific time period.'
            },
            'strike price': {
                description: 'The price at which the holder of an option can buy (call) or sell (put) the underlying asset.'
            },
            'expiration': {
                description: 'The date on which an option contract expires and becomes void.'
            },
            'premium': {
                description: 'The price paid by the option buyer to the option seller for the rights granted by the option contract.'
            },
            'delta': {
                description: 'The rate of change of option price with respect to changes in the underlying asset price.'
            },
            'gamma': {
                description: 'The rate of change of delta with respect to changes in the underlying asset price.'
            },
            'theta': {
                description: 'The rate of change of option price with respect to time (time decay).'
            },
            'vega': {
                description: 'The rate of change of option price with respect to changes in volatility.'
            },
            'rho': {
                description: 'The rate of change of option price with respect to changes in interest rates.'
            }
        };

        return termDatabase[term.toLowerCase()] || { 
            description: 'An options trading term related to derivatives and financial markets.' 
        };
    }

    injectOptionsWidget(data) {
        // Inject an options widget into the current page
        const widgetContainer = document.createElement('div');
        widgetContainer.id = 'optionspro-widget';
        widgetContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 280px;
            background: white;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            font-family: Inter, sans-serif;
            color: #1f2937;
        `;

        widgetContainer.innerHTML = `
            <div style="padding: 12px; border-bottom: 1px solid #e5e7eb; background: #f8fafc;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; color: #1f2937; font-size: 14px;">OptionsPro Widget</h3>
                    <button id="close-widget" style="background: none; border: none; font-size: 16px; cursor: pointer; color: #6b7280;">×</button>
                </div>
            </div>
            <div style="padding: 12px;">
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">Quick Options Analysis</p>
                <div style="margin-bottom: 8px; padding: 6px; background: #f9fafb; border-radius: 4px;">
                    <div style="font-size: 11px; color: #6b7280;">Stock Price</div>
                    <div style="font-size: 14px; font-weight: bold; color: #1f2937;" id="widget-stock-price">$100.00</div>
                </div>
                <div style="margin-bottom: 8px; padding: 6px; background: #f9fafb; border-radius: 4px;">
                    <div style="font-size: 11px; color: #6b7280;">Recommended Strategy</div>
                    <div style="font-size: 12px; font-weight: bold; color: #3b82f6;">Covered Call</div>
                </div>
                <button style="
                    width: 100%;
                    padding: 6px;
                    background: #3b82f6;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 11px;
                    margin-top: 8px;
                " id="analyze-btn">Analyze Full Strategy</button>
            </div>
        `;

        document.body.appendChild(widgetContainer);

        // Close button functionality
        widgetContainer.querySelector('#close-widget').addEventListener('click', () => {
            document.body.removeChild(widgetContainer);
        });

        // Analyze button functionality
        widgetContainer.querySelector('#analyze-btn').addEventListener('click', () => {
            this.showStrategyAnalysis();
        });

        // Try to extract stock price
        this.extractStockPrice().then(price => {
            if (price) {
                const priceElement = widgetContainer.querySelector('#widget-stock-price');
                if (priceElement) {
                    priceElement.textContent = `$${price}`;
                }
            }
        });
    }

    removeWidget() {
        const widget = document.getElementById('optionspro-widget');
        if (widget) {
            document.body.removeChild(widget);
        }
    }

    async extractStockPrice() {
        // Try to extract stock price from the page
        const priceSelectors = [
            '[data-symbol] [data-field="regularMarketPrice"]',
            '[data-test="qsp-price"]',
            '.price',
            '.stock-price',
            '[class*="price"]'
        ];

        for (const selector of priceSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                const priceText = element.textContent;
                const priceMatch = priceText.match(/[\d,]+\.?\d*/);
                if (priceMatch) {
                    return parseFloat(priceMatch[0].replace(',', ''));
                }
            }
        }

        return null;
    }

    extractOptionsData() {
        // Extract options-related data from the current page
        const data = {
            url: window.location.href,
            title: document.title,
            optionsTerms: [],
            stockPrice: null,
            hasOptionsChain: false,
            hasGreeks: false
        };

        // Count options terms
        const text = document.body.textContent.toLowerCase();
        this.financialTerms.forEach(term => {
            if (text.includes(term)) {
                data.optionsTerms.push(term);
            }
        });

        // Check for options chain
        data.hasOptionsChain = text.includes('options chain') || text.includes('option chain');
        
        // Check for Greeks
        data.hasGreeks = ['delta', 'gamma', 'theta', 'vega', 'rho'].some(greek => text.includes(greek));

        return data;
    }

    isOptionsPage() {
        const url = window.location.href.toLowerCase();
        return url.includes('option') || url.includes('options') || url.includes('derivatives');
    }

    isStockPage() {
        const url = window.location.href.toLowerCase();
        const stockPatterns = [
            'finance.yahoo.com/quote',
            'bloomberg.com/quote',
            'marketwatch.com/investing/stock',
            'cnbc.com/quotes'
        ];
        return stockPatterns.some(pattern => url.includes(pattern));
    }

    addOptionsEnhancements() {
        // Add specific enhancements for options trading pages
        console.log('Adding options page enhancements');
        
        // Could add options chain analysis, greeks display, etc.
    }

    addStockEnhancements() {
        // Add enhancements for stock pages
        console.log('Adding stock page enhancements');
        
        // Could add options recommendations, volatility analysis, etc.
    }

    showStrategyAnalysis() {
        alert('Strategy Analysis\n\nThis would open a detailed analysis of recommended options strategies based on the current stock price, market conditions, and your risk tolerance.');
    }

    // Cleanup method
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.removeHighlights();
        this.removeWidget();
    }
}

// Initialize content script
const optionsProContent = new OptionsProContent();

// Handle page unload
window.addEventListener('beforeunload', () => {
    optionsProContent.destroy();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OptionsProContent;
}