import React, { useState, useEffect } from 'react';
import { Search, Edit2, ExternalLink, Globe2, Eye, EyeOff, Check, X, MapPin } from 'lucide-react';
import {
  getStoredDestinations,
  toggleDestinationPublish,
  updateDestinationDetails,
  DESTINATIONS_EVENT
} from '../../utils/destinationsManager';
import { destinationService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';
import ImageUploadField from '../../components/admin/ImageUploadField';

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState(getStoredDestinations());
  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    heroImage: '',
    isPublished: true
  });
  const { showToast } = useToast();

  const reloadData = () => {
    setDestinations(getStoredDestinations());
  };

  useEffect(() => {
    reloadData();
    const handleUpdate = () => reloadData();
    window.addEventListener(DESTINATIONS_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(DESTINATIONS_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleToggle = (slug, currentStatus, name) => {
    const updated = toggleDestinationPublish(slug);
    reloadData();
    if (updated?.isPublished) {
      showToast(`${name} is published and visible on the website`, 'success');
    } else {
      showToast(`${name} is unpublished and hidden from the website`, 'info');
    }
  };

  const handleEditClick = (dest) => {
    setEditingItem(dest);
    setFormData({
      name: dest.name,
      tagline: dest.tagline || '',
      heroImage: dest.heroImage || '',
      isPublished: dest.isPublished !== false
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    updateDestinationDetails(editingItem.slug, {
      name: formData.name,
      tagline: formData.tagline,
      heroImage: formData.heroImage,
      isPublished: formData.isPublished
    });

    reloadData();
    setEditingItem(null);
    showToast(`Updated "${formData.name}" successfully`, 'success');
  };

  const filtered = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.slug.toLowerCase().includes(search.toLowerCase()) ||
      (d.tagline && d.tagline.toLowerCase().includes(search.toLowerCase()))
  );

  const publishedCount = destinations.filter((d) => d.isPublished !== false).length;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 font-serif">
            Destination Portfolio
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            Manage the 8 official destination regions. Toggle switches instantly show or hide them from headers, menus, and detail routes.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destination..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-800 transition-colors shadow-xs"
          />
        </div>
      </div>

      {/* Grid of 8 Destinations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((dest) => {
          const isPublished = dest.isPublished !== false;

          return (
            <div
              key={dest.slug}
              className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-sm ${
                isPublished ? 'border-zinc-200/90' : 'border-zinc-200 bg-zinc-50/50 opacity-80'
              }`}
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-40 overflow-hidden bg-zinc-100 group">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span
                    className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase shadow-xs ${
                      isPublished
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-700 text-zinc-300'
                    }`}
                  >
                    {isPublished ? 'Published' : 'Hidden'}
                  </span>

                  <div className="absolute bottom-2.5 left-3 text-white">
                    <h3 className="font-serif font-bold text-base text-white leading-tight drop-shadow-xs">
                      {dest.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <p className="text-xs text-zinc-500 line-clamp-1 italic font-serif">
                    {dest.tagline || 'Bespoke Curated Journeys'}
                  </p>
                  <p className="text-[11px] font-mono text-zinc-400 truncate">
                    /{dest.slug}
                  </p>
                </div>
              </div>

              {/* Action Bar with Clean Toggle Switch */}
              <div className="p-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggle(dest.slug, isPublished, dest.name)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isPublished ? 'bg-emerald-600' : 'bg-zinc-300'
                    }`}
                    title={isPublished ? 'Click to unpublish' : 'Click to publish'}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        isPublished ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-[11px] font-medium text-zinc-600">
                    {isPublished ? 'Live' : 'Hidden'}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEditClick(dest)}
                    className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                    title="Edit Destination"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={`/destinations/${dest.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-zinc-500 hover:text-[#10221b] hover:bg-zinc-100 rounded-lg transition-colors"
                    title="Preview Live Destination"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-200">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#10221b] font-bold uppercase tracking-wider block">
                  Configuration
                </span>
                <h3 className="text-base font-serif font-bold text-zinc-900">
                  Edit {editingItem.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 uppercase mb-1">Destination Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 uppercase mb-1">Cursive Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Heritage to Himalayas"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:bg-white focus:outline-none"
                />
              </div>

              <ImageUploadField
                label="Hero Image"
                required
                value={formData.heroImage}
                onChange={(url) => setFormData({ ...formData, heroImage: url })}
                recommendedDimensions="1600 × 900 px"
              />

              <div className="flex items-center justify-between pt-2">
                <span className="font-semibold text-zinc-700">Visibility Status</span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isPublished: !formData.isPublished })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    formData.isPublished
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                  }`}
                >
                  {formData.isPublished ? 'Published (Visible)' : 'Unpublished (Hidden)'}
                </button>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
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
