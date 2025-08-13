// OptionsPro Background Script
// Handles options strategy calculations and educational content

class OptionsProBackground {
    constructor() {
        this.strategies = {
            'covered-call': {
                name: 'Covered Call',
                difficulty: 'Beginner',
                description: 'A covered call involves holding a long position in a stock and selling call options on the same stock to generate income.',
                marketOutlook: 'Neutral to Bullish',
                maxProfit: 'Limited',
                maxLoss: 'Significant',
                setup: [
                    'Buy 100 shares of stock',
                    'Sell 1 call option (usually OTM)',
                    'Collect premium from option sale'
                ],
                payoffType: 'covered-call'
            },
            'protective-put': {
                name: 'Protective Put',
                difficulty: 'Beginner',
                description: 'A protective put involves buying a put option to hedge against potential losses in a long stock position.',
                marketOutlook: 'Bullish with Protection',
                maxProfit: 'Unlimited',
                maxLoss: 'Limited',
                setup: [
                    'Buy 100 shares of stock',
                    'Buy 1 put option (usually ATM or OTM)',
                    'Pay premium for put protection'
                ],
                payoffType: 'protective-put'
            },
            'straddle': {
                name: 'Straddle',
                difficulty: 'Intermediate',
                description: 'A straddle involves buying both a call and a put option with the same strike price and expiration date.',
                marketOutlook: 'Volatile',
                maxProfit: 'Unlimited',
                maxLoss: 'Limited to Premium',
                setup: [
                    'Buy 1 call option',
                    'Buy 1 put option',
                    'Same strike price and expiration'
                ],
                payoffType: 'straddle'
            },
            'strangle': {
                name: 'Strangle',
                difficulty: 'Intermediate',
                description: 'A strangle involves buying a call and a put option with different strike prices but same expiration.',
                marketOutlook: 'Volatile',
                maxProfit: 'Unlimited',
                maxLoss: 'Limited to Premium',
                setup: [
                    'Buy 1 OTM call option',
                    'Buy 1 OTM put option',
                    'Same expiration date'
                ],
                payoffType: 'strangle'
            },
            'iron-condor': {
                name: 'Iron Condor',
                difficulty: 'Advanced',
                description: 'An iron condor combines a bull put spread and a bear call spread to profit from low volatility.',
                marketOutlook: 'Neutral',
                maxProfit: 'Limited',
                maxLoss: 'Limited',
                setup: [
                    'Sell 1 OTM put option',
                    'Buy 1 further OTM put option',
                    'Sell 1 OTM call option',
                    'Buy 1 further OTM call option'
                ],
                payoffType: 'iron-condor'
            },
            'butterfly': {
                name: 'Butterfly Spread',
                difficulty: 'Advanced',
                description: 'A butterfly spread uses three strike prices to profit from minimal price movement.',
                marketOutlook: 'Neutral',
                maxProfit: 'Limited',
                maxLoss: 'Limited',
                setup: [
                    'Buy 1 ITM option',
                    'Sell 2 ATM options',
                    'Buy 1 OTM option'
                ],
                payoffType: 'butterfly'
            },
            'calendar': {
                name: 'Calendar Spread',
                difficulty: 'Intermediate',
                description: 'A calendar spread involves options with the same strike price but different expiration dates.',
                marketOutlook: 'Neutral',
                maxProfit: 'Limited',
                maxLoss: 'Limited',
                setup: [
                    'Sell near-term option',
                    'Buy longer-term option',
                    'Same strike price'
                ],
                payoffType: 'calendar'
            },
            'vertical-spread': {
                name: 'Vertical Spread',
                difficulty: 'Beginner',
                description: 'A vertical spread involves buying and selling options of the same type and expiration but different strikes.',
                marketOutlook: 'Directional',
                maxProfit: 'Limited',
                maxLoss: 'Limited',
                setup: [
                    'Buy 1 option',
                    'Sell 1 option',
                    'Same type and expiration, different strikes'
                ],
                payoffType: 'vertical-spread'
            }
        };

        this.glossary = {
            'call-option': 'A contract that gives the holder the right to buy an underlying asset at a specified price within a specific time period.',
            'put-option': 'A contract that gives the holder the right to sell an underlying asset at a specified price within a specific time period.',
            'strike-price': 'The price at which the holder of an option can buy (in the case of a call) or sell (in the case of a put) the underlying asset.',
            'expiration': 'The date on which an option contract becomes void and ceases to exist.',
            'premium': 'The price paid by the option buyer to the option seller for the rights granted by the option contract.',
            'intrinsic-value': 'The value of an option if it were exercised immediately, calculated as the difference between the underlying price and strike price.',
            'time-value': 'The portion of an option\'s premium that exceeds its intrinsic value, representing the potential for future price movement.',
            'delta': 'The rate of change of option price with respect to changes in the underlying asset price.',
            'gamma': 'The rate of change of delta with respect to changes in the underlying asset price.',
            'theta': 'The rate of change of option price with respect to time (time decay).',
            'vega': 'The rate of change of option price with respect to changes in volatility.',
            'rho': 'The rate of change of option price with respect to changes in interest rates.',
            'itm': 'In-the-money - an option with intrinsic value.',
            'otm': 'Out-of-the-money - an option with no intrinsic value.',
            'atm': 'At-the-money - an option with strike price equal to the underlying price.'
        };

        this.educationContent = {
            basics: {
                title: 'Options Basics',
                content: [
                    'Options are contracts that give the buyer the right, but not the obligation, to buy or sell an underlying asset.',
                    'Call options give the right to buy, put options give the right to sell.',
                    'Options have a strike price (exercise price) and expiration date.',
                    'The premium is the price paid for the option contract.',
                    'Options can be used for hedging, speculation, or income generation.'
                ]
            },
            greeks: {
                title: 'The Greeks',
                content: [
                    'Delta: Measures sensitivity to underlying price changes. Call delta: 0 to 1, Put delta: -1 to 0.',
                    'Gamma: Measures rate of change of delta. Highest for ATM options.',
                    'Theta: Measures time decay. Options lose value as expiration approaches.',
                    'Vega: Measures sensitivity to volatility changes. All options have positive vega.',
                    'Rho: Measures sensitivity to interest rate changes. Usually small impact.'
                ]
            },
            strategies: {
                title: 'Trading Strategies',
                content: [
                    'Covered calls: Generate income from long stock positions.',
                    'Protective puts: Hedge against downside risk in long positions.',
                    'Straddles/Strangles: Profit from significant price movements.',
                    'Spreads: Limit risk while defining profit potential.',
                    'Iron condors: Profit from range-bound markets with low volatility.'
                ]
            },
            risk: {
                title: 'Risk Management',
                content: [
                    'Never risk more than 1-2% of your portfolio on a single trade.',
                    'Understand the maximum potential loss before entering any position.',
                    'Use stop-loss orders and position sizing to manage risk.',
                    'Avoid over-leveraging and trading too large for your account.',
                    'Have a clear exit strategy before entering any trade.'
                ]
            }
        };

        this.init();
    }

