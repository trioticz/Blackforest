import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Sparkles,
  HelpCircle,
  Image as ImageIcon
} from 'lucide-react';
import { tourService, destinationService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';
import ImageUploadField from '../../components/admin/ImageUploadField';

export default function AdminTourFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const isEditing = Boolean(id);

  const [activeTab, setActiveTab] = useState('general');
  const [destinations, setDestinations] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEditing);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'international',
    type: 'Custom Tour',
    destinationId: '',
    duration: '7 Days / 6 Nights',
    price: 1800,
    discountPrice: 2100,
    coverImage: '/images/destinations/destinations-151210035635.webp',
    location: '',
    shortDescription: '',
    description: '',
    status: 'published',
    highlights: ['5-Star Luxury Stays', 'Private Chauffeur Transfers', 'VIP Sightseeing Passes'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Welcome',
        description: 'Private airport meet & greet followed by chauffeur transfer to your luxury hotel.',
        activities: ['Airport Reception', 'Welcome Dinner'],
        image: ''
      }
    ],
    inclusions: ['Luxury Hotel Accommodation', 'Daily Gourmet Breakfast', 'Private Airport Transfers'],
    exclusions: ['International Flight Tickets', 'Personal Discretionary Expenses', 'Travel Insurance'],
    terms: ['A 20% deposit is required upon reservation confirmation.', 'Free cancellation up to 30 days prior to departure.'],
    faq: [{ question: 'What is the best season to travel?', answer: 'Spring and Autumn offer pleasant temperatures and optimal sightseeing.' }]
  });

  useEffect(() => {
    // Load destinations for dropdown
    const loadDestinations = async () => {
      try {
        const res = await destinationService.getAll({ limit: 100 });
        if (res.success && res.data) {
          setDestinations(res.data.destinations || []);
        }
      } catch (err) {
        console.error('Error loading destinations:', err);
      }
    };
    loadDestinations();

    // If editing, load tour package data
    if (isEditing) {
      const loadTour = async () => {
        try {
          const res = await tourService.getById(id);
          if (res.success && res.data) {
            const t = res.data;
            setFormData({
              title: t.title || '',
              slug: t.slug || '',
              category: t.category || 'international',
              type: t.type || 'Custom Tour',
              destinationId: t.destinationId || '',
              duration: t.duration || '',
              price: t.price || 0,
              discountPrice: t.discountPrice || '',
              coverImage: t.coverImage || '',
              location: t.location || '',
              shortDescription: t.shortDescription || '',
              description: t.description || '',
              status: t.status || 'published',
              highlights: Array.isArray(t.highlights) ? t.highlights : [],
              itinerary: Array.isArray(t.itinerary) ? t.itinerary : [],
              inclusions: Array.isArray(t.inclusions) ? t.inclusions : [],
              exclusions: Array.isArray(t.exclusions) ? t.exclusions : [],
              terms: Array.isArray(t.terms) ? t.terms : [],
              faq: Array.isArray(t.faq) ? t.faq : []
            });
          }
        } catch (err) {
          showToast('Failed to load tour details', 'error');
        } finally {
          setLoading(false);
        }
      };
      loadTour();
    }
  }, [id, isEditing]);

  // Itinerary handlers
  const addDay = () => {
    const nextDayNum = formData.itinerary.length + 1;
    setFormData((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          day: nextDayNum,
          title: `Day ${nextDayNum} Itinerary`,
          description: 'Explore signature local sights with your private guide.',
          activities: ['Private Guided Tour'],
          image: ''
        }
      ]
    }));
  };

  const removeDay = (index) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  const updateDay = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.itinerary];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, itinerary: updated };
    });
  };

  // Generic List item helpers
  const handleListChange = (field, index, value) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addListItem = (field, defaultValue = '') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], defaultValue]
    }));
  };

  const removeListItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.duration || !formData.price) {
      showToast('Please fill out all required fields (title, duration, price)', 'error');
      return;
    }

    setSaving(true);
    try {
      if (isEditing) {
        const res = await tourService.update(id, formData);
        if (res.success) {
          showToast('Tour package updated successfully!', 'success');
          navigate('/admin/tours');
        }
      } else {
        const res = await tourService.create(formData);
        if (res.success) {
          showToast('New tour package created!', 'success');
          navigate('/admin/tours');
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Error saving tour package', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
        <span className="w-6 h-6 border-2 border-[#10221b] border-t-transparent rounded-full animate-spin"></span>
        <span>Loading package editor...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn pb-16">
      {/* Top Bar */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/tours"
            className="p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEditing ? `Edit: ${formData.title}` : 'Author New Tour Package'}
            </h2>
            <p className="text-xs text-gray-500">
              Configure itinerary days, pricing, inclusions, and publishing status.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-[#10221b] hover:bg-[#1c382e] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Tour Package'}</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-gray-200 bg-white px-6 rounded-xl overflow-x-auto no-scrollbar">
        {[
          { id: 'general', label: '1. General Info' },
          { id: 'highlights', label: '2. Highlights' },
          { id: 'itinerary', label: '3. Daily Itinerary' },
          { id: 'inclusions', label: '4. Inclusions & Terms' },
          { id: 'faqs', label: '5. FAQs' }
        ].map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-[#10221b] text-[#10221b]'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: General Info */}
      {activeTab === 'general' && (
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Tour Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Grand Swiss Alpine & Lakes Odyssey"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                URL Slug (Leave blank for auto-generation)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="grand-swiss-alpine-lakes-odyssey"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b]"
              >
                <option value="international">International Tours</option>
                <option value="india">India Tour Packages</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Destination Association
              </label>
              <select
                value={formData.destinationId || ''}
                onChange={(e) => setFormData({ ...formData, destinationId: e.target.value ? Number(e.target.value) : null })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b]"
              >
                <option value="">-- No Specific Destination --</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.country || d.region})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Duration (Days / Nights) *
              </label>
              <input
                type="text"
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g. 7 Days / 6 Nights"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Starting Price ($) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                placeholder="1800"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Original / Strike Price ($ Optional)
              </label>
              <input
                type="number"
                value={formData.discountPrice || ''}
                onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value ? Number(e.target.value) : null })}
                placeholder="2100"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b]"
              />
            </div>

            <div className="pt-1">
              <ImageUploadField
                label="Tour Package Cover Photo"
                value={formData.coverImage}
                onChange={(url) => setFormData({ ...formData, coverImage: url })}
                required
                helperText="Upload landscape cover photo for tour cards & header"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Short Description (Card Teaser)
            </label>
            <textarea
              rows={2}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Brief summary displayed on package cards..."
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Comprehensive Description
            </label>
            <textarea
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Full journey narrative and background..."
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b]"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Highlights */}
      {activeTab === 'highlights' && (
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-gray-900">Trip Signature Highlights</h3>
            <button
              type="button"
              onClick={() => addListItem('highlights', 'New Highlight')}
              className="px-3 py-1.5 bg-[#10221b] text-white text-xs font-semibold rounded-lg flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Highlight</span>
            </button>
          </div>

          <div className="space-y-3">
            {formData.highlights.map((hl, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={hl}
                  onChange={(e) => handleListChange('highlights', idx, e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeListItem('highlights', idx)}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Daily Itinerary Builder */}
      {activeTab === 'itinerary' && (
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">Day-by-Day Program Builder</h3>
              <p className="text-xs text-gray-500">Add detailed schedules and activities for every day of the tour.</p>
            </div>
            <button
              type="button"
              onClick={addDay}
              className="px-4 py-2 bg-[#10221b] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Day</span>
            </button>
          </div>

          <div className="space-y-6">
            {formData.itinerary.map((dayItem, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-4 relative"
              >
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#10221b] text-white font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-xs uppercase tracking-wider text-gray-600">
                      Day {idx + 1} Configuration
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeDay(idx)}
                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Day Title
                    </label>
                    <input
                      type="text"
                      value={dayItem.title}
                      onChange={(e) => updateDay(idx, 'title', e.target.value)}
                      placeholder="e.g. Zurich to Lucerne Scenic Transfer"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Day Photo URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={dayItem.image || ''}
                      onChange={(e) => updateDay(idx, 'image', e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Day Narrative / Itinerary Details
                  </label>
                  <textarea
                    rows={3}
                    value={dayItem.description}
                    onChange={(e) => updateDay(idx, 'description', e.target.value)}
                    placeholder="Describe the day's experiences, transfers, meals, and visits..."
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Inclusions & Terms */}
      {activeTab === 'inclusions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inclusions */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Package Inclusions</h4>
              <button
                type="button"
                onClick={() => addListItem('inclusions', 'New Inclusion')}
                className="text-xs text-[#10221b] font-semibold hover:underline"
              >
                + Add Item
              </button>
            </div>
            {formData.inclusions.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleListChange('inclusions', idx, e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                />
                <button
                  type="button"
                  onClick={() => removeListItem('inclusions', idx)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Exclusions */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Package Exclusions</h4>
              <button
                type="button"
                onClick={() => addListItem('exclusions', 'New Exclusion')}
                className="text-xs text-[#10221b] font-semibold hover:underline"
              >
                + Add Item
              </button>
            </div>
            {formData.exclusions.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleListChange('exclusions', idx, e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                />
                <button
                  type="button"
                  onClick={() => removeListItem('exclusions', idx)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: FAQs */}
      {activeTab === 'faqs' && (
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-gray-900">Frequently Asked Questions</h3>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  faq: [...prev.faq, { question: 'Question?', answer: 'Answer here.' }]
                }))
              }
              className="px-3 py-1.5 bg-[#10221b] text-white text-xs font-semibold rounded-lg flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.faq.map((faqItem, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2 relative">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      faq: prev.faq.filter((_, i) => i !== idx)
                    }))
                  }
                  className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-500">Question</label>
                  <input
                    type="text"
                    value={faqItem.question}
                    onChange={(e) => {
                      const updated = [...formData.faq];
                      updated[idx].question = e.target.value;
                      setFormData({ ...formData, faq: updated });
                    }}
                    className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-500">Answer</label>
                  <textarea
                    rows={2}
                    value={faqItem.answer}
                    onChange={(e) => {
                      const updated = [...formData.faq];
                      updated[idx].answer = e.target.value;
                      setFormData({ ...formData, faq: updated });
                    }}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
