import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiMenu, FiBell, FiUser, FiWifi, FiWifiOff } from 'react-icons/fi';
import { toggleSidebar } from '../../store/slices/uiSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { connected } = useSelector((state) => state.market);

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 
                       flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <FiMenu className="w-5 h-5 text-slate-400" />
        </button>
        <div className="hidden md:flex items-center gap-2">
          {connected ? (
            <>
              <FiWifi className="w-4 h-4 text-success-500" />
              <span className="text-xs text-success-400">Live</span>
            </>
          ) : (
            <>
              <FiWifiOff className="w-4 h-4 text-danger-500" />
              <span className="text-xs text-danger-400">Offline</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors relative">
          <FiBell className="w-5 h-5 text-slate-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
          <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-indigo-600 
                          rounded-full flex items-center justify-center text-white font-semibold">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-200">
              {user?.fullName || user?.username || 'User'}
            </p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;