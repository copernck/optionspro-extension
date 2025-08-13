class OptionsProDashboard {
    constructor() {
        this.payoffChart = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialData();
    }

    setupEventListeners() {
        // Sidebar navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Strategy selector
        document.getElementById('strategySelect').addEventListener('change', (e) => {
            this.updateStrategyDetails(e.target.value);
        });

        // Calculator inputs
        const calcInputs = ['stockPrice', 'strikePrice', 'daysToExpiry', 'volatility', 'interestRate'];
        calcInputs.forEach(id => {
            document.getElementById(id).addEventListener('input', () => this.calculateGreeks());
        });
    }

    switchTab(tabId) {
        // Update nav items
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`.nav-item[data-tab="${tabId}"]`).classList.add('active');

        // Update content panels
        document.querySelectorAll('.content-panel').forEach(panel => panel.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    }

    async loadInitialData() {
        // Populate strategy selector
        const strategies = await this.sendMessage({ action: 'getAllStrategies' });
        const select = document.getElementById('strategySelect');
        for (const id in strategies) {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = strategies[id].name;
            select.appendChild(option);
        }

        // Load the first strategy
        this.updateStrategyDetails(select.value);

        // Initial greek calculation
        this.calculateGreeks();
    }

    async updateStrategyDetails(strategyId) {
        const strategy = await this.sendMessage({ action: 'getStrategy', strategyId });
        if (!strategy) return;

        document.getElementById('strategyName').textContent = strategy.name;
        document.getElementById('strategyDifficulty').textContent = strategy.difficulty;
        document.getElementById('strategyDescription').textContent = strategy.description;
        document.getElementById('marketOutlook').textContent = strategy.marketOutlook;
        document.getElementById('maxProfit').textContent = strategy.maxProfit;
        document.getElementById('maxLoss').textContent = strategy.maxLoss;

        const setupStepsEl = document.getElementById('setupSteps');
        setupStepsEl.innerHTML = '';
        strategy.setup.forEach(step => {
            const div = document.createElement('div');
            div.className = 'step';
            div.textContent = `• ${step}`;
            setupStepsEl.appendChild(div);
        });

        this.generatePayoffChart(strategy.payoffType);
    }

    async calculateGreeks() {
        const params = {
            stockPrice: parseFloat(document.getElementById('stockPrice').value),
            strikePrice: parseFloat(document.getElementById('strikePrice').value),
            daysToExpiry: parseInt(document.getElementById('daysToExpiry').value),
            volatility: parseFloat(document.getElementById('volatility').value),
            interestRate: parseFloat(document.getElementById('interestRate').value),
            optionPrice: 0 // Not needed for greeks, but good practice
        };

        const greeks = await this.sendMessage({ action: 'calculateOption', params });
        if (!greeks) return;

        document.getElementById('delta').textContent = greeks.delta;
        document.getElementById('gamma').textContent = greeks.gamma;
        document.getElementById('theta').textContent = greeks.theta;
        document.getElementById('vega').textContent = greeks.vega;
        document.getElementById('intrinsicValue').textContent = `$${greeks.intrinsic}`;
        document.getElementById('timeValue').textContent = `$${greeks.timeValue}`;
    }
    
    generatePayoffChart(strategyType) {
        const data = this.generateMockPayoffData(strategyType);
        const labels = data.map(d => d.price);
        const values = data.map(d => d.payoff);

        const ctx = document.getElementById('payoffChart').getContext('2d');

        if (this.payoffChart) {
            this.payoffChart.destroy();
        }

        this.payoffChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Profit / Loss',
                    data: values,
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    borderWidth: 2,
                    tension: 0.1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        title: { display: true, text: 'Profit / Loss ($)' }
                    },
                    x: {
                        title: { display: true, text: 'Underlying Price at Expiration ($)' }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    generateMockPayoffData(strategyType) {
        const data = [];
        const stockPrice = 100;
        const strikePrice = 105;
        const premium = 2.5;

        for (let price = stockPrice * 0.8; price <= stockPrice * 1.2; price += 2) {
            let payoff = 0;
            switch (strategyType) {
                case 'covered-call':
                    payoff = (price - stockPrice) + Math.min(premium, strikePrice - price);
                    break;
                case 'protective-put':
                    payoff = (price - stockPrice) + Math.max(0, strikePrice - price) - premium;
                    break;
                case 'straddle':
                     payoff = Math.max(0, price - strikePrice) + Math.max(0, strikePrice - price) - (premium * 2);
                    break;
                default: // long call
                    payoff = Math.max(0, price - strikePrice) - premium;
            }
            data.push({ price: price.toFixed(2), payoff: payoff.toFixed(2) });
        }
        return data;
    }

    sendMessage(message) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(message, response => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(response);
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new OptionsProDashboard();
});

