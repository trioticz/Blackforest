import React, { useState, useEffect } from 'react';
import { Award, Edit2, ExternalLink, Eye, EyeOff, Search, X } from 'lucide-react';
import {
  getStoredExpertiseCards,
  toggleExpertiseCardPublish,
  updateExpertiseCardDetails,
  EXPERTISE_EVENT
} from '../../utils/expertiseManager';
import { useToast } from '../../context/ToastContext';
import ImageUploadField from '../../components/admin/ImageUploadField';

export default function AdminExpertisePage() {
  const [cards, setCards] = useState(getStoredExpertiseCards());
  const [search, setSearch] = useState('');
  const [editingCard, setEditingCard] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    image: '',
    url: '',
    isPublished: true
  });
  const { showToast } = useToast();

  const reloadData = () => {
    setCards(getStoredExpertiseCards());
  };

  useEffect(() => {
    reloadData();
    const handleUpdate = () => reloadData();
    window.addEventListener(EXPERTISE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(EXPERTISE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleToggle = (id, currentStatus, name) => {
    const updated = toggleExpertiseCardPublish(id);
    reloadData();
    if (updated?.isPublished) {
      showToast(`${name} is published on the website`, 'success');
    } else {
      showToast(`${name} is hidden from the website`, 'info');
    }
  };

  const handleEditClick = (card) => {
    setEditingCard(card);
    setFormData({
      name: card.name,
      subtitle: card.subtitle || '',
      image: card.image || '',
      url: card.url || '',
      isPublished: card.isPublished !== false
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingCard) return;

    updateExpertiseCardDetails(editingCard.id, {
      name: formData.name,
      subtitle: formData.subtitle,
      image: formData.image,
      url: formData.url,
      isPublished: formData.isPublished
    });

    reloadData();
    setEditingCard(null);
    showToast(`Updated "${formData.name}" card`, 'success');
  };

  const filtered = cards.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.subtitle && c.subtitle.toLowerCase().includes(search.toLowerCase()))
  );

  const publishedCount = cards.filter((c) => c.isPublished !== false).length;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 font-serif">
            Partner Expertise Badges
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            Tourism board certifications and partner logos displayed on the public site and footer.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search partners..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-800 transition-colors shadow-xs"
          />
        </div>
      </div>

      {/* Grid of 10 Partner Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((card) => {
          const isPublished = card.isPublished !== false;

          return (
            <div
              key={card.id}
              className={`bg-white rounded-xl border p-4 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-sm ${
                isPublished ? 'border-zinc-200/90' : 'border-zinc-200 bg-zinc-50/50 opacity-75'
              }`}
            >
              <div>
                {/* Logo container */}
                <div className="h-20 bg-zinc-50 rounded-lg p-2 flex items-center justify-center mb-3 border border-zinc-100">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="max-h-14 max-w-full object-contain"
                  />
                </div>

                <h4 className="font-bold text-xs text-zinc-900 line-clamp-1">{card.name}</h4>
                <p className="text-[10px] text-zinc-500 line-clamp-1 mb-2">
                  {card.subtitle || 'Official Partner'}
                </p>
              </div>

              {/* Action bar with toggle switch */}
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                <button
                  onClick={() => handleToggle(card.id, isPublished, card.name)}
                  className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isPublished ? 'bg-emerald-600' : 'bg-zinc-300'
                  }`}
                  title={isPublished ? 'Click to hide' : 'Click to show'}
                >
                  <span
                    className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      isPublished ? 'translate-x-3' : 'translate-x-0'
                    }`}
                  />
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEditClick(card)}
                    className="p-1 text-zinc-400 hover:text-zinc-800 rounded transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-zinc-400 hover:text-[#10221b] rounded transition-colors"
                    title="Visit Partner Site"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-200">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#10221b] font-bold uppercase tracking-wider block">
                  Accreditation
                </span>
                <h3 className="text-base font-serif font-bold text-zinc-900">
                  Edit {editingCard.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingCard(null)}
                className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 uppercase mb-1">Partner Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 uppercase mb-1">Badge Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Travel Partner"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:bg-white focus:outline-none"
                />
              </div>

              <ImageUploadField
                label="Partner Logo Image"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                required
                objectFit="contain"
                recommendedDimensions="Horizontal logo (approx 200x80px)"
                helperText="Upload a logo file (PNG, JPG, SVG, WEBP) or drag & drop"
              />

              <div>
                <label className="block font-semibold text-zinc-700 uppercase mb-1">Official Website URL</label>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCard(null)}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-zinc-900 hover:bg-black text-white rounded-lg font-semibold shadow-xs cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
