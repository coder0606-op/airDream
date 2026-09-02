import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { FaPlus, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

const emptyActivity = { title: '', price: '', originalPrice: '', category: 'Desert Safari', rating: 4.0, duration: { days: 1, nights: 0 }, activities: '', imageUrl: '' };

const ManageActivities = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyActivity);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try { const res = await api.get('/activities?all=true'); setItems(Array.isArray(res.data) ? res.data : []); }
    catch { setItems([]); } finally { setLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyActivity); setShowModal(true); };
  const openEdit = (item) => {
    setEditing(item._id);
    setForm({ title: item.title, price: item.price, originalPrice: item.originalPrice || '', category: item.category || 'Adventure', rating: item.rating || 4.0, duration: item.duration || { days: 1, nights: 0 }, activities: (item.activities || []).join(', '), imageUrl: (item.images && item.images[0]) || '' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title: form.title, price: Number(form.price), originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined, category: form.category, rating: Number(form.rating), duration: { days: Number(form.duration.days), nights: Number(form.duration.nights) }, activities: form.activities ? form.activities.split(',').map(s => s.trim()) : [], images: form.imageUrl ? [form.imageUrl] : [] };
    try {
      if (editing) { await api.put(`/activities/${editing}`, payload); toast.success('Updated!'); }
      else { await api.post('/activities', payload); toast.success('Created!'); }
      setShowModal(false); fetchItems();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this activity?')) return;
    try { await api.delete(`/activities/${id}`); toast.success('Deleted'); fetchItems(); }
    catch { toast.error('Error deleting'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-dark">Manage Activities</h1>
        <button onClick={openAdd} className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"><FaPlus /> Add Activity</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-primary/5 border-b border-gray-200">
            <th className="p-4 font-semibold text-gray-600 text-sm">Title</th>
            <th className="p-4 font-semibold text-gray-600 text-sm">Category</th>
            <th className="p-4 font-semibold text-gray-600 text-sm">Rating</th>
            <th className="p-4 font-semibold text-gray-600 text-sm">Price (AED)</th>
            <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
          </tr></thead>
          <tbody>
            {loading ? <tr><td colSpan="5" className="p-8 text-center text-gray-400">Loading...</td></tr>
            : items.length === 0 ? <tr><td colSpan="5" className="p-8 text-center text-gray-400">No activities found.</td></tr>
            : items.map(item => (
              <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {item.images?.[0] ? <img src={item.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" /> : <div className="w-10 h-10 rounded-lg bg-gray-100" />}
                    <span className="font-medium text-dark">{item.title}</span>
                  </div>
                </td>
                <td className="p-4"><span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full">{item.category}</span></td>
                <td className="p-4 text-yellow-500 font-semibold">★ {item.rating}</td>
                <td className="p-4 font-semibold">{item.price}</td>
                <td className="p-4 text-right">
                  <button onClick={() => openEdit(item)} className="text-primary hover:text-primary-dark mr-3 p-1"><FaEdit /></button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-600 p-1"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b"><h2 className="text-xl font-bold">{editing ? 'Edit Activity' : 'Add Activity'}</h2><button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FaTimes size={20} /></button></div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Title *</label><input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Price (AED) *</label><input type="number" required value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label><input type="number" value={form.originalPrice} onChange={e => setForm({...form, originalPrice: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none" /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Category</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none"><option>Desert Safari</option><option>City Tour</option><option>Abu Dhabi</option><option>Cruise</option><option>Adventure</option><option>Sightseeing</option><option>Entertainment</option><option>Water Sports</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Days</label><input type="number" min="0" value={form.duration.days} onChange={e => setForm({...form, duration: {...form.duration, days: e.target.value}})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nights</label><input type="number" min="0" value={form.duration.nights} onChange={e => setForm({...form, duration: {...form.duration, nights: e.target.value}})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label><input value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Activities (comma-separated)</label><input value={form.activities} onChange={e => setForm({...form, activities: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none" /></div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold">{editing ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageActivities;
