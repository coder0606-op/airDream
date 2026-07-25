import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { FaMap, FaIdCard, FaRunning, FaStar, FaEnvelope, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({ tours: 0, visas: 0, activities: 0, testimonials: 0, enquiries: 0, unread: 0 });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [tours, visas, activities, testimonials, enquiries] = await Promise.all([
          api.get('/tours?all=true').catch(() => ({ data: [] })),
          api.get('/visas?all=true').catch(() => ({ data: [] })),
          api.get('/activities?all=true').catch(() => ({ data: [] })),
          api.get('/testimonials').catch(() => ({ data: [] })),
          api.get('/enquiries?limit=5').catch(() => ({ data: { enquiries: [] } }))
        ]);
        const enquiryList = enquiries.data?.enquiries || [];
        setStats({
          tours: Array.isArray(tours.data) ? tours.data.length : 0,
          visas: Array.isArray(visas.data) ? visas.data.length : 0,
          activities: Array.isArray(activities.data) ? activities.data.length : 0,
          testimonials: Array.isArray(testimonials.data) ? testimonials.data.length : 0,
          enquiries: enquiryList.length,
          unread: enquiryList.filter(e => !e.isRead).length
        });
        setRecentEnquiries(enquiryList.slice(0, 5));
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Tours', value: stats.tours, icon: <FaMap />, color: 'bg-blue-500', bg: 'bg-blue-50' },
    { label: 'Visas', value: stats.visas, icon: <FaIdCard />, color: 'bg-purple-500', bg: 'bg-purple-50' },
    { label: 'Activities', value: stats.activities, icon: <FaRunning />, color: 'bg-amber-500', bg: 'bg-amber-50' },
    { label: 'Testimonials', value: stats.testimonials, icon: <FaStar />, color: 'bg-green-500', bg: 'bg-green-50' },
    { label: 'Enquiries', value: stats.enquiries, icon: <FaEnvelope />, color: 'bg-primary', bg: 'bg-cyan-50', extra: stats.unread > 0 ? `${stats.unread} new` : null },
  ];

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading dashboard...</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to Air Dream Travel & Tourism admin panel</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {cards.map(card => (
          <div key={card.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${card.bg} rounded-lg flex items-center justify-center ${card.color.replace('bg-', 'text-')}`}>
                {card.icon}
              </div>
              {card.extra && <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{card.extra}</span>}
            </div>
            <p className="text-3xl font-bold text-dark">{card.value}</p>
            <p className="text-sm text-gray-400 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaChartLine className="text-primary" />
          <h2 className="text-lg font-bold text-dark">Recent Enquiries</h2>
        </div>
        {recentEnquiries.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No enquiries yet</p>
        ) : (
          <div className="space-y-3">
            {recentEnquiries.map(eq => (
              <div key={eq._id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${eq.isRead ? 'bg-gray-300' : 'bg-primary'}`}>
                  {eq.fullName?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-dark text-sm truncate">{eq.fullName}</p>
                  <p className="text-xs text-gray-400 truncate">{eq.serviceRequired} · {eq.destination || eq.email}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${eq.isRead ? 'bg-gray-100 text-gray-400' : 'bg-primary/10 text-primary'}`}>
                  {eq.isRead ? 'Read' : 'New'}
                </span>
                <span className="text-xs text-gray-400 shrink-0">{new Date(eq.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
