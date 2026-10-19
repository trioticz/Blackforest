import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Layers,
  Edit,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  Clock,
  RotateCcw,
  Save,
  Send,
  X,
  Plus,
  Trash2,
  ExternalLink,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  Search,
  AlertTriangle
} from 'lucide-react';
import { pageSectionService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';

const PAGE_OPTIONS = [
  { slug: 'all', label: 'All Pages' },
  { slug: 'home', label: 'Homepage' },
  { slug: 'global', label: 'Global (Header/Footer/FAQ)' },
  { slug: 'about', label: 'About Us' },
  { slug: 'contact', label: 'Contact Us' },
  { slug: 'corporate', label: 'Corporate Travel' },
  { slug: 'cruises', label: 'Cruises' },
  { slug: 'concierge', label: 'Concierge' },
  { slug: 'coach_tour', label: 'Coach Tours' },
  { slug: 'tours', label: 'Tour Packages' },
  { slug: 'destinations', label: 'Destinations' },
  { slug: 'journal', label: 'Travel Journal' }
];

export default function AdminSectionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page') || 'all';

  const [selectedPage, setSelectedPage] = useState(pageParam);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { showToast } = useToast();

  // Modal / Drawer state for section editing
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({});
  const [formName, setFormName] = useState('');
  const [formVisible, setFormVisible] = useState(true);
  const [savingDraft, setSavingDraft] = useState(false);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    if (pageParam !== selectedPage) {
      setSelectedPage(pageParam);
    }
  }, [pageParam]);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const res = await pageSectionService.getAll({
        page_slug: selectedPage,
        preview: 'true'
      });
      if (res?.success && res.data) {
        setSections(res.data.sections || []);
      }
    } catch (err) {
      console.error('Failed to load sections:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, [selectedPage]);

  const handlePageChange = (slug) => {
    setSelectedPage(slug);
    setSearchParams(slug === 'all' ? {} : { page: slug });
  };

  // Reordering sections
  const moveSection = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newSections = [...sections];
    const [moved] = newSections.splice(index, 1);
    newSections.splice(targetIndex, 0, moved);

    // Re-assign order_index
    const orders = newSections.map((s, idx) => ({
      section_key: s.section_key,
      order_index: idx
    }));

    setSections(newSections.map((s, idx) => ({ ...s, order_index: idx })));

    try {
      await pageSectionService.reorder(orders);
      showToast('Section order updated', 'info');
    } catch (err) {
      showToast('Failed to save section order', 'error');
      fetchSections();
    }
  };

  // Visibility toggle
  const toggleVisibility = async (sec) => {
    const nextVal = !sec.is_visible;
    setSections((prev) =>
      prev.map((s) => (s.section_key === sec.section_key ? { ...s, is_visible: nextVal } : s))
    );

    try {
      await pageSectionService.toggleVisibility(sec.section_key, nextVal);
      showToast(
        `Section '${sec.section_name}' is now ${nextVal ? 'visible' : 'hidden'}`,
        'success'
      );
    } catch (err) {
      showToast('Failed to toggle visibility', 'error');
      fetchSections();
    }
  };

  // Open editor
  const openEditor = (sec) => {
    setEditingSection(sec);
    setFormName(sec.section_name);
    setFormVisible(sec.is_visible);
    // Use draft_content if available, else active_content or content
    const initialContent = JSON.parse(
      JSON.stringify(sec.draft_content || sec.active_content || sec.content || {})
    );
    setFormData(initialContent);
  };

  const closeEditor = () => {
    setEditingSection(null);
    setFormData({});
  };

  // Save Draft
  const handleSaveDraft = async () => {
    if (!editingSection) return;
    try {
      setSavingDraft(true);
      const res = await pageSectionService.saveDraft(editingSection.section_key, {
        content: formData,
        section_name: formName,
        is_visible: formVisible
      });
      if (res?.success) {
        showToast('Section draft saved! Preview mode updated.', 'success');
        closeEditor();
        fetchSections();
      }
    } catch (err) {
      showToast('Failed to save draft', 'error');
    } finally {
      setSavingDraft(false);
    }
  };

  // Publish Section
  const handlePublish = async () => {
    if (!editingSection) return;
    try {
      setPublishing(true);
      const res = await pageSectionService.publish(editingSection.section_key, {
        content: formData,
        section_name: formName,
        is_visible: formVisible
      });
      if (res?.success) {
        showToast('Section published immediately to live website!', 'success');
        closeEditor();
        fetchSections();
      }
    } catch (err) {
      showToast('Failed to publish section', 'error');
    } finally {
      setPublishing(false);
    }
  };

  // Restore Default
  const handleRestore = async (sec) => {
    if (!window.confirm(`Are you sure you want to restore '${sec.section_name}' to original default content?`)) {
      return;
    }
    try {
      const res = await pageSectionService.restoreOriginal(sec.section_key);
      if (res?.success) {
        showToast('Section restored to default', 'info');
        fetchSections();
        if (editingSection && editingSection.section_key === sec.section_key) {
          closeEditor();
        }
      }
    } catch (err) {
      showToast('Failed to restore section', 'error');
    }
  };

  // Discard Draft
  const handleDiscardDraft = async (sec) => {
    if (!window.confirm(`Discard pending draft for '${sec.section_name}'?`)) return;
    try {
      const res = await pageSectionService.discardDraft(sec.section_key);
      if (res?.success) {
        showToast('Pending draft discarded', 'info');
        fetchSections();
        if (editingSection && editingSection.section_key === sec.section_key) {
          closeEditor();
        }
      }
    } catch (err) {
      showToast('Failed to discard draft', 'error');
    }
  };

  const filteredSections = useMemo(() => {
    return sections.filter((s) => {
      const matchSearch =
        s.section_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.section_key.toLowerCase().includes(searchTerm.toLowerCase());
      const matchPage = selectedPage === 'all' || s.page_slug === selectedPage;
      return matchSearch && matchPage;
    });
  }, [sections, searchTerm, selectedPage]);

  // Helper to render dynamic form fields
  const renderFieldInput = (key, value, parentKey = '') => {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    const label = key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());

    if (typeof value === 'boolean') {
      return (
        <div key={fullKey} className="flex items-center justify-between py-2 border-b border-zinc-100">
          <label className="text-xs font-semibold text-zinc-700">{label}</label>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => updateField(fullKey, e.target.checked)}
            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div key={fullKey} className="space-y-3 pt-3 border-t border-zinc-200">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider font-mono">
              {label} ({value.length} items)
            </h4>
          </div>
          <div className="space-y-3 pl-2 border-l-2 border-emerald-500/30">
            {value.map((item, idx) => (
              <div key={idx} className="bg-zinc-50 p-3 rounded-lg border border-zinc-200/80 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">
                  Item #{idx + 1}
                </span>
                {typeof item === 'object' && item !== null ? (
                  Object.keys(item).map((subKey) => (
                    <div key={subKey} className="space-y-1">
                      <label className="text-[11px] font-medium text-zinc-600 capitalize">
                        {subKey.replace(/_/g, ' ')}
                      </label>
                      <input
                        type="text"
                        value={item[subKey] || ''}
                        onChange={(e) => {
                          const newArr = [...value];
                          newArr[idx] = { ...newArr[idx], [subKey]: e.target.value };
                          updateField(fullKey, newArr);
                        }}
                        className="w-full text-xs px-2.5 py-1.5 bg-white border border-zinc-200 rounded focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                    </div>
                  ))
                ) : (
                  <input
                    type="text"
                    value={item || ''}
                    onChange={(e) => {
                      const newArr = [...value];
                      newArr[idx] = e.target.value;
                      updateField(fullKey, newArr);
                    }}
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-zinc-200 rounded"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div key={fullKey} className="space-y-2 pt-2 border-t border-zinc-100">
          <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider font-mono">
            {label}
          </label>
          <div className="pl-3 border-l border-zinc-200 space-y-2">
            {Object.keys(value).map((childKey) =>
              renderFieldInput(childKey, value[childKey], fullKey)
            )}
          </div>
        </div>
      );
    }

    const isLongText =
      key.includes('description') ||
      key.includes('paragraph') ||
      key.includes('subheadline') ||
      key.includes('answer') ||
      (typeof value === 'string' && value.length > 70);

    return (
      <div key={fullKey} className="space-y-1">
        <label className="text-xs font-semibold text-zinc-700">{label}</label>
        {isLongText ? (
          <textarea
            rows={3}
            value={value || ''}
            onChange={(e) => updateField(fullKey, e.target.value)}
            className="w-full text-xs p-2.5 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        ) : (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => updateField(fullKey, e.target.value)}
            className="w-full text-xs px-3 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        )}
      </div>
    );
  };

  const updateField = (path, newVal) => {
    setFormData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let cur = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!cur[parts[i]]) cur[parts[i]] = {};
        cur = cur[parts[i]];
      }
      cur[parts[parts.length - 1]] = newVal;
      return copy;
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold tracking-widest text-emerald-600 uppercase font-mono">
              Website CMS
            </span>
            <span className="text-zinc-300">•</span>
            <span className="text-xs font-medium text-zinc-500">Page Builder & Sections</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
            Section Manager
          </h1>
          <p className="text-sm text-zinc-500 mt-1 max-w-2xl">
            Reorder, toggle visibility, and edit all section text, headings, buttons, and content in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/?preview=true"
            target="_blank"
            className="px-3.5 py-2 bg-zinc-900 hover:bg-black text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>Preview All Drafts</span>
          </Link>
        </div>
      </div>

      {/* Page Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-zinc-200 no-scrollbar">
        {PAGE_OPTIONS.map((opt) => (
          <button
            key={opt.slug}
            onClick={() => handlePageChange(opt.slug)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedPage === opt.slug
                ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-zinc-200/80 shadow-xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sections by name or key..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span>{filteredSections.length} sections displayed</span>
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-3">
        {filteredSections.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-zinc-200">
            <Layers className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-zinc-700">No sections found</p>
            <p className="text-xs text-zinc-400 mt-1">Try selecting another page or clearing search</p>
          </div>
        ) : (
          filteredSections.map((sec, index) => {
            const hasDraft = Boolean(sec.has_draft);

            return (
              <div
                key={sec.section_key}
                className={`bg-white rounded-xl border transition-all p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs ${
                  !sec.is_visible
                    ? 'opacity-60 bg-zinc-50/80 border-dashed border-zinc-300'
                    : hasDraft
                    ? 'border-amber-300/80 bg-amber-50/20 hover:border-amber-400'
                    : 'border-zinc-200/80 hover:border-emerald-500/30'
                }`}
              >
                {/* Left info & order controls */}
                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  {/* Up / Down Controls */}
                  <div className="flex flex-col gap-1 shrink-0 pt-0.5 sm:pt-0">
                    <button
                      onClick={() => moveSection(index, -1)}
                      disabled={index === 0}
                      title="Move Up"
                      className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => moveSection(index, 1)}
                      disabled={index === filteredSections.length - 1}
                      title="Move Down"
                      className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200 uppercase">
                        {sec.page_slug}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400">
                        #{sec.order_index} • {sec.section_key}
                      </span>
                      {hasDraft ? (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 border border-amber-500/30 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 text-amber-600" />
                          <span>Draft Pending</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                          <span>Published</span>
                        </span>
                      )}
                      {!sec.is_visible && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-200 flex items-center gap-1">
                          <EyeOff className="w-2.5 h-2.5" />
                          <span>Hidden</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 truncate">
                      {sec.section_name}
                    </h3>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0">
                  <button
                    onClick={() => toggleVisibility(sec)}
                    title={sec.is_visible ? 'Hide section from public site' : 'Show section on public site'}
                    className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                      sec.is_visible
                        ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                        : 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'
                    }`}
                  >
                    {sec.is_visible ? (
                      <>
                        <Eye className="w-3.5 h-3.5 text-zinc-500" />
                        <span className="hidden sm:inline">Visible</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Hidden</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => openEditor(sec)}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Content</span>
                  </button>

                  {hasDraft && (
                    <button
                      onClick={() => handleDiscardDraft(sec)}
                      title="Discard pending draft"
                      className="p-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => handleRestore(sec)}
                    title="Restore default original content"
                    className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Visual Section Editor Drawer / Modal */}
      {editingSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden animate-scaleUp">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/80">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                  {editingSection.page_slug} • {editingSection.section_key}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 mt-1">
                  Edit Section: {formName}
                </h3>
              </div>
              <button
                onClick={closeEditor}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-800 hover:bg-zinc-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-3 border-b border-zinc-200">
                <div>
                  <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                    Section Display Name
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between bg-zinc-50 p-3 rounded-lg border border-zinc-200">
                  <div>
                    <p className="text-xs font-bold text-zinc-800">Public Visibility</p>
                    <p className="text-[11px] text-zinc-500">Show or hide this section on public site</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formVisible}
                    onChange={(e) => setFormVisible(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Dynamic Content Fields */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
                  Content Fields
                </h4>
                {Object.keys(formData).map((key) => renderFieldInput(key, formData[key]))}
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="px-6 py-4 border-t border-zinc-200 bg-zinc-50 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Link
                  to={`/?preview=true`}
                  target="_blank"
                  className="px-3 py-1.5 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-700 text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Page</span>
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="px-4 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={savingDraft || publishing}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savingDraft ? 'Saving Draft...' : 'Save as Draft'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={savingDraft || publishing}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{publishing ? 'Publishing...' : 'Publish to Live Site'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
