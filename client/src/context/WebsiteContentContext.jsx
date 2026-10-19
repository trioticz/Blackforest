import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { pageSectionService, contentBlockService } from '../services/allServices';
import { defaultPageSections, defaultContentBlocks } from '../data/defaultPageSections';
import { Eye, CheckCircle2, X, SlidersHorizontal, ArrowRight, RefreshCw } from 'lucide-react';

const WebsiteContentContext = createContext(null);

export function WebsiteContentProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Preview mode toggle via URL ?preview=true or sessionStorage
  const [isPreviewMode, setIsPreviewMode] = useState(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('preview') === 'true' || searchParams.get('preview') === '1') {
        sessionStorage.setItem('bf_preview_mode', 'true');
        return true;
      }
      return sessionStorage.getItem('bf_preview_mode') === 'true';
    } catch {
      return false;
    }
  });

  // Synchronous initial hydration for 0ms load
  const [sectionsMap, setSectionsMap] = useState(() => {
    try {
      const map = {};
      const local = pageSectionService.getLocalSections({ preview: isPreviewMode }).data?.sections || [];
      local.forEach((sec) => {
        map[sec.section_key] = sec;
      });
      return map;
    } catch {
      const fallback = {};
      defaultPageSections.forEach((s) => {
        fallback[s.section_key] = { ...s, active_content: s.content };
      });
      return fallback;
    }
  });

  const [blocksMap, setBlocksMap] = useState(() => {
    try {
      const map = {};
      const local = contentBlockService.getLocalBlocks({ preview: isPreviewMode }).data?.blocks || [];
      local.forEach((b) => {
        map[b.block_key] = b;
      });
      return map;
    } catch {
      const fallback = {};
      defaultContentBlocks.forEach((b) => {
        fallback[b.block_key] = { ...b, active_content: b.content };
      });
      return fallback;
    }
  });

  const [pendingDraftCount, setPendingDraftCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isPublishingAll, setIsPublishingAll] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Sync URL ?preview=
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('preview') === 'true' || searchParams.get('preview') === '1') {
      if (!isPreviewMode) {
        setIsPreviewMode(true);
        sessionStorage.setItem('bf_preview_mode', 'true');
      }
    }
  }, [location.search, isPreviewMode]);

  const loadContent = useCallback(async () => {
    try {
      const [secRes, blkRes] = await Promise.allSettled([
        pageSectionService.getAll({ preview: isPreviewMode ? 'true' : 'false' }),
        contentBlockService.getAll({ preview: isPreviewMode ? 'true' : 'false' })
      ]);

      let totalDrafts = 0;

      if (secRes.status === 'fulfilled' && secRes.value?.success && secRes.value?.data) {
        const sMap = {};
        (secRes.value.data.sections || []).forEach((sec) => {
          sMap[sec.section_key] = sec;
        });
        setSectionsMap((prev) => ({ ...prev, ...sMap }));
        totalDrafts += secRes.value.data.pendingDraftCount || 0;
      }

      if (blkRes.status === 'fulfilled' && blkRes.value?.success && blkRes.value?.data) {
        const bMap = {};
        (blkRes.value.data.blocks || []).forEach((b) => {
          bMap[b.block_key] = b;
        });
        setBlocksMap((prev) => ({ ...prev, ...bMap }));
        totalDrafts += blkRes.value.data.pendingDraftCount || 0;
      }

      setPendingDraftCount(totalDrafts);
    } catch (err) {
      console.warn('Could not sync CMS content, using local defaults:', err.message);
    } finally {
      setLoading(false);
    }
  }, [isPreviewMode]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const togglePreviewMode = (enable) => {
    const nextVal = typeof enable === 'boolean' ? enable : !isPreviewMode;
    setIsPreviewMode(nextVal);
    try {
      if (nextVal) {
        sessionStorage.setItem('bf_preview_mode', 'true');
        setBannerDismissed(false);
      } else {
        sessionStorage.removeItem('bf_preview_mode');
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('preview')) {
          searchParams.delete('preview');
          navigate({ search: searchParams.toString() }, { replace: true });
        }
      }
    } catch (_) {}
  };

  const publishAllDrafts = async () => {
    try {
      setIsPublishingAll(true);
      await Promise.allSettled([
        pageSectionService.publishAll(),
        contentBlockService.publishAll()
      ]);
      await loadContent();
    } catch (err) {
      console.error('Failed to publish all drafts:', err);
    } finally {
      setIsPublishingAll(false);
    }
  };

  const getSection = useCallback(
    (key, fallbackContent = {}) => {
      const sec = sectionsMap[key];
      if (!sec) {
        return {
          content: fallbackContent,
          section: null,
          isVisible: true,
          isDraft: false
        };
      }
      return {
        content: sec.active_content || sec.content || fallbackContent,
        section: sec,
        isVisible: sec.is_visible !== false,
        isDraft: Boolean(sec.has_draft)
      };
    },
    [sectionsMap]
  );

  const getBlock = useCallback(
    (key, fallbackContent = {}) => {
      const b = blocksMap[key];
      if (!b) {
        return {
          content: fallbackContent,
          block: null,
          isActive: true,
          isDraft: false
        };
      }
      return {
        content: b.active_content || b.content || fallbackContent,
        block: b,
        isActive: b.is_active !== false,
        isDraft: Boolean(b.has_draft)
      };
    },
    [blocksMap]
  );

  const contextValue = useMemo(
    () => ({
      isPreviewMode,
      togglePreviewMode,
      sectionsMap,
      blocksMap,
      pendingDraftCount,
      loading,
      loadContent,
      publishAllDrafts,
      isPublishingAll,
      getSection,
      getBlock
    }),
    [
      isPreviewMode,
      sectionsMap,
      blocksMap,
      pendingDraftCount,
      loading,
      loadContent,
      isPublishingAll,
      getSection,
      getBlock
    ]
  );

  return (
    <WebsiteContentContext.Provider value={contextValue}>
      {children}

      {/* Floating CMS Preview Mode Bar */}
      {isPreviewMode && !bannerDismissed && (
        <aside
          role="region"
          aria-label="CMS Live Preview Bar"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] w-[95%] max-w-4xl bg-[#0c1c16]/95 text-white backdrop-blur-md rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.35)] border border-emerald-500/30 p-3 sm:p-4 transition-all duration-300 animate-slideUp"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold tracking-wide text-white uppercase font-sans">
                    Website CMS Live Preview
                  </span>
                  {pendingDraftCount > 0 ? (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {pendingDraftCount} Draft {pendingDraftCount === 1 ? 'Change' : 'Changes'}
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Up to date
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-300 hidden sm:block">
                  Viewing unpublished drafts across pages, sections, and images in real-time.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {pendingDraftCount > 0 && (
                <button
                  onClick={publishAllDrafts}
                  disabled={isPublishingAll}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  {isPublishingAll ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                  <span>Publish All</span>
                </button>
              )}

              <Link
                to="/admin/pages"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1 transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Open CMS</span>
              </Link>

              <button
                onClick={() => togglePreviewMode(false)}
                title="Exit Preview Mode"
                className="px-2.5 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-medium transition-colors cursor-pointer"
              >
                Exit Preview
              </button>

              <button
                onClick={() => setBannerDismissed(true)}
                title="Minimize preview bar"
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      )}
    </WebsiteContentContext.Provider>
  );
}

export function useWebsiteContentContext() {
  const ctx = useContext(WebsiteContentContext);
  if (!ctx) {
    throw new Error('useWebsiteContentContext must be used within a WebsiteContentProvider');
  }
  return ctx;
}

export function useWebsiteContent(sectionKey, fallbackContent = {}) {
  const ctx = useContext(WebsiteContentContext);
  if (!ctx) {
    return {
      content: fallbackContent,
      section: null,
      isVisible: true,
      isDraft: false
    };
  }
  return ctx.getSection(sectionKey, fallbackContent);
}

export function useContentBlock(blockKey, fallbackContent = {}) {
  const ctx = useContext(WebsiteContentContext);
  if (!ctx) {
    return {
      content: fallbackContent,
      block: null,
      isActive: true,
      isDraft: false
    };
  }
  return ctx.getBlock(blockKey, fallbackContent);
}
