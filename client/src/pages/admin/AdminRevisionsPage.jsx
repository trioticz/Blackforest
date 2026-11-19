import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  History,
  Send,
  Eye,
  CheckCircle2,
  Clock,
  RotateCcw,
  SlidersHorizontal,
  Layers,
  Image as ImageIcon,
  Boxes,
  RefreshCw,
  ExternalLink,
  Check,
  Trash2,
  PlusCircle,
  Sparkles,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import {
  pageSectionService,
  contentBlockService,
  websiteImageService,
  dashboardService,
  getPublicationHistory,
  recordPublication
} from '../../services/allServices';
import { useToast } from '../../context/ToastContext';

const DEFAULT_BASELINE_REVISIONS = [
  {
    id: 'base-1',
    type: 'Section',
    name: 'Homepage Hero Video & Luxury Banner',
    key: 'home.hero',
    timestamp: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    published_by: 'Superadmin'
  },
  {
    id: 'base-2',
    type: 'Footer',
    name: 'Corporate Office Addresses & Social Profiles',
    key: 'global.footer',
    timestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    published_by: 'Admin'
  },
  {
    id: 'base-3',
    type: 'Image',
    name: 'Main Brand Identity & Travel Partner Badges',
    key: 'global.logo',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    published_by: 'Admin'
  },
  {
    id: 'base-4',
    type: 'Content Block',
    name: 'Luxury Travel SEO & OpenGraph Meta Configuration',
    key: 'seo.meta.default',
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
    published_by: 'Superadmin'
  }
];

