// OptionsPro Popup Script
// Handles the popup interface and user interactions

class OptionsProPopup {
    constructor() {
        this.currentTab = 'strategies';
        this.currentStrategy = 'covered-call';
        this.settings = null;
        
        this.init();
    }

    init() {
        console.log('OptionsPro popup initialized');
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load initial data
        this.loadInitialData();
        
        // Initialize charts
        this.initCharts();
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Strategy selector
        const strategySelect = document.getElementById('strategySelect');
        if (strategySelect) {
            strategySelect.addEventListener('change', (e) => {
                this.updateStrategy(e.target.value);
            });
        }

        // Calculator inputs
        const calculateBtn = document.getElementById('calculateBtn');
        const clearBtn = document.getElementById('clearBtn');
        
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                this.calculateOptions();
            });
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearCalculator();
            });
        }

        // Real-time calculation on input change
        const calculatorInputs = ['stockPrice', 'strikePrice', 'optionPrice', 'daysToExpiry', 'volatility', 'interestRate'];
        calculatorInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', () => {
                    this.calculateOptions();
                });
            }
        });

        // Action buttons
        const refreshBtn = document.getElementById('refreshBtn');
        const expandBtn = document.getElementById('expandBtn');
        const settingsBtn = document.getElementById('settingsBtn');
        const analyzeBtn = document.getElementById('analyzeBtn');
        const compareBtn = document.getElementById('compareBtn');

        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshData();
            });
        }

        if (expandBtn) {
            expandBtn.addEventListener('click', () => {
                this.openFullView();
            });
        }

        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.openSettings();
            });
        }

        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => {
                this.analyzeCurrentStock();
            });
        }

        if (compareBtn) {
            compareBtn.addEventListener('click', () => {
                this.compareStrategies();
            });
        }

        // Education buttons
        document.querySelectorAll('.edu-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const topic = e.target.dataset.topic;
                this.showEducation(topic);
            });
        });
    }

    async loadInitialData() {
        try {
            // Load settings
            const settings = await this.sendMessage({ action: 'getSettings' });
            this.settings = settings;

            // Load initial strategy
            await this.updateStrategy(this.currentStrategy);

            // Initialize calculator with default values
            this.calculateOptions();

        } catch (error) {
            console.error('Error loading initial data:', error);
            this.showError('Failed to load data');
        }
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab panels
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        this.currentTab = tabName;

        // Refresh data when switching to specific tabs
        if (tabName === 'strategies') {
            this.updateStrategy(this.currentStrategy);
        } else if (tabName === 'calculator') {
            this.calculateOptions();
        }
    }

    async updateStrategy(strategyId) {
        try {
            this.currentStrategy = strategyId;
            
            // Get strategy data
            const strategy = await this.sendMessage({ action: 'getStrategy', strategyId });
            
            if (!strategy) return;

            // Update strategy display
            const strategyName = document.getElementById('strategyName');
            const strategyDifficulty = document.getElementById('strategyDifficulty');
            const strategyDescription = document.getElementById('strategyDescription');
            const marketOutlook = document.getElementById('marketOutlook');
            const maxProfit = document.getElementById('maxProfit');
            const maxLoss = document.getElementById('maxLoss');
            const setupSteps = document.getElementById('setupSteps');

            if (strategyName) strategyName.textContent = strategy.name;
            if (strategyDifficulty) {
                strategyDifficulty.textContent = strategy.difficulty;
                strategyDifficulty.className = `strategy-difficulty ${strategy.difficulty.toLowerCase()}`;
            }
            if (strategyDescription) strategyDescription.textContent = strategy.description;
            if (marketOutlook) marketOutlook.textContent = strategy.marketOutlook;
            if (maxProfit) maxProfit.textContent = strategy.maxProfit;
            if (maxLoss) maxLoss.textContent = strategy.maxLoss;

            if (setupSteps) {
                setupSteps.innerHTML = strategy.setup.map(step => `<div class="step">• ${step}</div>`).join('');
            }

            // Update strategy selector
            const strategySelect = document.getElementById('strategySelect');
            if (strategySelect) {
                strategySelect.value = strategyId;
            }

            // Generate payoff diagram
            this.generatePayoffDiagram(strategy);

        } catch (error) {
            console.error('Error updating strategy:', error);
        }
    }

    generatePayoffDiagram(strategy) {
        const canvas = document.getElementById('payoffChart');
        if (!canvas) return;

        // Generate payoff data
        const params = {
            stockPrice: 100,
            strikePrice: 105,
            optionPrice: 2.50,
            strategyType: strategy.payoffType
        };

        const payoffData = this.generateMockPayoffData(strategy.payoffType);
        
        // Draw the chart
        this.drawPayoffChart(canvas, payoffData);
    }

    generateMockPayoffData(strategyType) {
        const data = [];
        const minPrice = 80;
        const maxPrice = 120;
        const step = 2;

        for (let price = minPrice; price <= maxPrice; price += step) {
            let payoff = 0;

            switch (strategyType) {
                case 'covered-call':
                    // Long stock at 100 + short call at 105
                    payoff = (price - 100) + Math.max(0, Math.min(105 - price, 2.5));
                    break;
                case 'protective-put':
                    // Long stock at 100 + long put at 95
                    payoff = (price - 100) + Math.max(0, 95 - price) - 1.5;
                    break;
                case 'straddle':
                    // Long call + long put at 100
                    payoff = Math.max(0, price - 100) + Math.max(0, 100 - price) - 5;
                    break;
                case 'iron-condor':
                    // Complex strategy - simplified
                    payoff = Math.max(-2, Math.min(2, Math.abs(price - 100) - 5));
                    break;
                default:
                    payoff = Math.max(0, price - 100) - 2.5; // Simple call
            }

            data.push({ price, payoff });
        }

        return data;
    }

    drawPayoffChart(canvas, data) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw grid
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        
        // Horizontal grid lines
        for (let i = 0; i <= 4; i++) {
            const y = (height / 4) * i;
            ctx.beginPath();
            ctx.moveTo(20, y);
            ctx.lineTo(width - 10, y);
            ctx.stroke();
        }

        // Vertical grid lines
        for (let i = 0; i <= 5; i++) {
            const x = 20 + ((width - 30) / 5) * i;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        // Find min/max payoff for scaling
        const payoffs = data.map(d => d.payoff);
        const maxPayoff = Math.max(...payoffs);
        const minPayoff = Math.min(...payoffs);
        const payoffRange = maxPayoff - minPayoff;

        // Draw payoff line
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.beginPath();

        data.forEach((point, index) => {
            const x = 20 + ((width - 30) / (data.length - 1)) * index;
            const y = height - 10 - ((point.payoff - minPayoff) / payoffRange) * (height - 20);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Draw zero line
        const zeroY = height - 10 - ((0 - minPayoff) / payoffRange) * (height - 20);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(20, zeroY);
        ctx.lineTo(width - 10, zeroY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw data points
        ctx.fillStyle = '#3b82f6';
        data.forEach((point, index) => {
            const x = 20 + ((width - 30) / (data.length - 1)) * index;
            const y = height - 10 - ((point.payoff - minPayoff) / payoffRange) * (height - 20);
            
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    async calculateOptions() {
        try {
            // Get input values
            const stockPrice = parseFloat(document.getElementById('stockPrice')?.value || 100);
            const strikePrice = parseFloat(document.getElementById('strikePrice')?.value || 105);
            const optionPrice = parseFloat(document.getElementById('optionPrice')?.value || 2.50);
            const daysToExpiry = parseInt(document.getElementById('daysToExpiry')?.value || 30);
            const volatility = parseFloat(document.getElementById('volatility')?.value || 25);
            const interestRate = parseFloat(document.getElementById('interestRate')?.value || 2.0);

            // Calculate option Greeks
            const callParams = {
                stockPrice, strikePrice, optionPrice, daysToExpiry, volatility, interestRate, optionType: 'call'
            };
            
            const putParams = {
                stockPrice, strikePrice, optionPrice, daysToExpiry, volatility, interestRate, optionType: 'put'
            };

            const [callResults, putResults] = await Promise.all([
                this.sendMessage({ action: 'calculateOption', params: callParams }),
                this.sendMessage({ action: 'calculateOption', params: putParams })
            ]);

            // Determine which option type to display based on moneyness
            const isCall = stockPrice > strikePrice;
            const results = isCall ? callResults : putResults;
            const optionType = isCall ? 'call' : 'put';

            // Update results display
            this.updateCalculatorResults(results);
            
            // Calculate probabilities
            const probParams = { stockPrice, strikePrice, daysToExpiry, volatility, optionPrice, optionType };
            const probabilities = await this.sendMessage({ action: 'calculateProbability', params: probParams });
            
            this.updateProbabilityResults(probabilities);

        } catch (error) {
            console.error('Error calculating options:', error);
        }
    }

    updateCalculatorResults(results) {
        const fields = ['intrinsicValue', 'timeValue', 'delta', 'gamma', 'theta', 'vega'];
        
        fields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                element.textContent = results[field] || '0.00';
            }
        });
    }

    updateProbabilityResults(probabilities) {
        const fields = ['itmProbability', 'otmProbability', 'breakevenPrice'];
        
        fields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                const value = probabilities[field];
                element.textContent = field === 'breakevenPrice' ? `$${value}` : `${value}%`;
            }
        });
    }

    clearCalculator() {
        // Reset all calculator inputs to defaults
        document.getElementById('stockPrice').value = 100;
        document.getElementById('strikePrice').value = 105;
        document.getElementById('optionPrice').value = 2.50;
        document.getElementById('daysToExpiry').value = 30;
        document.getElementById('volatility').value = 25;
        document.getElementById('interestRate').value = 2.0;

        // Clear results
        const resultFields = ['intrinsicValue', 'timeValue', 'delta', 'gamma', 'theta', 'vega'];
        resultFields.forEach(field => {
            const element = document.getElementById(field);
            if (element) element.textContent = '0.00';
        });

        const probFields = ['itmProbability', 'otmProbability'];
        probFields.forEach(field => {
            const element = document.getElementById(field);
            if (element) element.textContent = '0%';
        });

        const breakevenElement = document.getElementById('breakevenPrice');
        if (breakevenElement) breakevenElement.textContent = '$0.00';
    }

    initCharts() {
        // Initialize any charts that need setup
        this.generatePayoffDiagram({ payoffType: 'covered-call' });
    }

    async analyzeCurrentStock() {
        try {
            // Get current tab info
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            if (tab && tab.url) {
                // Extract stock symbol from URL (simplified)
                const stockSymbol = this.extractStockSymbol(tab.url);
                
                if (stockSymbol) {
                    alert(`Analyzing ${stockSymbol} for options trading opportunities...\n\nThis would typically fetch real-time data and provide strategy recommendations based on current market conditions.`);
                } else {
                    alert('No stock symbol found on current page. Navigate to a financial website with stock information.');
                }
            }
        } catch (error) {
            console.error('Error analyzing current stock:', error);
        }
    }

    extractStockSymbol(url) {
        // Simple extraction - in production, this would be more sophisticated
        const patterns = [
            /finance\.yahoo\.com\/quote\/([A-Z]+)/,
            /bloomberg\.com\/quote\/([A-Z]+)/,
            /marketwatch\.com\/investing\/stock\/([A-Z]+)/,
            /cnbc\.com\/quotes\/([A-Z]+)/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) {
                return match[1];
            }
        }

        return null;
    }

    async compareStrategies() {
        try {
            const strategies = await this.sendMessage({ action: 'getAllStrategies' });
            const strategyList = Object.values(strategies);
            
            let comparison = 'Strategy Comparison:\n\n';
            strategyList.forEach(strategy => {
                comparison += `${strategy.name} (${strategy.difficulty})\n`;
                comparison += `  Outlook: ${strategy.marketOutlook}\n`;
                comparison += `  Max Profit: ${strategy.maxProfit}\n`;
                comparison += `  Max Loss: ${strategy.maxLoss}\n\n`;
            });
            
            alert(comparison);
        } catch (error) {
            console.error('Error comparing strategies:', error);
        }
    }

    async showEducation(topic) {
        try {
            const education = await this.sendMessage({ action: 'getEducation', topic });
            
            if (education) {
                let content = `${education.title}\n\n`;
                education.content.forEach((item, index) => {
                    content += `${index + 1}. ${item}\n`;
                });
                
                alert(content);
            }
        } catch (error) {
            console.error('Error showing education:', error);
        }
    }

    openFullView() {
        // Open the full dashboard in a new tab
        chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
    }

    openSettings() {
        // Open settings page
        chrome.runtime.openOptionsPage();
    }

    refreshData() {
        // Refresh current data
        if (this.currentTab === 'strategies') {
            this.updateStrategy(this.currentStrategy);
        } else if (this.currentTab === 'calculator') {
            this.calculateOptions();
        }
    }

    // Utility methods
    sendMessage(message) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(message, (response) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else if (response && response.error) {
                    reject(new Error(response.error));
                } else {
                    resolve(response);
                }
            });
        });
    }

    showError(message) {
        console.error('Error:', message);
        alert(message); // Simple alert for now
    }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const optionsPro = new OptionsProPopup();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OptionsProPopup;
}