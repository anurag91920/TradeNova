import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FiHome, FiTrendingUp, FiCreditCard, FiList,
  FiBarChart2, FiSettings, FiLogOut,
} from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const navItems = [
  { to: '/app/dashboard', icon: FiHome, label: 'Dashboard' },
  { to: '/app/trading', icon: FiTrendingUp, label: 'Trading' },
  { to: '/app/wallet', icon: FiCreditCard, label: 'Wallet' },
  { to: '/app/orders', icon: FiList, label: 'Orders' },
  { to: '/app/analytics', icon: FiBarChart2, label: 'Analytics' },
  { to: '/app/settings', icon: FiSettings, label: 'Settings' },
];

const Sidebar = () => {
  const { sidebarOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-slate-900 border-r border-slate-800 
                  transition-all duration-300 z-30 ${sidebarOpen ? 'w-64' : 'w-20'}`}
    >
      <div className="flex items-center gap-3 px-5 h-16 border-b border-slate-800">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-indigo-600 
                        rounded-lg flex items-center justify-center text-white font-bold text-xl">
          T
        </div>
        {sidebarOpen && (
          <div>
            <h1 className="text-lg font-bold gradient-text">TradeNova</h1>
            <p className="text-xs text-slate-500">Crypto Dashboard</p>
          </div>
        )}
      </div>

      <nav className="p-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''} ${!sidebarOpen ? 'justify-center' : ''}`
            }
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-4 left-0 right-0 p-3">
        <button
          onClick={() => dispatch(logout())}
          className={`sidebar-link w-full text-danger-400 hover:bg-danger-500/10 
                      hover:text-danger-400 ${!sidebarOpen ? 'justify-center' : ''}`}
        >
          <FiLogOut className="w-5 h-5 flex-shrink-0" />
          {sidebarOpen && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;