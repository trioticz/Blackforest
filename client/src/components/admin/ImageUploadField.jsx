import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  Film,
  Video,
  Play,
  X,
  RefreshCw,
  CheckCircle2,
  Link2,
  AlertCircle
} from 'lucide-react';
import { mediaService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';

// Helper to determine if a URL/path is a video
export const isVideoUrl = (url = '') => {
  if (typeof url !== 'string') return false;
  const clean = url.split('?')[0].toLowerCase();
  return (
    clean.endsWith('.mp4') ||
    clean.endsWith('.webm') ||
    clean.endsWith('.ogg') ||
    clean.endsWith('.mov') ||
    clean.startsWith('data:video/') ||
    clean.startsWith('blob:') && clean.includes('video')
  );
};

export default function ImageUploadField({
  label = 'Media File',
  value = '',
  onChange,
  required = false,
  recommendedDimensions = '',
  helperText = '',
  compact = false,
  objectFit = 'cover',
  mediaType = 'any', // 'image' | 'video' | 'any'
  accept = ''
}) {
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const { showToast } = useToast();

  const isVideo = isVideoUrl(value) || mediaType === 'video';

  // Compute accept attribute based on mediaType
  const defaultAccept =
    mediaType === 'video'
      ? 'video/mp4,video/webm,video/ogg,video/quicktime'
      : mediaType === 'image'
      ? 'image/png,image/jpeg,image/webp,image/svg+xml,image/gif,image/avif'
      : 'image/*,video/mp4,video/webm,video/ogg,video/quicktime';

  const acceptString = accept || defaultAccept;

  const handleFile = async (file) => {
    if (!file) return;

    const fileIsVideo = file.type.startsWith('video/') || /\.(mp4|webm|ogg|mov)$/i.test(file.name || '');
    const fileIsImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp|svg|gif|avif)$/i.test(file.name || '');

    if (mediaType === 'video' && !fileIsVideo) {
      showToast('Please select a valid video file (MP4, WEBM, MOV, OGG)', 'error');
      return;
    }

    if (mediaType === 'image' && !fileIsImage) {
      showToast('Please select a valid image file (PNG, JPG, WEBP, GIF, SVG)', 'error');
      return;
    }

    if (!fileIsVideo && !fileIsImage) {
      showToast('Please select a valid image or video file', 'error');
      return;
    }

    const maxSize = fileIsVideo ? 100 * 1024 * 1024 : 25 * 1024 * 1024;
    if (file.size > maxSize) {
      showToast(`File size must be under ${fileIsVideo ? '100MB' : '25MB'}`, 'error');
      return;
    }

    if (fileIsVideo) {
      const localBlobUrl = URL.createObjectURL(file);
      uploadToServer(file, localBlobUrl, true);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const localDataUrl = e.target.result;
        uploadToServer(file, localDataUrl, false);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToServer = async (file, fallbackDataUrl, isVid = false) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await mediaService.upload(formData);
      if (res && res.success && res.data) {
        // Prefer returned URL or fallback to relative uploads path
        const serverUrl = res.data.url || `/uploads/${res.data.filename}`;
        onChange(serverUrl);
        showToast(
          `${isVid ? 'Video' : 'Image'} uploaded and saved to cloud database!`,
          'success'
        );
      } else {
        onChange(fallbackDataUrl);
        showToast(
          `${isVid ? 'Video' : 'Image'} saved locally as database data URL`,
          'info'
        );
      }
    } catch (err) {
      console.warn('Backend media upload error, using local database data URL:', err);
      onChange(fallbackDataUrl);
      showToast(
        `${isVid ? 'Video' : 'Image'} saved as embedded data URL`,
        'info'
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-1.5 text-xs">
      <div className="flex items-center justify-between">
        <label className="block font-semibold text-zinc-700 uppercase tracking-wider text-[11px] truncate">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-zinc-500 hover:text-zinc-800 flex items-center gap-1 transition-colors cursor-pointer shrink-0"
        >
          <Link2 className="w-3 h-3" />
          <span>{showUrlInput ? 'Hide URL' : 'Manual URL'}</span>
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptString}
        onChange={(e) => handleFile(e.target.files?.[0])}
        className="hidden"
      />

      {/* COMPACT MODE LAYOUT */}
      {compact ? (
        <div>
          {value ? (
            <div className="relative border border-zinc-200 rounded-xl overflow-hidden bg-zinc-100 group shadow-2xs h-32 w-full">
              {isVideo ? (
                <video
                  src={value}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={value}
                  alt={label}
                  className={`w-full h-full ${
                    objectFit === 'contain' ? 'object-contain p-2 bg-white' : 'object-cover'
                  }`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/images/cropped-cropped-Logo-02-1-1-180x180.png';
                  }}
                />
              )}

              {/* Hover overlay with action buttons */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1.5 bg-white hover:bg-zinc-100 text-zinc-900 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm transition-transform hover:scale-105 cursor-pointer"
                >
                  {uploading ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-zinc-600" />
                  ) : (
                    <UploadCloud className="w-3.5 h-3.5 text-zinc-700" />
                  )}
                  <span>Replace</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition-transform hover:scale-105 cursor-pointer"
                  title="Remove media"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bottom badge when not hovered */}
              <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between pointer-events-none group-hover:opacity-0 transition-opacity">
                <span className="text-[10px] font-medium bg-black/70 backdrop-blur-xs text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  <span>{isVideo ? 'Video Saved' : 'Saved'}</span>
                </span>
                <span className="text-[9px] font-mono bg-black/70 backdrop-blur-xs text-zinc-300 px-1.5 py-0.5 rounded truncate max-w-[85px]">
                  {value.startsWith('data:') ? 'base64' : (value.split('/').pop() || 'media')}
                </span>
              </div>
            </div>
          ) : (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl h-32 w-full flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-zinc-800 bg-zinc-100'
                  : 'border-zinc-300 bg-zinc-50 hover:bg-white hover:border-zinc-400 shadow-2xs'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 mb-1.5 shadow-2xs">
                {uploading ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-zinc-800" />
                ) : isVideo ? (
                  <Film className="w-4 h-4 text-zinc-700" />
                ) : (
                  <UploadCloud className="w-4 h-4 text-zinc-700" />
                )}
              </div>
              <p className="font-semibold text-zinc-800 text-[11px] leading-tight">
                {uploading ? 'Uploading...' : isVideo ? 'Upload Video' : 'Upload Photo'}
              </p>
              <p className="text-[10px] text-zinc-400 mt-0.5">Click or drag & drop</p>
            </div>
          )}
        </div>
      ) : (
        /* STANDARD FULL-WIDTH MODE */
        <div>
          {value ? (
            <div className="relative border border-zinc-200 rounded-xl p-3 bg-zinc-50 flex items-center gap-4 transition-all hover:border-zinc-300">
              {/* Media Thumbnail or Video Player */}
              {isVideo ? (
                <div className="w-24 h-20 rounded-lg overflow-hidden bg-black shrink-0 border border-zinc-300/80 relative group shadow-xs flex items-center justify-center">
                  <video
                    src={value}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    onMouseOver={(e) => e.target.play().catch(() => {})}
                    onMouseOut={(e) => {
                      e.target.pause();
                      e.target.currentTime = 0;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30 pointer-events-none flex items-center justify-center">
                    <Film className="w-5 h-5 text-white/90" />
                  </div>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-zinc-100 shrink-0 border border-zinc-300/80 relative group shadow-xs flex items-center justify-center">
                  <img
                    src={value}
                    alt="Preview"
                    className={`w-full h-full ${
                      objectFit === 'contain' ? 'object-contain p-1.5 bg-white' : 'object-cover'
                    }`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/images/cropped-cropped-Logo-02-1-1-180x180.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <ImageIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}

              {/* Details & Actions */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium text-[11px] mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">
                    {isVideo ? 'Video Ready in Cloud DB' : 'Image Ready in Cloud DB'}
                  </span>
                </div>
                <p className="text-zinc-500 text-[11px] font-mono truncate max-w-full">
                  {value.startsWith('data:') ? 'Base64 Cloud DB Media' : value}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1 bg-white border border-zinc-300 hover:bg-zinc-100 text-zinc-800 rounded-md text-[11px] font-medium flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    {uploading ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-zinc-600" />
                    ) : (
                      <UploadCloud className="w-3 h-3 text-zinc-600" />
                    )}
                    <span>{uploading ? 'Uploading...' : isVideo ? 'Replace Video' : 'Replace Image'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onChange('')}
                    className="px-2 py-1 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-md text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <X className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Empty Upload Dropzone */
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                dragActive
                  ? 'border-zinc-800 bg-zinc-100/80 scale-[0.99]'
                  : 'border-zinc-300 bg-zinc-50 hover:bg-white hover:border-zinc-400 shadow-xs'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-zinc-200 flex items-center justify-center text-zinc-600">
                {uploading ? (
                  <RefreshCw className="w-5 h-5 animate-spin text-zinc-800" />
                ) : isVideo ? (
                  <Film className="w-5 h-5 text-zinc-700" />
                ) : (
                  <UploadCloud className="w-5 h-5 text-zinc-700" />
                )}
              </div>

              <div>
                <p className="font-semibold text-zinc-800 text-xs">
                  {uploading
                    ? isVideo
                      ? 'Uploading Video to Cloud Database...'
                      : 'Uploading Image to Cloud Database...'
                    : isVideo
                    ? 'Click to upload video file or drag & drop'
                    : 'Click to upload image file or drag & drop'}
                </p>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  {isVideo
                    ? 'MP4, WEBM, MOV up to 100MB • Persisted in Cloud DB'
                    : 'PNG, JPG, WEBP, SVG, MP4 up to 100MB • Persisted in Cloud DB'}
                </p>
                {recommendedDimensions && (
                  <p className="text-[10px] text-zinc-400 mt-0.5 font-medium">
                    Recommended: {recommendedDimensions}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Manual URL Input (Conditional) */}
      {showUrlInput && (
        <div className="pt-1 animate-fadeIn">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={
              isVideo
                ? 'Or paste video URL (/hero-video.mp4, https://...)'
                : 'Or paste external image URL (https://... or /assets/images/...)'
            }
            className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-lg text-xs text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-800 transition-colors shadow-xs"
          />
        </div>
      )}

      {helperText && <p className="text-[11px] text-zinc-500">{helperText}</p>}
    </div>
  );
}
