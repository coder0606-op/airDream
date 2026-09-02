import React, { useContext } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaHome, FaMap, FaIdCard, FaRunning, FaStar, FaEnvelope, FaSignOutAlt, FaImage, FaTags } from 'react-icons/fa';

const AdminLayout = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  const links = [
    { name: 'Dashboard', path: '/admin', icon: <FaHome /> },
    { name: 'Tours', path: '/admin/tours', icon: <FaMap /> },
    { name: 'Visas', path: '/admin/visas', icon: <FaIdCard /> },
    { name: 'Activities', path: '/admin/activities', icon: <FaRunning /> },
    { name: 'Travel Deals', path: '/admin/travel-deals', icon: <FaTags /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <FaStar /> },
    { name: 'Enquiries', path: '/admin/enquiries', icon: <FaEnvelope /> },
    { name: 'Popups', path: '/admin/popups', icon: <FaImage /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-primary text-white flex flex-col shadow-xl">
        {/* Logo */}
        <div className="p-5 border-b border-white/10 flex items-center gap-3">
          <img src="/images/logo.jpeg" alt="Air Dream" className="h-10 object-contain" />
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-base">Air Dream</span>
            <span className="text-gold text-[9px] font-semibold tracking-widest uppercase">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {links.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.icon} {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full text-left text-white/60 hover:bg-white/10 hover:text-white rounded-lg text-sm font-medium transition-all">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center px-8 justify-between border-b border-gray-100">
          <h2 className="text-lg font-semibold text-primary">Air Dream Travel & Tourism</h2>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-dark text-sm">Admin</span>
              <span className="text-[11px] text-gray-400">Administrator</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
