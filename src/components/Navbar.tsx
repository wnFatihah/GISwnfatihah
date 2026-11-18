import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onNavigateToForm: () => void;
}

const NAV_LINKS = [
  { href: '#cabaran', label: 'Cabaran' },
  { href: '#solusi', label: 'Solusi' },
  { href: '#kerjaya', label: 'Kerjaya' },
  { href: '#kampus', label: 'Kampus' },
  { href: '#soalan', label: 'Soalan' },
];

export default function Navbar({ onNavigateToForm }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#0f2b5c]/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single clean wordmark */}
        <a
          href="#utama"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#0f2b5c] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1e40af]"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect width="28" height="28" rx="6" fill="#0f2b5c" />
            <path
              d="M15.5 6L9 15.2H14L12.5 22L19 12.8H14L15.5 6Z"
              fill="#f59e0b"
            />
          </svg>
          <span>GIS College</span>
        </a>

        {/* Zone 2: 5 concise single-line text nav links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#0f2b5c]/75"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#0f2b5c] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#1e40af] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1e40af]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary CTA action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onNavigateToForm}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#f59e0b] px-5 py-2.5 text-sm font-semibold text-[#0f2b5c] shadow-xs transition-colors duration-150 hover:bg-[#d97706] hover:text-white whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f2b5c]"
          >
            Daftar Minat
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#0f2b5c]/15 text-[#0f2b5c] md:hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e40af]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#0f2b5c]/10 bg-white px-4 py-4 md:hidden">
          <nav aria-label="Navigasi mudah alih" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#0f2b5c] hover:bg-[#f8fafc]"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onNavigateToForm();
              }}
              className="mt-2 w-full rounded-lg bg-[#f59e0b] px-4 py-3 text-sm font-semibold text-[#0f2b5c] hover:bg-[#d97706] hover:text-white cursor-pointer"
            >
              Daftar Minat
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
