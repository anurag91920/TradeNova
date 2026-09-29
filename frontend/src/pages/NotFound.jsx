import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
    <div className="text-center">
      <h1 className="text-9xl font-bold gradient-text">404</h1>
      <p className="text-xl text-slate-400 mt-4 mb-8">Page not found</p>
      <Link to="/dashboard" className="btn-primary inline-block">
        Go to Dashboard
      </Link>
    </div>
  </div>
);

export default NotFound;