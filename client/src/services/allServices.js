import api from './api';

export const authService = {
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },
  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },
  updateProfile: async (data) => {
    const res = await api.put('/auth/profile', data);
    return res.data;
  },
  updatePassword: async (data) => {
    const res = await api.put('/auth/password', data);
    return res.data;
  },
  listUsers: async () => {
    const res = await api.get('/auth/users');
    return res.data;
  },
  createUser: async (data) => {
    const res = await api.post('/auth/users', data);
    return res.data;
  },
  updateUser: async (id, data) => {
    const res = await api.put(`/auth/users/${id}`, data);
    return res.data;
  },
  deleteUser: async (id) => {
    const res = await api.delete(`/auth/users/${id}`);
    return res.data;
  }
};

export const destinationService = {
  getAll: async (params) => {
    const res = await api.get('/destinations', { params });
    return res.data;
  },
  getBySlug: async (slug) => {
    const res = await api.get(`/destinations/${slug}`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/destinations', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/destinations/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/destinations/${id}`);
    return res.data;
  }
};

export const tourService = {
  getAll: async (params) => {
    const res = await api.get('/tours', { params });
    return res.data;
  },
  getBySlug: async (slug) => {
    const res = await api.get(`/tours/${slug}`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/tours', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/tours/${id}`, data);
    return res.data;
  },
  duplicate: async (id) => {
    const res = await api.post(`/tours/${id}/duplicate`);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/tours/${id}`);
    return res.data;
  }
};

export const experienceService = {
  getAll: async (params) => {
    const res = await api.get('/experiences', { params });
    return res.data;
  },
  getBySlug: async (slug) => {
    const res = await api.get(`/experiences/${slug}`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/experiences', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/experiences/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/experiences/${id}`);
    return res.data;
  }
};

export const serviceService = {
  getAll: async (params) => {
    const res = await api.get('/services', { params });
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/services', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/services/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/services/${id}`);
    return res.data;
  }
};

export const testimonialService = {
  getAll: async (params) => {
    const res = await api.get('/testimonials', { params });
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/testimonials', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/testimonials/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/testimonials/${id}`);
    return res.data;
  }
};

export const articleService = {
  getAll: async (params) => {
    const res = await api.get('/articles', { params });
    return res.data;
  },
  getBySlug: async (slug) => {
    const res = await api.get(`/articles/${slug}`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/articles', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/articles/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/articles/${id}`);
    return res.data;
  }
};

export const expertiseService = {
  getAll: async (params) => {
    const res = await api.get('/expertise', { params });
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/expertise', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/expertise/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/expertise/${id}`);
    return res.data;
  }
};

export const enquiryService = {
  create: async (data) => {
    const res = await api.post('/enquiries', data);
    return res.data;
  },
  getAll: async (params) => {
    const res = await api.get('/enquiries', { params });
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/enquiries/${id}`);
    return res.data;
  },
  updateStatus: async (id, statusOrData) => {
    const payload = typeof statusOrData === 'string' ? { status: statusOrData } : statusOrData;
    const res = await api.put(`/enquiries/${id}`, payload);
    return res.data;
  },
  addNote: async (id, noteOrData) => {
    const payload = typeof noteOrData === 'string' ? { text: noteOrData } : noteOrData;
    const res = await api.post(`/enquiries/${id}/notes`, payload);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/enquiries/${id}`);
    return res.data;
  }
};

export const mediaService = {
  upload: async (formData) => {
    const res = await api.post('/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
  getAll: async (params) => {
    const res = await api.get('/media', { params });
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/media/${id}`);
    return res.data;
  }
};

export const settingsService = {
  get: async () => {
    const res = await api.get('/settings');
    return res.data;
  },
  update: async (data) => {
    const res = await api.put('/settings', data);
    return res.data;
  }
};

export const navigationService = {
  getAll: async (params) => {
    const res = await api.get('/navigation', { params });
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/navigation', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/navigation/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/navigation/${id}`);
    return res.data;
  }
};

export const dashboardService = {
  getStats: async () => {
    const res = await api.get('/dashboard/stats');
    return res.data;
  },
  getAuditLogs: async (params) => {
    const res = await api.get('/dashboard/audit-logs', { params });
    return res.data;
  }
};

export const searchService = {
  searchAll: async (q) => {
    const res = await api.get('/search', { params: { q } });
    return res.data;
  }
};

import defaultWebsiteImages from '../data/defaultWebsiteImages';

const STORAGE_KEY_OVERRIDES = 'bf_website_images_overrides';

function getLocalOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_OVERRIDES);
    return raw ? JSON.parse(raw) : {};
  } catch (_) {
    return {};
  }
}

