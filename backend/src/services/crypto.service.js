import axios from 'axios';
import { logger } from '../utils/logger.js';

class CryptoService {
  constructor() {
    this.baseURL = 'https://api.binance.com';
    this.apiKey = process.env.BINANCE_API_KEY;
    this.apiSecret = process.env.BINANCE_SECRET_KEY;
    
    // Simple in-memory cache
    this.cache = new Map();
    this.cacheTTL = 30000; // 30 seconds
  }

  // ==================== CACHE HELPERS ====================
  getCached(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data;
    }
    return null;
  }

  setCache(key, data) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  // ==================== GET MARKET PRICE ====================
  async getMarketPrice(symbol) {
    try {
      const upperSymbol = symbol.toUpperCase();
      const cacheKey = `price_${upperSymbol}`;
      
      const cached = this.getCached(cacheKey);
      if (cached) return cached;

      const response = await axios.get(`${this.baseURL}/api/v3/ticker/price`, {
        params: { symbol: upperSymbol },
        timeout: 5000
      });

      const price = parseFloat(response.data.price);
      this.setCache(cacheKey, price);
      
      return price;
    } catch (error) {
      logger.error(`Failed to fetch price for ${symbol}:`, error.message);
      // Return a fallback price for demo purposes
      return this.getFallbackPrice(symbol);
    }
  }

  // ==================== GET 24HR STATS ====================
  async get24hrStats(symbol) {
    try {
      const upperSymbol = symbol.toUpperCase();
      const cacheKey = `stats_${upperSymbol}`;
      
      const cached = this.getCached(cacheKey);
      if (cached) return cached;

      const response = await axios.get(`${this.baseURL}/api/v3/ticker/24hr`, {
        params: { symbol: upperSymbol },
        timeout: 5000
      });

      const stats = {
        symbol: response.data.symbol,
        priceChange: parseFloat(response.data.priceChange),
        priceChangePercent: parseFloat(response.data.priceChangePercent),
        weightedAvgPrice: parseFloat(response.data.weightedAvgPrice),
        prevClosePrice: parseFloat(response.data.prevClosePrice),
        lastPrice: parseFloat(response.data.lastPrice),
        bidPrice: parseFloat(response.data.bidPrice),
        askPrice: parseFloat(response.data.askPrice),
        openPrice: parseFloat(response.data.openPrice),
        highPrice: parseFloat(response.data.highPrice),
        lowPrice: parseFloat(response.data.lowPrice),
        volume: parseFloat(response.data.volume),
        quoteVolume: parseFloat(response.data.quoteVolume),
        openTime: response.data.openTime,
        closeTime: response.data.closeTime,
        count: response.data.count
      };

      this.setCache(cacheKey, stats);
      return stats;
    } catch (error) {
      logger.error(`Failed to fetch 24hr stats for ${symbol}:`, error.message);
      return this.getFallbackStats(symbol);
    }
  }

  // ==================== GET KLINES (Candlestick Data) ====================
  async getKlines(symbol, interval = '1h', limit = 100) {
    try {
      const upperSymbol = symbol.toUpperCase();
      const cacheKey = `klines_${upperSymbol}_${interval}_${limit}`;
      
      const cached = this.getCached(cacheKey);
      if (cached) return cached;

      const response = await axios.get(`${this.baseURL}/api/v3/klines`, {
        params: {
          symbol: upperSymbol,
          interval,
          limit
        },
        timeout: 10000
      });

      const klines = response.data.map(kline => ({
        openTime: kline[0],
        open: parseFloat(kline[1]),
        high: parseFloat(kline[2]),
        low: parseFloat(kline[3]),
        close: parseFloat(kline[4]),
        volume: parseFloat(kline[5]),
        closeTime: kline[6],
        quoteAssetVolume: parseFloat(kline[7]),
        numberOfTrades: kline[8],
        takerBuyBaseVolume: parseFloat(kline[9]),
        takerBuyQuoteVolume: parseFloat(kline[10])
      }));

      this.setCache(cacheKey, klines);
      return klines;
    } catch (error) {
      logger.error(`Failed to fetch klines for ${symbol}:`, error.message);
      return this.getFallbackKlines(symbol, limit);
    }
  }

  // ==================== GET TOP CRYPTOS (CoinGecko) ====================
  async getTopCryptos(limit = 10) {
    try {
      const cacheKey = `top_cryptos_${limit}`;
      
      const cached = this.getCached(cacheKey);
      if (cached) return cached;

      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: limit,
          page: 1,
          sparkline: false
        },
        timeout: 10000
      });

      const cryptos = response.data.map(coin => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        currentPrice: coin.current_price,
        marketCap: coin.market_cap,
        volume24h: coin.total_volume,
        priceChange24h: coin.price_change_percentage_24h,
        image: coin.image,
        rank: coin.market_cap_rank
      }));

      this.setCache(cacheKey, cryptos);
      return cryptos;
    } catch (error) {
      logger.error('Failed to fetch top cryptos:', error.message);
      return this.getFallbackTopCryptos();
    }
  }

  // ==================== GET MARKET OVERVIEW ====================
  async getMarketOverview() {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/global', {
        timeout: 10000
      });

      return {
        totalMarketCap: response.data.data.total_market_cap.usd,
        totalVolume: response.data.data.total_volume.usd,
        marketCapChange24h: response.data.data.market_cap_change_percentage_24h_usd,
        btcDominance: response.data.data.market_cap_percentage.btc,
        ethDominance: response.data.data.market_cap_percentage.eth,
        activeCryptocurrencies: response.data.data.active_cryptocurrencies,
        markets: response.data.data.markets
      };
    } catch (error) {
      logger.error('Failed to fetch market overview:', error.message);
      return {
        totalMarketCap: 0,
        totalVolume: 0,
        marketCapChange24h: 0,
        btcDominance: 0,
        ethDominance: 0,
        activeCryptocurrencies: 0,
        markets: 0
      };
    }
  }

  // ==================== FALLBACK PRICES (Offline Mode) ====================
  getFallbackPrice(symbol) {
    const fallbackPrices = {
      'BTCUSDT': 67500.00,
      'ETHUSDT': 3450.00,
      'BNBUSDT': 585.00,
      'SOLUSDT': 175.00,
      'ADAUSDT': 0.65,
      'XRPUSDT': 0.62,
      'DOGEUSDT': 0.15,
      'DOTUSDT': 7.20,
      'MATICUSDT': 0.85,
      'LTCUSDT': 85.00,
      'AVAXUSDT': 35.00,
      'LINKUSDT': 18.00,
      'UNIUSDT': 8.50,
      'ATOMUSDT': 9.20,
      'ETCUSDT': 25.00
    };
    
    return fallbackPrices[symbol.toUpperCase()] || 100.00;
  }

  getFallbackStats(symbol) {
    const price = this.getFallbackPrice(symbol);
    const change = (Math.random() - 0.5) * 5; // -2.5% to +2.5%
    
    return {
      symbol: symbol.toUpperCase(),
      priceChange: price * (change / 100),
      priceChangePercent: change,
      weightedAvgPrice: price,
      prevClosePrice: price * (1 - change / 100),
      lastPrice: price,
      bidPrice: price * 0.999,
      askPrice: price * 1.001,
      openPrice: price * (1 - change / 100),
      highPrice: price * 1.02,
      lowPrice: price * 0.98,
      volume: 1000000,
      quoteVolume: 1000000 * price,
      openTime: Date.now() - 86400000,
      closeTime: Date.now(),
      count: 50000
    };
  }

  getFallbackKlines(symbol, limit) {
    const basePrice = this.getFallbackPrice(symbol);
    const klines = [];
    
    for (let i = limit; i > 0; i--) {
      const time = Date.now() - i * 3600000;
      const variation = (Math.random() - 0.5) * 0.02;
      const open = basePrice * (1 + variation);
      const close = open * (1 + (Math.random() - 0.5) * 0.01);
      const high = Math.max(open, close) * 1.005;
      const low = Math.min(open, close) * 0.995;
      
      klines.push({
        openTime: time,
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        volume: Math.random() * 1000,
        closeTime: time + 3600000,
        quoteAssetVolume: Math.random() * 100000,
        numberOfTrades: Math.floor(Math.random() * 1000),
        takerBuyBaseVolume: Math.random() * 500,
        takerBuyQuoteVolume: Math.random() * 50000
      });
    }
    
    return klines;
  }

  getFallbackTopCryptos() {
    return [
      { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', currentPrice: 67500, marketCap: 1320000000000, volume24h: 35000000000, priceChange24h: 2.5, rank: 1 },
      { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', currentPrice: 3450, marketCap: 415000000000, volume24h: 18000000000, priceChange24h: 1.8, rank: 2 },
      { id: 'tether', symbol: 'USDT', name: 'Tether', currentPrice: 1.00, marketCap: 95000000000, volume24h: 45000000000, priceChange24h: 0.01, rank: 3 },
      { id: 'binancecoin', symbol: 'BNB', name: 'BNB', currentPrice: 585, marketCap: 88000000000, volume24h: 1500000000, priceChange24h: -0.5, rank: 4 },
      { id: 'solana', symbol: 'SOL', name: 'Solana', currentPrice: 175, marketCap: 78000000000, volume24h: 3200000000, priceChange24h: 4.2, rank: 5 },
      { id: 'ripple', symbol: 'XRP', name: 'XRP', currentPrice: 0.62, marketCap: 34000000000, volume24h: 1200000000, priceChange24h: -1.2, rank: 6 },
      { id: 'usd-coin', symbol: 'USDC', name: 'USD Coin', currentPrice: 1.00, marketCap: 33000000000, volume24h: 5000000000, priceChange24h: 0.01, rank: 7 },
      { id: 'cardano', symbol: 'ADA', name: 'Cardano', currentPrice: 0.65, marketCap: 23000000000, volume24h: 800000000, priceChange24h: 0.8, rank: 8 },
      { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', currentPrice: 0.15, marketCap: 21000000000, volume24h: 1500000000, priceChange24h: 3.5, rank: 9 },
      { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche', currentPrice: 35, marketCap: 13000000000, volume24h: 500000000, priceChange24h: -2.1, rank: 10 }
    ];
  }

  // ==================== POPULAR SYMBOLS ====================
  getPopularSymbols() {
    return [
      'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT',
      'XRPUSDT', 'DOGEUSDT', 'DOTUSDT', 'MATICUSDT', 'LTCUSDT',
      'AVAXUSDT', 'LINKUSDT', 'UNIUSDT', 'ATOMUSDT', 'ETCUSDT'
    ];
  }
}

// Create and export singleton instance
export const cryptoService = new CryptoService();

// Also export the class and default for flexibility
export default cryptoService;