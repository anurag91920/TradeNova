import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWallet, deposit, withdraw } from '../store/slices/walletSlice';
import { formatCurrency } from '../utils/format';
import { FiArrowDownCircle, FiArrowUpCircle, FiDollarSign } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Wallet = () => {
  const dispatch = useDispatch();
  const { wallet, transactions } = useSelector((state) => state.wallet);
  const [modal, setModal] = useState(null);
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => { dispatch(fetchWallet()); }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return toast.error('Enter valid amount');
    
    if (modal === 'deposit') {
      await dispatch(deposit({ amount: parseFloat(amount), currency: 'USD' }));
    } else {
      if (!address) return toast.error('Enter withdrawal address');
      await dispatch(withdraw({ amount: parseFloat(amount), address, currency: 'USD' }));
    }
    
    setModal(null);
    setAmount('');
    setAddress('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-100">Wallet</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-primary-600 to-indigo-700 border-none">
          <FiDollarSign className="w-8 h-8 text-white/80 mb-3" />
          <p className="text-white/80 text-sm">Available Balance</p>
          <p className="text-3xl font-bold text-white">{formatCurrency(wallet?.balance || 0)}</p>
        </div>
        <div className="card">
          <p className="text-slate-400 text-sm">Locked Balance</p>
          <p className="text-2xl font-bold text-slate-100">{formatCurrency(wallet?.lockedBalance || 0)}</p>
        </div>
        <div className="card">
          <p className="text-slate-400 text-sm">Total Profit</p>
          <p className="text-2xl font-bold text-success-400">{formatCurrency(wallet?.totalProfit || 0)}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={() => setModal('deposit')} className="btn-primary flex items-center gap-2">
          <FiArrowDownCircle /> Deposit
        </button>
        <button onClick={() => setModal('withdraw')} className="btn-secondary flex items-center gap-2">
          <FiArrowUpCircle /> Withdraw
        </button>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Recent Transactions</h2>
        {transactions?.length ? (
          <div className="space-y-2">
            {transactions.map((tx, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-slate-200">{tx.symbol} · {tx.type}</p>
                  <p className="text-xs text-slate-500">{new Date(tx.createdAt).toLocaleString()}</p>
                </div>
                <p className={`font-mono text-sm ${tx.type === 'BUY' ? 'text-danger-400' : 'text-success-400'}`}>
                  {tx.type === 'BUY' ? '-' : '+'}{formatCurrency(tx.total)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-8">No transactions yet</p>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full">
            <h3 className="text-xl font-bold text-slate-100 mb-4 capitalize">{modal}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Amount (USD)</label>
                <input type="number" step="0.01" value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input-field" placeholder="100.00" />
              </div>
              {modal === 'withdraw' && (
                <div>
                  <label className="label">Withdrawal Address</label>
                  <input type="text" value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input-field" placeholder="0x..." />
                </div>
              )}
              <div className="flex gap-3">
                <button type="submit" className="btn-primary flex-1">Confirm</button>
                <button type="button" onClick={() => setModal(null)} className="btn-secondary flex-1">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;