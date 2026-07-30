import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { FaPlus, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

const emptyTour = {
  title: '', description: '', price: '', originalPrice: '', category: 'Adventure',
  rating: 4.0, duration: { days: 1, nights: 0 }, activities: '', imageUrl: '',
  included: '', highlights: ''
};

const ManageTours = () => {
  const [tours, setTours] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyTour);
  const [loading, setLoading] = useState(true);

  const fetchTours = async () => {
    try {
      const res = await api.get('/tours?all=true');
      setTours(Array.isArray(res.data) ? res.data : []);
    } catch {
      setTours([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTours(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyTour); setShowModal(true); };

  const openEdit = (tour) => {
    setEditing(tour._id);
    setForm({
      title: tour.title || '',
      description: tour.description || '',
      price: tour.price || '',
      originalPrice: tour.originalPrice || '',
      category: tour.category || 'Adventure',
      rating: tour.rating || 4.0,
      duration: tour.duration || { days: 1, nights: 0 },
      activities: (tour.activities || []).join(', '),
      imageUrl: (tour.images && tour.images[0]) || '',
      included: (tour.included || []).map(i => i.name).join(', '),
      highlights: (tour.highlights || []).join(', ')
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      category: form.category,
      rating: Number(form.rating),
      duration: { days: Number(form.duration.days), nights: Number(form.duration.nights) },
      activities: form.activities ? form.activities.split(',').map(s => s.trim()) : [],
      images: form.imageUrl ? [form.imageUrl] : [],
      included: form.included ? form.included.split(',').map(s => ({ name: s.trim(), icon: 'activity' })) : [],
      highlights: form.highlights ? form.highlights.split(',').map(s => s.trim()) : []
    };
    try {
      if (editing) {
        await api.put(`/tours/${editing}`, payload);
        toast.success('Tour updated!');
      } else {
        await api.post('/tours', payload);
        toast.success('Tour created!');
      }
      setShowModal(false);
      fetchTours();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving tour');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this tour?')) return;
    try {
      await api.delete(`/tours/${id}`);
      toast.success('Tour deleted');
      fetchTours();
    } catch {
      toast.error('Error deleting');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-dark">Manage Tours</h1>
        <button onClick={openAdd} className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors">
          <FaPlus /> Add Tour
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-600 text-sm">Title</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Category</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Duration</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Price (INR)</th>
              <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="p-8 text-center text-gray-400">Loading...</td></tr>
            ) : tours.length === 0 ? (
              <tr><td colSpan="5" className="p-8 text-center text-gray-400">No tours found. Add your first tour!</td></tr>
            ) : tours.map(tour => (
              <tr key={tour._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {tour.images?.[0] ? (
                      <img src={tour.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">N/A</div>
                    )}
                    <span className="font-medium text-dark">{tour.title}</span>
                  </div>
                </td>
                <td className="p-4"><span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full">{tour.category}</span></td>
                <td className="p-4 text-gray-600 text-sm">{tour.duration?.days}D {tour.duration?.nights}N</td>
                <td className="p-4 font-semibold text-dark">{tour.price}</td>
                <td className="p-4 text-right">
                  <button onClick={() => openEdit(tour)} className="text-blue-500 hover:text-blue-700 mr-3 p-1"><FaEdit /></button>
                  <button onClick={() => handleDelete(tour._id)} className="text-red-400 hover:text-red-600 p-1"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-dark">{editing ? 'Edit Tour' : 'Add New Tour'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FaTimes size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (INR) *</label>
                  <input type="number" required value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                  <input type="number" value={form.originalPrice} onChange={e => setForm({...form, originalPrice: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none">
                    <option>Adventure</option><option>Sightseeing</option><option>Holiday</option><option>Honeymoon</option><option>Family</option><option>Cruise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Days</label>
                  <input type="number" min="0" value={form.duration.days} onChange={e => setForm({...form, duration: {...form.duration, days: e.target.value}})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nights</label>
                  <input type="number" min="0" value={form.duration.nights} onChange={e => setForm({...form, duration: {...form.duration, nights: e.target.value}})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} placeholder="https://..." className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Activities (comma-separated)</label>
                <input value={form.activities} onChange={e => setForm({...form, activities: e.target.value})} placeholder="BBQ Dinner, Camel Ride, Dune Bashing" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition-colors">
                  {editing ? 'Update Tour' : 'Create Tour'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTours;
