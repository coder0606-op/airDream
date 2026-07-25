import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { FaTrash, FaEnvelope, FaEnvelopeOpen, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ManageEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const fetchEnquiries = async () => {
    try {
      const res = await api.get('/enquiries?limit=100');
      localStorage.getItem("token")
      setEnquiries(res.data?.enquiries || []);
    } catch { setEnquiries([]); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchEnquiries(); }, []);

  const markRead = async (id) => {
    try { await api.put(`/enquiries/${id}/read`); fetchEnquiries(); }
    catch { toast.error('Error updating'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return;
    try { await api.delete(`/enquiries/${id}`); toast.success('Deleted'); fetchEnquiries(); }
    catch { toast.error('Error deleting'); }
  };

  const filtered = filter === 'all' ? enquiries : filter === 'unread' ? enquiries.filter(e => !e.isRead) : enquiries.filter(e => e.isRead);
  const unreadCount = enquiries.filter(e => !e.isRead).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark">Enquiries</h1>
          <p className="text-sm text-gray-500 mt-1">{unreadCount} unread · {enquiries.length} total</p>
        </div>
        <div className="flex gap-2">
          {['all', 'unread', 'read'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors capitalize ${filter === f ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>{f} {f === 'unread' && unreadCount > 0 && <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">{unreadCount}</span>}</button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {loading ? <p className="text-center text-gray-400 py-8">Loading...</p>
        : filtered.length === 0 ? <p className="text-center text-gray-400 py-8">No enquiries found.</p>
        : filtered.map(eq => (
          <div key={eq._id} className={`bg-white rounded-xl shadow-sm border transition-all ${eq.isRead ? 'border-gray-100' : 'border-primary/30 bg-primary/[0.02]'}`}>
            <div className="flex items-center gap-4 p-5 cursor-pointer" onClick={() => setExpanded(expanded === eq._id ? null : eq._id)}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${eq.isRead ? 'bg-gray-100 text-gray-400' : 'bg-primary/10 text-primary'}`}>
                {eq.isRead ? <FaEnvelopeOpen /> : <FaEnvelope />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold truncate ${eq.isRead ? 'text-gray-600' : 'text-dark'}`}>{eq.fullName}</h3>
                  {!eq.isRead && <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">NEW</span>}
                </div>
                <p className="text-sm text-gray-400 truncate">{eq.serviceRequired} · {eq.destination || 'No destination'} · {eq.email}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-gray-400">{new Date(eq.createdAt).toLocaleDateString()}</span>
                {expanded === eq._id ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
              </div>
            </div>
            {expanded === eq._id && (
              <div className="px-5 pb-5 border-t border-gray-50">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 text-sm">
                  <div><span className="text-gray-400 block">Phone</span><span className="font-medium">{eq.phone}</span></div>
                  <div><span className="text-gray-400 block">Email</span><span className="font-medium">{eq.email}</span></div>
                  <div><span className="text-gray-400 block">City</span><span className="font-medium">{eq.city || '-'}</span></div>
                  <div><span className="text-gray-400 block">Destination</span><span className="font-medium">{eq.destination || '-'}</span></div>
                  <div><span className="text-gray-400 block">Service</span><span className="font-medium">{eq.serviceRequired || '-'}</span></div>
                  <div><span className="text-gray-400 block">Date</span><span className="font-medium">{new Date(eq.createdAt).toLocaleString()}</span></div>
                </div>
                {eq.message && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <span className="text-xs text-gray-400 block mb-1">Message</span>
                    <p className="text-sm text-gray-700">{eq.message}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  {!eq.isRead && <button onClick={() => markRead(eq._id)} className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/20 transition-colors">Mark as Read</button>}
                  <button onClick={() => handleDelete(eq._id)} className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors flex items-center gap-1"><FaTrash size={12} /> Delete</button>
                  <a href={`mailto:${eq.email}`} className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">Reply via Email</a>
                  <a href={`https://wa.me/${eq.phone?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-100 transition-colors">WhatsApp</a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageEnquiries;
