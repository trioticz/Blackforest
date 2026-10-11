import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Upload, Copy, Trash2, CheckCircle2 } from 'lucide-react';
import { mediaService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { showToast } = useToast();

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await mediaService.getAll();
      if (res.success && res.data) {
        setMediaList(res.data.media || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const res = await mediaService.upload(formData);
      if (res.success && res.data) {
        showToast('Image uploaded successfully!', 'success');
        setMediaList((prev) => [res.data, ...prev]);
      }
    } catch {
      showToast('Failed to upload image', 'error');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const copyUrl = (url) => {
    const absoluteUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(absoluteUrl);
    showToast('Media URL copied to clipboard!', 'info');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this file from library?')) return;
    try {
      await mediaService.delete(id);
      showToast('Media deleted', 'info');
      setMediaList((prev) => prev.filter((m) => m.id !== id));
    } catch {
      showToast('Failed to delete media', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Media Library & File Assets</h2>
          <p className="text-xs text-gray-500">Upload and manage banners, hotel photos, tour covers, and logos.</p>
        </div>

        <label className="px-4 py-2 bg-[#10221b] text-white hover:bg-[#1c382e] text-xs font-bold uppercase rounded-xl flex items-center gap-2 cursor-pointer shadow">
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Uploading...' : 'Upload Media'}</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
          <span className="w-6 h-6 border-2 border-[#10221b] border-t-transparent rounded-full animate-spin"></span>
          <span>Loading assets...</span>
        </div>
      ) : mediaList.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 text-gray-400">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p>No media uploaded yet. Use the upload button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mediaList.map((m) => (
            <div key={m.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between group">
              <div className="h-32 bg-gray-100 relative overflow-hidden">
                <img
                  src={m.url || m.data}
                  alt={m.filename}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    if (m.data && e.target.src !== m.data) {
                      e.target.src = m.data;
                    }
                  }}
                />
              </div>
              <div className="p-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="truncate text-gray-600 font-medium text-[11px] max-w-[90px]">{m.originalName || m.filename}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => copyUrl(m.url)} title="Copy URL" className="p-1 text-gray-400 hover:text-gray-900 rounded">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(m.id)} title="Delete" className="p-1 text-gray-400 hover:text-red-500 rounded">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
