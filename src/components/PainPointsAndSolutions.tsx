import { ArrowDownRight, Briefcase, Coins, ShieldCheck, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { PAIN_POINTS, type PainPointItem } from '../data/gisContent';

const ICON_MAP: Record<PainPointItem['id'], typeof Coins> = {
  kewangan: Coins,
  kerjaya: Briefcase,
  keselamatan: ShieldCheck,
  sahsiah: UserCheck,
};

export default function PainPointsAndSolutions() {
  const [selectedId, setSelectedId] = useState<PainPointItem['id']>('kewangan');

  const handleSelectConcern = (id: PainPointItem['id']) => {
    setSelectedId(id);
  };

  return (
    <>
      {/* Section 3: Parent Pain Points */}
      <section id="cabaran" className="bg-[#f8fafc] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-wide text-[#1e40af]">
              Empati Untuk Ibu Bapa
            </p>
            <h2
              className="mt-2 font-bold tracking-tight text-[#0f2b5c]"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', textWrap: 'balance' }}
            >
              Kami Memahami 4 Kerisauan Utama Setiap Ibu Bapa
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#0f2b5c]/75">
              Memilih institusi untuk anak lepasan sekolah menengah bukan keputusan ringan. Pilih salah satu perkara di bawah untuk melihat bagaimana kami menanganinya secara praktikal.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PAIN_POINTS.map((item, idx) => {
              const Icon = ICON_MAP[item.id];
              const isSelected = selectedId === item.id;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectConcern(item.id)}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  aria-pressed={isSelected}
                  className={`group flex flex-col justify-between rounded-2xl border p-6 text-left transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e40af] ${
                    isSelected
                      ? 'border-[#1e40af] bg-white shadow-md'
                      : 'border-[#0f2b5c]/12 bg-white hover:border-[#1e40af]/45'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-[#1e40af] tabular-nums">
                        {item.index}.
                      </span>
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                          isSelected
                            ? 'bg-[#0f2b5c] text-[#f59e0b]'
                            : 'bg-[#f8fafc] text-[#0f2b5c] group-hover:bg-[#eff6ff]'
                        }`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-[#0f2b5c]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#0f2b5c]/75">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#0f2b5c]/10 pt-4 text-xs font-semibold text-[#1e40af]">
                    <span>{isSelected ? 'Sedang Dipaparkan di Solusi' : 'Lihat Solusi Kami'}</span>
                    <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: Our Solutions (Problem vs Practical GIS Solution Comparison) */}
      <section id="solusi" className="border-y border-[#0f2b5c]/10 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-wide text-[#1e40af]">
                Perbandingan Telus
              </p>
              <h2
                className="mt-2 font-bold tracking-tight text-[#0f2b5c]"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', textWrap: 'balance' }}
              >
                Setiap Kerisauan Dijawab dengan Tindakan Nyata
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#0f2b5c]/70">
              Pendekatan kami dibina khusus untuk memberi keyakinan penuh kepada ibu bapa dan membekalkan kemahiran elektrik tulen kepada anak anda.
            </p>
          </div>

          <div className="mt-10 divide-y divide-[#0f2b5c]/10 rounded-2xl border border-[#0f2b5c]/12 bg-[#f8fafc] overflow-hidden">
            {/* Table Column Header (Desktop) */}
            <div className="hidden bg-[#0f2b5c] px-6 py-4 text-xs font-semibold tracking-wide text-white/90 md:grid md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">Situasi &amp; Suara Hati Ibu Bapa</div>
              <div className="md:col-span-7">Solusi Praktikal GIS College</div>
            </div>

            {PAIN_POINTS.map((item) => {
              const isHighlighted = item.id === selectedId;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`grid grid-cols-1 gap-6 px-6 py-7 transition-colors duration-150 md:grid-cols-12 md:gap-8 cursor-pointer ${
                    isHighlighted ? 'bg-white' : 'bg-[#f8fafc] hover:bg-white/80'
                  }`}
                >
                  {/* Problem / Parent Voice */}
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#0f2b5c]/60">
                      <span className="font-mono text-[#1e40af] tabular-nums">{item.index}.</span>
                      <span>{item.title}</span>
                    </div>
                    <blockquote className="mt-2.5 text-base font-medium leading-relaxed text-[#0f2b5c]/85">
                      {item.parentVoice}
                    </blockquote>
                  </div>

                  {/* Practical Solution */}
                  <div className="md:col-span-7">
                    <h3 className="text-lg font-bold text-[#0f2b5c]">
                      {item.solutionTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#0f2b5c]/80 sm:text-base">
                      {item.solutionDetail}
                    </p>
                    <p className="mt-3 text-xs font-semibold text-[#1e40af]">
                      {item.keyAssurance}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
