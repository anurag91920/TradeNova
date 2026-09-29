import React from 'react';

const StatCard = ({ title, value, change, icon: Icon, color = 'primary' }) => {
  const colors = {
    primary: 'from-primary-500/20 to-indigo-500/20 text-primary-400',
    success: 'from-success-500/20 to-emerald-500/20 text-success-400',
    danger: 'from-danger-500/20 to-red-500/20 text-danger-400',
    warning: 'from-warning-500/20 to-amber-500/20 text-warning-400',
  };

  return (
    <div className="card card-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-100">{value}</p>
          {change !== undefined && (
            <p className={`text-sm mt-2 ${change >= 0 ? 'text-success-400' : 'text-danger-400'}`}>
              {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
            </p>
          )}
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors[color]} 
                          flex items-center justify-center`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;