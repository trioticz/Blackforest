import React, { useState, useEffect } from 'react';
import { Compass, PlusCircle, Edit, Trash2, X } from 'lucide-react';
import { experienceService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';
import ImageUploadField from '../../components/admin/ImageUploadField';

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'adventure',
    description: '',
    content: '',
    thumbnail: '/images/destinations/destinations-150614633238.webp',
    heroImage: '/images/destinations/destinations-150666553119.webp',
    status: 'published'
  });

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const res = await experienceService.getAll();
      if (res.success && res.data) {
        setExperiences(res.data.experiences || []);
      }
    } catch (err) {
      console.error('Error loading experiences:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setFormData({
      name: '',
      slug: '',
      category: 'adventure',
      description: '',
      content: '',
      thumbnail: '/images/destinations/destinations-150697084524.webp',
      heroImage: '/images/destinations/destinations-150697303587.webp',
      status: 'published'
    });
    setModalOpen(true);
  };

  const openEdit = (exp) => {
    setEditingId(exp.id);
    setFormData({
      name: exp.name || '',
      slug: exp.slug || '',
      category: exp.category || 'adventure',
      description: exp.description || '',
      content: exp.content || '',
      thumbnail: exp.thumbnail || '',
      heroImage: exp.heroImage || '',
      status: exp.status || 'published'
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await experienceService.update(editingId, formData);
        showToast('Experience updated', 'success');
      } else {
        await experienceService.create(formData);
        showToast('Experience created', 'success');
      }
      setModalOpen(false);
      fetchExperiences();
    } catch (err) {
      showToast('Error saving experience', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience style?')) return;
    try {
      await experienceService.delete(id);
      showToast('Experience deleted', 'info');
      setExperiences((prev) => prev.filter((e) => e.id !== id));
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Experience Themes</h2>
          <p className="text-xs text-gray-500">Curated vacation styles (Adventure, Island, Family, Honeymoon, Luxury).</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-[#10221b] text-white text-xs font-bold uppercase rounded-xl flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Experience</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden p-5 flex flex-col justify-between">
            <div>
              <img src={exp.thumbnail} alt={exp.name} className="h-40 w-full object-cover rounded-xl mb-3" />
              <h3 className="font-serif font-bold text-base text-[#10221b]">{exp.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mt-1">{exp.description}</p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-400 capitalize">{exp.category}</span>
              <div className="flex gap-1">
                <button onClick={() => openEdit(exp)} className="p-1.5 text-gray-400 hover:text-gray-900"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(exp.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden border">
            <div className="p-5 bg-[#10221b] text-white flex justify-between">
              <h3 className="font-bold text-base">{editingId ? 'Edit Experience' : 'Create Experience'}</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold mb-1">Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg">
                  <option value="adventure">Adventure & Nature</option>
                  <option value="island">Island Holidays</option>
                  <option value="family">Family Holidays</option>
                  <option value="honeymoon">Honeymoon Escapes</option>
                  <option value="luxury">Luxury Escapes</option>
                  <option value="culture">Culture & Heritage</option>
                </select>
              </div>
              <div className="space-y-3 pt-1">
                <ImageUploadField
                  label="Experience Thumbnail"
                  value={formData.thumbnail}
                  onChange={(url) => setFormData({ ...formData, thumbnail: url })}
                  compact
                  helperText="Card thumbnail photo"
                />
                <ImageUploadField
                  label="Hero Banner Image"
                  value={formData.heroImage}
                  onChange={(url) => setFormData({ ...formData, heroImage: url })}
                  helperText="Header hero banner photo"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Description</label>
                <textarea rows={2} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold mb-1">Full Article / Content</label>
                <textarea rows={4} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full p-2 bg-gray-50 border rounded-lg" />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#10221b] text-white font-bold rounded-lg">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
