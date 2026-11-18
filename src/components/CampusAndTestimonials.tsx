import { CheckCircle2, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  CAMPUS_TABS,
  TESTIMONIALS,
  type CampusTab,
} from '../data/gisContent';
import {
  HeroCinematicCampusScene,
  OshaSafetyScene,
  WorkshopAmaliScene,
} from './CinematicIllustrations';

type TestimonialFilter = 'semua' | 'ibu-bapa' | 'alumni';

export default function CampusAndTestimonials() {
  const [activeCampusId, setActiveCampusId] = useState<CampusTab['id']>('kampus');
  const [testimonialFilter, setTestimonialFilter] = useState<TestimonialFilter>('semua');

  const activeCampus =
    CAMPUS_TABS.find((t) => t.id === activeCampusId) ?? CAMPUS_TABS[0];

  const filteredTestimonials =
    testimonialFilter === 'semua'
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.category === testimonialFilter);

  return (
    <>
      {/* Section 7: Campus & Learning Environment (OSHA + Workshop) */}
      <section id="kampus" className="border-t border-[#0f2b5c]/10 bg-[#f8fafc] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-wide text-[#1e40af]">
                Kampus &amp; Piawaian OSHA
              </p>
              <h2
                className="mt-2 font-bold tracking-tight text-[#0f2b5c]"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', textWrap: 'balance' }}
              >
                Persekitaran Pembelajaran Selamat, Bersih &amp; Beretika
              </h2>
            </div>

            {/* Functional Segmented Tab Switcher */}
            <div
              role="tablist"
              aria-label="Paparan fasiliti kampus"
              className="inline-flex flex-wrap gap-1 rounded-xl border border-[#0f2b5c]/12 bg-white p-1"
            >
              {CAMPUS_TABS.map((tab) => {
                const isActive = tab.id === activeCampusId;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCampusId(tab.id)}
                    className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1e40af] sm:text-sm ${
                      isActive
                        ? 'bg-[#0f2b5c] text-white'
                        : 'text-[#0f2b5c]/75 hover:bg-[#f8fafc] hover:text-[#0f2b5c]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-8 rounded-2xl border border-[#0f2b5c]/12 bg-white p-6 lg:grid-cols-12 lg:p-8">
            <div className="lg:col-span-7">
              {activeCampusId === 'kampus' && <HeroCinematicCampusScene />}
              {activeCampusId === 'bengkel' && <WorkshopAmaliScene />}
              {activeCampusId === 'osha' && <OshaSafetyScene />}
            </div>

            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <div className="text-xs font-semibold tracking-wide text-[#1e40af]">
                  {activeCampus.label}
                </div>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#0f2b5c]">
                  {activeCampus.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#0f2b5c]/80 sm:text-base">
                  {activeCampus.description}
                </p>

                <ul className="mt-6 space-y-3 border-t border-[#0f2b5c]/10 pt-5">
                  {activeCampus.standards.map((std) => (
                    <li key={std} className="flex items-start gap-2.5 text-sm text-[#0f2b5c]/85">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#1e40af]"
                        aria-hidden="true"
                      />
                      <span>{std}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-xl border border-[#0f2b5c]/10 bg-[#f8fafc] p-4 text-xs leading-relaxed text-[#0f2b5c]/75">
                Ibu bapa dialu-alukan untuk membuat temujanji lawatan kampus bagi meninjau sendiri fasiliti bengkel dan berjumpa tenaga pengajar kami.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Parent Testimonials & Alumni Stories */}
      <section id="testimoni" className="border-t border-[#0f2b5c]/10 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-wide text-[#1e40af]">
                Suara Ibu Bapa &amp; Alumni
              </p>
              <h2
                className="mt-2 font-bold tracking-tight text-[#0f2b5c]"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', textWrap: 'balance' }}
              >
                Perubahan Nyata dalam Disiplin &amp; Kerjaya Anak
              </h2>
            </div>

            {/* Functional Filter Buttons */}
            <div
              role="group"
              aria-label="Tapis kisah testimoni"
              className="inline-flex gap-1 rounded-xl border border-[#0f2b5c]/12 bg-[#f8fafc] p-1"
            >
              {(
                [
                  { id: 'semua', label: 'Semua Kisah' },
                  { id: 'ibu-bapa', label: 'Ibu Bapa' },
                  { id: 'alumni', label: 'Alumni' },
                ] as const
              ).map((opt) => {
                const isActive = testimonialFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTestimonialFilter(opt.id)}
                    aria-pressed={isActive}
                    className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1e40af] sm:text-sm ${
                      isActive
                        ? 'bg-[#0f2b5c] text-white'
                        : 'text-[#0f2b5c]/75 hover:bg-white hover:text-[#0f2b5c]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredTestimonials.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="flex flex-col justify-between rounded-2xl border border-[#0f2b5c]/12 bg-[#f8fafc] p-6 sm:p-7"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-[#0f2b5c]">
                        {item.name}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-[#0f2b5c]/65">
                        <span>{item.role}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.location}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.cohort}</span>
                      </div>
                    </div>
                    <Quote className="h-5 w-5 shrink-0 text-[#f59e0b]" aria-hidden="true" />
                  </div>

                  <blockquote className="mt-5 text-sm leading-relaxed text-[#0f2b5c] sm:text-base">
                    “{item.quote}”
                  </blockquote>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[#0f2b5c]/10 pt-4 sm:grid-cols-2">
                  <div>
                    <div className="text-xs font-semibold text-[#0f2b5c]/60">
                      Situasi Awal
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[#0f2b5c]/80">
                      {item.before}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#1e40af]">
                      Hasil Selepas Menyertai
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[#0f2b5c]/85">
                      {item.outcome}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
