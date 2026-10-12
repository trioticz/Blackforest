import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Image as ImageIcon,
  Upload,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  Eye,
  SlidersHorizontal,
  RotateCcw,
  Send,
  Layers,
  Copy,
  Check,
  ExternalLink,
  Plus,
  Trash2,
  X,
  FileCheck,
  ArrowRight,
  Filter,
  Grid,
  List,
  Sparkles,
  HelpCircle,
  Clock,
  UserCheck
} from 'lucide-react';
import { websiteImageService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';
import { useWebsiteImages } from '../../context/WebsiteImagesContext';

const CATEGORIES = [
  'All',
  'Homepage',
  'Header & Navigation',
  'Hero Banners & Sliders',
  'Promotional Banners',
  'Product Images',
  'Category Images',
  'Collection Sections',
  'About Us',
  'Services',
  'Testimonials',
  'Blog & Articles',
  'Footer',
  'Other Pages',
  'Other Website Images'
];

export default function AdminWebsiteImagesPage() {
  const { showToast } = useToast();
  const { refreshImages: refreshGlobalImages } = useWebsiteImages();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPage, setSelectedPage] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'draft', 'published'
  const [sortBy, setSortBy] = useState('category'); // 'category', 'name', 'section', 'updated'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Modal states
  const [activeUploadItem, setActiveUploadItem] = useState(null); // image object being replaced
  const [activePreviewItem, setActivePreviewItem] = useState(null); // image object being previewed
  const [activeRestoreItem, setActiveRestoreItem] = useState(null); // image object being restored
  const [confirmPublishAllOpen, setConfirmPublishAllOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Upload modal form state
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState('');
  const [uploadAltText, setUploadAltText] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [publishImmediately, setPublishImmediately] = useState(false);
  const fileInputRef = useRef(null);

  // Create new key modal form state
  const [newImageForm, setNewImageForm] = useState({
    image_key: '',
    image_name: '',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'General',
    image_url: '',
    alt_text: '',
    dimensions: '1920x1080',
    aspect_ratio: '16:9'
  });

  const [copiedKey, setCopiedKey] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await websiteImageService.getAll({ preview: 'true' });
      if (res && res.success && res.data) {
        setImages(res.data.images || []);
        setIsUsingFallback(Boolean(res.data.isLocalFallback));
      }
    } catch (err) {
      showToast('Failed to load website images: ' + (err.message || 'Server error'), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Compute unique pages for filtering
  const availablePages = useMemo(() => {
    const set = new Set();
    images.forEach((img) => {
      if (img.page_name) set.add(img.page_name);
    });
    return ['All', ...Array.from(set).sort()];
  }, [images]);

  // Pending drafts count
  const pendingDrafts = useMemo(() => {
    return images.filter((img) => img.has_pending_draft);
  }, [images]);

  // Filtered & sorted images
  const filteredImages = useMemo(() => {
    return images
      .filter((img) => {
        // Category filter
        if (selectedCategory !== 'All' && img.category !== selectedCategory) {
          return false;
        }
        // Page filter
        if (selectedPage !== 'All' && img.page_name !== selectedPage) {
          return false;
        }
        // Status filter
        if (statusFilter === 'draft' && !img.has_pending_draft) {
          return false;
        }
        if (statusFilter === 'published' && img.has_pending_draft) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchKey = img.image_key?.toLowerCase().includes(q);
          const matchName = img.image_name?.toLowerCase().includes(q);
          const matchSec = img.section_name?.toLowerCase().includes(q);
          const matchPage = img.page_name?.toLowerCase().includes(q);
          const matchCat = img.category?.toLowerCase().includes(q);
          const matchAlt = img.alt_text?.toLowerCase().includes(q);
          if (!matchKey && !matchName && !matchSec && !matchPage && !matchCat && !matchAlt) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.image_name.localeCompare(b.image_name);
        if (sortBy === 'key') return a.image_key.localeCompare(b.image_key);
        if (sortBy === 'section') return a.section_name.localeCompare(b.section_name);
        if (sortBy === 'status') return (b.has_pending_draft ? 1 : 0) - (a.has_pending_draft ? 1 : 0);
        return a.category.localeCompare(b.category);
      });
  }, [images, selectedCategory, selectedPage, statusFilter, searchQuery, sortBy]);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`Copied "${text}" to clipboard`, 'success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Open replace modal
  const handleOpenUpload = (item) => {
    setActiveUploadItem(item);
    setUploadFile(null);
    setUploadPreviewUrl(item.draft_image_url || item.image_url);
    setUploadAltText(item.alt_text || '');
    setUploadProgress(0);
    setUploadError('');
    setPublishImmediately(false);
  };

  // File selection & validation
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
    if (!validTypes.includes(file.mimetype || file.type)) {
      setUploadError('Invalid file type. Only JPG, PNG, WebP, SVG, and GIF are allowed.');
      return;
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds the 10MB limit.');
      return;
    }

    setUploadError('');
    setUploadFile(file);

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setUploadPreviewUrl(previewUrl);

    // Read dimensions for info
    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      // If item has expected dimensions, can inform admin
    };
  };

  // Handle Drag & Drop
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const fakeEvent = { target: { files: [file] } };
      handleFileChange(fakeEvent);
    }
  };

  // Submit Upload & Replace
  const handleSaveUpload = async () => {
    if (!activeUploadItem) return;

    try {
      setIsUploading(true);
      setUploadError('');
      let uploadedUrl = uploadPreviewUrl;

      // 1. If a new file was chosen, upload to backend storage
      if (uploadFile) {
        const uploadRes = await websiteImageService.upload(uploadFile, (pct) => {
          setUploadProgress(pct);
        });

        if (!uploadRes || !uploadRes.success || !uploadRes.data?.url) {
          throw new Error(uploadRes?.message || 'Failed to upload image file to server');
        }
        uploadedUrl = uploadRes.data.url;
      }

      // 2. Save draft in database
      const updateRes = await websiteImageService.updateDraft(activeUploadItem.id, {
        draft_image_url: uploadedUrl,
        alt_text: uploadAltText
      });

      if (!updateRes || !updateRes.success) {
        throw new Error(updateRes?.message || 'Failed to save image draft');
      }

      // 3. If "Publish Immediately" was checked, publish right away
      if (publishImmediately) {
        await websiteImageService.publish(activeUploadItem.id);
        showToast(`Image "${activeUploadItem.image_name}" published successfully!`, 'success');
      } else {
        showToast(`Draft saved for "${activeUploadItem.image_name}". Preview before publishing.`, 'info');
      }

      setActiveUploadItem(null);
      await fetchImages();
      refreshGlobalImages();
    } catch (err) {
      setUploadError(err.message || 'An error occurred while uploading.');
      showToast(err.message || 'Failed to upload', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // Publish single image
  const handlePublishSingle = async (item) => {
    try {
      const res = await websiteImageService.publish(item.id);
      if (res && res.success) {
        showToast(`"${item.image_name}" published to live website!`, 'success');
        await fetchImages();
        refreshGlobalImages();
        if (activePreviewItem?.id === item.id) {
          setActivePreviewItem(null);
        }
      }
    } catch (err) {
      showToast('Publish failed: ' + (err.message || 'Server error'), 'error');
    }
  };

  // Discard draft
  const handleDiscardDraft = async (item) => {
    try {
      const res = await websiteImageService.discardDraft(item.id);
      if (res && res.success) {
        showToast(`Draft discarded for "${item.image_name}". Reverted to published.`, 'info');
        await fetchImages();
        refreshGlobalImages();
        if (activePreviewItem?.id === item.id) {
          setActivePreviewItem(null);
        }
      }
    } catch (err) {
      showToast('Discard failed: ' + (err.message || 'Server error'), 'error');
    }
  };

  // Restore original
  const handleRestoreOriginal = async (item) => {
    try {
      const res = await websiteImageService.restoreOriginal(item.id);
      if (res && res.success) {
        showToast(`Restored original default image for "${item.image_name}"!`, 'success');
        setActiveRestoreItem(null);
        await fetchImages();
        refreshGlobalImages();
      }
    } catch (err) {
      showToast('Restore failed: ' + (err.message || 'Server error'), 'error');
    }
  };

  // Publish all pending drafts
  const handlePublishAll = async () => {
    try {
      const res = await websiteImageService.publishAll();
      if (res && res.success) {
        showToast(`Published ${res.data?.publishedCount || 0} images to live website!`, 'success');
        setConfirmPublishAllOpen(false);
        await fetchImages();
        refreshGlobalImages();
      }
    } catch (err) {
      showToast('Bulk publish failed: ' + (err.message || 'Server error'), 'error');
    }
  };

  // Create new key
  const handleCreateImage = async (e) => {
    e.preventDefault();
    try {
      const res = await websiteImageService.create(newImageForm);
      if (res && res.success) {
        showToast(`Created managed image "${newImageForm.image_name}"`, 'success');
        setCreateModalOpen(false);
        setNewImageForm({
          image_key: '',
          image_name: '',
          category: 'Homepage',
          page_name: 'Home',
          section_name: 'General',
          image_url: '',
          alt_text: '',
          dimensions: '1920x1080',
          aspect_ratio: '16:9'
        });
        await fetchImages();
        refreshGlobalImages();
      }
    } catch (err) {
      showToast('Failed to create image: ' + (err.message || 'Server error'), 'error');
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* ── Top Header & Stats Banner ── */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#10221b] text-[#27B8B1] flex items-center justify-center shadow-xs">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
                Website Image Manager
              </h1>
            </div>
            <p className="text-sm text-zinc-500 max-w-2xl">
              Dynamically upload, preview, replace, and publish website imagery across all pages without editing code. Changes can be drafted and previewed before going live.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live Website Preview Button */}
            <a
              href="/?preview=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-sm font-medium rounded-xl transition-all cursor-pointer shadow-xs border border-zinc-200"
              title="Open website in draft preview mode"
            >
              <Eye className="w-4 h-4 text-[#27B8B1]" />
              <span>Preview on Website</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>

            {/* Publish All Button */}
            <button
              onClick={() => setConfirmPublishAllOpen(true)}
              disabled={pendingDrafts.length === 0}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all cursor-pointer shadow-xs ${
                pendingDrafts.length > 0
                  ? 'bg-[#10221b] hover:bg-black text-white ring-2 ring-[#27B8B1]/40'
                  : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4 text-[#27B8B1]" />
              <span>Publish All Drafts</span>
              {pendingDrafts.length > 0 && (
                <span className="bg-[#27B8B1] text-zinc-950 font-bold text-xs px-2 py-0.5 rounded-full">
                  {pendingDrafts.length}
                </span>
              )}
            </button>

            {/* Refresh Button */}
            <button
              onClick={fetchImages}
              aria-label="Refresh images"
              title="Refresh images list"
              className="p-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#27B8B1]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Fallback Sync Banner if remote API is in redeploy phase */}
        {isUsingFallback && (
          <div className="mt-5 px-4 py-3 bg-amber-50/90 border border-amber-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-amber-900 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
              <span>
                <strong>Resilient Local Storage Active:</strong> All 66 website images are loaded and manageable. Uploads, previews, and drafts are fully functional. (Deploy the latest commit on Render to sync to remote MySQL).
              </span>
            </div>
            <button
              onClick={fetchImages}
              className="px-3 py-1 bg-amber-200/70 hover:bg-amber-300 text-amber-950 font-medium rounded-lg text-xs transition-colors cursor-pointer flex-shrink-0 self-start sm:self-auto"
            >
              Retry MySQL Sync
            </button>
          </div>
        )}

        {/* Stats Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-zinc-100">
          <div className="bg-zinc-50/70 border border-zinc-200/60 rounded-xl p-3.5">
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider block">Total Images</span>
            <span className="text-2xl font-bold text-zinc-900 mt-1 block">{images.length}</span>
          </div>

          <div className="bg-emerald-50/50 border border-emerald-200/50 rounded-xl p-3.5">
            <span className="text-xs text-emerald-700 font-medium uppercase tracking-wider block">Published Live</span>
            <span className="text-2xl font-bold text-emerald-800 mt-1 block">
              {images.length - pendingDrafts.length}
            </span>
          </div>

          <div className={`rounded-xl p-3.5 border ${
            pendingDrafts.length > 0 
              ? 'bg-amber-50/80 border-amber-300 text-amber-900 shadow-xs' 
              : 'bg-zinc-50/70 border-zinc-200/60 text-zinc-700'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider block">Pending Drafts</span>
              {pendingDrafts.length > 0 && (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                </span>
              )}
            </div>
            <span className="text-2xl font-bold mt-1 block">
              {pendingDrafts.length}
            </span>
          </div>

          <div className="bg-zinc-50/70 border border-zinc-200/60 rounded-xl p-3.5">
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider block">Categories</span>
            <span className="text-2xl font-bold text-zinc-900 mt-1 block">{CATEGORIES.length - 1}</span>
          </div>
        </div>
      </div>

      {/* ── Categories Scrollable Filter Pills ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        {CATEGORIES.map((cat) => {
          const count = cat === 'All' 
            ? images.length 
            : images.filter((i) => i.category === cat).length;
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#10221b] text-white shadow-xs font-semibold'
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200/70'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive ? 'bg-[#27B8B1] text-zinc-950' : 'bg-zinc-100 text-zinc-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Filter & Search Toolbar ── */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by name, key, page, or section..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#27B8B1]/40 focus:border-[#27B8B1]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdowns & View Toggles */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Page Filter */}
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            aria-label="Filter by page"
            className="px-3 py-2 text-xs font-medium bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#27B8B1]/30 cursor-pointer"
          >
            {availablePages.map((p) => (
              <option key={p} value={p}>
                Page: {p}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by publication status"
            className="px-3 py-2 text-xs font-medium bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#27B8B1]/30 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="draft">Pending Drafts Only</option>
            <option value="published">Published Only</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort images by"
            className="px-3 py-2 text-xs font-medium bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#27B8B1]/30 cursor-pointer"
          >
            <option value="category">Sort: Category</option>
            <option value="section">Sort: Section</option>
            <option value="name">Sort: Image Name</option>
            <option value="key">Sort: Image Key</option>
            <option value="status">Sort: Drafts First</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-200">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-zinc-900 shadow-2xs font-semibold' : 'text-zinc-500 hover:text-zinc-900'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              aria-label="List view"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-zinc-900 shadow-2xs font-semibold' : 'text-zinc-500 hover:text-zinc-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Image Cards Grid / List ── */}
      {loading ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl border border-zinc-200 p-12">
          <div className="w-8 h-8 border-3 border-[#27B8B1] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-zinc-500 mt-4 font-medium">Loading managed website images...</p>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="min-h-[300px] flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-zinc-300 p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mb-3">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-zinc-800">No images found</h3>
          <p className="text-xs text-zinc-500 max-w-sm mt-1">
            No image entries match your search query or filters. Try adjusting the category or search terms.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedPage('All');
              setStatusFilter('All');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredImages.map((item) => (
            <ImageCard
              key={item.id}
              item={item}
              onUpload={handleOpenUpload}
              onPreview={(it) => setActivePreviewItem(it)}
              onPublish={handlePublishSingle}
              onDiscard={handleDiscardDraft}
              onRestore={(it) => setActiveRestoreItem(it)}
              onCopyKey={(key) => copyToClipboard(key, `key-${item.id}`)}
              copied={copiedKey === `key-${item.id}`}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-zinc-200/90 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-700">
              <thead className="bg-zinc-50 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 border-b border-zinc-200">
                <tr>
                  <th className="py-3 px-4">Thumbnail</th>
                  <th className="py-3 px-4">Name & Key</th>
                  <th className="py-3 px-4">Page & Section</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Dimensions</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredImages.map((item) => (
                  <ImageRow
                    key={item.id}
                    item={item}
                    onUpload={handleOpenUpload}
                    onPreview={(it) => setActivePreviewItem(it)}
                    onPublish={handlePublishSingle}
                    onDiscard={handleDiscardDraft}
                    onRestore={(it) => setActiveRestoreItem(it)}
                    onCopyKey={(key) => copyToClipboard(key, `key-${item.id}`)}
                    copied={copiedKey === `key-${item.id}`}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Modal: Upload / Replace Image ── */}
      {activeUploadItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="upload-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 relative my-8">
            <button
              onClick={() => setActiveUploadItem(null)}
              aria-label="Close dialog"
              className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[11px] font-bold text-[#27B8B1] uppercase tracking-wider">
                {activeUploadItem.category} • {activeUploadItem.section_name}
              </span>
              <h2 id="upload-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 mt-1">
                Replace Image: {activeUploadItem.image_name}
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Recommended aspect ratio: <strong className="text-zinc-700">{activeUploadItem.aspect_ratio}</strong> ({activeUploadItem.dimensions})
              </p>
            </div>

            {/* Drag & Drop Upload Dropzone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-zinc-300 hover:border-[#27B8B1] rounded-2xl p-6 text-center bg-zinc-50/50 hover:bg-emerald-50/20 transition-all cursor-pointer group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />

              {uploadPreviewUrl ? (
                <div className="space-y-3">
                  <div className="relative mx-auto max-h-48 rounded-xl overflow-hidden shadow-xs border border-zinc-200 bg-zinc-950 flex items-center justify-center">
                    <img
                      src={uploadPreviewUrl}
                      alt="Preview"
                      className="max-h-48 w-auto object-contain"
                    />
                  </div>
                  <p className="text-xs text-zinc-600 font-medium">
                    {uploadFile ? uploadFile.name : 'Current selected image'} — Click or drag to change
                  </p>
                </div>
              ) : (
                <div className="space-y-2 py-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 text-zinc-500 mx-auto flex items-center justify-center group-hover:scale-105 group-hover:text-[#27B8B1] transition-all">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-zinc-800">
                    Click to browse or drag & drop new image
                  </p>
                  <p className="text-xs text-zinc-400">
                    JPG, JPEG, PNG, WebP, or SVG up to 10MB
                  </p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {uploadError && (
              <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Upload Progress */}
            {isUploading && uploadProgress > 0 && (
              <div className="mt-4 space-y-1">
                <div className="flex justify-between text-xs text-zinc-500 font-medium">
                  <span>Uploading to permanent storage...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#27B8B1] transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Alt Text Input */}
            <div className="mt-5 space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 block">
                Image Alt Text (for SEO & Accessibility)
              </label>
              <input
                type="text"
                value={uploadAltText}
                onChange={(e) => setUploadAltText(e.target.value)}
                placeholder="Descriptive text for this image..."
                className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-[#27B8B1]/40 focus:border-[#27B8B1]"
              />
            </div>

            {/* Publish Immediately Option */}
            <div className="mt-4 flex items-center gap-2.5 bg-zinc-50 p-3 rounded-xl border border-zinc-200/70">
              <input
                type="checkbox"
                id="publishImmediately"
                checked={publishImmediately}
                onChange={(e) => setPublishImmediately(e.target.checked)}
                className="w-4 h-4 text-[#27B8B1] rounded-sm focus:ring-[#27B8B1]"
              />
              <label htmlFor="publishImmediately" className="text-xs text-zinc-700 font-medium cursor-pointer">
                Publish immediately to live website (skip draft mode)
              </label>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => setActiveUploadItem(null)}
                className="px-4 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-800 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isUploading || (!uploadFile && uploadPreviewUrl === (activeUploadItem.draft_image_url || activeUploadItem.image_url))}
                onClick={handleSaveUpload}
                className="px-6 py-2.5 text-sm font-semibold bg-[#10221b] hover:bg-black text-white rounded-xl transition-all cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#27B8B1]" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#27B8B1]" />
                    <span>{publishImmediately ? 'Upload & Publish' : 'Save as Draft'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Live Image Preview & In-Section Comparison ── */}
      {activePreviewItem && (
        <PreviewModal
          item={activePreviewItem}
          onClose={() => setActivePreviewItem(null)}
          onPublish={handlePublishSingle}
          onDiscard={handleDiscardDraft}
        />
      )}

      {/* ── Modal: Confirm Restore Original ── */}
      {activeRestoreItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="restore-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 id="restore-modal-title" className="text-lg font-bold text-zinc-900">Restore Original Image?</h3>
            <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
              Are you sure you want to revert <strong className="text-zinc-800">"{activeRestoreItem.image_name}"</strong> back to its original default website image? Any pending drafts will be cleared.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center gap-3">
              <img
                src={activeRestoreItem.original_image_url}
                alt="Original"
                className="w-14 h-10 object-cover rounded-lg border border-zinc-200"
              />
              <div className="text-[11px] text-zinc-600 truncate">
                <span className="font-semibold block text-zinc-800">Original URL:</span>
                <span className="truncate block font-mono">{activeRestoreItem.original_image_url}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveRestoreItem(null)}
                className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRestoreOriginal(activeRestoreItem)}
                className="px-5 py-2 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Yes, Restore Original
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Confirm Publish All ── */}
      {confirmPublishAllOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="publish-all-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Send className="w-6 h-6" />
            </div>
            <h3 id="publish-all-modal-title" className="text-lg font-bold text-zinc-900">Publish All Pending Drafts?</h3>
            <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
              This will publish all <strong className="text-zinc-800">{pendingDrafts.length} pending draft images</strong> directly to the public live website. Website visitors will immediately see these new images.
            </p>

            <div className="mt-4 max-h-40 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
              {pendingDrafts.map((d) => (
                <div key={d.id} className="p-2 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs">
                  <span className="font-medium text-zinc-800 truncate max-w-[200px]">{d.image_name}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">{d.section_name}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setConfirmPublishAllOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handlePublishAll}
                className="px-5 py-2 text-xs font-semibold bg-[#10221b] hover:bg-black text-white rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#27B8B1]" />
                <span>Confirm & Publish All</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Image Card Component (Grid View)
 */
function ImageCard({ item, onUpload, onPreview, onPublish, onDiscard, onRestore, onCopyKey, copied }) {
  const activeUrl = item.has_pending_draft && item.draft_image_url ? item.draft_image_url : item.image_url;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group">
      {/* Thumbnail Area with Aspect Ratio & Status Badges */}
      <div className="relative bg-zinc-950 aspect-video w-full overflow-hidden flex items-center justify-center">
        <img
          src={activeUrl}
          alt={item.alt_text || item.image_name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/hero-poster.jpg';
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Publication Status Badge */}
          {item.has_pending_draft ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/90 text-white backdrop-blur-xs shadow-xs uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Draft Pending
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-600/90 text-white backdrop-blur-xs shadow-xs uppercase tracking-wider">
              <Check className="w-3 h-3" />
              Published
            </span>
          )}

          {/* Dimensions Badge */}
          <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/60 text-white/90 backdrop-blur-xs">
            {item.aspect_ratio || '16:9'} • {item.dimensions || 'Responsive'}
          </span>
        </div>

        {/* Floating Quick Action Overlay on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={() => onPreview(item)}
            className="px-3 py-1.5 bg-white/90 hover:bg-white text-zinc-900 rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#27B8B1]" />
            Preview
          </button>
          <button
            onClick={() => onUpload(item)}
            className="px-3 py-1.5 bg-[#10221b]/90 hover:bg-[#10221b] text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-[#27B8B1]" />
            Replace
          </button>
        </div>
      </div>

      {/* Card Info Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-zinc-500">
            <span className="font-semibold text-[#27B8B1] uppercase tracking-wider">
              {item.category}
            </span>
            <span className="bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-md font-medium">
              {item.page_name}
            </span>
          </div>

          <h3 className="text-base font-bold text-zinc-900 leading-tight">
            {item.image_name}
          </h3>

          <div className="text-xs text-zinc-500 font-medium flex items-center gap-1">
            <span>Section:</span>
            <strong className="text-zinc-700">{item.section_name}</strong>
          </div>

          {/* Unique Key Pill with Copy */}
          <div className="flex items-center justify-between bg-zinc-50 border border-zinc-200/80 rounded-lg px-2.5 py-1.5 text-xs font-mono text-zinc-600">
            <span className="truncate max-w-[220px]" title={item.image_key}>
              {item.image_key}
            </span>
            <button
              onClick={() => onCopyKey(item.image_key)}
              aria-label="Copy image key"
              className="text-zinc-400 hover:text-zinc-700 ml-2 cursor-pointer"
              title="Copy key"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onUpload(item)}
              className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
            >
              <Upload className="w-3 h-3 text-[#27B8B1]" />
              Replace
            </button>
            <button
              onClick={() => onPreview(item)}
              className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
            >
              <Eye className="w-3 h-3 text-zinc-500" />
              Preview
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {item.has_pending_draft ? (
              <>
                <button
                  onClick={() => onDiscard(item)}
                  className="px-2.5 py-1.5 text-zinc-500 hover:text-red-600 hover:bg-red-50 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  title="Discard pending draft"
                >
                  Discard
                </button>
                <button
                  onClick={() => onPublish(item)}
                  className="px-3 py-1.5 bg-[#10221b] hover:bg-black text-white text-xs font-semibold rounded-lg transition-all cursor-pointer shadow-xs flex items-center gap-1"
                >
                  <Send className="w-3 h-3 text-[#27B8B1]" />
                  Publish
                </button>
              </>
            ) : (
              <button
                onClick={() => onRestore(item)}
                className="px-2.5 py-1.5 text-zinc-500 hover:text-zinc-800 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                title="Restore factory original image"
              >
                Restore
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Image Row Component (List View)
 */
function ImageRow({ item, onUpload, onPreview, onPublish, onDiscard, onRestore, onCopyKey, copied }) {
  const activeUrl = item.has_pending_draft && item.draft_image_url ? item.draft_image_url : item.image_url;

  return (
    <tr className="hover:bg-zinc-50/80 transition-colors">
      <td className="py-3 px-4">
        <div className="w-16 h-11 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-200 shadow-2xs">
          <img
            src={activeUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="font-semibold text-zinc-900">{item.image_name}</div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mt-0.5">
          <span>{item.image_key}</span>
          <button onClick={() => onCopyKey(item.image_key)} className="hover:text-zinc-600 cursor-pointer">
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="text-zinc-800 font-medium">{item.page_name}</div>
        <div className="text-xs text-zinc-500">{item.section_name}</div>
      </td>
      <td className="py-3 px-4">
        {item.has_pending_draft ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Draft
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <Check className="w-3 h-3" />
            Published
          </span>
        )}
      </td>
      <td className="py-3 px-4 text-xs text-zinc-500">
        <div>{item.dimensions || 'Responsive'}</div>
        <div className="text-zinc-400">{item.aspect_ratio || '16:9'}</div>
      </td>
      <td className="py-3 px-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onPreview(item)}
            className="p-1.5 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg cursor-pointer"
            title="Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onUpload(item)}
            className="p-1.5 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg cursor-pointer"
            title="Replace Image"
          >
            <Upload className="w-4 h-4" />
          </button>
          {item.has_pending_draft && (
            <button
              onClick={() => onPublish(item)}
              className="px-2.5 py-1 bg-[#10221b] text-white rounded-lg text-xs font-semibold hover:bg-black cursor-pointer"
            >
              Publish
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

/**
 * Preview Modal Component: Side-by-Side and Section View
 */
function PreviewModal({ item, onClose, onPublish, onDiscard }) {
  const [activeTab, setActiveTab] = useState('sideBySide'); // 'sideBySide' | 'simulated'
  const hasDraft = Boolean(item.draft_image_url && item.draft_image_url !== item.image_url);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 relative my-8 max-h-[92vh] flex flex-col">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#27B8B1] uppercase tracking-wider">
              Live Preview & Verification
            </span>
            {hasDraft && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                Pending Draft
              </span>
            )}
          </div>
          <h2 id="preview-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 mt-1">
            {item.image_name}
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Key: <code className="font-mono text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded-md">{item.image_key}</code> • Page: <strong className="text-zinc-700">{item.page_name}</strong> • Section: <strong className="text-zinc-700">{item.section_name}</strong>
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('sideBySide')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'sideBySide'
                ? 'bg-[#10221b] text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            Side-by-Side Comparison
          </button>
          <button
            onClick={() => setActiveTab('simulated')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'simulated'
                ? 'bg-[#10221b] text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            Simulated Section Frame
          </button>
        </div>

        {/* Tab 1: Side by Side */}
        {activeTab === 'sideBySide' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto flex-1 p-1 scrollbar-thin">
            {/* Left: Published Version */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Currently Published Live
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">Live</span>
              </div>
              <div className="bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-200 aspect-video flex items-center justify-center relative shadow-xs">
                <img
                  src={item.image_url}
                  alt="Published"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 text-xs font-mono text-zinc-500 break-all">
                {item.image_url}
              </div>
            </div>

            {/* Right: New Draft Version */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-700">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  New Selected / Draft
                </span>
                <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">
                  {hasDraft ? 'Pending Approval' : 'Identical to Live'}
                </span>
              </div>
              <div className="bg-zinc-950 rounded-2xl overflow-hidden border-2 border-[#27B8B1]/50 aspect-video flex items-center justify-center relative shadow-xs">
                <img
                  src={item.draft_image_url || item.image_url}
                  alt="Draft"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 text-xs font-mono text-zinc-500 break-all">
                {item.draft_image_url || item.image_url}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Simulated Section Frame */}
        {activeTab === 'simulated' && (
          <div className="flex-1 overflow-y-auto p-4 bg-zinc-100 rounded-2xl border border-zinc-200 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-zinc-200/80 overflow-hidden">
              {/* Simulated Browser Bar */}
              <div className="h-8 bg-zinc-100 px-4 border-b border-zinc-200 flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] text-zinc-500 font-mono ml-4 truncate">
                  blackforestholidays.com/{item.page_name.toLowerCase()} #{item.section_name.toLowerCase()}
                </div>
              </div>

              {/* Simulated Container */}
              <div className="p-6">
                <div className="relative rounded-xl overflow-hidden shadow-sm aspect-video bg-zinc-900 flex items-center justify-center">
                  <img
                    src={item.draft_image_url || item.image_url}
                    alt={item.alt_text}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                    <span className="text-[11px] font-bold text-[#27B8B1] uppercase tracking-wider">
                      {item.section_name} Preview
                    </span>
                    <h4 className="text-xl font-bold font-serif">{item.image_name}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3">
          <a
            href="/?preview=true"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4 text-[#27B8B1]" />
            <span>Open Actual Page in Website Preview Mode</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>

          <div className="flex items-center gap-2.5">
            {hasDraft && (
              <button
                onClick={() => onDiscard(item)}
                className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
              >
                Discard Draft
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
            {hasDraft && (
              <button
                onClick={() => onPublish(item)}
                className="px-6 py-2 text-xs font-semibold bg-[#10221b] hover:bg-black text-white rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#27B8B1]" />
                <span>Publish to Live Site</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
