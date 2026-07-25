import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { FaPlus, FaTimes, FaEdit, FaTrash, FaStar } from 'react-icons/fa';

const emptyTestimonial = { name: '', date: '', rating: 5, title: '', review: '', avatarColor: '#0891b2' };

const ManageTestimonials = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyTestimonial);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try { const res = await api.get('/testimonials'); setItems(Array.isArray(res.data) ? res.data : []); }
    catch { setItems([]); } finally { setLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyTestimonial); setShowModal(true); };
  const openEdit = (item) => {
    setEditing(item._id);
    setForm({ name: item.name, date: item.date || '', rating: item.rating || 5, title: item.title, review: item.review, avatarColor: item.avatarColor || '#0891b2' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await api.put(`/testimonials/${editing}`, form); toast.success('Updated!'); }
      else { await api.post('/testimonials', form); toast.success('Created!'); }
      setShowModal(false); fetchItems();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try { await api.delete(`/testimonials/${id}`); toast.success('Deleted'); fetchItems(); }
    catch { toast.error('Error deleting'); }
  };

  const colors = ['#0891b2', '#7c3aed', '#f43f5e', '#00b67a', '#f59e0b', '#6366f1'];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-dark">Manage Testimonials</h1>
        <button onClick={openAdd} className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"><FaPlus /> Add Testimonial</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? <p className="text-gray-400 col-span-full text-center py-8">Loading...</p>
        : items.length === 0 ? <p className="text-gray-400 col-span-full text-center py-8">No testimonials yet.</p>
        : items.map(item => (
          <div key={item._id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 relative group">
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <button onClick={() => openEdit(item)} className="text-blue-500 hover:bg-blue-50 p-1.5 rounded"><FaEdit size={12} /></button>
              <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:bg-red-50 p-1.5 rounded"><FaTrash size={12} /></button>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: item.avatarColor || '#0891b2' }}>
                {item.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-dark text-sm">{item.name}</p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>
            </div>
            <div className="flex gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => <FaStar key={i} className={i < item.rating ? 'text-star-green' : 'text-gray-200'} size={14} />)}
            </div>
            <h4 className="font-semibold text-primary text-sm mb-1">{item.title}</h4>
            <p className="text-gray-500 text-xs line-clamp-3">{item.review}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex justify-between items-center p-6 border-b"><h2 className="text-xl font-bold">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2><button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FaTimes size={20} /></button></div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Date</label><input value={form.date} onChange={e => setForm({...form, date: e.target.value})} placeholder="Jul 25, 2026" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <div className="flex gap-1 mt-1">{[1,2,3,4,5].map(n => <button key={n} type="button" onClick={() => setForm({...form, rating: n})} className={`text-xl ${n <= form.rating ? 'text-star-green' : 'text-gray-300'}`}><FaStar /></button>)}</div>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Avatar Color</label>
                  <div className="flex gap-2 mt-1">{colors.map(c => <button key={c} type="button" onClick={() => setForm({...form, avatarColor: c})} className={`w-7 h-7 rounded-full border-2 ${form.avatarColor === c ? 'border-dark scale-110' : 'border-transparent'}`} style={{ backgroundColor: c }} />)}</div>
                </div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Title *</label><input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Review *</label><textarea required rows="3" value={form.review} onChange={e => setForm({...form, review: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none resize-none" /></div>
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

export default ManageTestimonials;
