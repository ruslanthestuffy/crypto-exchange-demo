# 🚀 Crypto Exchange Demo

This is a **demo** cryptocurrency exchange app built with **React, TypeScript, MobX, and Material UI**.  
It allows users to **convert between different cryptocurrencies in real-time** using data from the **CoinMarketCap API**.

⚠️ **Disclaimer:**  
This project is **for demonstration purposes only**. It does **not process real transactions** and should **not be used for actual trading**.

## ✨ Features
✅ Select from **real cryptocurrency pairs**  
✅ Instant **exchange rate updates**  
✅ Search currencies by **symbol (`BTC`) or name (`Bitcoin`)**

## 🛠️ Tech Stack
- **React + Vite** (Frontend Framework)
- **TypeScript** (Strongly typed code)
- **MobX** (State management)
- **Material UI** (UI Components)
- **CoinMarketCap API** (Live exchange rates)

### 💡 How It Works
- 1️⃣ Select the “From” and “To” currencies from the dropdown.
- 2️⃣ Enter an amount in either field; the other field updates automatically.
- 3️⃣ Click swap 🔄 to reverse the currencies.

### 📜 License

This project is open-source but provided as is, with no warranties.
Feel free to fork, modify, and use it for learning purposes.

📌 Made by: Ruslan Makaev (@ruslanthestuffy)

## 🚀 Live Demo
🔗 **[Try it here!](https://crypto-exchange-demo-only.netlify.app/)**

## 🛠️ Installation & Setup
To run this project locally:
```sh
# Clone the repository
git clone https://github.com/yourusername/crypto-exchange-demo.git

# Navigate into the project folder
cd crypto-exchange-demo

# Install dependencies
npm install

# Create a `.env` file and add your CoinMarketCap API key
echo "VITE_COINMARKETCAP_API_KEY=your-api-key-here" > .env

# Start the development server
npm run dev
```