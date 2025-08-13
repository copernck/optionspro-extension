// OptionsPro Settings Page Script
// Handles settings management and user preferences

class OptionsProSettings {
    constructor() {
        this.defaultSettings = {
            defaultStrategy: 'covered-call',
            defaultCalculator: 'basic',
            theme: 'dark',
            defaultVolatility: 25,
            defaultInterestRate: 2.0,
            autoCalculate: true,
            showGreeks: true,
            showAnimations: true,
            showTooltips: true,
            highlightTerms: true,
            showWidget: false,
            maxPositionSize: 2,
            riskWarning: true,
            paperTrading: false,
            showTips: true,
            explainStrategies: true,
            glossaryEnabled: true,
            useYahooFinance: true,
            useAlphaVantage: false,
            apiTimeout: 30
        };

        this.currentSettings = { ...this.defaultSettings };
        
        this.init();
    }

    init() {
        console.log('OptionsPro settings page initialized');
        
        // Load saved settings
        this.loadSettings();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Apply settings to UI
        this.applySettingsToUI();
    }

    setupEventListeners() {
        // Save settings button
        const saveBtn = document.getElementById('saveSettings');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveSettings();
            });
        }

        // Reset settings button
        const resetBtn = document.getElementById('resetSettings');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetSettings();
            });
        }

        // Export settings button
        const exportBtn = document.getElementById('exportSettings');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportSettings();
            });
        }

        // Listen for settings changes
        this.setupSettingsListeners();
    }

    setupSettingsListeners() {
        // General settings
        const defaultStrategy = document.getElementById('defaultStrategy');
        const defaultCalculator = document.getElementById('defaultCalculator');
        const theme = document.getElementById('theme');

        if (defaultStrategy) {
            defaultStrategy.addEventListener('change', (e) => {
                this.currentSettings.defaultStrategy = e.target.value;
            });
        }

        if (defaultCalculator) {
            defaultCalculator.addEventListener('change', (e) => {
                this.currentSettings.defaultCalculator = e.target.value;
            });
        }

        if (theme) {
            theme.addEventListener('change', (e) => {
                this.currentSettings.theme = e.target.value;
                this.applyTheme(e.target.value);
            });
        }

        // Calculator settings
        const defaultVolatility = document.getElementById('defaultVolatility');
        const defaultInterestRate = document.getElementById('defaultInterestRate');
        const autoCalculate = document.getElementById('autoCalculate');
        const showGreeks = document.getElementById('showGreeks');

        if (defaultVolatility) {
            defaultVolatility.addEventListener('change', (e) => {
                this.currentSettings.defaultVolatility = parseFloat(e.target.value);
            });
        }

        if (defaultInterestRate) {
            defaultInterestRate.addEventListener('change', (e) => {
                this.currentSettings.defaultInterestRate = parseFloat(e.target.value);
            });
        }

        if (autoCalculate) {
            autoCalculate.addEventListener('change', (e) => {
                this.currentSettings.autoCalculate = e.target.checked;
            });
        }

        if (showGreeks) {
            showGreeks.addEventListener('change', (e) => {
                this.currentSettings.showGreeks = e.target.checked;
            });
        }

        // Display options
        const showAnimations = document.getElementById('showAnimations');
        const showTooltips = document.getElementById('showTooltips');
        const highlightTerms = document.getElementById('highlightTerms');
        const showWidget = document.getElementById('showWidget');

        if (showAnimations) {
            showAnimations.addEventListener('change', (e) => {
                this.currentSettings.showAnimations = e.target.checked;
            });
        }

        if (showTooltips) {
            showTooltips.addEventListener('change', (e) => {
                this.currentSettings.showTooltips = e.target.checked;
            });
        }

        if (highlightTerms) {
            highlightTerms.addEventListener('change', (e) => {
                this.currentSettings.highlightTerms = e.target.checked;
            });
        }

        if (showWidget) {
            showWidget.addEventListener('change', (e) => {
                this.currentSettings.showWidget = e.target.checked;
            });
        }

        // Risk management
        const maxPositionSize = document.getElementById('maxPositionSize');
        const riskWarning = document.getElementById('riskWarning');
        const paperTrading = document.getElementById('paperTrading');

        if (maxPositionSize) {
            maxPositionSize.addEventListener('change', (e) => {
                this.currentSettings.maxPositionSize = parseFloat(e.target.value);
            });
        }

        if (riskWarning) {
            riskWarning.addEventListener('change', (e) => {
                this.currentSettings.riskWarning = e.target.checked;
            });
        }

        if (paperTrading) {
            paperTrading.addEventListener('change', (e) => {
                this.currentSettings.paperTrading = e.target.checked;
            });
        }

        // Educational features
        const showTips = document.getElementById('showTips');
        const explainStrategies = document.getElementById('explainStrategies');
        const glossaryEnabled = document.getElementById('glossaryEnabled');

        if (showTips) {
            showTips.addEventListener('change', (e) => {
                this.currentSettings.showTips = e.target.checked;
            });
        }

        if (explainStrategies) {
            explainStrategies.addEventListener('change', (e) => {
                this.currentSettings.explainStrategies = e.target.checked;
            });
        }

        if (glossaryEnabled) {
            glossaryEnabled.addEventListener('change', (e) => {
                this.currentSettings.glossaryEnabled = e.target.checked;
            });
        }

        // Data sources
        const useYahooFinance = document.getElementById('useYahooFinance');
        const useAlphaVantage = document.getElementById('useAlphaVantage');
        const apiTimeout = document.getElementById('apiTimeout');

        if (useYahooFinance) {
            useYahooFinance.addEventListener('change', (e) => {
                this.currentSettings.useYahooFinance = e.target.checked;
            });
        }

        if (useAlphaVantage) {
            useAlphaVantage.addEventListener('change', (e) => {
                this.currentSettings.useAlphaVantage = e.target.checked;
            });
        }

        if (apiTimeout) {
            apiTimeout.addEventListener('change', (e) => {
                this.currentSettings.apiTimeout = parseInt(e.target.value);
            });
        }
    }

    async loadSettings() {
        try {
            // Load settings from chrome.storage
            const result = await this.getStorageData('optionsProSettings');
            
            if (result && result.optionsProSettings) {
                this.currentSettings = { ...this.defaultSettings, ...result.optionsProSettings };
            }

            console.log('Settings loaded:', this.currentSettings);
            
        } catch (error) {
            console.error('Error loading settings:', error);
            this.showMessage('Error loading settings', 'error');
        }
    }

    async saveSettings() {
        try {
            // Save settings to chrome.storage
            await this.setStorageData({ optionsProSettings: this.currentSettings });

            // Notify background script of settings changes
            await this.notifyBackgroundScript('settingsUpdated', this.currentSettings);

            console.log('Settings saved:', this.currentSettings);
            this.showMessage('Settings saved successfully!', 'success');

            // Apply theme immediately
            this.applyTheme(this.currentSettings.theme);

        } catch (error) {
            console.error('Error saving settings:', error);
            this.showMessage('Error saving settings', 'error');
        }
    }

    async resetSettings() {
        if (confirm('Are you sure you want to reset all settings to defaults?')) {
            try {
                this.currentSettings = { ...this.defaultSettings };
                
                // Reset UI elements
                this.applySettingsToUI();
                
                // Save the reset settings
                await this.saveSettings();
                
                this.showMessage('Settings reset to defaults', 'success');

            } catch (error) {
                console.error('Error resetting settings:', error);
                this.showMessage('Error resetting settings', 'error');
            }
        }
    }

    async exportSettings() {
        try {
            const dataStr = JSON.stringify(this.currentSettings, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = 'optionspro-settings.json';
            link.click();
            
            URL.revokeObjectURL(url);
            
            this.showMessage('Settings exported successfully', 'success');
            
        } catch (error) {
            console.error('Error exporting settings:', error);
            this.showMessage('Error exporting settings', 'error');
        }
    }

    applySettingsToUI() {
        // General settings
        const defaultStrategy = document.getElementById('defaultStrategy');
        const defaultCalculator = document.getElementById('defaultCalculator');
        const theme = document.getElementById('theme');

        if (defaultStrategy) defaultStrategy.value = this.currentSettings.defaultStrategy;
        if (defaultCalculator) defaultCalculator.value = this.currentSettings.defaultCalculator;
        if (theme) theme.value = this.currentSettings.theme;

        // Calculator settings
        const defaultVolatility = document.getElementById('defaultVolatility');
        const defaultInterestRate = document.getElementById('defaultInterestRate');
        const autoCalculate = document.getElementById('autoCalculate');
        const showGreeks = document.getElementById('showGreeks');

        if (defaultVolatility) defaultVolatility.value = this.currentSettings.defaultVolatility;
        if (defaultInterestRate) defaultInterestRate.value = this.currentSettings.defaultInterestRate;
        if (autoCalculate) autoCalculate.checked = this.currentSettings.autoCalculate;
        if (showGreeks) showGreeks.checked = this.currentSettings.showGreeks;

        // Display options
        const showAnimations = document.getElementById('showAnimations');
        const showTooltips = document.getElementById('showTooltips');
        const highlightTerms = document.getElementById('highlightTerms');
        const showWidget = document.getElementById('showWidget');

        if (showAnimations) showAnimations.checked = this.currentSettings.showAnimations;
        if (showTooltips) showTooltips.checked = this.currentSettings.showTooltips;
        if (highlightTerms) highlightTerms.checked = this.currentSettings.highlightTerms;
        if (showWidget) showWidget.checked = this.currentSettings.showWidget;

        // Risk management
        const maxPositionSize = document.getElementById('maxPositionSize');
        const riskWarning = document.getElementById('riskWarning');
        const paperTrading = document.getElementById('paperTrading');

        if (maxPositionSize) maxPositionSize.value = this.currentSettings.maxPositionSize;
        if (riskWarning) riskWarning.checked = this.currentSettings.riskWarning;
        if (paperTrading) paperTrading.checked = this.currentSettings.paperTrading;

        // Educational features
        const showTips = document.getElementById('showTips');
        const explainStrategies = document.getElementById('explainStrategies');
        const glossaryEnabled = document.getElementById('glossaryEnabled');

        if (showTips) showTips.checked = this.currentSettings.showTips;
        if (explainStrategies) explainStrategies.checked = this.currentSettings.explainStrategies;
        if (glossaryEnabled) glossaryEnabled.checked = this.currentSettings.glossaryEnabled;

        // Data sources
        const useYahooFinance = document.getElementById('useYahooFinance');
        const useAlphaVantage = document.getElementById('useAlphaVantage');
        const apiTimeout = document.getElementById('apiTimeout');

        if (useYahooFinance) useYahooFinance.checked = this.currentSettings.useYahooFinance;
        if (useAlphaVantage) useAlphaVantage.checked = this.currentSettings.useAlphaVantage;
        if (apiTimeout) apiTimeout.value = this.currentSettings.apiTimeout;

        // Apply theme
        this.applyTheme(this.currentSettings.theme);
    }

    applyTheme(theme) {
        const body = document.body;
        
        // Remove existing theme classes
        body.classList.remove('theme-light', 'theme-dark');
        
        // Apply new theme
        if (theme === 'light') {
            body.classList.add('theme-light');
        } else if (theme === 'dark') {
            body.classList.add('theme-dark');
        }
        
        // For auto theme, you could implement system preference detection
        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            body.classList.add(prefersDark ? 'theme-dark' : 'theme-light');
        }
    }

    showMessage(text, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;

        // Insert after header
        const header = document.querySelector('.settings-header');
        if (header) {
            header.parentNode.insertBefore(message, header.nextSibling);
        }

        // Show message
        setTimeout(() => {
            message.classList.add('show');
        }, 100);

        // Auto-hide after 3 seconds
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 3000);
    }

    // Chrome Storage API helpers
    getStorageData(key) {
        return new Promise((resolve) => {
            chrome.storage.sync.get(key, (result) => {
                resolve(result);
            });
        });
    }

    setStorageData(data) {
        return new Promise((resolve) => {
            chrome.storage.sync.set(data, () => {
                resolve();
            });
        });
    }

    // Background script communication
    async notifyBackgroundScript(action, data = null) {
        return new Promise((resolve) => {
            chrome.runtime.sendMessage({ action, data }, (response) => {
                resolve(response);
            });
        });
    }

    // Import settings from backup
    importSettings(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedSettings = JSON.parse(e.target.result);
                    this.currentSettings = { ...this.defaultSettings, ...importedSettings };
                    this.applySettingsToUI();
                    resolve();
                } catch (error) {
                    reject(new Error('Invalid settings file'));
                }
            };
            reader.onerror = () => reject(new Error('Error reading file'));
            reader.readAsText(file);
        });
    }
}

// Initialize settings page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const optionsProSettings = new OptionsProSettings();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OptionsProSettings;
}