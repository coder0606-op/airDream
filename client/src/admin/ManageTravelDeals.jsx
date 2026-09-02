import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { FaPlus, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

const emptyDeal = {
  title: '', price: '', badge: '', badgeColor: 'bg-red-500',
  image: '', description: '', activities: '', included: '', duration: { days: 1, nights: 0 }, active: true, order: 0
};

const badgeColors = [
  { name: 'Red', class: 'bg-red-500' },
  { name: 'Green', class: 'bg-green-500' },
  { name: 'Blue', class: 'bg-blue-500' },
  { name: 'Orange', class: 'bg-orange-500' },
  { name: 'Gold', class: 'bg-gold' },
  { name: 'Navy', class: 'bg-primary' },
];

const ManageTravelDeals = () => {
  const [deals, setDeals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyDeal);
  const [loading, setLoading] = useState(true);

  const fetchDeals = async () => {
    try {
      const res = await api.get('/travel-deals?all=true');
      setDeals(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error('Failed to load deals');
      setDeals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDeals(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyDeal); setShowModal(true); };

  const openEdit = (deal) => {
    setEditing(deal._id);
    setForm({
      title: deal.title || '',
      price: deal.price || '',
      badge: deal.badge || '',
      badgeColor: deal.badgeColor || 'bg-red-500',
      image: deal.image || '',
      description: deal.description || '',
      activities: (deal.activities || []).join(', '),
      included: (deal.included || []).join(', '),
      duration: deal.duration || { days: 1, nights: 0 },
      active: deal.active !== false,
      order: deal.order || 0
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        activities: form.activities ? form.activities.split(',').map(a => a.trim()).filter(a => a) : [],
        included: form.included ? form.included.split(',').map(a => a.trim()).filter(a => a) : []
      };
      
      if (editing) {
        await api.put(`/travel-deals/${editing}`, payload);
        toast.success('Travel deal updated successfully');
      } else {
        await api.post('/travel-deals', payload);
        toast.success('Travel deal created successfully');
      }
      setShowModal(false);
      fetchDeals();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving travel deal');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this travel deal?')) {
      try {
        await api.delete(`/travel-deals/${id}`);
        toast.success('Deal deleted successfully');
        fetchDeals();
      } catch {
        toast.error('Error deleting deal');
      }
    }
  };

  const toggleActive = async (deal) => {
    try {
      await api.put(`/travel-deals/${deal._id}`, { active: !deal.active });
      toast.success(deal.active ? 'Deal deactivated' : 'Deal activated');
      fetchDeals();
    } catch {
      toast.error('Error updating status');
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark mb-1">Manage Travel Deals</h1>
          <p className="text-gray-500 text-sm">Create and manage deals shown on the homepage</p>
        </div>
        <button onClick={openAdd} className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm">
          <FaPlus /> Add Deal
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading travel deals...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
                <th className="p-4 font-semibold">Image</th>
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Badge</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deals.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500">No travel deals found.</td></tr>
              ) : (
                deals.map((deal) => (
                  <tr key={deal._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <img src={deal.image} alt={deal.title} className="w-16 h-10 object-cover rounded shadow-sm" />
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-dark">{deal.title}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[200px]">{deal.description || 'No description'}</div>
                    </td>
                    <td className="p-4 font-medium text-primary">{deal.price}</td>
                    <td className="p-4">
                      {deal.badge ? (
                        <span className={`text-xs font-bold px-2 py-1 rounded text-white ${deal.badgeColor}`}>
                          {deal.badge}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => toggleActive(deal)} className={`px-3 py-1 rounded-full text-xs font-semibold ${deal.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {deal.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => openEdit(deal)} className="text-blue-600 hover:text-blue-800 transition-colors p-1" title="Edit">
                          <FaEdit size={16} />
                        </button>
                        <button onClick={() => handleDelete(deal._id)} className="text-red-600 hover:text-red-800 transition-colors p-1" title="Delete">
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-dark">{editing ? 'Edit Travel Deal' : 'Add New Travel Deal'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FaTimes size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" placeholder="e.g. Dubai Holiday Package" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                <input required value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" placeholder="e.g. AED 999" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                <input required value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" placeholder="/images/deal.jpg or https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" rows="3" placeholder="Description of the deal" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Activities (comma-separated)</label>
                <input value={form.activities} onChange={e => setForm({...form, activities: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" placeholder="e.g. City Tour, Desert Safari" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Included (comma-separated)</label>
                <input value={form.included} onChange={e => setForm({...form, included: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" placeholder="e.g. Hotel Pick-up, Soft Drinks" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Days</label>
                  <input type="number" min="0" value={form.duration.days} onChange={e => setForm({...form, duration: {...form.duration, days: parseInt(e.target.value) || 0}})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nights</label>
                  <input type="number" min="0" value={form.duration.nights} onChange={e => setForm({...form, duration: {...form.duration, nights: parseInt(e.target.value) || 0}})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
                  <input value={form.badge} onChange={e => setForm({...form, badge: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" placeholder="e.g. SPECIAL OFFER" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Badge Color</label>
                  <select value={form.badgeColor} onChange={e => setForm({...form, badgeColor: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none">
                    {badgeColors.map(color => (
                      <option key={color.class} value={color.class}>{color.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Index</label>
                  <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
                </div>
                <div className="flex flex-col justify-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.active} onChange={e => setForm({...form, active: e.target.checked})} className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary" />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition-colors">
                  {editing ? 'Update Deal' : 'Create Deal'}
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

export default ManageTravelDeals;
