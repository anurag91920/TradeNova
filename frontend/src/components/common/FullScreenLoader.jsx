import React from 'react';

const FullScreenLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-950">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary-500/20 border-t-primary-500 
                      rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-400 font-medium">Loading TradeNova...</p>
    </div>
  </div>
);

export default FullScreenLoader;