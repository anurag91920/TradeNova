import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiDollarSign, FiTrendingUp, FiActivity, FiBriefcase } from 'react-icons/fi';
import StatCard from '../components/common/StatCard';
import { fetchWallet } from '../store/slices/walletSlice';
import { fetchOrders } from '../store/slices/tradeSlice';
import { formatCurrency } from '../utils/format';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { initWebSocket } from '../utils/websocket';

const mockChartData = [
  { date: 'Mon', value: 4000 }, { date: 'Tue', value: 3000 },
  { date: 'Wed', value: 5000 }, { date: 'Thu', value: 4500 },
  { date: 'Fri', value: 6000 }, { date: 'Sat', value: 5500 },
  { date: 'Sun', value: 7000 },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { wallet } = useSelector((state) => state.wallet);
  const { prices } = useSelector((state) => state.market);
  const { orders } = useSelector((state) => state.trade);

  useEffect(() => {
    dispatch(fetchWallet());
    dispatch(fetchOrders());
    initWebSocket();
  }, [dispatch]);

  const stats = {
    balance: formatCurrency(wallet?.balance || 0),
    activeOrders: orders?.filter(o => o.status === 'PENDING').length || 0,
    btcPrice: prices['BTCUSDT'] ? formatCurrency(prices['BTCUSDT']) : '—',
    ethPrice: prices['ETHUSDT'] ? formatCurrency(prices['ETHUSDT']) : '—',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">
          Welcome back, <span className="gradient-text">{user?.username || 'Trader'}</span>!
        </h1>
        <p className="text-slate-400 mt-1">Here's your trading overview for today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Balance" value={stats.balance} icon={FiDollarSign} color="success" change={2.5} />
        <StatCard title="Active Orders" value={stats.activeOrders} icon={FiActivity} color="primary" />
        <StatCard title="BTC Price" value={stats.btcPrice} icon={FiTrendingUp} color="warning" change={1.8} />
        <StatCard title="ETH Price" value={stats.ethPrice} icon={FiBriefcase} color="danger" change={-0.5} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Portfolio Value</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Live Prices</h2>
          <div className="space-y-3">
            {['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT'].map((symbol) => (
              <div key={symbol} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {symbol.slice(0, 1)}
                  </div>
                  <span className="text-sm font-medium text-slate-200">{symbol}</span>
                </div>
                <span className="text-sm font-mono text-slate-100">
                  {prices[symbol] ? formatCurrency(prices[symbol]) : '—'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;