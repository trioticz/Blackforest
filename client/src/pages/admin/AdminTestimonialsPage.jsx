import React, { useState, useEffect } from 'react';
import { Star, PlusCircle, Edit, Trash2, X, Quote } from 'lucide-react';
import { testimonialService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';
import ImageUploadField from '../../components/admin/ImageUploadField';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    designation: 'Luxury Traveler',
    location: 'London, UK',
    rating: 5,
    message: '',
    photo: '/images/destinations/destinations-150880418587.webp',
    status: 'published'
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await testimonialService.getAll();
      if (res.success && res.data) {
        setTestimonials(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setFormData({
      name: '',
      designation: 'Luxury Traveler',
      location: 'Dubai, UAE',
      rating: 5,
      message: '',
      photo: '/images/destinations/destinations-150931697585.webp',
      status: 'published'
    });
    setModalOpen(true);
  };

  const openEdit = (t) => {
    setEditingId(t.id);
    setFormData({
      name: t.name || '',
      designation: t.designation || '',
      location: t.location || '',
      rating: t.rating || 5,
      message: t.message || '',
      photo: t.photo || '',
      status: t.status || 'published'
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await testimonialService.update(editingId, formData);
        showToast('Review updated', 'success');
      } else {
        await testimonialService.create(formData);
        showToast('Review created', 'success');
      }
      setModalOpen(false);
      fetchTestimonials();
    } catch {
      showToast('Error saving review', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this client testimonial?')) return;
    try {
      await testimonialService.delete(id);
      showToast('Review deleted', 'info');
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch {
      showToast('Error deleting review', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Client Reviews & Testimonials</h2>
          <p className="text-xs text-gray-500">Curate verified traveler experiences showcased in the homepage slider.</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-[#10221b] text-white text-xs font-bold uppercase rounded-xl flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[#10221b] mb-3">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-gray-700 italic leading-relaxed mb-4 line-clamp-4">
                "{t.message}"
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={t.photo} alt={t.name} className="w-8 h-8 rounded-full object-cover border" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-tight">{t.name}</h4>
                  <span className="text-[10px] text-gray-400 block">{t.location}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(t)} className="p-1.5 text-gray-400 hover:text-gray-900"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(t.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden border">
            <div className="p-5 bg-[#10221b] text-white flex justify-between">
              <h3 className="font-bold text-base">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Traveler Name *</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Designation</label>
                  <input type="text" value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Location</label>
                  <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block font-bold mb-1">Rating (1 to 5)</label>
                <input type="number" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div className="pt-1">
                <ImageUploadField
                  label="Traveler Avatar / Photo"
                  value={formData.photo}
                  onChange={(url) => setFormData({ ...formData, photo: url })}
                  helperText="Upload guest portrait photo (PNG, JPG, WEBP)"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Review Quote *</label>
                <textarea rows={4} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full p-2 bg-gray-50 border rounded-lg" />
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