    init() {
        console.log('OptionsPro background script initialized');
        
        // Set up message listeners
        this.setupMessageListeners();
        
        // Load saved settings
        this.loadSettings();
    }

    setupMessageListeners() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            switch (request.action) {
                case 'getStrategy':
                    const strategy = this.strategies[request.strategyId];
                    sendResponse(strategy);
                    break;
                
                case 'getAllStrategies':
                    sendResponse(this.strategies);
                    break;
                
                case 'calculateOption':
                    const calculation = this.calculateOptionGreeks(request.params);
                    sendResponse(calculation);
                    break;
                
                case 'calculateProbability':
                    const probability = this.calculateProbability(request.params);
                    sendResponse(probability);
                    break;
                
                case 'getGlossary':
                    sendResponse(this.glossary);
                    break;
                
                case 'getEducation':
                    const education = this.educationContent[request.topic];
                    sendResponse(education);
                    break;
                
                case 'getSettings':
                    sendResponse(this.settings);
                    break;
                
                case 'updateSettings':
                    this.updateSettings(request.settings).then(() => {
                        sendResponse({ success: true });
                    });
                    break;
                
                case 'generatePayoff':
                    const payoff = this.generatePayoffData(request.strategy, request.params);
                    sendResponse(payoff);
                    break;
                
                default:
                    sendResponse({ error: 'Unknown action' });
            }
        });
    }

    calculateOptionGreeks(params) {
        const { stockPrice, strikePrice, optionPrice, daysToExpiry, volatility, interestRate, optionType = 'call' } = params;
        
        // Convert to years
        const T = daysToExpiry / 365;
        const r = interestRate / 100;
        const sigma = volatility / 100;
        
        // Calculate d1 and d2
        const d1 = (Math.log(stockPrice / strikePrice) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
        const d2 = d1 - sigma * Math.sqrt(T);
        
        // Calculate Greeks using Black-Scholes
        const delta = optionType === 'call' ? this.normalCDF(d1) : this.normalCDF(d1) - 1;
        const gamma = this.normalPDF(d1) / (stockPrice * sigma * Math.sqrt(T));
        const theta = -(stockPrice * this.normalPDF(d1) * sigma) / (2 * Math.sqrt(T)) - 
                      r * strikePrice * Math.exp(-r * T) * this.normalCDF(optionType === 'call' ? d2 : -d2);
        const vega = stockPrice * this.normalPDF(d1) * Math.sqrt(T) / 100;
        const rho = strikePrice * T * Math.exp(-r * T) * this.normalCDF(optionType === 'call' ? d2 : -d2) / 100;
        
        // Calculate intrinsic and time value
        const intrinsic = Math.max(0, optionType === 'call' ? stockPrice - strikePrice : strikePrice - stockPrice);
        const timeValue = Math.max(0, optionPrice - intrinsic);
        
        return {
            delta: delta.toFixed(3),
            gamma: gamma.toFixed(3),
            theta: theta.toFixed(3),
            vega: vega.toFixed(3),
            rho: rho.toFixed(3),
            intrinsic: intrinsic.toFixed(2),
            timeValue: timeValue.toFixed(2)
        };
    }

    calculateProbability(params) {
        const { stockPrice, strikePrice, daysToExpiry, volatility, optionType = 'call' } = params;
        
        const T = daysToExpiry / 365;
        const sigma = volatility / 100;
        
        const d1 = (Math.log(stockPrice / strikePrice) + (0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
        const d2 = d1 - sigma * Math.sqrt(T);
        
        if (optionType === 'call') {
            const itmProb = this.normalCDF(d2);
            const otmProb = 1 - itmProb;
            const breakeven = strikePrice + params.optionPrice; // For long call
            
            return {
                itmProbability: (itmProb * 100).toFixed(1),
                otmProbability: (otmProb * 100).toFixed(1),
                breakevenPrice: breakeven.toFixed(2)
            };
        } else {
            const itmProb = this.normalCDF(-d2);
            const otmProb = 1 - itmProb;
            const breakeven = strikePrice - params.optionPrice; // For long put
            
            return {
                itmProbability: (itmProb * 100).toFixed(1),
                otmProbability: (otmProb * 100).toFixed(1),
                breakevenPrice: breakeven.toFixed(2)
            };
        }
    }

    generatePayoffData(strategy, params) {
        const { stockPrice, strikePrice, optionPrice, strategyType } = params;
        
        // Generate price range
        const priceRange = [];
        const minPrice = stockPrice * 0.5;
        const maxPrice = stockPrice * 1.5;
        const step = (maxPrice - minPrice) / 50;
        
        for (let price = minPrice; price <= maxPrice; price += step) {
            let payoff = 0;
            
            switch (strategyType) {
                case 'covered-call':
                    // Long stock + short call
                    payoff = (price - stockPrice) + Math.max(0, Math.min(strikePrice - price, optionPrice));
                    break;
                    
                case 'protective-put':
                    // Long stock + long put
                    payoff = (price - stockPrice) + Math.max(0, strikePrice - price) - optionPrice;
                    break;
                    
                case 'straddle':
                    // Long call + long put
                    payoff = Math.max(0, price - strikePrice) + Math.max(0, strikePrice - price) - (2 * optionPrice);
                    break;
                    
                case 'long-call':
                    payoff = Math.max(0, price - strikePrice) - optionPrice;
                    break;
                    
                case 'long-put':
                    payoff = Math.max(0, strikePrice - price) - optionPrice;
                    break;
                    
                default:
                    payoff = 0;
            }
            
            priceRange.push({ price: price.toFixed(2), payoff: payoff.toFixed(2) });
        }
        
        return priceRange;
    }

    normalCDF(x) {
        // Approximation of the cumulative normal distribution function
        const a1 = 0.254829592;
        const a2 = -0.284496736;
        const a3 = 1.421413741;
        const a4 = -1.453152027;
        const a5 = 1.061405429;
        const p = 0.3275911;
        
        const sign = x < 0 ? -1 : 1;
        x = Math.abs(x) / Math.sqrt(2.0);
        
        const t = 1.0 / (1.0 + p * x);
        const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
        
        return 0.5 * (1.0 + sign * y);
    }

    normalPDF(x) {
        // Probability density function for normal distribution
        return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
    }

    async loadSettings() {
        try {
            const result = await chrome.storage.local.get(['optionsProSettings']);
            this.settings = result.optionsProSettings || {
                defaultStrategy: 'covered-call',
                showAdvanced: false,
                darkMode: true,
                autoRefresh: true
            };
        } catch (error) {
            console.error('Error loading settings:', error);
            this.settings = {
                defaultStrategy: 'covered-call',
                showAdvanced: false,
                darkMode: true,
                autoRefresh: true
            };
        }
    }

    async updateSettings(newSettings) {
        try {
            this.settings = { ...this.settings, ...newSettings };
            await chrome.storage.local.set({ optionsProSettings: this.settings });
            console.log('Settings updated:', this.settings);
        } catch (error) {
            console.error('Error updating settings:', error);
        }
    }

    // Utility methods for educational content
    getStrategyByDifficulty(difficulty) {
        return Object.values(this.strategies).filter(strategy => strategy.difficulty === difficulty);
    }

    searchGlossary(term) {
        const results = [];
        const searchTerm = term.toLowerCase();
        
        Object.entries(this.glossary).forEach(([key, definition]) => {
            if (key.includes(searchTerm) || definition.toLowerCase().includes(searchTerm)) {
                results.push({ term: key, definition });
            }
        });
        
        return results;
    }

    getRecommendedStrategies(marketOutlook) {
        const recommendations = {
            'bullish': ['covered-call', 'bull-call-spread'],
            'bearish': ['protective-put', 'bear-put-spread'],
            'neutral': ['iron-condor', 'calendar-spread', 'butterfly'],
            'volatile': ['straddle', 'strangle']
        };
        
        return recommendations[marketOutlook] || [];
    }
}

// Initialize the background script
const optionsPro = new OptionsProBackground();

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OptionsProBackground;
}