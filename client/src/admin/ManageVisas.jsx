import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { FaPlus, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

const emptyVisa = { country: '', type: 'Tourist', price: '', originalPrice: '', processingTime: '', isFastTrack: true, getOnDate: '', flagImage: '' };

const ManageVisas = () => {
  const [visas, setVisas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyVisa);
  const [loading, setLoading] = useState(true);

  const fetchVisas = async () => {
    try {
      const res = await api.get('/visas?all=true');
      setVisas(Array.isArray(res.data) ? res.data : []);
    } catch { setVisas([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchVisas(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyVisa); setShowModal(true); };
  const openEdit = (visa) => {
    setEditing(visa._id);
    setForm({ country: visa.country, type: visa.type || 'Tourist', price: visa.price, originalPrice: visa.originalPrice || '', processingTime: visa.processingTime || '', isFastTrack: visa.isFastTrack !== false, getOnDate: visa.getOnDate || '', flagImage: visa.flagImage || '' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price), originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined };
    try {
      if (editing) { await api.put(`/visas/${editing}`, payload); toast.success('Visa updated!'); }
      else { await api.post('/visas', payload); toast.success('Visa created!'); }
      setShowModal(false); fetchVisas();
    } catch (err) { toast.error(err.response?.data?.message || 'Error saving visa'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this visa?')) return;
    try { await api.delete(`/visas/${id}`); toast.success('Deleted'); fetchVisas(); }
    catch { toast.error('Error deleting'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-dark">Manage Visas</h1>
        <button onClick={openAdd} className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"><FaPlus /> Add Visa</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-primary/5 border-b border-gray-200">
            <th className="p-4 font-semibold text-gray-600 text-sm">Country</th>
            <th className="p-4 font-semibold text-gray-600 text-sm">Type</th>
            <th className="p-4 font-semibold text-gray-600 text-sm">Fast Track</th>
            <th className="p-4 font-semibold text-gray-600 text-sm">Price (AED)</th>
            <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
          </tr></thead>
          <tbody>
            {loading ? <tr><td colSpan="5" className="p-8 text-center text-gray-400">Loading...</td></tr>
            : visas.length === 0 ? <tr><td colSpan="5" className="p-8 text-center text-gray-400">No visas found.</td></tr>
            : visas.map(v => (
              <tr key={v._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="p-4 font-medium text-dark">{v.country}</td>
                <td className="p-4"><span className="bg-coral/10 text-coral text-xs font-semibold px-2 py-1 rounded-full">{v.type}</span></td>
                <td className="p-4">{v.isFastTrack ? <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full">Yes</span> : <span className="text-gray-400 text-sm">No</span>}</td>
                <td className="p-4 font-semibold">{v.price}</td>
                <td className="p-4 text-right">
                  <button onClick={() => openEdit(v)} className="text-primary hover:text-primary-dark mr-3 p-1"><FaEdit /></button>
                  <button onClick={() => handleDelete(v._id)} className="text-red-400 hover:text-red-600 p-1"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b"><h2 className="text-xl font-bold">{editing ? 'Edit Visa' : 'Add Visa'}</h2><button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FaTimes size={20} /></button></div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Country *</label><input required value={form.country} onChange={e => setForm({...form, country: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none"><option>Tourist</option><option>Business</option><option>Transit</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Price (AED) *</label><input type="number" required value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label><input type="number" value={form.originalPrice} onChange={e => setForm({...form, originalPrice: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Processing Time</label><input value={form.processingTime} onChange={e => setForm({...form, processingTime: e.target.value})} placeholder="3-5 working days" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none" /></div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={form.isFastTrack} onChange={e => setForm({...form, isFastTrack: e.target.checked})} className="w-4 h-4 accent-primary" />
                <label className="text-sm font-medium text-gray-700">Fast Track Available</label>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Flag Image URL</label><input value={form.flagImage} onChange={e => setForm({...form, flagImage: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none" /></div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition-colors">{editing ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageVisas;
