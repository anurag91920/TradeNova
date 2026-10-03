<div align="center">

# 🚀 TradeNova

### Advanced Crypto Trading Platform — Full-Stack MERN + MySQL

A production-ready cryptocurrency trading dashboard with real-time price tracking, secure authentication, portfolio analytics, and beautiful UI.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-trade--nova--virid.vercel.app-6366f1?style=for-the-badge)](https://trade-nova-virid.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/anurag91920/TradeNova?style=for-the-badge&color=yellow)](https://github.com/anurag91920/TradeNova/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/anurag91920/TradeNova?style=for-the-badge&color=blue)](https://github.com/anurag91920/TradeNova/network/members)

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Vite](https://img.shields.io/badge/Vite-4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Live Demo](https://trade-nova-virid.vercel.app) • [Report Bug](https://github.com/anurag91920/TradeNova/issues) • [Request Feature](https://github.com/anurag91920/TradeNova/issues)

</div>

---

## 📸 Screenshots

<div align="center">

### 🏠 Landing Page
![Landing Page](https://via.placeholder.com/900x500/0f172a/6366f1?text=Landing+Page+-+Hero+Section)

### 📊 Dashboard
![Dashboard](https://via.placeholder.com/900x500/0f172a/6366f1?text=Dashboard+-+Portfolio+Overview)

### 💹 Trading Terminal
![Trading](https://via.placeholder.com/900x500/0f172a/6366f1?text=Trading+Terminal+-+Order+Form)

### 💰 Wallet Management
![Wallet](https://via.placeholder.com/900x500/0f172a/6366f1?text=Wallet+-+Balance+%26+Transactions)

### 📈 Analytics
![Analytics](https://via.placeholder.com/900x500/0f172a/6366f1?text=Analytics+-+Charts+%26+Insights)

### 📱 Mobile Responsive
![Mobile](https://via.placeholder.com/900x500/0f172a/6366f1?text=Fully+Responsive+Mobile+View)

</div>

> 💡 **Tip:** Replace placeholder images with actual screenshots of your app for maximum impact.

---

## 🎯 Overview

**TradeNova** is a modern, full-stack cryptocurrency trading platform designed to deliver an exceptional trading experience. Built with the **MERN Stack (MySQL variant)** — using MySQL instead of MongoDB for robust relational data integrity.

### 🌟 Why TradeNova?

- **Real-Time Data** — Live crypto prices from Binance API via WebSocket
- **Enterprise Security** — JWT auth, bcrypt, rate limiting, encrypted connections
- **Beautiful UI** — Modern dark theme, smooth animations, fully responsive
- **Production-Ready** — Deployed with SSH tunnel, managed database, CDN
- **Portfolio Project** — Perfect for showcasing full-stack skills

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 Authentication & Security
- JWT with access & refresh tokens
- Password hashing (bcrypt, 12 rounds)
- Two-Factor Authentication (2FA) ready
- Role-based access control
- Rate limiting on sensitive routes
- Helmet.js security headers
- CORS protection

### 💰 Trading System
- Real-time Binance prices
- Market orders (instant execution)
- Limit orders (custom price)
- Stop-loss orders
- Take-profit orders
- Order cancellation
- Trade history tracking
- Open positions tracking

</td>
<td width="50%">

### 📊 Analytics & Charts
- Dashboard with key metrics
- Portfolio value charts
- Candlestick charts
- Asset distribution (pie)
- Volume analysis (bar)
- Win rate tracking
- P&L calculations
- Top performers ranking

### 💳 Wallet Management
- Multi-currency support
- Instant deposits
- Secure withdrawals
- Locked balance tracking
- Transaction history
- Complete audit trail

</td>
</tr>
<tr>
<td width="50%">

### 🎨 Modern UI/UX
- Dark theme (eye-friendly)
- Fully responsive design
- Real-time WebSocket updates
- Toast notifications
- Loading skeletons
- Error boundaries
- Framer Motion animations
- Beautiful modern charts

### 🚀 DevOps & Deployment
- Render (Backend hosting)
- Vercel (Frontend CDN)
- Hostim.dev (MySQL)
- SSH Tunnel (ssh2)
- Environment variables
- Production logging
- Auto-deploy on push

</td>
<td width="50%">

### 🎯 Coming Soon
- [ ] Google Authenticator 2FA
- [ ] Email verification
- [ ] Password reset flow
- [ ] Stripe payment integration
- [ ] Admin panel
- [ ] Mobile app (React Native)
- [ ] Social trading
- [ ] Trading bots

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

### Backend

| Technology | Purpose |
|:-----------|:--------|
| **Node.js 18+** | JavaScript runtime |
| **Express.js** | Web framework |
| **MySQL 8.0** | Relational database |
| **Sequelize** | ORM for MySQL |
| **JWT** | Authentication |
| **bcryptjs** | Password hashing |
| **Socket.io** | Real-time WebSocket |
| **Winston** | Logging |
| **Joi** | Data validation |
| **Nodemailer** | Email service |
| **Axios** | HTTP client |
| **SSH2** | Secure DB tunnel |

### Frontend

| Technology | Purpose |
|:-----------|:--------|
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

| Platform | Purpose |
|:---------|:--------|
| **GitHub** | Version control |
| **Render** | Backend hosting |
| **Vercel** | Frontend hosting |
| **Hostim.dev** | MySQL database |
| **SSH Bastion** | Secure tunneling |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER (Browser)                            │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTPS
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL CDN                                │
│              (React + Vite Frontend)                         │
│         https://trade-nova-virid.vercel.app                  │
└─────────────────────────┬───────────────────────────────────┘
                          │ REST API + WebSocket
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  RENDER (Backend)                            │
│              (Node.js + Express API)                         │
│         https://tradenova-cpfk.onrender.com                  │
└─────────────────────────┬───────────────────────────────────┘
                          │ SSH Tunnel (ssh2)
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              HOSTIM.DEV BASTION HOST                         │
│                   (SSH Gateway)                              │
└─────────────────────────┬───────────────────────────────────┘
                          │ Private Network
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              HOSTIM.DEV MySQL DATABASE                       │
│              (Private, not exposed)                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

Make sure you have installed:

- **Node.js** 18+ → [Download](https://nodejs.org/)
- **MySQL** 8.0+ → [Download](https://dev.mysql.com/downloads/)
- **Git** → [Download](https://git-scm.com/)
- **Redis** (optional) → [Download](https://redis.io/)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/anurag91920/TradeNova.git
cd TradeNova
```

#### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your credentials:

```env
NODE_ENV=development
PORT=5000

# MySQL
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tradenova
DB_USER=root
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_key_minimum_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_minimum_32_chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Client
CLIENT_URL=http://localhost:3000
```

Create database:

```bash
mysql -u root -p -e "CREATE DATABASE tradenova CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

Start backend:

```bash
npm start
```

#### 3. Frontend Setup

Open new terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_WS_URL=ws://localhost:5000
```

Start frontend:

```bash
npm run dev
```

#### 4. Access Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api/health

#### 5. Create First User

Go to http://localhost:3000/register and create an account. You'll get **$10,000** demo balance instantly.

---

## 🔑 Demo Credentials

| Field | Value |
|:------|:------|
| Email | `admin@tradenova.com` |
| Password | `Admin123` |
| Starting Balance | $10,000 USD |

> ⚠️ Create this account by registering first.

---

## 📚 API Documentation

### Base URL

```
Development: http://localhost:5000/api
Production:  https://tradenova-cpfk.onrender.com/api
```

### 🔐 Authentication

| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:-------------:|
| `POST` | `/auth/register` | Register new user | ❌ |
| `POST` | `/auth/login` | Login user | ❌ |
| `POST` | `/auth/refresh-token` | Refresh access token | ❌ |
| `POST` | `/auth/logout` | Logout user | ✅ |
| `GET` | `/auth/profile` | Get user profile | ✅ |

<details>
<summary><b>📝 Register Example</b></summary>

**Request:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "Password123",
  "fullName": "Full Name"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "username": "username",
      "role": "user"
    },
    "accessToken": "eyJhbGciOi...",
    "refreshToken": "eyJhbGciOi..."
  }
}
```

</details>

### 💰 Trading

| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:----:|
| `POST` | `/trades/order` | Create new order | ✅ |
| `GET` | `/trades/orders` | Get all orders | ✅ |
| `GET` | `/trades/orders/:id` | Get order by ID | ✅ |
| `DELETE` | `/trades/orders/:id` | Cancel order | ✅ |
| `GET` | `/trades/positions` | Get open positions | ✅ |
| `GET` | `/trades/history` | Get trade history | ✅ |
| `GET` | `/trades/market/price/:symbol` | Get market price | ❌ |
| `GET` | `/trades/market/klines/:symbol` | Get kline data | ❌ |

### 💳 Wallet

| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:----:|
| `GET` | `/wallet` | Get wallet details | ✅ |
| `POST` | `/wallet/deposit` | Deposit funds | ✅ |
| `POST` | `/wallet/withdraw` | Withdraw funds | ✅ |
| `GET` | `/wallet/transactions` | Transaction history | ✅ |

### 📊 Analytics

| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:----:|
| `GET` | `/analytics/dashboard` | Dashboard stats | ✅ |
| `GET` | `/analytics/volume` | Trading volume | ✅ |
| `GET` | `/analytics/top-assets` | Top performing assets | ✅ |

---

## 🔌 WebSocket Events

### Client → Server

| Event | Payload | Description |
|:------|:--------|:------------|
| `subscribe-prices` | `['BTCUSDT', 'ETHUSDT']` | Subscribe to price updates |
| `unsubscribe-prices` | `['BTCUSDT']` | Unsubscribe from prices |
| `get-market-data` | `'BTCUSDT'` | Get 24hr stats |
| `get-klines` | `{symbol, interval, limit}` | Get candlestick data |

### Server → Client

| Event | Payload | Description |
|:------|:--------|:------------|
| `price-update` | `{symbol, price, timestamp}` | Real-time price |
| `market-data` | `{symbol, stats}` | 24hr statistics |
| `klines-data` | `{symbol, klines}` | Candlestick data |
| `order-update` | `{orderId, status}` | Order status change |

---

## 📁 Project Structure

```
TradeNova/
│
├── 📂 backend/                          # Node.js + Express API
│   ├── 📂 src/
│   │   ├── 📂 config/                   # Configuration
│   │   │   ├── database.js              # MySQL connection
│   │   │   ├── redis.js                 # Redis connection
│   │   │   └── sshTunnel.js              # SSH tunnel for production
│   │   │
│   │   ├── 📂 models/                   # Sequelize models
│   │   │   ├── index.js                 # Model associations
│   │   │   ├── User.model.js
│   │   │   ├── Wallet.model.js
│   │   │   ├── Trade.model.js
│   │   │   ├── Order.model.js
│   │   │   └── AuditLog.model.js
│   │   │
│   │   ├── 📂 controllers/              # Business logic
│   │   │   ├── auth.controller.js
│   │   │   ├── trade.controller.js
│   │   │   ├── wallet.controller.js
│   │   │   ├── analytics.controller.js
│   │   │   └── settings.controller.js
│   │   │
│   │   ├── 📂 routes/                   # API routes
│   │   ├── 📂 middleware/               # Express middleware
│   │   ├── 📂 services/                 # External services
│   │   ├── 📂 utils/                    # Helper functions
│   │   ├── 📂 socket/                   # WebSocket setup
│   │   └── app.js                       # Express app
│   │
│   ├── 📄 server.js                     # Entry point
│   ├── 📄 package.json
│   ├── 📄 .env.example
│   └── 📄 .gitignore
│
├── 📂 frontend/                         # React + Vite
│   ├── 📂 src/
│   │   ├── 📂 components/               # Reusable components
│   │   │   ├── 📂 common/               # Layout, Sidebar, Header
│   │   │   ├── 📂 charts/               # Chart components
│   │   │   ├── 📂 dashboard/            # Dashboard widgets
│   │   │   └── 📂 landing/              # Landing page sections
│   │   │
│   │   ├── 📂 pages/                    # Page components
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Trading.jsx
│   │   │   ├── Wallet.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Analytics.jsx
│   │   │   └── Settings.jsx
│   │   │
│   │   ├── 📂 store/                    # Redux store
│   │   │   ├── store.js
│   │   │   └── 📂 slices/
│   │   │       ├── authSlice.js
│   │   │       ├── tradeSlice.js
│   │   │       ├── walletSlice.js
│   │   │       ├── marketSlice.js
│   │   │       └── uiSlice.js
│   │   │
│   │   ├── 📂 utils/                    # Helpers
│   │   │   ├── api.js
│   │   │   ├── websocket.js
│   │   │   └── format.js
│   │   │
│   │   ├── 📄 App.jsx
│   │   ├── 📄 main.jsx
│   │   └── 📄 index.css
│   │
│   ├── 📄 index.html
│   ├── 📄 package.json
│   ├── 📄 vite.config.js
│   ├── 📄 tailwind.config.js
│   ├── 📄 .env.example
│   └── 📄 .gitignore
│
├── 📄 .gitignore
├── 📄 README.md
└── 📄 LICENSE
```

---

## 🚢 Deployment

### Deploy Backend to Render

1. Go to [render.com](https://render.com) and sign up with GitHub
2. Click **"New Web Service"**
3. Connect `TradeNova` repository
4. Configure:
   - **Name:** `tradenova-api`
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables (see `backend/.env.example`)
6. Add SSH key as Secret File at `/etc/secrets/ssh_key`
7. Click **"Create Web Service"**

### Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **"Add New Project"**
3. Import `TradeNova` repository
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add environment variables:
   ```
   VITE_API_URL=https://tradenova-cpfk.onrender.com
   VITE_WS_URL=wss://tradenova-cpfk.onrender.com
   ```
6. Click **"Deploy"**

### Setup MySQL on Hostim.dev

1. Sign up at [hostim.dev](https://hostim.dev)
2. Create new MySQL service
3. Copy connection credentials
4. Add SSH key for Bastion access
5. Configure in Render environment variables

---

## 🎯 Key Challenges Solved

### 1️⃣ SSH Tunnel Connection

**Problem:** Render backend needed to connect to a private MySQL database not exposed to the public internet.

**Solution:** Used `ssh2` library to create a secure tunnel through Hostim.dev's Bastion host.

```javascript
// backend/src/config/sshTunnel.js
sshClient.forwardOut(
  '127.0.0.1', 12345,
  process.env.DB_HOST, 3306,
  (err, stream) => { /* pipe data through tunnel */ }
);
```

### 2️⃣ Real-Time WebSocket Updates

**Problem:** Needed to display live crypto prices without constant API polling.

**Solution:** Implemented Socket.io with room-based subscriptions and a fallback mechanism.

### 3️⃣ Production CORS Configuration

**Problem:** Frontend (Vercel) and backend (Render) on different domains.

**Solution:** Dynamic CORS with support for multiple origins and Vercel preview URLs.

### 4️⃣ Environment-Specific Configuration

**Problem:** Local dev uses localhost, production uses SSH tunnel.

**Solution:** Conditional configuration based on `NODE_ENV`.

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation

---

## 📊 Project Stats

<div align="center">

![GitHub Stars](https://img.shields.io/github/stars/anurag91920/TradeNova?style=social)
![GitHub Forks](https://img.shields.io/github/forks/anurag91920/TradeNova?style=social)
![GitHub Issues](https://img.shields.io/github/issues/anurag91920/TradeNova)
![GitHub Last Commit](https://img.shields.io/github/last-commit/anurag91920/TradeNova)
![GitHub Code Size](https://img.shields.io/github/languages/code-size/anurag91920/TradeNova)
![GitHub Top Language](https://img.shields.io/github/languages/top/anurag91920/TradeNova)

</div>

---

## 🗺️ Roadmap

- [x] User authentication (JWT)
- [x] Real-time price updates
- [x] Trading system
- [x] Wallet management
- [x] Analytics dashboard
- [x] Landing page with pricing
- [x] Production deployment
- [ ] Google Authenticator 2FA
- [ ] Email verification
- [ ] Password reset flow
- [ ] Stripe payment integration
- [ ] Admin dashboard
- [ ] Mobile app (React Native)
- [ ] Social trading features
- [ ] Automated trading bots

---

## ❓ FAQ

<details>
<summary><b>Which database is used?</b></summary>
MySQL 8.0 with Sequelize ORM. We chose MySQL over MongoDB for relational data integrity in financial transactions.
</details>

<details>
<summary><b>Is this project production-ready?</b></summary>
Yes! It's deployed on Render + Vercel + Hostim.dev. However, for real production use, you should add KYC, additional security audits, and monitoring.
</details>

<details>
<summary><b>Can I use this as a template?</b></summary>
Absolutely! It's MIT licensed. Feel free to use it as a starter for your own projects.
</details>

<details>
<summary><b>How do I change the default $10,000 balance?</b></summary>
Edit `backend/src/controllers/auth.controller.js` in the `register` function — change the `balance: 10000` value.
</details>

<details>
<summary><b>Where do prices come from?</b></summary>
Binance API with automatic fallback to hardcoded prices if the API is unavailable.
</details>

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Anurag Chaurasiya

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 👨‍💻 Author

<div align="center">

### **Anurag Chaurasiya**

Full-Stack Developer | MERN Stack | React Enthusiast

[![GitHub](https://img.shields.io/badge/GitHub-anurag91920-181717?style=for-the-badge&logo=github)](https://github.com/anurag91920)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/anurag91920)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:anurag9120959628@gmail.com)

</div>

---

## 🙏 Acknowledgments

- [Binance API](https://binance-docs.github.io/apidocs/) — Real-time crypto data
- [CoinGecko API](https://www.coingecko.com/en/api) — Market information
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Vite](https://vitejs.dev/) — Next generation build tool
- [Sequelize](https://sequelize.org/) — Promise-based ORM
- [Render](https://render.com/) — Backend hosting
- [Vercel](https://vercel.com/) — Frontend hosting
- [Hostim.dev](https://hostim.dev/) — MySQL database hosting

---

<div align="center">

### ⭐ If you found this project helpful, please give it a star!

**Made with ❤️ by [Anurag Chaurasiya](https://github.com/anurag91920)**

[⬆ Back to Top](#-tradenova)

</div>
