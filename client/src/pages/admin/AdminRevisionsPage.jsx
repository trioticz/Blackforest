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
  ExternalLink
} from 'lucide-react';
import {
  pageSectionService,
  contentBlockService,
  websiteImageService
} from '../../services/allServices';
import { useToast } from '../../context/ToastContext';

export default function AdminRevisionsPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [publishingAll, setPublishingAll] = useState(false);

  const [draftSections, setDraftSections] = useState([]);
  const [draftBlocks, setDraftBlocks] = useState([]);
  const [draftImages, setDraftImages] = useState([]);
  const [recentRevisions, setRecentRevisions] = useState([]);

  const fetchDrafts = async () => {
    try {
      setLoading(true);
      const [secRes, blkRes, imgRes] = await Promise.allSettled([
        pageSectionService.getAll({ preview: 'true' }),
        contentBlockService.getAll({ preview: 'true' }),
        websiteImageService.getAll({ preview: 'true' })
      ]);

      const sections = secRes.status === 'fulfilled' && secRes.value?.data ? secRes.value.data.sections || [] : [];
      const blocks = blkRes.status === 'fulfilled' && blkRes.value?.data ? blkRes.value.data.blocks || [] : [];
      const images = imgRes.status === 'fulfilled' && imgRes.value?.data ? imgRes.value.data.images || [] : [];

      const pDraftSecs = sections.filter((s) => s.has_draft);
      const pDraftBlks = blocks.filter((b) => b.has_draft);
      const pDraftImgs = images.filter((i) => i.has_draft);

      setDraftSections(pDraftSecs);
      setDraftBlocks(pDraftBlks);
      setDraftImages(pDraftImgs);

      // Collect recent revisions
      const revisions = [];
      sections.forEach((s) => {
        if (Array.isArray(s.version_history)) {
          s.version_history.forEach((h) => {
            revisions.push({
              type: 'Section',
              name: s.section_name,
              key: s.section_key,
              timestamp: h.timestamp || h.published_at,
              published_by: h.published_by || 'Admin'
            });
          });
        }
      });
      images.forEach((img) => {
        if (Array.isArray(img.version_history)) {
          img.version_history.forEach((h) => {
            revisions.push({
              type: 'Image',
              name: img.image_name,
              key: img.image_key,
              timestamp: h.published_at || h.timestamp,
              published_by: 'Admin'
            });
          });
        }
      });

      revisions.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
      setRecentRevisions(revisions.slice(0, 20));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
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
      showToast(`Successfully published all ${totalPending} pending drafts to live website!`, 'success');
      fetchDrafts();
    } catch (err) {
      showToast('Failed to publish all drafts', 'error');
    } finally {
      setPublishingAll(false);
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
        <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-500" />
          <span>Active Pending Drafts</span>
        </h2>

        {totalPending === 0 ? (
          <div className="py-12 text-center text-zinc-500 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-semibold text-zinc-700">No pending drafts</p>
            <p className="text-zinc-400 mt-0.5">The live website is completely up-to-date.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {draftSections.map((s) => (
              <div
                key={s.section_key}
                className="flex items-center justify-between p-3.5 bg-amber-50/30 rounded-lg border border-amber-200/60"
              >
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <div>
                    <span className="text-xs font-bold text-zinc-900">{s.section_name}</span>
                    <p className="text-[10px] font-mono text-zinc-400">
                      Section: {s.section_key} • Page: {s.page_slug}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/sections?page=${s.page_slug}`}
                    className="px-2.5 py-1 rounded bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-medium border border-zinc-200"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}

            {draftImages.map((img) => (
              <div
                key={img.image_key}
                className="flex items-center justify-between p-3.5 bg-amber-50/30 rounded-lg border border-amber-200/60"
              >
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-4 h-4 text-amber-600" />
                  <div>
                    <span className="text-xs font-bold text-zinc-900">{img.image_name}</span>
                    <p className="text-[10px] font-mono text-zinc-400">
                      Image Key: {img.image_key} • {img.page_name}
                    </p>
                  </div>
                </div>

                <Link
                  to="/admin/website-images"
                  className="px-2.5 py-1 rounded bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-medium border border-zinc-200"
                >
                  Review
                </Link>
              </div>
            ))}

            {draftBlocks.map((b) => (
              <div
                key={b.block_key}
                className="flex items-center justify-between p-3.5 bg-amber-50/30 rounded-lg border border-amber-200/60"
              >
                <div className="flex items-center gap-3">
                  <Boxes className="w-4 h-4 text-amber-600" />
                  <div>
                    <span className="text-xs font-bold text-zinc-900">{b.block_name}</span>
                    <p className="text-[10px] font-mono text-zinc-400">Block: {b.block_key}</p>
                  </div>
                </div>

                <Link
                  to="/admin/content-blocks"
                  className="px-2.5 py-1 rounded bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-medium border border-zinc-200"
                >
                  Review
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Revision History Log */}
      <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
          <History className="w-4 h-4 text-zinc-600" />
          <span>Publication History & Audit Log</span>
        </h2>

        {recentRevisions.length === 0 ? (
          <p className="text-xs text-zinc-400 py-6 text-center">No past publication revisions recorded yet.</p>
        ) : (
          <div className="divide-y divide-zinc-100">
            {recentRevisions.map((rev, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 uppercase font-mono">
                    {rev.type}
                  </span>
                  <div>
                    <span className="font-semibold text-zinc-800">{rev.name}</span>
                    <span className="text-zinc-400 ml-2 font-mono text-[10px]">{rev.key}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
                  <span>Published by {rev.published_by}</span>
                  <span>{new Date(rev.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
