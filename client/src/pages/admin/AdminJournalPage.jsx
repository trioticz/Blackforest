import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  X,
  ExternalLink,
  Calendar,
  Search,
  Check,
  Tag,
  Eye,
  EyeOff,
  Filter
} from 'lucide-react';
import {
  getStoredBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleBlogPublish,
  BLOGS_EVENT
} from '../../utils/blogsManager';
import { articleService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';
import ImageUploadField from '../../components/admin/ImageUploadField';

export default function AdminJournalPage() {
  const [articles, setArticles] = useState(getStoredBlogs());
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all, published, draft
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { showToast } = useToast();

  const reloadData = () => {
    setArticles(getStoredBlogs());
  };

  useEffect(() => {
    reloadData();
    const handleUpdate = () => reloadData();
    window.addEventListener(BLOGS_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(BLOGS_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const emptyForm = {
    title: '',
    slug: '',
    category: 'Trekking & Safety',
    author: 'Blackforest',
    coverImage: '/assets/images/blog-010.jpg',
    detailImage1: '/assets/images/blog-detail-001.jpg',
    detailImage2: '/assets/images/blog-detail-002.jpg',
    excerpt: '',
    content: '',
    quote: 'Vel saepe possimus sit corporis ipsa et quia fugit vel magnam iure rem voluptate voluptas ut earum tempora.',
    quoteAuthor: 'Barry Hilligan, Co Founder of Houzy',
    tags: 'Trekking, Waterfalls, Safety, Adventure',
    status: 'published'
  };

  const [formData, setFormData] = useState(emptyForm);

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (art) => {
    setEditingId(art.id);
    setFormData({
      title: art.title || '',
      slug: art.slug || '',
      category: art.category || 'Trekking & Safety',
      author: art.author || 'Blackforest',
      coverImage: art.coverImage || '',
      detailImage1: art.detailImage1 || '',
      detailImage2: art.detailImage2 || '',
      excerpt: art.excerpt || '',
      content: art.content || '',
      quote: art.quote || '',
      quoteAuthor: art.quoteAuthor || '',
      tags: Array.isArray(art.tags) ? art.tags.join(', ') : (art.tags || ''),
      status: art.status || 'published'
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Article title is required', 'error');
      return;
    }

    try {
      if (editingId) {
        updateBlog(editingId, formData);
        // Sync with backend MySQL database
        try {
          await articleService.update(editingId, formData);
        } catch (dbErr) {
          console.warn('Backend database sync note:', dbErr?.message);
        }
        showToast('Article updated successfully!', 'success');
      } else {
        createBlog(formData);
        // Sync with backend MySQL database
        try {
          await articleService.create(formData);
        } catch (dbErr) {
          console.warn('Backend database sync note:', dbErr?.message);
        }
        showToast('New article published successfully!', 'success');
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to save article', 'error');
    }
    setModalOpen(false);
    reloadData();
  };

  const handleDelete = (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    deleteBlog(id);
    reloadData();
    showToast(`Article "${title}" deleted`, 'info');
  };

  const handleToggleStatus = (id, currentStatus, title) => {
    const updated = toggleBlogPublish(id);
    reloadData();
    if (updated?.status === 'published') {
      showToast(`"${title}" published on live website`, 'success');
    } else {
      showToast(`"${title}" set to Draft (hidden)`, 'info');
    }
  };

  const filtered = articles.filter((a) => {
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'published' && a.status === 'published') ||
      (activeFilter === 'draft' && a.status !== 'published');

    const matchesSearch =
      !search.trim() ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase()) ||
      (a.excerpt && a.excerpt.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const publishedCount = articles.filter((a) => a.status === 'published').length;
  const draftCount = articles.length - publishedCount;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 font-serif">
            Blog Posts CMS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            Create, update, and manage travel articles and dispatches. Updates sync live instantly.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="px-4 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#10221b]" />
          <span>New Article</span>
        </button>
      </div>

      {/* Modern Filter & Search Toolbar */}
      <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Segmented Filter Controls */}
        <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg text-xs font-medium self-start">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-white text-zinc-900 shadow-xs font-semibold'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            All ({articles.length})
          </button>
          <button
            onClick={() => setActiveFilter('published')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeFilter === 'published'
                ? 'bg-white text-zinc-900 shadow-xs font-semibold'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            onClick={() => setActiveFilter('draft')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeFilter === 'draft'
                ? 'bg-white text-zinc-900 shadow-xs font-semibold'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Drafts ({draftCount})
          </button>
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-3 py-2 bg-zinc-50 hover:bg-zinc-100/60 focus:bg-white border border-zinc-200 rounded-lg text-xs text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-800 transition-colors"
          />
        </div>
      </div>

      {/* Minimalist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((art) => {
          const isPublished = art.status === 'published';

          return (
            <div
              key={art.id}
              className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-sm ${
                isPublished ? 'border-zinc-200/90' : 'border-zinc-200 bg-zinc-50/50 opacity-85'
              }`}
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-44 overflow-hidden bg-zinc-100 group">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/75 backdrop-blur-xs text-[#10221b] text-[10px] font-semibold uppercase tracking-wider rounded">
                    {art.category}
                  </span>

                  <span
                    className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase shadow-xs ${
                      isPublished
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-700 text-zinc-300'
                    }`}
                  >
                    {isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <Calendar className="w-3 h-3" />
                    <span>{art.date}</span>
                    <span>•</span>
                    <span>By {art.author || 'Blackforest'}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-zinc-900 line-clamp-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {art.excerpt || art.content?.slice(0, 110)}
                  </p>
                </div>
              </div>

              {/* Minimalist Action Row with Toggle Switch */}
              <div className="p-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                {/* Clean Toggle Switch */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(art.id, art.status, art.title)}
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
                    {isPublished ? 'Live' : 'Draft'}
                  </span>
                </div>

                {/* Edit, Delete, View buttons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEdit(art)}
                    className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                    title="Edit Article"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(art.id, art.title)}
                    className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`/blog/${art.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-zinc-500 hover:text-[#10221b] hover:bg-zinc-100 rounded-lg transition-colors"
                    title="Preview Live on Website"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Minimalist Create / Edit Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#10221b] font-bold uppercase tracking-wider block">
                  Blog Management
                </span>
                <h3 className="text-base font-serif font-bold text-zinc-900">
                  {editingId ? 'Edit Article' : 'Compose New Article'}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block font-semibold text-zinc-700 uppercase mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Safety measures for safe trekking in waterfalls"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-800 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-zinc-700 uppercase mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-800 focus:bg-white focus:outline-none"
                  >
                    <option value="Trekking & Safety">Trekking & Safety</option>
                    <option value="Black & white">Black & white</option>
                    <option value="Culture">Culture</option>
                    <option value="Camping">Camping</option>
                    <option value="Mountain Expeditions">Mountain Expeditions</option>
                    <option value="Luxury Escapes">Luxury Escapes</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 uppercase mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-800 focus:bg-white focus:outline-none"
                  >
                    <option value="published">Published (Live)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <ImageUploadField
                label="Cover Photo"
                required
                value={formData.coverImage}
                onChange={(url) => setFormData({ ...formData, coverImage: url })}
                recommendedDimensions="1200 × 800 px"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ImageUploadField
                  label="Detail Gallery Image 1"
                  value={formData.detailImage1}
                  onChange={(url) => setFormData({ ...formData, detailImage1: url })}
                  recommendedDimensions="800 × 600 px"
                />
                <ImageUploadField
                  label="Detail Gallery Image 2"
                  value={formData.detailImage2}
                  onChange={(url) => setFormData({ ...formData, detailImage2: url })}
                  recommendedDimensions="800 × 600 px"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 uppercase mb-1">Excerpt / Brief Description</label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief 1-2 sentence preview"
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-800 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 uppercase mb-1">Full Article Paragraphs *</label>
                <textarea
                  rows={6}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full article paragraphs..."
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-800 focus:bg-white focus:outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-zinc-700 uppercase mb-1">Callout Quote</label>
                  <input
                    type="text"
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    placeholder="Key quote"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-700 uppercase mb-1">Quote Attribution</label>
                  <input
                    type="text"
                    value={formData.quoteAuthor}
                    onChange={(e) => setFormData({ ...formData, quoteAuthor: e.target.value })}
                    placeholder="Author name, title"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
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
