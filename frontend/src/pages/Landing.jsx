import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  FiTrendingUp, FiShield, FiZap, FiBarChart2,
  FiArrowRight, FiCheck, FiActivity, FiGlobe
} from 'react-icons/fi';

const Landing = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // अगर user already logged in है, तो dashboard पर भेजें
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const features = [
    {
      icon: FiTrendingUp,
      title: 'Real-Time Trading',
      desc: 'Live crypto prices with instant order execution on major pairs'
    },
    {
      icon: FiShield,
      title: 'Bank-Level Security',
      desc: 'JWT auth, 2FA, and encrypted transactions for your safety'
    },
    {
      icon: FiZap,
      title: 'Lightning Fast',
      desc: 'Millisecond order execution powered by modern infrastructure'
    },
    {
      icon: FiBarChart2,
      title: 'Advanced Analytics',
      desc: 'Portfolio insights, P&L tracking, and market analysis'
    },
  ];

  const stats = [
    { value: '$2.5B+', label: 'Trading Volume' },
    { value: '50K+', label: 'Active Traders' },
    { value: '120+', label: 'Trading Pairs' },
    { value: '99.9%', label: 'Uptime' },
  ];

  const popularCryptos = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$67,500', change: '+2.4%', color: 'from-orange-500 to-yellow-500' },
    { symbol: 'ETH', name: 'Ethereum', price: '$3,450', change: '+1.8%', color: 'from-blue-500 to-indigo-500' },
    { symbol: 'BNB', name: 'BNB', price: '$585', change: '-0.5%', color: 'from-yellow-500 to-amber-500' },
    { symbol: 'SOL', name: 'Solana', price: '$175', change: '+4.2%', color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">

      {/* ==================== NAVIGATION ==================== */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-indigo-600 
                            rounded-lg flex items-center justify-center text-white font-bold text-xl">
              T
            </div>
            <span className="text-xl font-bold gradient-text">TradeNova</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#markets" className="text-slate-300 hover:text-white transition-colors">Markets</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login" className="px-5 py-2 text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-transparent to-transparent"></div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] 
                        bg-primary-500/20 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-[400px] h-[400px] 
                        bg-indigo-500/20 rounded-full blur-3xl opacity-20"></div>

        <div className="relative max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 
                          border border-primary-500/30 rounded-full text-sm text-primary-400 mb-6">
            <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></span>
            Live crypto markets · 24/7 trading
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Trade Crypto Like a<br />
            <span className="gradient-text">Pro Trader</span>
          </h1>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Advanced analytics, real-time data, and institutional-grade tools
            — all in one powerful dashboard trusted by thousands of traders worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3 text-lg">
              Start Trading Free <FiArrowRight />
            </Link>
            <Link to="/login" className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-3 text-lg">
              Live Demo
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-6 justify-center text-sm text-slate-400">
            <span className="flex items-center gap-2"><FiCheck className="text-success-500" /> No credit card required</span>
            <span className="flex items-center gap-2"><FiCheck className="text-success-500" /> Free forever plan</span>
            <span className="flex items-center gap-2"><FiCheck className="text-success-500" /> Instant setup</span>
          </div>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="py-16 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section id="features" className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You <span className="gradient-text">Need</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Powerful features designed for both beginners and professional traders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="card card-hover group">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500/20 to-indigo-500/20 
                                rounded-xl flex items-center justify-center mb-5 
                                group-hover:from-primary-500/40 group-hover:to-indigo-500/40 transition-all">
                  <feature.icon className="w-7 h-7 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MARKETS SECTION ==================== */}
      <section id="markets" className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Popular <span className="gradient-text">Markets</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Trade the most popular cryptocurrencies with competitive fees
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCryptos.map((crypto, i) => (
              <div key={i} className="card card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${crypto.color} 
                                  rounded-full flex items-center justify-center text-white font-bold`}>
                    {crypto.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-100">{crypto.symbol}</div>
                    <div className="text-xs text-slate-500">{crypto.name}</div>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold text-slate-100">{crypto.price}</div>
                  <div className={`text-sm font-medium ${
                    crypto.change.startsWith('+') ? 'text-success-400' : 'text-danger-400'
                  }`}>
                    {crypto.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/register" className="btn-primary inline-flex items-center gap-2 px-8 py-3">
              Start Trading Now <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose <span className="gradient-text">TradeNova</span>?
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                We combine cutting-edge technology with user-friendly design
                to give you the ultimate trading experience.
              </p>

              <div className="space-y-4">
                {[
                  'Real-time market data from Binance & CoinGecko',
                  'Advanced charting with candlestick patterns',
                  'Multi-currency wallet with instant deposits',
                  'Portfolio analytics and P&L tracking',
                  '24/7 customer support',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-success-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FiCheck className="w-4 h-4 text-success-400" />
                    </div>
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-indigo-500/20 
                              rounded-3xl blur-2xl"></div>
              <div className="relative card border-primary-500/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <FiActivity className="w-5 h-5 text-primary-400" />
                    <span className="font-semibold">Live Portfolio</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-success-400">
                    <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></span>
                    Live
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { symbol: 'BTC/USDT', amount: '0.5421', value: '$36,567.42', change: '+2.4%' },
                    { symbol: 'ETH/USDT', amount: '3.2451', value: '$11,195.60', change: '+1.8%' },
                    { symbol: 'SOL/USDT', amount: '25.8472', value: '$4,523.26', change: '+4.2%' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-100 text-sm">{item.symbol}</div>
                        <div className="text-xs text-slate-500">{item.amount}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-slate-100 text-sm">{item.value}</div>
                        <div className="text-xs text-success-400">{item.change}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Total Value</span>
                    <span className="text-2xl font-bold gradient-text">$52,286.28</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="card text-center bg-gradient-to-br from-primary-600/20 to-indigo-600/20 
                          border-primary-500/30 py-16 px-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-indigo-600 
                            rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-glow-lg">
              T
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Trading?
            </h2>
            <p className="text-slate-400 mb-8 text-lg">
              Join thousands of traders using TradeNova
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3">
                Create Free Account <FiArrowRight />
              </Link>
              <Link to="/login" className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-3">
                Sign In
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 justify-center mt-8 text-sm text-slate-400">
              <span className="flex items-center gap-2"><FiCheck className="text-success-500" /> No credit card</span>
              <span className="flex items-center gap-2"><FiCheck className="text-success-500" /> Free forever</span>
              <span className="flex items-center gap-2"><FiCheck className="text-success-500" /> Instant setup</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-indigo-600 
                                rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  T
                </div>
                <span className="text-xl font-bold gradient-text">TradeNova</span>
              </div>
              <p className="text-slate-400 text-sm">
                Advanced crypto trading platform for modern traders.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-slate-100">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#features" className="hover:text-primary-400 transition-colors">Features</a></li>
                <li><a href="#markets" className="hover:text-primary-400 transition-colors">Markets</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-slate-100">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-primary-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-slate-100">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 TradeNova. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <FiGlobe className="w-5 h-5 text-slate-500 hover:text-primary-400 cursor-pointer transition-colors" />
              <span className="text-slate-500 text-sm">Built with MERN + MySQL</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;