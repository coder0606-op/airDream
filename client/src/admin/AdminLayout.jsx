import React, { useContext } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaHome, FaMap, FaIdCard, FaRunning, FaStar, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

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
    { name: 'Testimonials', path: '/admin/testimonials', icon: <FaStar /> },
    { name: 'Enquiries', path: '/admin/enquiries', icon: <FaEnvelope /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-dark text-white flex flex-col">
        <div className="p-5 font-bold text-2xl border-b border-gray-800 text-primary">Air Dream Admin</div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {links.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
              >
                {link.icon} {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full text-left text-coral hover:bg-gray-800 rounded-md transition-colors">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center px-8 justify-end">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
            <span className="font-semibold text-dark">Admin</span>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
