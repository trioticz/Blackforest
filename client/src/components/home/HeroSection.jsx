import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function HeroSection() {
  const videoRef = useRef(null);
  // Track mute state for UI only — actual mute is controlled via DOM ref
  const [isMuted, setIsMuted] = useState(true);
  const [loadVideo, setLoadVideo] = useState(false);

  // Defer heavy 12MB video loading until after initial paint & idle callback to maximize LCP & Mobile Speed
  useEffect(() => {
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 900));
    const handle = idleCallback(() => {
      const isSaveData = navigator.connection && navigator.connection.saveData;
      if (!isSaveData) {
        setLoadVideo(true);
      }
    });

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(handle);
      else clearTimeout(handle);
    };
  }, []);

  useEffect(() => {
    if (!loadVideo) return;
    const video = videoRef.current;
    if (!video) return;

    // Start muted so autoplay is allowed by browsers
    video.muted  = true;
    video.volume = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Browser blocked autoplay — still fine
      });
    }
  }, [loadVideo]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted  = false;
      video.volume = 1.0;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section className="relative w-full h-[85vh] sm:h-[90vh] md:h-[95vh] min-h-[520px] sm:min-h-[620px] max-h-[1050px] overflow-hidden bg-black flex items-center justify-center">

      {/* ── Background Poster & Video Layer ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Instant responsive WebP poster for <0.4s LCP on mobile and desktop */}
        <picture className="absolute inset-0 w-full h-full">
          <source media="(max-width: 768px)" srcSet="/hero-poster-mobile.webp" type="image/webp" />
          <source srcSet="/hero-poster.webp" type="image/webp" />
          <img
            src="/hero-poster.jpg"
            alt="Black Forest Luxury Travel"
            fetchpriority="high"
            decoding="async"
            width="1536"
            height="1024"
            className="w-full h-full object-cover object-center pointer-events-none select-none"
          />
        </picture>

        {loadVideo && (
          <video
            ref={videoRef}
            src="/hero-video-1080p60.mp4"
            poster="/hero-poster.webp"
            autoPlay
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center pointer-events-none select-none animate-fadeIn"
            style={{
              display: 'block',
              filter: 'contrast(1.08) saturate(1.15) brightness(1.04)',
            }}
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.18) 100%)',
          }}
        />
      </div>

      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/50 via-black/15 to-transparent pointer-events-none z-10" />

      {/* ── Sound Toggle Button (Shown once video is active) ── */}
      {loadVideo && (
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          title={isMuted ? 'Click to hear sound' : 'Click to mute'}
          className="absolute bottom-24 right-6 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-black/55 border border-white/35 text-white backdrop-blur-sm hover:bg-black/75 transition-all duration-200 cursor-pointer animate-fadeIn"
        >
          {isMuted
            ? <VolumeX className="w-5 h-5" />
            : <Volume2 className="w-5 h-5" />
          }
        </button>
      )}

      {/* ── Wave cutout ── */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg
          className="relative block w-full h-[60px] sm:h-[100px] md:h-[140px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
        >
          <path
            d="M0,220 L1440,220 L1440,95 C1360,165 1270,35 1160,55 C1030,80 940,185 820,130 C710,75 620,20 500,55 C380,95 295,190 170,135 C95,95 45,150 0,110 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
