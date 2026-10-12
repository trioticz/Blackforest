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

export const websiteImageService = {
  getAll: async (params) => {
    const res = await api.get('/website-images', { params });
    return res.data;
  },
  getByKey: async (key, params) => {
    const res = await api.get(`/website-images/${encodeURIComponent(key)}`, { params });
    return res.data;
  },
  upload: async (fileOrData, onProgress) => {
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
      return res.data;
    } else {
      // Base64 JSON
      const res = await api.post('/website-images/upload', { data: fileOrData });
      return res.data;
    }
  },
  updateDraft: async (id, data) => {
    const res = await api.patch(`/website-images/${id}`, data);
    return res.data;
  },
  publish: async (id) => {
    const res = await api.post(`/website-images/${id}/publish`);
    return res.data;
  },
  publishAll: async () => {
    const res = await api.post('/website-images/publish-all');
    return res.data;
  },
  discardDraft: async (id) => {
    const res = await api.post(`/website-images/${id}/discard-draft`);
    return res.data;
  },
  restoreOriginal: async (id) => {
    const res = await api.post(`/website-images/${id}/restore-original`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/website-images', data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/website-images/${id}`);
    return res.data;
  }
};

