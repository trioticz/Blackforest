import assetMap from '../data/assetMap.json';

const PLACEHOLDER_IMAGE = '/assets/images/placeholder-1.png';

/**
 * Resolves any image URL to a local asset path.
 * If the URL points to the old WordPress uploads domain (blackforestholidays.com/wp-content/uploads/...),
 * it resolves it to the corresponding local /assets/images/... asset bundled with the application.
 */
export function resolveImageUrl(url) {
  if (!url || typeof url !== 'string') return PLACEHOLDER_IMAGE;

  // Trim whitespace
  const trimmed = url.trim();

  // 1. Direct hit in assetMap
  if (assetMap[trimmed]) {
    return assetMap[trimmed];
  }

  // 2. Query param stripped check in assetMap
  const cleanUrl = trimmed.split('?')[0];
  if (assetMap[cleanUrl]) {
    return assetMap[cleanUrl];
  }

  // 3. Fallback translation for WordPress URLs
  if (cleanUrl.includes('blackforestholidays.com/wp-content/uploads/')) {
    const rawFilename = cleanUrl.split('/').pop();
    // Normalize unicode em-dashes if present
    const normalizedFilename = rawFilename.replace(/[—–]/g, '-').replace(/^-+/, '');
    return `/assets/images/${normalizedFilename}`;
  }

  return trimmed;
}

/**
 * Handles image load errors gracefully by falling back to a placeholder
 * and avoiding infinite reload loops.
 */
export function handleImageError(e, fallback = PLACEHOLDER_IMAGE) {
  if (!e || !e.target) return;
  if (e.target.dataset.fallbackApplied) {
    e.target.style.opacity = '0';
    return;
  }
  e.target.dataset.fallbackApplied = 'true';
  e.target.src = fallback;
}
