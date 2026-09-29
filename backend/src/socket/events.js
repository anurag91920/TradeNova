export const SOCKET_EVENTS = {
  // Client -> Server
  SUBSCRIBE_PRICES: 'subscribe-prices',
  UNSUBSCRIBE_PRICES: 'unsubscribe-prices',
  GET_MARKET_DATA: 'get-market-data',
  GET_KLINES: 'get-klines',

  // Server -> Client
  PRICE_UPDATE: 'price-update',
  MARKET_DATA: 'market-data',
  KLINES_DATA: 'klines-data',
  ORDER_UPDATE: 'order-update',
  TRADE_EXECUTED: 'trade-executed',
  BALANCE_UPDATE: 'balance-update',
  NOTIFICATION: 'notification',
  ERROR: 'error'
};

export default SOCKET_EVENTS;