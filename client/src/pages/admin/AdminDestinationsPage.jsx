import React, { useState, useEffect } from 'react';
import {
  Search,
  Edit2,
  ExternalLink,
  Globe2,
  Eye,
  EyeOff,
  Check,
  X,
  MapPin,
  Plus,
  Trash2,
  Layers,
  Sparkles,
  HelpCircle,
  Image as ImageIcon,
  BookOpen,
  Flag,
  Compass,
  ArrowRight,
  Save
} from 'lucide-react';
import {
  getStoredDestinations,
  toggleDestinationPublish,
  updateDestinationDetails,
  addDestination,
  deleteDestination,
  getDestinationFullContent,
  saveDestinationFullContent,
  DESTINATIONS_EVENT
} from '../../utils/destinationsManager';
import { destinationService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';
import ImageUploadField from '../../components/admin/ImageUploadField';

const MODAL_TABS = [
  { id: 'general', label: 'General & Hero', icon: Globe2 },
  { id: 'intro', label: 'Intro & Story', icon: BookOpen },
  { id: 'countries', label: 'Curated Places', icon: MapPin },
  { id: 'highlights', label: 'Highlights', icon: Sparkles },
  { id: 'why_us', label: 'Why Us Tab', icon: Layers },
  { id: 'banner', label: 'CTA Banner', icon: Flag },
  { id: 'faqs', label: 'FAQs', icon: HelpCircle }
];

const emptyContentTemplate = {
  name: '',
  slug: '',
  tagline: '',
  heroImage: '/assets/images/sean-robertson-5ftxFgXLtkI-unsplash-scaled.jpg',
  isPublished: true,
  intro: {
    eyebrow: 'Where Every Horizon Tells a Story',
    title: 'Curated Escapes & Luxury Expeditions',
    description: 'Experience unparalleled elegance, secluded retreats, and bespoke itineraries designed by private luxury travel specialists.',
    img1: '/assets/images/sutirta-budiman-kjOBqwMUnWw-unsplash-scaled.jpg',
    img2: '/assets/images/sean-robertson-5ftxFgXLtkI-unsplash-scaled.jpg'
  },
  tabs: {
    tab1: {
      label: 'Why Blackforest Holidays?',
      subtitle: 'Every Journey Feels Legendary',
      title: 'Where Wild Safaris Meet Luxury Retreats',
      description: 'At Black Forest Holidays, we craft extraordinary journeys tailored to your preferences with vetted local partners and private concierge handling.',
      image: '/assets/images/hendrik-cornelissen-qs4E9t0hJc0-unsplash-scaled.jpg'
    },
    tab2: {
      label: 'Destinations',
      subtitle: 'Our Curated Footprint',
      title: 'Island Blues to Mountain Views',
      items: [],
      image: '/assets/images/ahmed-shabana-ADa9bb3tqR4-unsplash-scaled.jpg'
    },
    tab3: {
      label: 'Highlights',
      subtitle: 'Signature Experiences',
      title: 'Highlights',
      highlights: [
        '1. Private guided excursions with master naturalists',
        '2. Handpicked 5-star boutique lodgings and heritage stays',
        '3. Seamless VIP ground handling and private airport transfers',
        '4. Dedicated 24/7 travel concierge throughout your journey'
      ],
      image: '/assets/images/sergi-ferrete-YXwt-vJ3szA-unsplash-scaled.jpg'
    }
  },
  parallaxBanner: {
    eyebrow: 'Start a trip now',
    title: 'Discover the World Through a Lens of Luxury',
    subtitle: 'Everything you need for an extraordinary journey.',
    buttonText: 'CONTACT US',
    buttonLink: '/contact',
    bgImage: '/assets/images/4.png'
  },
  countries: [],
  faqs: []
};

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState(getStoredDestinations());
  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [contentForm, setContentForm] = useState(emptyContentTemplate);
  const [saving, setSaving] = useState(false);
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

  const handleOpenEdit = (dest) => {
    setIsCreating(false);
    setEditingItem(dest);
    setActiveTab('general');

    const fullContent = getDestinationFullContent(dest.slug);
    setContentForm({
      ...emptyContentTemplate,
      ...fullContent,
      name: dest.name || fullContent.name,
      slug: dest.slug,
      tagline: dest.tagline || fullContent.tagline || '',
      heroImage: dest.heroImage || fullContent.heroImage || '',
      isPublished: dest.isPublished !== false,
      intro: { ...emptyContentTemplate.intro, ...(fullContent.intro || {}) },
      tabs: {
        tab1: { ...emptyContentTemplate.tabs.tab1, ...(fullContent.tabs?.tab1 || {}) },
        tab2: { ...emptyContentTemplate.tabs.tab2, ...(fullContent.tabs?.tab2 || {}) },
        tab3: { ...emptyContentTemplate.tabs.tab3, ...(fullContent.tabs?.tab3 || {}) }
      },
      parallaxBanner: { ...emptyContentTemplate.parallaxBanner, ...(fullContent.parallaxBanner || {}) },
      countries: Array.isArray(fullContent.countries) ? [...fullContent.countries] : [],
      faqs: Array.isArray(fullContent.faqs) ? [...fullContent.faqs] : []
    });
  };

  const handleOpenCreate = () => {
    setIsCreating(true);
    setEditingItem({ isNew: true });
    setActiveTab('general');
    setContentForm({
      ...emptyContentTemplate,
      name: '',
      slug: '',
      tagline: '',
      heroImage: '/assets/images/family-holidays-nsw-main.jpg',
      isPublished: true,
      countries: [],
      faqs: []
    });
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!contentForm.name.trim()) {
      showToast('Please enter a destination name', 'error');
      return;
    }

    const rawSlug = contentForm.slug || contentForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const cleanSlug = rawSlug.trim() || `dest-${Date.now()}`;

    setSaving(true);
    try {
      if (isCreating) {
        addDestination({
          name: contentForm.name,
          slug: cleanSlug,
          tagline: contentForm.tagline,
          heroImage: contentForm.heroImage,
          isPublished: contentForm.isPublished !== false,
          countries: contentForm.countries,
          content: { ...contentForm, slug: cleanSlug }
        });
        showToast(`Created new destination "${contentForm.name}" successfully`, 'success');
      } else {
        const targetSlug = editingItem.slug || cleanSlug;
        updateDestinationDetails(targetSlug, {
          name: contentForm.name,
          tagline: contentForm.tagline,
          heroImage: contentForm.heroImage,
          isPublished: contentForm.isPublished !== false
        });
        saveDestinationFullContent(targetSlug, { ...contentForm, slug: targetSlug });
        showToast(`Updated "${contentForm.name}" content and sections successfully`, 'success');
      }

      reloadData();
      setEditingItem(null);
    } catch (err) {
      console.error('Error saving destination:', err);
      showToast('Failed to save destination: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (dest) => {
    if (window.confirm(`Are you sure you want to delete "${dest.name}"? This will remove it from the website.`)) {
      deleteDestination(dest.slug);
      reloadData();
      showToast(`Deleted destination "${dest.name}"`, 'info');
      if (editingItem?.slug === dest.slug) {
        setEditingItem(null);
      }
    }
  };

  // Helper functions for adding & editing dynamic array items
  const handleAddCountry = () => {
    setContentForm(prev => ({
      ...prev,
      countries: [
        ...prev.countries,
        {
          name: '',
          desc: '',
          image: '/assets/images/redcharlie-xtvo0ffGKlI-unsplash-scaled.jpg'
        }
      ]
    }));
  };

  const handleUpdateCountry = (idx, field, value) => {
    setContentForm(prev => {
      const updated = [...prev.countries];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, countries: updated };
    });
  };

  const handleRemoveCountry = (idx) => {
    setContentForm(prev => ({
      ...prev,
      countries: prev.countries.filter((_, i) => i !== idx)
    }));
  };

  const handleAddHighlight = () => {
    setContentForm(prev => ({
      ...prev,
      tabs: {
        ...prev.tabs,
        tab3: {
          ...prev.tabs?.tab3,
          highlights: [
            ...(prev.tabs?.tab3?.highlights || []),
            `${(prev.tabs?.tab3?.highlights || []).length + 1}. `
          ]
        }
      }
    }));
  };

  const handleUpdateHighlight = (idx, value) => {
    setContentForm(prev => {
      const list = [...(prev.tabs?.tab3?.highlights || [])];
      list[idx] = value;
      return {
        ...prev,
        tabs: {
          ...prev.tabs,
          tab3: {
            ...prev.tabs?.tab3,
            highlights: list
          }
        }
      };
    });
  };

  const handleRemoveHighlight = (idx) => {
    setContentForm(prev => ({
      ...prev,
      tabs: {
        ...prev.tabs,
        tab3: {
          ...prev.tabs?.tab3,
          highlights: (prev.tabs?.tab3?.highlights || []).filter((_, i) => i !== idx)
        }
      }
    }));
  };

  const handleAddFaq = () => {
    setContentForm(prev => ({
      ...prev,
      faqs: [
        ...(prev.faqs || []),
        { question: '', answer: '' }
      ]
    }));
  };

  const handleUpdateFaq = (idx, field, value) => {
    setContentForm(prev => {
      const updated = [...(prev.faqs || [])];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, faqs: updated };
    });
  };

  const handleRemoveFaq = (idx) => {
    setContentForm(prev => ({
      ...prev,
      faqs: (prev.faqs || []).filter((_, i) => i !== idx)
    }));
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
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              CMS Catalog
            </span>
            <span className="text-xs text-zinc-400">
              {publishedCount} of {destinations.length} Published
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 font-serif mt-1">
            Destination Portfolio & Content Manager
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            Manage destination regions, edit story content, add countries and signature highlights, or create new destinations.
          </p>
        </div>

        {/* Action Controls: Search + Add Destination */}
        <div className="flex items-center gap-3">
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

          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-zinc-900 hover:bg-black text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Destination</span>
          </button>
        </div>
      </div>

      {/* Grid of Destinations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((dest) => {
          const isPublished = dest.isPublished !== false;

          return (
            <div
              key={dest.slug}
              className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md ${
                isPublished ? 'border-zinc-200/90' : 'border-zinc-200 bg-zinc-50/50 opacity-80'
              }`}
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-44 overflow-hidden bg-zinc-100 group">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <span
                    className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase shadow-xs ${
                      isPublished
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-700 text-zinc-300'
                    }`}
                  >
                    {isPublished ? 'Published' : 'Hidden'}
                  </span>

                  {dest.isCustom && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-amber-500 text-zinc-900 shadow-xs">
                      Custom
                    </span>
                  )}

                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <h3 className="text-base font-serif font-bold leading-tight drop-shadow-md">
                      {dest.name}
                    </h3>
                    <p className="text-[11px] text-zinc-200 font-mono tracking-tight opacity-90 truncate">
                      /{dest.slug}
                    </p>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 space-y-2">
                  <p
                    className="text-xs text-zinc-600 font-medium italic line-clamp-1"
                    style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
                  >
                    {dest.tagline || 'Untamed Wilderness & Curated Luxury'}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono pt-1">
                    <span className="flex items-center gap-1 text-zinc-600">
                      <MapPin className="w-3 h-3 text-zinc-400" />
                      {dest.countriesCount || 0} Curated Places
                    </span>
                    <a
                      href={`/destinations/${dest.slug}?preview=true`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-0.5"
                    >
                      <span>View</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Card Footer Controls */}
              <div className="p-3 pt-0 border-t border-zinc-100/80 bg-zinc-50/50 flex items-center justify-between gap-2">
                {/* Live toggle */}
                <label className="flex items-center gap-1.5 cursor-pointer text-xs select-none">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={() => handleToggle(dest.slug, isPublished, dest.name)}
                    className="sr-only peer"
                  />
                  <div className="w-7 h-4 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-600 relative"></div>
                  <span className="text-[11px] font-medium text-zinc-600">Live</span>
                </label>

                {/* Edit & Delete Action Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(dest)}
                    className="px-2.5 py-1 bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 rounded-md text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                  >
                    <Edit2 className="w-3 h-3 text-zinc-600" />
                    <span>Edit Content</span>
                  </button>

                  {dest.isCustom && (
                    <button
                      type="button"
                      onClick={() => handleDelete(dest)}
                      title="Delete Destination"
                      className="p-1 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* COMPREHENSIVE DESTINATION CMS MODAL (EDIT & ADD CONTENT)                 */}
      {/* ========================================================================= */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-zinc-200 flex flex-col max-h-[92vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/80">
              <div>
                <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block font-mono">
                  Destination CMS & Content Builder
                </span>
                <h3 className="text-lg font-serif font-bold text-zinc-900 flex items-center gap-2">
                  <span>{isCreating ? 'Create New Destination' : `Edit ${contentForm.name || editingItem.name}`}</span>
                  {contentForm.slug && (
                    <span className="text-xs font-mono font-normal text-zinc-400 px-2 py-0.5 rounded bg-zinc-200/60">
                      /destinations/{contentForm.slug}
                    </span>
                  )}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {!isCreating && (
                  <a
                    href={`/destinations/${contentForm.slug || editingItem.slug}?preview=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 font-medium transition-colors"
                  >
                    <span>Live Preview</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  onClick={() => setEditingItem(null)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-200/60 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Tabs Navigation Bar */}
            <div className="px-6 border-b border-zinc-200 bg-white flex items-center gap-1 overflow-x-auto scrollbar-none">
              {MODAL_TABS.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                      isActive
                        ? 'border-zinc-900 text-zinc-900 font-bold'
                        : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`} />
                    <span>{tab.label}</span>
                    {tab.id === 'countries' && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-100 text-zinc-600 font-mono">
                        {contentForm.countries?.length || 0}
                      </span>
                    )}
                    {tab.id === 'highlights' && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-100 text-zinc-600 font-mono">
                        {contentForm.tabs?.tab3?.highlights?.length || 0}
                      </span>
                    )}
                    {tab.id === 'faqs' && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-100 text-zinc-600 font-mono">
                        {contentForm.faqs?.length || 0}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Scrollable Tab Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              
              {/* TAB 1: GENERAL & HERO */}
              {activeTab === 'general' && (
                <div className="space-y-4 max-w-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-zinc-700 uppercase mb-1">
                        Destination Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={contentForm.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setContentForm(prev => ({
                            ...prev,
                            name: val,
                            slug: isCreating ? val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : prev.slug
                          }));
                        }}
                        placeholder="e.g. Africa, Europe, Scandinavia"
                        className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-800"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-zinc-700 uppercase mb-1">
                        URL Slug <span className="text-zinc-400 text-[10px] font-normal">(Route key)</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={contentForm.slug}
                        onChange={(e) => setContentForm({ ...contentForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '-') })}
                        placeholder="e.g. africa, middle-east"
                        className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-mono text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 uppercase mb-1">
                      Cursive Tagline <span className="text-zinc-400 text-[10px] font-normal">(Appears on cards and section subtitle)</span>
                    </label>
                    <input
                      type="text"
                      value={contentForm.tagline}
                      onChange={(e) => setContentForm({ ...contentForm, tagline: e.target.value })}
                      placeholder="e.g. Untamed Wilderness & Safaris"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-800"
                    />
                  </div>

                  <ImageUploadField
                    label="Hero Banner Image"
                    required
                    value={contentForm.heroImage}
                    onChange={(url) => setContentForm({ ...contentForm, heroImage: url })}
                    recommendedDimensions="1920 × 1080 px"
                  />

                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                    <div>
                      <span className="font-semibold text-zinc-800 block">Website Visibility</span>
                      <span className="text-[11px] text-zinc-500">
                        When published, this destination is active on header menus and detail routes.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setContentForm({ ...contentForm, isPublished: !contentForm.isPublished })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        contentForm.isPublished
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-zinc-200 text-zinc-700'
                      }`}
                    >
                      {contentForm.isPublished ? 'Published (Live)' : 'Unpublished (Hidden)'}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: INTRO & STORY */}
              {activeTab === 'intro' && (
                <div className="space-y-4 max-w-3xl">
                  <div>
                    <label className="block font-semibold text-zinc-700 uppercase mb-1">
                      Intro Eyebrow Tag
                    </label>
                    <input
                      type="text"
                      value={contentForm.intro?.eyebrow || ''}
                      onChange={(e) => setContentForm({
                        ...contentForm,
                        intro: { ...contentForm.intro, eyebrow: e.target.value }
                      })}
                      placeholder="e.g. Where Every Horizon Tells a Story"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 uppercase mb-1">
                      Main Intro Heading / Title
                    </label>
                    <input
                      type="text"
                      value={contentForm.intro?.title || ''}
                      onChange={(e) => setContentForm({
                        ...contentForm,
                        intro: { ...contentForm.intro, title: e.target.value }
                      })}
                      placeholder="e.g. Luxury Escapes Across Africa's Untamed Wonders"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm font-semibold text-zinc-900 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 uppercase mb-1">
                      Story Narrative / Long Description
                    </label>
                    <textarea
                      rows={5}
                      value={contentForm.intro?.description || ''}
                      onChange={(e) => setContentForm({
                        ...contentForm,
                        intro: { ...contentForm.intro, description: e.target.value }
                      })}
                      placeholder="Detailed editorial narrative introducing the destination's unique landscapes, culture, wildlife, and luxury travel experience..."
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:bg-white focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <ImageUploadField
                      label="Intro Gallery Image 1"
                      value={contentForm.intro?.img1 || ''}
                      onChange={(url) => setContentForm({
                        ...contentForm,
                        intro: { ...contentForm.intro, img1: url }
                      })}
                      compact={true}
                      recommendedDimensions="800 × 600 px"
                    />
                    <ImageUploadField
                      label="Intro Gallery Image 2"
                      value={contentForm.intro?.img2 || ''}
                      onChange={(url) => setContentForm({
                        ...contentForm,
                        intro: { ...contentForm.intro, img2: url }
                      })}
                      compact={true}
                      recommendedDimensions="800 × 600 px"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: CURATED COUNTRIES & PLACES */}
              {activeTab === 'countries' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-zinc-800 text-sm">
                        Curated Countries & Regional Places
                      </h4>
                      <p className="text-[11px] text-zinc-500">
                        Add, edit, or remove the individual country/place cards showcased in this destination.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddCountry}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Country / Place</span>
                    </button>
                  </div>

                  {(!contentForm.countries || contentForm.countries.length === 0) ? (
                    <div className="p-8 text-center border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
                      <MapPin className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                      <p className="font-medium text-zinc-600">No countries or places added yet.</p>
                      <p className="text-[11px] text-zinc-400 mt-1">
                        Click "Add Country / Place" to add the first country card to this destination portfolio.
                      </p>
                      <button
                        type="button"
                        onClick={handleAddCountry}
                        className="mt-3 px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Country</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {contentForm.countries.map((country, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-white rounded-xl border border-zinc-200/90 shadow-2xs hover:shadow-xs transition-shadow flex flex-col sm:flex-row gap-5 items-start"
                        >
                          {/* Dedicated Photo Thumbnail Card (Compact Mode) */}
                          <div className="w-full sm:w-48 shrink-0">
                            <ImageUploadField
                              label={`Photo #${idx + 1}`}
                              value={country.image || ''}
                              onChange={(url) => handleUpdateCountry(idx, 'image', url)}
                              compact={true}
                              recommendedDimensions="600 × 400 px"
                            />
                          </div>

                          {/* Place Details Column */}
                          <div className="flex-1 w-full space-y-2.5 min-w-0">
                            <div>
                              <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                                Place / Country Name
                              </label>
                              <input
                                type="text"
                                value={country.name || ''}
                                onChange={(e) => handleUpdateCountry(idx, 'name', e.target.value)}
                                placeholder="e.g. South Africa, Kenya, Switzerland"
                                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-800"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                                Description / Highlights
                              </label>
                              <textarea
                                rows={3}
                                value={country.desc || ''}
                                onChange={(e) => handleUpdateCountry(idx, 'desc', e.target.value)}
                                placeholder="Brief overview of highlights, tours, and experiences in this place..."
                                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-800 leading-relaxed"
                              />
                            </div>
                          </div>

                          {/* Delete Country Action */}
                          <div className="self-start pt-1">
                            <button
                              type="button"
                              onClick={() => handleRemoveCountry(idx)}
                              className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                              title="Delete Country / Place"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: HIGHLIGHTS */}
              {activeTab === 'highlights' && (
                <div className="space-y-4 max-w-3xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-zinc-700 uppercase mb-1">
                        Highlights Subtitle
                      </label>
                      <input
                        type="text"
                        value={contentForm.tabs?.tab3?.subtitle || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          tabs: {
                            ...contentForm.tabs,
                            tab3: { ...contentForm.tabs?.tab3, subtitle: e.target.value }
                          }
                        })}
                        placeholder="e.g. Signature Experiences"
                        className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-zinc-700 uppercase mb-1">
                        Highlights Heading
                      </label>
                      <input
                        type="text"
                        value={contentForm.tabs?.tab3?.title || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          tabs: {
                            ...contentForm.tabs,
                            tab3: { ...contentForm.tabs?.tab3, title: e.target.value }
                          }
                        })}
                        placeholder="e.g. Highlights"
                        className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <ImageUploadField
                    label="Highlights Feature Photo"
                    value={contentForm.tabs?.tab3?.image || ''}
                    onChange={(url) => setContentForm({
                      ...contentForm,
                      tabs: {
                        ...contentForm.tabs,
                        tab3: { ...contentForm.tabs?.tab3, image: url }
                      }
                    })}
                    recommendedDimensions="800 × 600 px"
                  />

                  {/* Highlights Bullet List */}
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-semibold text-zinc-700 uppercase text-xs">
                        Signature Highlight Bullet Points
                      </label>
                      <button
                        type="button"
                        onClick={handleAddHighlight}
                        className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Bullet</span>
                      </button>
                    </div>

                    {(contentForm.tabs?.tab3?.highlights || []).map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2">
                        <span className="text-zinc-400 font-mono text-[11px] w-5 text-right">
                          #{bIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => handleUpdateHighlight(bIdx, e.target.value)}
                          placeholder="e.g. Cape Town views, Garden Route drives & Big Five safaris"
                          className="flex-1 px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:bg-white focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveHighlight(bIdx)}
                          className="p-1.5 text-zinc-400 hover:text-red-600 rounded cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: WHY US (PHILOSOPHY) */}
              {activeTab === 'why_us' && (
                <div className="space-y-4 max-w-3xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-zinc-700 uppercase mb-1">
                        Tab Label
                      </label>
                      <input
                        type="text"
                        value={contentForm.tabs?.tab1?.label || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          tabs: {
                            ...contentForm.tabs,
                            tab1: { ...contentForm.tabs?.tab1, label: e.target.value }
                          }
                        })}
                        placeholder="e.g. Why Blackforest Holidays?"
                        className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-zinc-700 uppercase mb-1">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={contentForm.tabs?.tab1?.subtitle || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          tabs: {
                            ...contentForm.tabs,
                            tab1: { ...contentForm.tabs?.tab1, subtitle: e.target.value }
                          }
                        })}
                        placeholder="e.g. Every Journey Feels Legendary"
                        className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 uppercase mb-1">
                      Philosophy Title
                    </label>
                    <input
                      type="text"
                      value={contentForm.tabs?.tab1?.title || ''}
                      onChange={(e) => setContentForm({
                        ...contentForm,
                        tabs: {
                          ...contentForm.tabs,
                          tab1: { ...contentForm.tabs?.tab1, title: e.target.value }
                        }
                      })}
                      placeholder="e.g. Where Wild Safaris Meet Luxury Retreats"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm font-semibold text-zinc-900 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 uppercase mb-1">
                      Philosophy Description
                    </label>
                    <textarea
                      rows={4}
                      value={contentForm.tabs?.tab1?.description || ''}
                      onChange={(e) => setContentForm({
                        ...contentForm,
                        tabs: {
                          ...contentForm.tabs,
                          tab1: { ...contentForm.tabs?.tab1, description: e.target.value }
                        }
                      })}
                      placeholder="Why travelers trust Blackforest Holidays for this destination..."
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:bg-white focus:outline-none leading-relaxed"
                    />
                  </div>

                  <ImageUploadField
                    label="Philosophy Feature Photo"
                    value={contentForm.tabs?.tab1?.image || ''}
                    onChange={(url) => setContentForm({
                      ...contentForm,
                      tabs: {
                        ...contentForm.tabs,
                        tab1: { ...contentForm.tabs?.tab1, image: url }
                      }
                    })}
                    recommendedDimensions="800 × 600 px"
                  />
                </div>
              )}

              {/* TAB 6: CTA BANNER */}
              {activeTab === 'banner' && (
                <div className="space-y-4 max-w-3xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-zinc-700 uppercase mb-1">
                        Banner Eyebrow
                      </label>
                      <input
                        type="text"
                        value={contentForm.parallaxBanner?.eyebrow || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          parallaxBanner: { ...contentForm.parallaxBanner, eyebrow: e.target.value }
                        })}
                        placeholder="e.g. Start a trip now"
                        className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-zinc-700 uppercase mb-1">
                        Banner Subtitle
                      </label>
                      <input
                        type="text"
                        value={contentForm.parallaxBanner?.subtitle || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          parallaxBanner: { ...contentForm.parallaxBanner, subtitle: e.target.value }
                        })}
                        placeholder="e.g. Everything you need for an adventure."
                        className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 uppercase mb-1">
                      Banner Main Headline
                    </label>
                    <input
                      type="text"
                      value={contentForm.parallaxBanner?.title || ''}
                      onChange={(e) => setContentForm({
                        ...contentForm,
                        parallaxBanner: { ...contentForm.parallaxBanner, title: e.target.value }
                      })}
                      placeholder="e.g. Discover the World Through a Lens of Luxury"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm font-semibold text-zinc-900 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-zinc-700 uppercase mb-1">
                        CTA Button Label
                      </label>
                      <input
                        type="text"
                        value={contentForm.parallaxBanner?.buttonText || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          parallaxBanner: { ...contentForm.parallaxBanner, buttonText: e.target.value }
                        })}
                        placeholder="e.g. CONTACT US"
                        className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-zinc-700 uppercase mb-1">
                        CTA Button Link URL
                      </label>
                      <input
                        type="text"
                        value={contentForm.parallaxBanner?.buttonLink || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          parallaxBanner: { ...contentForm.parallaxBanner, buttonLink: e.target.value }
                        })}
                        placeholder="e.g. /contact or #enquiry"
                        className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-mono text-zinc-900 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <ImageUploadField
                    label="Banner Background Image"
                    value={contentForm.parallaxBanner?.bgImage || ''}
                    onChange={(url) => setContentForm({
                      ...contentForm,
                      parallaxBanner: { ...contentForm.parallaxBanner, bgImage: url }
                    })}
                    recommendedDimensions="1920 × 800 px"
                  />
                </div>
              )}

              {/* TAB 7: FAQS */}
              {activeTab === 'faqs' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-zinc-800 text-sm">
                        Destination Specific FAQs
                      </h4>
                      <p className="text-[11px] text-zinc-500">
                        Provide answers to frequently asked questions about visas, weather, packing, and best travel seasons.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddFaq}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add FAQ</span>
                    </button>
                  </div>

                  {(!contentForm.faqs || contentForm.faqs.length === 0) ? (
                    <div className="p-8 text-center border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
                      <HelpCircle className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                      <p className="font-medium text-zinc-600">No FAQs added for this destination.</p>
                      <p className="text-[11px] text-zinc-400 mt-1">
                        Click "Add FAQ" to provide travel tips and advice.
                      </p>
                      <button
                        type="button"
                        onClick={handleAddFaq}
                        className="mt-3 px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add FAQ</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {contentForm.faqs.map((faq, fIdx) => (
                        <div key={fIdx} className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-zinc-700 text-xs">
                              Question #{fIdx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFaq(fIdx)}
                              className="p-1 text-zinc-400 hover:text-red-600 rounded cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={faq.question || ''}
                            onChange={(e) => handleUpdateFaq(fIdx, 'question', e.target.value)}
                            placeholder="e.g. When is the best time for wildlife safaris?"
                            className="w-full px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-medium text-zinc-900 focus:outline-none"
                          />
                          <textarea
                            rows={2}
                            value={faq.answer || ''}
                            onChange={(e) => handleUpdateFaq(fIdx, 'answer', e.target.value)}
                            placeholder="Provide a detailed, helpful answer..."
                            className="w-full px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Modal Sticky Footer */}
            <div className="px-6 py-4 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between">
              <div>
                {!isCreating && editingItem?.isCustom && (
                  <button
                    type="button"
                    onClick={() => handleDelete(editingItem)}
                    className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Destination</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="px-5 py-2 bg-zinc-900 hover:bg-black text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : (isCreating ? 'Create Destination' : 'Save Content Changes')}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
