import { ArrowRight, Check, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import { CAREER_PATHWAYS, WHY_CHOOSE_FEATURES } from '../data/gisContent';

interface WhyChooseAndCareersProps {
  onNavigateToForm: () => void;
}

export default function WhyChooseAndCareers({ onNavigateToForm }: WhyChooseAndCareersProps) {
  const [primaryFeature, ...secondaryFeatures] = WHY_CHOOSE_FEATURES;

  return (
    <>
      {/* Section 5: Why Choose GIS College? (Asymmetric Bento Grid) */}
      <section id="kelebihan" className="bg-[#f8fafc] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-wide text-[#1e40af]">
              Mengapa GIS College?
            </p>
            <h2
              className="mt-2 font-bold tracking-tight text-[#0f2b5c]"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', textWrap: 'balance' }}
            >
              Ditubuhkan Sejak 2001 dengan Tumpuan 70% Latihan Amali
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#0f2b5c]/75">
              Lebih dua dekad pengalaman membuktikan kemahiran teknikal tidak boleh dipelajari di papan putih semata-mata. Pelajar kami membina keyakinan melalui latihan bengkel sebenar.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Marquee Card (70% Amali / 30% Teori) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col justify-between rounded-2xl border border-[#0f2b5c]/12 bg-[#0f2b5c] p-7 text-white lg:col-span-7 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-sm font-semibold text-[#f59e0b] tabular-nums">
                    {primaryFeature.index}. Kurikulum Teras
                  </span>
                  <span className="font-mono text-2xl font-bold text-[#f59e0b] tabular-nums">
                    {primaryFeature.metric}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">
                  {primaryFeature.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white/85">
                  {primaryFeature.description}
                </p>

                {/* Visual Split Bar: 70% Amali vs 30% Teori */}
                <div className="mt-6 rounded-xl bg-white/10 p-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-white/90">
                    <span>Latihan Amali Bengkel (70%)</span>
                    <span>Teori &amp; Keselamatan (30%)</span>
                  </div>
                  <div className="mt-2.5 flex h-3.5 w-full overflow-hidden rounded-full bg-white/15">
                    <div className="h-full w-[70%] bg-[#f59e0b]" />
                    <div className="h-full w-[30%] bg-[#60a5fa]" />
                  </div>
                </div>
              </div>

              <ul className="mt-6 space-y-2.5 border-t border-white/15 pt-5">
                {primaryFeature.highlights.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-sm text-white/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#f59e0b]" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Two Secondary Asymmetric Cards */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              {secondaryFeatures.map((feat, idx) => (
                <motion.div
                  key={feat.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: 0.08 * (idx + 1) }}
                  className="flex flex-1 flex-col justify-between rounded-2xl border border-[#0f2b5c]/12 bg-white p-6 sm:p-7"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-xs font-semibold text-[#1e40af] tabular-nums">
                        {feat.index}.
                      </span>
                      <span className="font-mono text-sm font-bold text-[#0f2b5c] tabular-nums">
                        {feat.metric}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-[#0f2b5c]">
                      {feat.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#0f2b5c]/75">
                      {feat.description}
                    </p>
                  </div>

                  <ul className="mt-5 space-y-2 border-t border-[#0f2b5c]/10 pt-4">
                    {feat.highlights.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm text-[#0f2b5c]/85">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1e40af]" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Career Opportunities */}
      <section id="kerjaya" className="border-t border-[#0f2b5c]/10 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-wide text-[#1e40af]">
                Prospek Masa Depan
              </p>
              <h2
                className="mt-2 font-bold tracking-tight text-[#0f2b5c]"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', textWrap: 'balance' }}
              >
                Peluang Kerjaya Luas dalam Industri Elektrik Negara
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#0f2b5c]/75">
                Tenaga mahir elektrik sentiasa diperlukan dalam sektor pembinaan, perkilangan, penyelenggaraan bangunan, hingga perniagaan kontraktor sendiri.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateToForm}
              className="inline-flex items-center gap-2 self-start rounded-lg bg-[#0f2b5c] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e40af] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e40af]"
            >
              <span>Tanya Laluan Kerjaya</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {CAREER_PATHWAYS.map((career, idx) => (
              <motion.div
                key={career.index}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="flex flex-col justify-between rounded-2xl border border-[#0f2b5c]/12 bg-[#f8fafc] p-6 sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#1e40af] tabular-nums">
                      Laluan {career.index}
                    </span>
                    <Wrench className="h-4 w-4 text-[#0f2b5c]/50" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-[#0f2b5c]">
                    {career.roleTitle}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-[#1e40af]">
                    {career.sector}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#0f2b5c]/80">
                    {career.description}
                  </p>

                  <div className="mt-5 space-y-2 border-t border-[#0f2b5c]/10 pt-4">
                    {career.coreSkills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 text-sm text-[#0f2b5c]/85">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" aria-hidden="true" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-6 rounded-xl border border-[#0f2b5c]/10 bg-white p-3.5 text-xs leading-relaxed text-[#0f2b5c]/80">
                  {career.progressionNote}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
