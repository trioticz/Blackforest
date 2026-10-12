import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { websiteImageService } from '../services/allServices';
import { Eye, CheckCircle2, X, SlidersHorizontal, ArrowRight } from 'lucide-react';

const WebsiteImagesContext = createContext(null);

export function WebsiteImagesProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if preview mode is active via URL param or sessionStorage
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

  const [imagesMap, setImagesMap] = useState(() => {
    try {
      const initial = {};
      const local = websiteImageService.getLocalImages ? websiteImageService.getLocalImages().data?.images || [] : [];
      local.forEach((img) => {
        initial[img.image_key] = img;
      });
      return initial;
    } catch {
      return {};
    }
  });
  const [pendingDraftCount, setPendingDraftCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Sync with URL query parameter changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('preview') === 'true' || searchParams.get('preview') === '1') {
      if (!isPreviewMode) {
        setIsPreviewMode(true);
        sessionStorage.setItem('bf_preview_mode', 'true');
      }
    }
  }, [location.search, isPreviewMode]);

  const loadImages = useCallback(async () => {
    try {
      const res = await websiteImageService.getAll({
        preview: isPreviewMode ? 'true' : 'false'
      });
      if (res && res.success && res.data) {
        const map = {};
        (res.data.images || []).forEach((img) => {
          map[img.image_key] = img;
        });
        setImagesMap(map);
        setPendingDraftCount(res.data.pendingDraftCount || 0);
      }
    } catch (err) {
      // Graceful fallback to default in-bundle assets if API is unavailable
      console.warn('Could not fetch website images, using default fallbacks:', err.message);
    } finally {
      setLoading(false);
    }
  }, [isPreviewMode]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const togglePreviewMode = (enable) => {
    const nextVal = typeof enable === 'boolean' ? enable : !isPreviewMode;
    setIsPreviewMode(nextVal);
    try {
      if (nextVal) {
        sessionStorage.setItem('bf_preview_mode', 'true');
      } else {
        sessionStorage.removeItem('bf_preview_mode');
        // Clean URL param if present
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('preview')) {
          searchParams.delete('preview');
          navigate({ search: searchParams.toString() }, { replace: true });
        }
      }
    } catch (_) {}
  };

  /**
   * Resolve an image by its unique key.
   * If in preview mode, returns draft_image_url if present; otherwise image_url.
   * If image key is not found or fails, returns fallbackUrl immediately.
   */
  const getImage = useCallback(
    (key, fallbackUrl = '') => {
      const item = imagesMap[key];
      if (!item) return fallbackUrl;

      if (isPreviewMode && item.draft_image_url) {
        return item.draft_image_url;
      }
      return item.image_url || fallbackUrl;
    },
    [imagesMap, isPreviewMode]
  );

  /**
   * Get complete image metadata by key
   */
  const getImageMeta = useCallback(
    (key, fallbackMeta = {}) => {
      const item = imagesMap[key];
      if (!item) {
        return {
          url: fallbackMeta.url || '',
          alt: fallbackMeta.alt || '',
          dimensions: fallbackMeta.dimensions || '',
          aspectRatio: fallbackMeta.aspectRatio || '',
          hasPendingDraft: false
        };
      }

      const activeUrl = isPreviewMode && item.draft_image_url ? item.draft_image_url : item.image_url;

      return {
        url: activeUrl || fallbackMeta.url || '',
        alt: item.alt_text || fallbackMeta.alt || item.image_name,
        dimensions: item.dimensions || fallbackMeta.dimensions || '',
        aspectRatio: item.aspect_ratio || fallbackMeta.aspectRatio || '',
        hasPendingDraft: Boolean(item.draft_image_url && item.draft_image_url !== item.image_url),
        status: item.publication_status
      };
    },
    [imagesMap, isPreviewMode]
  );

  const value = useMemo(
    () => ({
      imagesMap,
      pendingDraftCount,
      loading,
      isPreviewMode,
      togglePreviewMode,
      getImage,
      getImageMeta,
      refreshImages: loadImages
    }),
    [imagesMap, pendingDraftCount, loading, isPreviewMode, getImage, getImageMeta, loadImages]
  );

  return (
    <WebsiteImagesContext.Provider value={value}>
      {/* ── Persistent Preview Mode Floating Bar ── */}
      {isPreviewMode && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-50 bg-[#0d1210]/95 text-white backdrop-blur-md border border-[#27B8B1]/40 shadow-2xl rounded-2xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 max-w-xl animate-fadeIn"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27B8B1] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#27B8B1]"></span>
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-wide text-white">Live Preview Mode</span>
                <span className="bg-[#27B8B1]/20 text-[#27B8B1] border border-[#27B8B1]/40 text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Draft View
                </span>
              </div>
              <p className="text-xs text-zinc-300">
                Displaying pending draft image changes. Live visitors see published versions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin/website-images"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#27B8B1] hover:bg-[#1fa09a] text-zinc-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Manage Images
            </Link>
            <button
              onClick={() => togglePreviewMode(false)}
              aria-label="Exit preview mode"
              title="Exit preview mode"
              className="p-1.5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      {children}
    </WebsiteImagesContext.Provider>
  );
}

export function useWebsiteImages() {
  const context = useContext(WebsiteImagesContext);
  if (!context) {
    throw new Error('useWebsiteImages must be used within a WebsiteImagesProvider');
  }
  return context;
}

/**
 * Convenient single-line hook for components to dynamically resolve image URLs:
 * const heroPoster = useWebsiteImage('homepage.hero.desktop', '/hero-poster.webp');
 */
export function useWebsiteImage(key, fallbackUrl = '') {
  const context = useContext(WebsiteImagesContext);
  if (!context) return fallbackUrl;
  return context.getImage(key, fallbackUrl);
}

/**
 * Hook to resolve full metadata (url, alt, dimensions):
 * const { url, alt } = useWebsiteImageMeta('homepage.hero.desktop', { url: '/hero-poster.webp', alt: 'Hero' });
 */
export function useWebsiteImageMeta(key, fallbackMeta = {}) {
  const context = useContext(WebsiteImagesContext);
  if (!context) {
    return {
      url: fallbackMeta.url || '',
      alt: fallbackMeta.alt || '',
      dimensions: fallbackMeta.dimensions || '',
      aspectRatio: fallbackMeta.aspectRatio || '',
      hasPendingDraft: false
    };
  }
  return context.getImageMeta(key, fallbackMeta);
}
