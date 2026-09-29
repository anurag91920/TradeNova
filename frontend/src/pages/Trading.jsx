import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../store/slices/tradeSlice';
import { formatCurrency } from '../utils/format';
import toast from 'react-hot-toast';

const Trading = () => {
  const dispatch = useDispatch();
  const { prices } = useSelector((state) => state.market);
  const [form, setForm] = useState({
    symbol: 'BTCUSDT', side: 'BUY', type: 'MARKET', price: '', quantity: '', stopPrice: '',
  });

  const currentPrice = prices[form.symbol] || 0;
  const total = (form.type === 'MARKET' ? currentPrice : parseFloat(form.price || 0)) * parseFloat(form.quantity || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.quantity) return toast.error('Enter quantity');
    if (form.type !== 'MARKET' && !form.price) return toast.error('Enter price');

    await dispatch(createOrder({
      ...form,
      price: form.type === 'MARKET' ? undefined : parseFloat(form.price),
      quantity: parseFloat(form.quantity),
    }));
    
    setForm({ ...form, price: '', quantity: '', stopPrice: '' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      <div className="lg:col-span-2 card">
        <h1 className="text-2xl font-bold text-slate-100 mb-4">Trading Terminal</h1>
        <p className="text-slate-400 mb-6">Place market and limit orders instantly</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT'].map(s => (
            <button
              key={s}
              onClick={() => setForm({ ...form, symbol: s })}
              className={`p-4 rounded-lg border text-left transition-all ${
                form.symbol === s
                  ? 'border-primary-500 bg-primary-500/10'
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
              }`}
            >
              <p className="text-sm font-semibold text-slate-200">{s}</p>
              <p className="text-lg font-mono text-primary-400">
                {prices[s] ? formatCurrency(prices[s]) : '—'}
              </p>
            </button>
          ))}
        </div>

        <div className="p-4 bg-slate-800/50 rounded-lg mb-6">
          <p className="text-xs text-slate-500 mb-1">Current Price</p>
          <p className="text-3xl font-bold text-slate-100">
            {currentPrice ? formatCurrency(currentPrice) : '—'}
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Place Order</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button type="button"
              onClick={() => setForm({ ...form, side: 'BUY' })}
              className={`py-2 rounded-lg font-medium transition-all ${
                form.side === 'BUY' ? 'bg-success-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
              BUY
            </button>
            <button type="button"
              onClick={() => setForm({ ...form, side: 'SELL' })}
              className={`py-2 rounded-lg font-medium transition-all ${
                form.side === 'SELL' ? 'bg-danger-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
              SELL
            </button>
          </div>

          <div>
            <label className="label">Order Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="input-field"
            >
              <option value="MARKET">Market</option>
              <option value="LIMIT">Limit</option>
              <option value="STOP_LOSS">Stop Loss</option>
            </select>
          </div>

          {form.type !== 'MARKET' && (
            <div>
              <label className="label">Price (USD)</label>
              <input
                type="number" step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder={currentPrice.toString()}
                className="input-field"
              />
            </div>
          )}

          <div>
            <label className="label">Quantity</label>
            <input
              type="number" step="0.0001"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              placeholder="0.001"
              className="input-field"
            />
          </div>

          <div className="p-3 bg-slate-800 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total:</span>
              <span className="font-mono text-slate-100">{formatCurrency(total)}</span>
            </div>
          </div>

          <button type="submit" className={`w-full py-2.5 rounded-lg font-medium text-white transition-all ${
            form.side === 'BUY' ? 'bg-success-600 hover:bg-success-700' : 'bg-danger-600 hover:bg-danger-700'
          }`}>
            {form.side} {form.symbol}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Trading;