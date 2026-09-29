import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, fetchPositions, cancelOrder } from '../store/slices/tradeSlice';
import { formatCurrency, formatDate } from '../utils/format';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, positions } = useSelector((state) => state.trade);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchPositions());
  }, [dispatch]);

  const getStatusBadge = (status) => {
    const map = {
      FILLED: 'badge-success', PENDING: 'badge-warning',
      CANCELLED: 'badge-danger', PARTIALLY_FILLED: 'badge-info',
    };
    return map[status] || 'badge-info';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Orders</h1>
        <p className="text-slate-400 mt-1">Track your active and historical orders</p>
      </div>

      {positions?.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Open Positions ({positions.length})</h2>
          <div className="space-y-2">
            {positions.map((pos) => (
              <div key={pos.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-200">{pos.symbol} · {pos.side}</p>
                  <p className="text-xs text-slate-500">Qty: {pos.quantity} @ {formatCurrency(pos.price)}</p>
                </div>
                <button onClick={() => dispatch(cancelOrder(pos.id))} className="btn-danger text-sm py-1.5 px-3">
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Order History</h2>
        {orders?.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 border-b border-slate-800">
                  <th className="text-left py-3 px-2">Symbol</th>
                  <th className="text-left py-3 px-2">Side</th>
                  <th className="text-left py-3 px-2">Type</th>
                  <th className="text-right py-3 px-2">Price</th>
                  <th className="text-right py-3 px-2">Qty</th>
                  <th className="text-right py-3 px-2">Total</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td className="py-3 px-2 font-medium text-slate-200">{o.symbol}</td>
                    <td className={`py-3 px-2 font-medium ${o.side === 'BUY' ? 'text-success-400' : 'text-danger-400'}`}>
                      {o.side}
                    </td>
                    <td className="py-3 px-2 text-slate-400">{o.type}</td>
                    <td className="py-3 px-2 text-right font-mono text-slate-300">{formatCurrency(o.price)}</td>
                    <td className="py-3 px-2 text-right font-mono text-slate-300">{o.quantity}</td>
                    <td className="py-3 px-2 text-right font-mono text-slate-300">{formatCurrency(o.total)}</td>
                    <td className="py-3 px-2">
                      <span className={getStatusBadge(o.status)}>{o.status}</span>
                    </td>
                    <td className="py-3 px-2 text-slate-500 text-xs">{formatDate(o.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-500 text-center py-8">No orders yet</p>
        )}
      </div>
    </div>
  );
};

export default Orders;