import { WHATSAPP_DIRECT_URL, WHATSAPP_DISPLAY } from '../data/gisContent';

interface FooterProps {
  onOpenCrm: () => void;
}

export default function Footer({ onOpenCrm }: FooterProps) {
  return (
    <footer className="bg-[#0f2b5c] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 border-b border-white/15 pb-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
              <svg
                width="26"
                height="26"
                viewBox="0 0 28 28"
                fill="none"
                aria-hidden="true"
              >
                <rect width="28" height="28" rx="6" fill="#ffffff" fillOpacity="0.12" />
                <path d="M15.5 6L9 15.2H14L12.5 22L19 12.8H14L15.5 6Z" fill="#f59e0b" />
              </svg>
              <span>GIS College Malaysia</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
              Institusi latihan kemahiran teknikal sejak tahun 2001. Komited melahirkan tenaga mahir elektrik berdisiplin, beretika, dan bersedia untuk industri.
            </p>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-white">Pautan Pantas</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              <li>
                <a href="#cabaran" className="hover:text-white transition-colors">
                  Kerisauan Ibu Bapa
                </a>
              </li>
              <li>
                <a href="#solusi" className="hover:text-white transition-colors">
                  Solusi GIS College
                </a>
              </li>
              <li>
                <a href="#kerjaya" className="hover:text-white transition-colors">
                  Peluang Kerjaya
                </a>
              </li>
              <li>
                <a href="#kampus" className="hover:text-white transition-colors">
                  Kampus &amp; Keselamatan OSHA
                </a>
              </li>
              <li>
                <a href="#soalan" className="hover:text-white transition-colors">
                  Soalan Lazim (FAQ)
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCrm}
                  className="text-left text-[#f59e0b] hover:underline cursor-pointer"
                >
                  Portal CRM Pentadbir
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-white">Perhubungan Rasmi</h3>
            <div className="mt-3 space-y-2 text-sm text-white/75">
              <div>Talian Rasmi / WhatsApp Kemasukan:</div>
              <a
                href={WHATSAPP_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-mono text-base font-bold text-[#f59e0b] hover:underline tabular-nums"
              >
                {WHATSAPP_DISPLAY}
              </a>
              <p className="pt-1 text-xs text-white/65">
                Isnin – Jumaat · 9:00 Pagi – 5:30 Petang
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-xs text-white/65 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} GIS College Malaysia. Hak Cipta Terpelihara.</p>
          <p>Program Kemahiran Teknikal &amp; Kursus Elektrik · Sejak 2001</p>
        </div>
      </div>
    </footer>
  );
}
