import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import {
  HERO_MESSAGES,
  INSTITUTIONAL_METRICS,
  PARALLEL_HIGHLIGHTS,
  type ParallelHighlight,
} from '../data/gisContent';
import { HeroCinematicCampusScene } from './CinematicIllustrations';

interface HeroSectionProps {
  onNavigateToForm: () => void;
}

export default function HeroSection({ onNavigateToForm }: HeroSectionProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [activeHighlightId, setActiveHighlightId] =
    useState<ParallelHighlight['id']>('sahsiah');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % HERO_MESSAGES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const currentMessage = HERO_MESSAGES[messageIndex];
  const activeHighlight =
    PARALLEL_HIGHLIGHTS.find((item) => item.id === activeHighlightId) ??
    PARALLEL_HIGHLIGHTS[0];

  return (
    <section
      id="utama"
      className="relative overflow-hidden border-b border-[#0f2b5c]/10 bg-white architectural-grid"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Parallel Style 2-Column Wide Screen Hero */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Persuasive Emotional Message */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              {/* Clean Unboxed Institutional Trust Line (Zero Pills) */}
              <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-[#1e40af]">
                <span>GIS College Malaysia</span>
                <span aria-hidden="true">·</span>
                <span>Sejak 2001</span>
                <span aria-hidden="true">·</span>
                <span>Kursus Elektrik (18+ Tahun)</span>
              </div>

              {/* Dynamic Rotating Headline */}
              <div className="min-h-[180px] sm:min-h-[168px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={messageIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h1
                      className="font-bold tracking-tight text-[#0f2b5c] leading-[1.12]"
                      style={{
                        fontSize: 'clamp(2.15rem, 3.8vw, 3.35rem)',
                        textWrap: 'balance',
                      }}
                    >
                      {currentMessage.headline}
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-[#0f2b5c]/80 sm:text-lg">
                      {currentMessage.subtext}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slide Indicators (Interactive, Clean) */}
              <div className="mt-6 flex items-center gap-2" role="tablist" aria-label="Mesej utama">
                {HERO_MESSAGES.map((msg, idx) => (
                  <button
                    key={msg.headline}
                    type="button"
                    role="tab"
                    aria-selected={idx === messageIndex}
                    aria-label={`Paparan mesej ${idx + 1}`}
                    onClick={() => setMessageIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e40af] ${
                      idx === messageIndex
                        ? 'w-8 bg-[#1e40af]'
                        : 'w-2.5 bg-[#0f2b5c]/20 hover:bg-[#0f2b5c]/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Primary CTA + Secondary Anchor */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={onNavigateToForm}
                className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#f59e0b] px-7 py-4 text-base font-bold text-[#0f2b5c] shadow-sm transition-colors duration-150 hover:bg-[#d97706] hover:text-white whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f2b5c]"
              >
                <span>Daftar Minat Sekarang</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href="#solusi"
                className="inline-flex items-center justify-center rounded-lg border border-[#0f2b5c]/20 bg-white px-6 py-4 text-sm font-semibold text-[#0f2b5c] transition-colors duration-150 hover:border-[#1e40af] hover:bg-[#f8fafc] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e40af]"
              >
                Lihat Solusi Ibu Bapa
              </a>
            </div>
          </div>

          {/* Right Column: Parallel Positive Environment Highlight Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#0f2b5c]/12 bg-[#f8fafc] p-5 sm:p-6 lg:col-span-6">
            <div>
              <HeroCinematicCampusScene />
            </div>

            <div className="mt-5">
              {/* Functional Segmented Selector */}
              <div
                className="grid grid-cols-3 gap-1.5 rounded-xl border border-[#0f2b5c]/10 bg-white p-1"
                role="tablist"
                aria-label="Sorotan persekitaran positif GIS College"
              >
                {PARALLEL_HIGHLIGHTS.map((item) => {
                  const isActive = item.id === activeHighlightId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveHighlightId(item.id)}
                      className={`rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap truncate cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1e40af] sm:text-sm ${
                        isActive
                          ? 'bg-[#0f2b5c] text-white'
                          : 'text-[#0f2b5c]/70 hover:bg-[#f8fafc] hover:text-[#0f2b5c]'
                      }`}
                    >
                      {item.tabLabel}
                    </button>
                  );
                })}
              </div>

              {/* Active Highlight Content */}
              <div className="mt-4 flex flex-col justify-between gap-4 rounded-xl border border-[#0f2b5c]/10 bg-white p-4 sm:flex-row sm:items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0f2b5c]">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1e40af]" aria-hidden="true" />
                    <span>{activeHighlight.title}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#0f2b5c]/75">
                    {activeHighlight.description}
                  </p>
                </div>
                <div className="shrink-0 border-t border-[#0f2b5c]/10 pt-3 sm:border-t-0 sm:border-l sm:pl-5 sm:pt-0 sm:text-right">
                  <div className="font-mono text-xl font-bold text-[#1e40af] tabular-nums">
                    {activeHighlight.metricValue}
                  </div>
                  <div className="text-xs text-[#0f2b5c]/65">
                    {activeHighlight.metricLabel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Institutional Proof Strip Below Split */}
        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-[#0f2b5c]/10 pt-8 lg:grid-cols-4">
          {INSTITUTIONAL_METRICS.map((metric) => (
            <div key={metric.value} className="space-y-1">
              <div className="font-display text-2xl font-extrabold tracking-tight text-[#0f2b5c] tabular-nums sm:text-3xl">
                {metric.value}
              </div>
              <div className="text-sm text-[#0f2b5c]/70">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
