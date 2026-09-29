import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const volumeData = [
  { day: 'Mon', volume: 12000 }, { day: 'Tue', volume: 15000 },
  { day: 'Wed', volume: 18000 }, { day: 'Thu', volume: 14000 },
  { day: 'Fri', volume: 22000 }, { day: 'Sat', volume: 19000 },
  { day: 'Sun', volume: 25000 },
];

const assetData = [
  { name: 'BTC', value: 45, color: '#f59e0b' },
  { name: 'ETH', value: 25, color: '#6366f1' },
  { name: 'BNB', value: 15, color: '#22c55e' },
  { name: 'SOL', value: 10, color: '#8b5cf6' },
  { name: 'Others', value: 5, color: '#ef4444' },
];

const Analytics = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-100">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Trading Volume (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="volume" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Portfolio Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={assetData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {assetData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Portfolio Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={volumeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="day" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Line type="monotone" dataKey="volume" stroke="#22c55e" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;