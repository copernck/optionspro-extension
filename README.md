# OptionsPro Firefox Extension - Complete Package Guide

### ⚠️ Project Status: Educational Demo
## 📁 Extension Structure

```
optionspro-extension/
├── manifest.json          # Extension manifest file
├── popup.html            # Main popup interface
├── options.html          # Settings page
├── icons/                # Extension icons
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   ├── icon-96.png
│   └── icon-128.png
├── css/                  # Stylesheets
│   ├── popup.css        # Popup styles
│   ├── content.css      # Content script styles
│   └── settings.css     # Settings page styles
└── js/                   # JavaScript files
    ├── background.js     # Background service worker
    ├── popup.js         # Popup interface logic
    ├── content.js       # Page interaction scripts
    └── settings.js      # Settings page logic
```

## How to Install & Use

### Method 1: Developer Installation (For Testing)

1. **Open Firefox**
   - Launch Firefox browser

2. **Enable Developer Mode**
   - Type `about:debugging` in the address bar
   - Click on "This Firefox" in the left sidebar
   - Click "Load Temporary Add-on..."

3. **Load the Extension**
   - Navigate to the `optionspro-extension` folder
   - Select the `manifest.json` file
   - The extension will be installed temporarily

or you can click this link and download it from the offical firefox store

## 🎯 How to Use OptionsPro

### After Installation:

1. **Access the Extension**
   - Look for the OptionsPro icon (📊) in your Firefox toolbar
   - Click the icon to open the popup

2. **Navigate Features**
   - **Strategies**: Browse and learn about options trading strategies
   - **Calculator**: Calculate option Greeks and probabilities
   - **Education**: Access educational content and glossary

3. **Customize Settings**
   - Right-click the extension icon
   - Select "Options" to open settings
   - Configure calculator defaults, display options, and risk management

## 📋 Features Overview

### 🎯 Strategies Section
- **8 Professional Strategies**: Covered Call, Protective Put, Straddle, Strangle, Iron Condor, Butterfly, Calendar Spread, Vertical Spread
- **Strategy Analysis**: Market outlook, max profit/loss, setup instructions
- **Payoff Diagrams**: Visual representation of strategy payoffs
- **Difficulty Levels**: Beginner, Intermediate, Advanced strategies

### 🧮 Calculator Section
- **Options Greeks Calculator**: Delta, Gamma, Theta, Vega, Rho
- **Probability Analysis**: ITM/OTM probabilities, breakeven prices
- **Real-time Calculation**: Auto-calculates as you type
- **Professional Inputs**: Stock price, strike, volatility, time to expiry

### 📚 Education Section
- **Learning Modules**: Options basics, Greeks, strategies, risk management
- **Interactive Glossary**: Comprehensive options terminology
- **Pro Tips**: Expert trading advice and best practices
- **Strategy Recommendations**: Based on market conditions

### 🌐 Page Integration
- **Term Highlighting**: Automatically highlights options terms on financial websites
- **Educational Tooltips**: Click highlighted terms for explanations
- **Context Widget**: Shows options analysis on stock pages
- **Smart Detection**: Works on Yahoo Finance, Bloomberg, MarketWatch, etc.

## 🔧 Technical Requirements

### Browser Compatibility
- **Firefox**: Version 100.0 or higher
- **Manifest Version**: 3

### Permissions Required
- `storage`: Save user preferences and settings
- `activeTab`: Access current tab for content scripts
- No tracking or data collection permissions

## 🛠️ Development & Customization

### Modify Strategies
Edit `js/background.js` to update strategy definitions:
```javascript
this.strategies = {
    'covered-call': {
        name: 'Covered Call',
        difficulty: 'Beginner',
        description: '...',
        setup: [...],
        payoffType: 'covered-call'
    }
    // Add more strategies
};
```

### Customize Calculator
Edit calculation formulas in `js/background.js`:
```javascript
calculateOptionGreeks(params) {
    // Black-Scholes implementation
    const d1 = (Math.log(S/K) + (r + 0.5 * σ * σ) * T) / (σ * Math.sqrt(T));
    // Calculate Greeks
}
```

### Add New Educational Content
Update `js/background.js` education section:
```javascript
this.educationContent = {
    newTopic: {
        title: 'New Topic',
        content: ['Point 1', 'Point 2', 'Point 3']
    }
};
```


## 🐛 Troubleshooting

### Common Issues:

**Extension doesn't load:**
- Check that `manifest.json` is valid JSON
- Verify all file paths are correct
- Ensure Firefox version is 100.0 or higher

**Calculator not working:**
- Check input values are valid numbers
- Verify JavaScript calculations in background script
- Check console for error messages

**Educational content not showing:**
- Verify content data structure in background script
- Check message passing between popup and background
- Ensure educational topics are properly defined

### Debug Mode:
Enable console logging to see detailed information:
1. Open extension options
2. Check for any error messages in browser console
3. Verify all API calls are functioning correctly

## 📞 Support

### For Support:
- **Email**: tamiusobserver@gmail.com
- **Issues**: Report bugs through Firefox Add-ons store
- **Documentation**: Built-in help in extension about section

### Feature Requests:
We welcome suggestions for new strategies, educational content, and improvements. Please contact us with your ideas!


### Automatic Updates:
- Firefox will automatically update your extension when new versions are published
- Users will receive notifications about major updates

### Manual Updates:
1. Download the latest version
2. Install over existing version
3. Settings and preferences will be preserved

---

# OptionsPro - Options Strategy Simulator & Educational Tool


**A feature-rich Firefox extension designed to teach the fundamentals of options trading through simulation and interactive tools.**

---

### ⚠️ Project Status: Educational Demo

**Please Note:** This extension is an educational tool and a portfolio project. It is **not** a live trading application. The core functionality is complete, but it operates using a pre loaded, static set of mock data to simulate market conditions and strategies. All calculations and strategy information are for demonstration and learning purposes only.

The primary goal of this project was to build a complex, feature-complete front-end application and package it as a browser extension. The next logical step would be to integrate live data from a financial API.

---

### ✨ Features

* **Strategy Library:** Explore detailed breakdowns of various options strategies, complete with descriptions, market outlook, max profit/loss, and setup instructions.
* **Interactive Payoff Diagrams:** Visualize the risk/reward profile of each strategy with dynamic charts.
* **Options Calculator:** A built in tool to calculate theoretical option values and the "Greeks" (Delta, Gamma, Theta, Vega) based on user inputs.
* **Educational Hub:** An integrated section with guides on options basics, risk management, and a glossary of key terms.
* **Full-Featured UI:** Includes a tabbed interface, settings page, and a clean, responsive design.

---

### 🛠️ Built With

* HTML5, CSS3, Vanilla JavaScript (ES6+)
* Manifest V3 for browser extensions
* Chart.js for visualizations


#### To install from the Firefox Add-ons Store:

1.  Visit the [OptionsPro Add-on Page](https://addons.mozilla.org/addon/optionspro-strategy-analyzer/) 
2.  Click "Add to Firefox".

#### To run locally for development:

1.  Clone this repository: `git clone https://github.com/your-username/optionspro.git`
2.  Open Firefox and navigate to `about:debugging`.
3.  Click "This Firefox" on the left sidebar.
4.  Click "Load Temporary Add-on...".
5.  Select the `manifest.json` file from the cloned repository directory.