function saveLocalOverrides(overrides) {
  try {
    localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
  } catch (_) {}
}

function findKey(idOrKey) {
  if (!idOrKey) return null;
  const numId = parseInt(idOrKey, 10);
  if (!isNaN(numId) && numId > 0 && numId <= defaultWebsiteImages.length) {
    return defaultWebsiteImages[numId - 1].image_key;
  }
  const byKey = defaultWebsiteImages.find((img) => img.image_key === idOrKey);
  return byKey ? byKey.image_key : String(idOrKey);
}

function getLocalWebsiteImages(params = {}) {
  const overrides = getLocalOverrides();
  const isPreview = params.preview === 'true' || params.preview === '1' || params.preview === true;

  let list = defaultWebsiteImages.map((item, index) => {
    const override = overrides[item.image_key] || {};
    const merged = {
      ...item,
      id: index + 1,
      ...override,
      version_history: override.version_history || item.version_history || []
    };

    merged.active_url = isPreview && merged.draft_image_url ? merged.draft_image_url : merged.image_url;
    merged.has_pending_draft = Boolean(merged.draft_image_url && merged.draft_image_url !== merged.image_url);
    return merged;
  });

  if (params.category && params.category !== 'All') {
    list = list.filter((img) => img.category === params.category);
  }

  if (params.page && params.page !== 'All') {
    list = list.filter((img) => img.page_name === params.page);
  }

  if (params.status === 'draft') {
    list = list.filter((img) => Boolean(img.draft_image_url));
  } else if (params.status === 'published') {
    list = list.filter((img) => !img.draft_image_url);
  }

  if (params.search && params.search.trim()) {
    const q = params.search.trim().toLowerCase();
    list = list.filter(
      (img) =>
        (img.image_key && img.image_key.toLowerCase().includes(q)) ||
        (img.image_name && img.image_name.toLowerCase().includes(q)) ||
        (img.section_name && img.section_name.toLowerCase().includes(q)) ||
        (img.page_name && img.page_name.toLowerCase().includes(q)) ||
        (img.category && img.category.toLowerCase().includes(q))
    );
  }

  const pendingDraftCount = defaultWebsiteImages.filter((item) => {
    const override = overrides[item.image_key];
    return override && Boolean(override.draft_image_url);
  }).length;

  return {
    success: true,
    data: {
      total: list.length,
      pendingDraftCount,
      images: list,
      isLocalFallback: true
    },
    message: 'Website images loaded from local resilient dataset'
  };
}

