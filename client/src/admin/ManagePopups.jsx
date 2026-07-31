import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaCheck, FaTimes, FaImage } from 'react-icons/fa';
import api from '../utils/api';
import toast from 'react-hot-toast';

const ManagePopups = () => {
  const [popups, setPopups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    imageUrl: '',
    link: '',
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    fetchPopups();
  }, []);

  const fetchPopups = async () => {
    try {
      const response = await api.get('/popups');
      setPopups(response.data);
    } catch (error) {
      toast.error('Failed to fetch popups');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/popups', form);
      toast.success('Popup image added successfully');
      setIsModalOpen(false);
      setForm({ title: '', imageUrl: '', link: '', isActive: true, order: 0 });
      fetchPopups();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add popup');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this popup?')) {
      try {
        await api.delete(`/popups/${id}`);
        toast.success('Popup deleted successfully');
        fetchPopups();
      } catch (error) {
        toast.error('Failed to delete popup');
      }
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      await api.put(`/popups/${id}`, { isActive: !currentStatus });
      toast.success(`Popup ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchPopups();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Popups</h1>
          <p className="text-gray-500 mt-1">Add and manage promotional popup images for the homepage</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors font-medium shadow-md shadow-primary/20"
        >
          <FaPlus /> Add Popup
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popups.map((popup) => (
          <div key={popup._id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden group">
            <div className="h-48 relative overflow-hidden bg-gray-100 flex items-center justify-center">
              {popup.imageUrl ? (
                <img src={popup.imageUrl} alt={popup.title || 'Popup Image'} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              ) : (
                <FaImage className="text-4xl text-gray-300" />
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => toggleActive(popup._id, popup.isActive)}
                  className={`p-2 rounded-full shadow-md ${popup.isActive ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'} hover:opacity-90 transition-opacity`}
                  title={popup.isActive ? "Deactivate" : "Activate"}
                >
                  {popup.isActive ? <FaCheck size={14} /> : <FaTimes size={14} />}
                </button>
                <button
                  onClick={() => handleDelete(popup._id)}
                  className="p-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
                  title="Delete"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800 text-lg line-clamp-1">{popup.title || 'Untitled Popup'}</h3>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${popup.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {popup.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              {popup.link && (
                <p className="text-sm text-primary mb-3 truncate hover:underline">
                  <a href={popup.link} target="_blank" rel="noopener noreferrer">{popup.link}</a>
                </p>
              )}
              <div className="text-xs text-gray-500 mt-4 flex justify-between">
                <span>Order: {popup.order}</span>
                <span>Added: {new Date(popup.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}

        {popups.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaImage className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">No Popups Found</h3>
            <p className="text-gray-500">Click the "Add Popup" button to create your first promotional popup.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes />
            </button>
            
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Popup Image</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title (Optional)</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({...form, title: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
                  placeholder="e.g. Summer Sale 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Image URL *</label>
                <input
                  type="url"
                  required
                  value={form.imageUrl}
                  onChange={(e) => setForm({...form, imageUrl: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-gray-500 mt-1.5">Paste a direct link to an image. (We recommend using landscape images for better viewing).</p>
              </div>
              
              {form.imageUrl && (
                <div className="mt-3 bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Image Preview:</p>
                  <img src={form.imageUrl} alt="Preview" className="w-full h-32 object-contain rounded bg-white border border-gray-100" onError={(e) => e.target.style.display='none'} />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Redirect Link (Optional)</label>
                <input
                  type="url"
                  value={form.link}
                  onChange={(e) => setForm({...form, link: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
                  placeholder="https://... (Where should users go when they click?)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Display Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({...form, order: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col justify-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) => setForm({...form, isActive: e.target.checked})}
                      className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/30"
                    />
                    <span className="text-sm font-semibold text-gray-700">Active (Visible)</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-lg transition-colors font-medium shadow-md shadow-primary/20"
                >
                  Save Popup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePopups;
