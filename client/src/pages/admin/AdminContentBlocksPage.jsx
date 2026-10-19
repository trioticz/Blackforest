import React, { useState, useEffect } from 'react';
import {
  Boxes,
  Edit,
  Save,
  Send,
  Eye,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
  X,
  Search
} from 'lucide-react';
import { contentBlockService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';

export default function AdminContentBlocksPage() {
  const { showToast } = useToast();
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlock, setEditingBlock] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBlocks = async () => {
    try {
      setLoading(true);
      const res = await contentBlockService.getAll({ preview: 'true' });
      if (res?.success && res.data) {
        setBlocks(res.data.blocks || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  const openEditor = (b) => {
    setEditingBlock(b);
    setFormData(JSON.parse(JSON.stringify(b.draft_content || b.active_content || b.content || {})));
  };

  const closeEditor = () => {
    setEditingBlock(null);
    setFormData({});
  };

  const handleSaveDraft = async () => {
    if (!editingBlock) return;
    try {
      setSaving(true);
      await contentBlockService.saveDraft(editingBlock.block_key, { content: formData });
      showToast('Content block draft saved!', 'success');
      closeEditor();
      fetchBlocks();
    } catch (err) {
      showToast('Failed to save draft', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!editingBlock) return;
    try {
      setSaving(true);
      await contentBlockService.publish(editingBlock.block_key, { content: formData });
      showToast('Content block published live!', 'success');
      closeEditor();
      fetchBlocks();
    } catch (err) {
      showToast('Failed to publish', 'error');
    } finally {
      setSaving(false);
    }
  };

  const filtered = blocks.filter(
    (b) =>
      b.block_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.block_key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold tracking-widest text-emerald-600 uppercase font-mono">
              Website CMS
            </span>
            <span className="text-zinc-300">•</span>
            <span className="text-xs font-medium text-zinc-500">Reusable Components</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
            Reusable Content Blocks
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage reusable promotional snippets, global CTA cards, badges, and footer widgets across pages.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-zinc-200/80 shadow-xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search content blocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>
        <div className="text-xs text-zinc-500">{filtered.length} blocks</div>
      </div>

      {/* Grid of Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((b) => {
          const hasDraft = Boolean(b.has_draft);
          return (
            <div
              key={b.block_key}
              className={`bg-white rounded-xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
                hasDraft ? 'border-amber-300/80 bg-amber-50/15' : 'border-zinc-200/80 hover:border-emerald-500/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 uppercase font-mono">
                    {b.category}
                  </span>
                  {hasDraft ? (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 border border-amber-500/30 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>Draft</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>Published</span>
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-zinc-900">{b.block_name}</h3>
                <p className="text-[11px] font-mono text-zinc-400 mt-0.5 mb-3">{b.block_key}</p>

                {/* Content preview */}
                <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200/60 text-xs text-zinc-600 font-mono text-[11px] max-h-32 overflow-hidden text-ellipsis">
                  <pre className="whitespace-pre-wrap">{JSON.stringify(b.active_content || b.content, null, 2)}</pre>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 mt-4 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditor(b)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Block</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Editor Modal */}
      {editingBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/80">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                  {editingBlock.block_key}
                </span>
                <h3 className="text-base font-bold text-zinc-900 mt-1">
                  Edit Block: {editingBlock.block_name}
                </h3>
              </div>
              <button
                onClick={closeEditor}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-800 hover:bg-zinc-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {Object.keys(formData).map((key) => {
                const val = formData[key];
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

                if (typeof val === 'boolean') {
                  return (
                    <div key={key} className="flex items-center justify-between py-2 border-b border-zinc-100">
                      <label className="text-xs font-semibold text-zinc-700">{label}</label>
                      <input
                        type="checkbox"
                        checked={val}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                        className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
                      />
                    </div>
                  );
                }

                return (
                  <div key={key} className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700">{label}</label>
                    <input
                      type="text"
                      value={val || ''}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                );
              })}
            </div>

            <div className="px-6 py-4 border-t border-zinc-200 bg-zinc-50 flex items-center justify-end gap-2">
              <button
                onClick={closeEditor}
                className="px-4 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-700 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDraft}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Draft</span>
              </button>
              <button
                onClick={handlePublish}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Live</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