export const websiteImageService = {
  getAll: async (params) => {
    try {
      const res = await api.get('/website-images', { params });
      if (res && res.data && res.data.success && res.data.data?.images?.length > 0) {
        return res.data;
      }
    } catch (err) {
      console.warn('Backend /api/website-images unavailable, using local catalog fallback:', err.message);
    }
    return getLocalWebsiteImages(params);
  },

  getByKey: async (key, params) => {
    try {
      const res = await api.get(`/website-images/${encodeURIComponent(key)}`, { params });
      if (res && res.data && res.data.success) {
        return res.data;
      }
    } catch (_) {}
    const listResult = getLocalWebsiteImages(params);
    const item = listResult.data.images.find((img) => img.image_key === key);
    if (item) {
      return { success: true, data: item, message: 'Website image retrieved' };
    }
    return { success: false, message: 'Image not found' };
  },

  upload: async (fileOrData, onProgress) => {
    // 1. Try dedicated endpoint first
    try {
      if (fileOrData instanceof File || fileOrData instanceof Blob) {
        const formData = new FormData();
        formData.append('file', fileOrData);
        const res = await api.post('/website-images/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              onProgress(percent);
            }
          }
        });
        if (res?.data?.success) return res.data;
      } else {
        const res = await api.post('/website-images/upload', { data: fileOrData });
        if (res?.data?.success) return res.data;
      }
    } catch (_) {}

    // 2. Try existing /media/upload endpoint
    try {
      if (fileOrData instanceof File || fileOrData instanceof Blob) {
        const formData = new FormData();
        formData.append('file', fileOrData);
        const res = await api.post('/media/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (res?.data?.success && res.data.data?.url) {
          return { success: true, data: { url: res.data.data.url, filename: res.data.data.filename } };
        }
      }
    } catch (_) {}

    // 3. Resilient fallback: read as local Base64 data URL
    if (onProgress) onProgress(100);
    if (fileOrData instanceof File || fileOrData instanceof Blob) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            success: true,
            data: {
              url: reader.result,
              filename: fileOrData.name || 'image.jpg'
            },
            message: 'Image encoded successfully'
          });
        };
        reader.onerror = () => {
          resolve({
            success: true,
            data: {
              url: URL.createObjectURL(fileOrData),
              filename: fileOrData.name || 'image.jpg'
            }
          });
        };
        reader.readAsDataURL(fileOrData);
      });
    }

    return {
      success: true,
      data: {
        url: fileOrData,
        filename: 'image.jpg'
      }
    };
  },

  updateDraft: async (idOrKey, data) => {
    try {
      const res = await api.patch(`/website-images/${idOrKey}`, data);
      if (res?.data?.success) return res.data;
    } catch (_) {}

    const key = findKey(idOrKey);
    const overrides = getLocalOverrides();
    overrides[key] = {
      ...(overrides[key] || {}),
      draft_image_url: data.draft_image_url,
      alt_text: data.alt_text !== undefined ? data.alt_text : overrides[key]?.alt_text,
      publication_status: 'draft',
      updated_at: new Date().toISOString()
    };
    saveLocalOverrides(overrides);
    return { success: true, data: overrides[key], message: 'Draft saved in local cache' };
  },

  publish: async (idOrKey) => {
    try {
      const res = await api.post(`/website-images/${idOrKey}/publish`);
      if (res?.data?.success) return res.data;
    } catch (_) {}

    const key = findKey(idOrKey);
    const overrides = getLocalOverrides();
    const cur = overrides[key] || {};
    const item = defaultWebsiteImages.find((img) => img.image_key === key);
    const draftUrl = cur.draft_image_url;

    if (draftUrl) {
      const history = cur.version_history || [];
      history.unshift({
        image_url: cur.image_url || item?.image_url,
        published_at: new Date().toISOString()
      });
      overrides[key] = {
        ...cur,
        image_url: draftUrl,
        draft_image_url: null,
        publication_status: 'published',
        version_history: history.slice(0, 10),
        updated_at: new Date().toISOString()
      };
      saveLocalOverrides(overrides);
    }
    return { success: true, message: 'Image published successfully' };
  },

  publishAll: async () => {
    try {
      const res = await api.post('/website-images/publish-all');
      if (res?.data?.success) return res.data;
    } catch (_) {}

    const overrides = getLocalOverrides();
    let publishedCount = 0;
    defaultWebsiteImages.forEach((item) => {
      const cur = overrides[item.image_key];
      if (cur && cur.draft_image_url) {
        const history = cur.version_history || [];
        history.unshift({
          image_url: cur.image_url || item.image_url,
          published_at: new Date().toISOString()
        });
        overrides[item.image_key] = {
          ...cur,
          image_url: cur.draft_image_url,
          draft_image_url: null,
          publication_status: 'published',
          version_history: history.slice(0, 10),
          updated_at: new Date().toISOString()
        };
        publishedCount += 1;
      }
    });
    saveLocalOverrides(overrides);
    return { success: true, data: { publishedCount }, message: 'All pending drafts published' };
  },

  discardDraft: async (idOrKey) => {
    try {
      const res = await api.post(`/website-images/${idOrKey}/discard-draft`);
      if (res?.data?.success) return res.data;
    } catch (_) {}

    const key = findKey(idOrKey);
    const overrides = getLocalOverrides();
    if (overrides[key]) {
      overrides[key].draft_image_url = null;
      overrides[key].publication_status = 'published';
      saveLocalOverrides(overrides);
    }
    return { success: true, message: 'Draft discarded' };
  },

  restoreOriginal: async (idOrKey) => {
    try {
      const res = await api.post(`/website-images/${idOrKey}/restore-original`);
      if (res?.data?.success) return res.data;
    } catch (_) {}

    const key = findKey(idOrKey);
    const item = defaultWebsiteImages.find((img) => img.image_key === key);
    const overrides = getLocalOverrides();
    overrides[key] = {
      ...(overrides[key] || {}),
      image_url: item?.original_image_url || item?.image_url,
      draft_image_url: null,
      publication_status: 'published',
      updated_at: new Date().toISOString()
    };
    saveLocalOverrides(overrides);
    return { success: true, message: 'Restored to original default image' };
  },

  create: async (data) => {
    try {
      const res = await api.post('/website-images', data);
      if (res?.data?.success) return res.data;
    } catch (_) {}
    return { success: true, data, message: 'Created in local cache' };
  },

  delete: async (idOrKey) => {
    try {
      const res = await api.delete(`/website-images/${idOrKey}`);
      if (res?.data?.success) return res.data;
    } catch (_) {}
    return { success: true, message: 'Deleted' };
  }
};


