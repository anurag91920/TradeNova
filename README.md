# 🚀 TradeNova - Crypto Trading Dashboard

<div align="center">

![TradeNova Banner](https://img.shields.io/badge/TradeNova-Crypto%20Trading%20Dashboard-6366f1?style=for-the-badge&logo=bitcoin&logoColor=white)

**A full-stack crypto trading admin dashboard built with MERN Stack + MySQL**

[![GitHub](https://img.shields.io/badge/GitHub-anurag91920-181717?style=flat-square&logo=github)](https://github.com/anurag91920/TradeNova)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Vite](https://img.shields.io/badge/Vite-4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Docs](#-api-endpoints) • [Deployment](#-deployment)

</div>

---

## 📖 Overview

**TradeNova** is a modern, production-ready crypto trading platform that empowers users to trade cryptocurrencies with real-time market data, advanced analytics, and a beautiful dark-themed UI. Built with the powerful combination of **MERN Stack (MySQL variant)** — MongoDB replaced with MySQL for relational data integrity.

Perfect for:
- 💼 **Portfolio Projects** - Showcase full-stack skills
- 🎓 **Learning** - Understand real-world architecture
- 🚀 **Production** - Deploy as an actual trading platform
- 🎨 **Template** - Use as a base for fintech projects

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication with access & refresh tokens
- Password hashing with bcrypt (12 rounds)
- Two-Factor Authentication (2FA) support
- Role-based access control (User, Admin, Super Admin)
- Rate limiting on sensitive endpoints
- Helmet.js security headers
- CORS protection

### 💰 Trading Features
- **Real-time prices** from Binance API (with fallback)
- **Market orders** - Instant execution
- **Limit orders** - Custom price execution
- **Stop-loss orders** - Risk management
- **Take-profit orders** - Automated profit taking
- **Order cancellation** - Cancel pending orders
- **Trade history** - Complete transaction log
- **Open positions** - Live portfolio tracking

### 📊 Analytics & Charts
- **Dashboard overview** - Key metrics at a glance
- **Candlestick charts** - Professional trading view
- **Portfolio distribution** - Pie charts
- **Volume analysis** - Bar & line charts
- **Win rate tracking** - Performance metrics
- **Profit/Loss tracking** - Real-time P&L
- **Top performing assets** - Ranked list

### 💳 Wallet Management
- **Multi-currency support** - USD, USDT, etc.
- **Deposit funds** - Add balance
- **Withdraw funds** - Cash out
- **Locked balance** - Funds in open orders
- **Transaction history** - Complete audit trail
- **Balance tracking** - Total deposited, withdrawn, profit

### 🎨 UI/UX Features
- **Dark theme** - Eye-friendly design
- **Responsive layout** - Mobile, tablet, desktop
- **Real-time WebSocket** - Live price updates
- **Toast notifications** - User feedback
- **Loading skeletons** - Smooth loading states
- **Error boundaries** - Graceful error handling
- **Smooth animations** - Framer Motion
- **Modern charts** - Recharts + Lightweight Charts

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js 18+** | Runtime environment |
| **Express.js** | Web framework |
| **MySQL 8.0** | Relational database |
| **Sequelize** | ORM for MySQL |
| **JWT** | Authentication |
| **bcryptjs** | Password hashing |
| **Socket.io** | Real-time WebSocket |
| **Redis** | Caching (optional) |
| **Winston** | Logging |
| **Joi** | Data validation |
| **Nodemailer** | Email service |
| **Axios** | HTTP client |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library |
| **Vite** | Build tool |
| **Redux Toolkit** | State management |
| **React Router v6** | Routing |
| **Axios** | API client |
| **Socket.io Client** | WebSocket |
| **Tailwind CSS** | Styling |
| **Recharts** | Charts |
| **Lightweight Charts** | Trading charts |
| **React Hook Form** | Forms |
| **React Hot Toast** | Notifications |
| **React Icons** | Icons |
| **Framer Motion** | Animations |
| **date-fns** | Date formatting |

### DevOps
- **Git** - Version control
- **GitHub** - Code hosting
- **Docker** - Containerization (optional)
- **Render** - Backend hosting
- **Vercel** - Frontend hosting
- **Hostim.dev** - MySQL hosting

---

## 📁 Project Structure
TradeNova/
│
├── 📂 backend/ # Node.js + Express API
│ ├── 📂 src/
│ │ ├── 📂 config/ # Configuration
│ │ │ ├── database.js # MySQL connection
│ │ │ └── redis.js # Redis connection
│ │ │
│ │ ├── 📂 models/ # Sequelize models
│ │ │ ├── index.js # Model associations
│ │ │ ├── User.model.js # User table
│ │ │ ├── Wallet.model.js # Wallet table
│ │ │ ├── Trade.model.js # Trades table
│ │ │ ├── Order.model.js # Orders table
│ │ │ └── AuditLog.model.js # Audit logs
│ │ │
│ │ ├── 📂 controllers/ # Business logic
│ │ │ ├── auth.controller.js # Auth logic
│ │ │ ├── trade.controller.js # Trading logic
│ │ │ ├── wallet.controller.js # Wallet logic
│ │ │ ├── analytics.controller.js # Analytics
│ │ │ └── settings.controller.js # Settings
│ │ │
│ │ ├── 📂 routes/ # API routes
│ │ │ ├── auth.routes.js
│ │ │ ├── trade.routes.js
│ │ │ ├── wallet.routes.js
│ │ │ ├── analytics.routes.js
│ │ │ └── settings.routes.js
│ │ │
│ │ ├── 📂 middleware/ # Express middleware
│ │ │ ├── auth.middleware.js # JWT verification
│ │ │ ├── error.middleware.js # Error handler
│ │ │ ├── validation.middleware.js # Joi validation
│ │ │ ├── logger.middleware.js # Request logging
│ │ │ └── rateLimiter.js # Rate limiting
│ │ │
│ │ ├── 📂 services/ # External services
│ │ │ ├── crypto.service.js # Binance API
│ │ │ └── email.service.js # Email service
│ │ │
│ │ ├── 📂 utils/ # Helper functions
│ │ │ ├── logger.js # Winston logger
│ │ │ ├── encryption.js # Encryption utils
│ │ │ └── validators.js # Validators
│ │ │
│ │ ├── 📂 socket/ # WebSocket setup
│ │ │ ├── index.js # Socket server
│ │ │ └── events.js # Event handlers
│ │ │
│ │ └── app.js # Express app
│ │
│ ├── 📄 server.js # Entry point
│ ├── 📄 package.json
│ ├── 📄 .env.example # Environment template
│ └── 📄 .gitignore
│
├── 📂 frontend/ # React + Vite
│ ├── 📂 src/
│ │ ├── 📂 components/ # Reusable components
│ │ │ ├── 📂 common/ # Layout, Sidebar, Header
│ │ │ ├── 📂 charts/ # Chart components
│ │ │ ├── 📂 dashboard/ # Dashboard widgets
│ │ │ └── 📂 tables/ # Data tables
│ │ │
│ │ ├── 📂 pages/ # Page components
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ ├── Dashboard.jsx
│ │ │ ├── Trading.jsx
│ │ │ ├── Wallet.jsx
│ │ │ ├── Orders.jsx
│ │ │ ├── Analytics.jsx
│ │ │ └── Settings.jsx
│ │ │
│ │ ├── 📂 store/ # Redux store
│ │ │ ├── store.js
│ │ │ └── 📂 slices/
│ │ │ ├── authSlice.js
│ │ │ ├── tradeSlice.js
│ │ │ ├── walletSlice.js
│ │ │ ├── marketSlice.js
│ │ │ └── uiSlice.js
│ │ │
│ │ ├── 📂 utils/ # Helpers
│ │ │ ├── api.js # Axios setup
│ │ │ ├── websocket.js # Socket.io client
│ │ │ └── format.js # Formatters
│ │ │
│ │ ├── 📄 App.jsx
│ │ ├── 📄 main.jsx
│ │ └── 📄 index.css
│ │
│ ├── 📄 index.html
│ ├── 📄 package.json
│ ├── 📄 vite.config.js
│ ├── 📄 tailwind.config.js
│ ├── 📄 .env.example
│ └── 📄 .gitignore
│
├── 📄 .gitignore # Root gitignore
├── 📄 README.md # This file
└── 📄 LICENSE # MIT License