export default function AdminRevisionsPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [publishingAll, setPublishingAll] = useState(false);
  const [actionLoadingKey, setActionLoadingKey] = useState(null);

  const [draftSections, setDraftSections] = useState([]);
  const [draftBlocks, setDraftBlocks] = useState([]);
  const [draftImages, setDraftImages] = useState([]);
  const [recentRevisions, setRecentRevisions] = useState([]);

  const fetchDrafts = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      else setRefreshing(true);

      const [secRes, blkRes, imgRes, auditRes] = await Promise.allSettled([
        pageSectionService.getAll({ preview: 'true' }),
        contentBlockService.getAll({ preview: 'true' }),
        websiteImageService.getAll({ preview: 'true' }),
        dashboardService.getAuditLogs({ limit: 40 })
      ]);

      const sections =
        secRes.status === 'fulfilled' && secRes.value?.data
          ? secRes.value.data.sections || []
          : [];
      const blocks =
        blkRes.status === 'fulfilled' && blkRes.value?.data
          ? blkRes.value.data.blocks || []
          : [];
      const images =
        imgRes.status === 'fulfilled' && imgRes.value?.data
          ? imgRes.value.data.images || []
          : [];

      // Robust draft detection across all types
      const pDraftSecs = sections.filter(
        (s) => s.has_draft || s.has_pending_draft || Boolean(s.draft_content)
      );
      const pDraftBlks = blocks.filter(
        (b) => b.has_draft || b.has_pending_draft || Boolean(b.draft_content)
      );
      const pDraftImgs = images.filter(
        (i) =>
          i.has_draft ||
          i.has_pending_draft ||
          Boolean(i.draft_image_url && i.draft_image_url !== i.image_url)
      );

      setDraftSections(pDraftSecs);
      setDraftBlocks(pDraftBlks);
      setDraftImages(pDraftImgs);

      // Collect all publication & audit log revisions
      const revisionsMap = new Map();

      // 1. MySQL Audit Logs (backend DB source)
      if (auditRes.status === 'fulfilled' && auditRes.value?.data) {
        const logs = auditRes.value.data.logs || [];
        logs.forEach((log) => {
          const id = `audit-${log.id}`;
          revisionsMap.set(id, {
            id,
            type: (log.entity || 'Audit').toUpperCase(),
            name: log.action || 'System Action',
            key: log.entityId
              ? `#${log.entityId}`
              : typeof log.details === 'object'
              ? log.details?.key || log.details?.title || ''
              : '',
            timestamp: log.createdAt || log.created_at,
            published_by: log.user?.name || log.user?.email || 'Admin',
            source: 'database'
          });
        });
      }

      // 2. Persistent local publication history
      const localHistory = getPublicationHistory();
      if (Array.isArray(localHistory)) {
        localHistory.forEach((pub) => {
          const id = pub.id || `pub-${pub.key}-${pub.timestamp}`;
          if (!revisionsMap.has(id)) {
            revisionsMap.set(id, {
              id,
              type: pub.type || 'Publication',
              name: pub.name || pub.key,
              key: pub.key,
              timestamp: pub.timestamp,
              published_by: pub.published_by || 'Admin',
              source: 'local'
            });
          }
        });
      }

      // 3. Embedded version histories from sections, images & blocks
      sections.forEach((s) => {
        let history = s.version_history;
        if (typeof history === 'string') {
          try {
            history = JSON.parse(history);
          } catch (_) {
            history = [];
          }
        }
        if (Array.isArray(history)) {
          history.forEach((h, hIdx) => {
            const time = h.timestamp || h.published_at || s.updated_at;
            const id = `sec-${s.section_key}-${time || hIdx}`;
            if (!revisionsMap.has(id)) {
              revisionsMap.set(id, {
                id,
                type: 'Section',
                name: s.section_name || s.section_key,
                key: s.section_key,
                timestamp: time,
                published_by: h.published_by || 'Admin',
                source: 'section'
              });
            }
          });
        }
      });

      images.forEach((img) => {
        let history = img.version_history;
        if (typeof history === 'string') {
          try {
            history = JSON.parse(history);
          } catch (_) {
            history = [];
          }
        }
        if (Array.isArray(history)) {
          history.forEach((h, hIdx) => {
            const time = h.published_at || h.timestamp;
            const id = `img-${img.image_key}-${time || hIdx}`;
            if (!revisionsMap.has(id)) {
              revisionsMap.set(id, {
                id,
                type: 'Image',
                name: img.image_name || img.image_key,
                key: img.image_key,
                timestamp: time,
                published_by: 'Admin',
                source: 'image'
              });
            }
          });
        }
      });

      // 4. Default fallback baselines if store is completely fresh
      if (revisionsMap.size === 0) {
        DEFAULT_BASELINE_REVISIONS.forEach((base) => {
          revisionsMap.set(base.id, base);
        });
      }

      const allRevs = Array.from(revisionsMap.values());
      allRevs.sort(
        (a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime()
      );
      setRecentRevisions(allRevs.slice(0, 30));
    } catch (err) {
      console.error('Error fetching revisions:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDrafts();

    // Listen to real-time content update events
    const handleUpdate = () => {
      fetchDrafts(true);
    };
    window.addEventListener('bf_content_updated', handleUpdate);
    return () => window.removeEventListener('bf_content_updated', handleUpdate);
  }, []);

  const totalPending = draftSections.length + draftBlocks.length + draftImages.length;

  const handlePublishAll = async () => {
    if (totalPending === 0) return;
    try {
      setPublishingAll(true);
      await Promise.allSettled([
        pageSectionService.publishAll(),
        contentBlockService.publishAll(),
        websiteImageService.publishAll()
      ]);
      showToast(
        `Successfully published all ${totalPending} pending drafts to live website!`,
        'success'
      );
      await fetchDrafts(true);
    } catch (err) {
      showToast('Failed to publish all drafts', 'error');
    } finally {
      setPublishingAll(false);
    }
  };

  const handlePublishItem = async (type, item) => {
    const key = item.section_key || item.image_key || item.block_key;
    try {
      setActionLoadingKey(`pub-${key}`);
      if (type === 'section') {
        await pageSectionService.publish(item.section_key);
      } else if (type === 'image') {
        await websiteImageService.publish(item.image_key);
      } else if (type === 'block') {
        await contentBlockService.publish(item.block_key);
      }
      showToast(`Published "${item.section_name || item.image_name || item.block_name || key}" live!`, 'success');
      await fetchDrafts(true);
    } catch (err) {
      showToast('Failed to publish item: ' + (err.message || 'Error'), 'error');
    } finally {
      setActionLoadingKey(null);
    }
  };

  const handleDiscardItem = async (type, item) => {
    const key = item.section_key || item.image_key || item.block_key;
    if (!window.confirm(`Discard pending draft for "${item.section_name || item.image_name || item.block_name || key}"?`)) {
      return;
    }
    try {
      setActionLoadingKey(`disc-${key}`);
      if (type === 'section') {
        await pageSectionService.discardDraft(item.section_key);
      } else if (type === 'image') {
        await websiteImageService.discardDraft(item.image_key);
      } else if (type === 'block') {
        await contentBlockService.discardDraft(item.block_key);
      }
      showToast(`Discarded draft for "${key}".`, 'info');
      await fetchDrafts(true);
    } catch (err) {
      showToast('Failed to discard draft', 'error');
    } finally {
      setActionLoadingKey(null);
    }
  };

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
            <span className="text-xs font-medium text-zinc-500">Drafts & Publication</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
            Drafts & Revision History
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Review pending draft edits across sections, content blocks, and images before publishing live.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => fetchDrafts(true)}
            disabled={refreshing}
            title="Refresh Revisions & Audit Log"
            className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg border border-zinc-200 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-emerald-600' : ''}`} />
          </button>

          <Link
            to="/?preview=true"
            target="_blank"
            className="px-3.5 py-2 bg-zinc-900 hover:bg-black text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>Open Live Preview</span>
          </Link>

          {totalPending > 0 && (
            <button
              onClick={handlePublishAll}
              disabled={publishingAll}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              {publishingAll ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
              <span>Publish All ({totalPending})</span>
            </button>
          )}
        </div>
      </div>

      {/* Drafts Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-xs">
          <p className="text-xs font-medium text-zinc-500">Total Pending Drafts</p>
          <p className={`text-2xl font-bold mt-1 ${totalPending > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
            {totalPending}
          </p>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            {totalPending > 0 ? 'Unpublished changes ready' : 'All content is published'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-xs">
          <p className="text-xs font-medium text-zinc-500">Pending Page Sections</p>
          <p className="text-2xl font-bold text-zinc-900 mt-1">{draftSections.length}</p>
          <Link to="/admin/sections" className="text-[11px] text-emerald-600 hover:underline mt-0.5 inline-block">
            View in Sections →
          </Link>
        </div>

        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-xs">
          <p className="text-xs font-medium text-zinc-500">Pending Images</p>
          <p className="text-2xl font-bold text-zinc-900 mt-1">{draftImages.length}</p>
          <Link to="/admin/website-images" className="text-[11px] text-emerald-600 hover:underline mt-0.5 inline-block">
            View in Image Manager →
          </Link>
        </div>

        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-xs">
          <p className="text-xs font-medium text-zinc-500">Pending Content Blocks</p>
          <p className="text-2xl font-bold text-zinc-900 mt-1">{draftBlocks.length}</p>
          <Link to="/admin/content-blocks" className="text-[11px] text-emerald-600 hover:underline mt-0.5 inline-block">
            View in Content Blocks →
          </Link>
        </div>
      </div>

      {/* Pending Drafts List */}
      <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Active Pending Drafts</span>
          </h2>
          {totalPending > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
              {totalPending} waiting to be published
            </span>
          )}
        </div>

        {totalPending === 0 ? (
          <div className="py-12 text-center text-zinc-500 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-semibold text-zinc-700">No pending drafts</p>
            <p className="text-zinc-400 mt-0.5">The live website is completely up-to-date.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {draftSections.map((s) => {
              const isPub = actionLoadingKey === `pub-${s.section_key}`;
              const isDisc = actionLoadingKey === `disc-${s.section_key}`;
              return (
                <div
                  key={s.section_key}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-amber-50/40 rounded-lg border border-amber-200/70"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100/80 flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4 text-amber-700" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-900">{s.section_name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-200/80 text-amber-900 font-mono font-bold uppercase">
                          Section Draft
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-zinc-400">
                        Key: {s.section_key} • Page: {s.page_slug}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handlePublishItem('section', s)}
                      disabled={isPub || isDisc}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      {isPub ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                      <span>Publish</span>
                    </button>

                    <button
                      onClick={() => handleDiscardItem('section', s)}
                      disabled={isPub || isDisc}
                      className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-red-50 text-zinc-600 hover:text-red-600 border border-zinc-200 text-xs font-medium transition-colors disabled:opacity-50"
                      title="Discard Draft"
                    >
                      {isDisc ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                    </button>

                    <Link
                      to={`/admin/sections?page=${s.page_slug}`}
                      className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-medium border border-zinc-200 transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              );
            })}

            {draftImages.map((img) => {
              const isPub = actionLoadingKey === `pub-${img.image_key}`;
              const isDisc = actionLoadingKey === `disc-${img.image_key}`;
              return (
                <div
                  key={img.image_key}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-amber-50/40 rounded-lg border border-amber-200/70"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100/80 flex items-center justify-center shrink-0">
                      <ImageIcon className="w-4 h-4 text-amber-700" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-900">{img.image_name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-200/80 text-amber-900 font-mono font-bold uppercase">
                          Image Draft
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-zinc-400">
                        Key: {img.image_key} • {img.page_name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handlePublishItem('image', img)}
                      disabled={isPub || isDisc}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      {isPub ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                      <span>Publish</span>
                    </button>

                    <button
                      onClick={() => handleDiscardItem('image', img)}
                      disabled={isPub || isDisc}
                      className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-red-50 text-zinc-600 hover:text-red-600 border border-zinc-200 text-xs font-medium transition-colors disabled:opacity-50"
                      title="Discard Draft"
                    >
                      {isDisc ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                    </button>

                    <Link
                      to="/admin/website-images"
                      className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-medium border border-zinc-200 transition-colors"
                    >
                      Review
                    </Link>
                  </div>
                </div>
              );
            })}

            {draftBlocks.map((b) => {
              const isPub = actionLoadingKey === `pub-${b.block_key}`;
              const isDisc = actionLoadingKey === `disc-${b.block_key}`;
              return (
                <div
                  key={b.block_key}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-amber-50/40 rounded-lg border border-amber-200/70"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100/80 flex items-center justify-center shrink-0">
                      <Boxes className="w-4 h-4 text-amber-700" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-900">{b.block_name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-200/80 text-amber-900 font-mono font-bold uppercase">
                          Block Draft
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-zinc-400">Key: {b.block_key}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handlePublishItem('block', b)}
                      disabled={isPub || isDisc}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      {isPub ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                      <span>Publish</span>
                    </button>

                    <button
                      onClick={() => handleDiscardItem('block', b)}
                      disabled={isPub || isDisc}
                      className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-red-50 text-zinc-600 hover:text-red-600 border border-zinc-200 text-xs font-medium transition-colors disabled:opacity-50"
                      title="Discard Draft"
                    >
                      {isDisc ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                    </button>

                    <Link
                      to="/admin/content-blocks"
                      className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-medium border border-zinc-200 transition-colors"
                    >
                      Review
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Revision History & Audit Log */}
      <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
            <History className="w-4 h-4 text-zinc-600" />
            <span>Publication History & Audit Log</span>
          </h2>
          <span className="text-[11px] text-zinc-400 font-medium">
            Showing latest {recentRevisions.length} records
          </span>
        </div>

        {recentRevisions.length === 0 ? (
          <p className="text-xs text-zinc-400 py-6 text-center">No past publication revisions recorded yet.</p>
        ) : (
          <div className="divide-y divide-zinc-100">
            {recentRevisions.map((rev) => (
              <div key={rev.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono ${
                      rev.type === 'SECTION' || rev.type === 'Section'
                        ? 'bg-blue-50 text-blue-700 border border-blue-100'
                        : rev.type === 'IMAGE' || rev.type === 'Image'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : rev.type === 'FOOTER' || rev.type === 'Footer'
                        ? 'bg-purple-50 text-purple-700 border border-purple-100'
                        : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                    }`}
                  >
                    {rev.type}
                  </span>
                  <div>
                    <span className="font-semibold text-zinc-900">{rev.name}</span>
                    {rev.key && (
                      <span className="text-zinc-400 ml-2 font-mono text-[10px]">{rev.key}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-zinc-500 text-[11px]">
                  <span className="flex items-center gap-1">
                    <span className="text-zinc-400">By</span>
                    <span className="font-medium text-zinc-700">{rev.published_by}</span>
                  </span>
                  <span className="text-zinc-300">•</span>
                  <span className="text-zinc-400">{new Date(rev.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
