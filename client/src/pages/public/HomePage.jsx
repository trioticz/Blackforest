import React, { Suspense, lazy } from 'react';
import HeroSection from '../../components/home/HeroSection';
import IntroSection from '../../components/home/IntroSection';

// Lazy-load below-the-fold components to minimize initial JS execution & TBT
const AboutMemoriesSection = lazy(() => import('../../components/home/AboutMemoriesSection'));
const InternationalToursSection = lazy(() => import('../../components/home/InternationalToursSection'));
const ValuePropsSection = lazy(() => import('../../components/home/ValuePropsSection'));
const StatsSection = lazy(() => import('../../components/home/StatsSection'));
const IndiaToursSection = lazy(() => import('../../components/home/IndiaToursSection'));
const TestimonialSlider = lazy(() => import('../../components/home/TestimonialSlider'));
const JournalSection = lazy(() => import('../../components/home/JournalSection'));

export default function HomePage() {
  return (
    <div className="animate-fadeIn bg-[#f7f9f8]">
      {/* 1. Hero (Immediate render for critical LCP/FCP) */}
      <HeroSection />

      {/* 2. Introduction / 6-Card Slider */}
      <IntroSection />

      {/* Below-the-fold components streamed in seamlessly with content-visibility optimization */}
      <Suspense fallback={null}>
        <div className="content-auto">
          <AboutMemoriesSection />
        </div>
        <div className="content-auto">
          <InternationalToursSection />
        </div>
        <div className="content-auto">
          <ValuePropsSection />
        </div>
        <div className="content-auto">
          <StatsSection />
        </div>
        <div className="content-auto">
          <IndiaToursSection />
        </div>
        <div className="content-auto">
          <TestimonialSlider />
        </div>
        <div className="content-auto">
          <JournalSection />
        </div>
      </Suspense>
    </div>
  );
}
