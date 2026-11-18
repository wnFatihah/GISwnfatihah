import {
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Loader2,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  FAQ_ITEMS,
  WHATSAPP_DIRECT_URL,
  WHATSAPP_DISPLAY,
} from '../data/gisContent';
import {
  LEADS_STORAGE_KEY,
  normalizeLeadList,
  type LeadRecord,
} from '../utils/leadsStorage';

interface LeadFormState {
  fullName: string;
  phone: string;
  email: string;
}

interface SubmissionSuccess {
  fullName: string;
  phone: string;
  email: string;
  whatsappUrl: string;
  countdown: number;
}

export default function FaqAndLeadForm() {
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);

  // Strictly 3 inputs as specified in PRD 4.1
  const [formData, setFormData] = useState<LeadFormState>({
    fullName: '',
    phone: '',
    email: '',
  });
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<SubmissionSuccess | null>(null);

  const whatsappAnchorRef = useRef<HTMLAnchorElement | null>(null);

  // 1-second automatic WhatsApp trigger upon successful submission
  useEffect(() => {
    if (!successData) {
      return;
    }

    const countdownInterval = window.setInterval(() => {
      setSuccessData((prev) =>
        prev && prev.countdown > 0 ? { ...prev, countdown: prev.countdown - 1 } : prev,
      );
    }, 1000);

    const redirectTimer = window.setTimeout(() => {
      if (whatsappAnchorRef.current) {
        whatsappAnchorRef.current.click();
      }
    }, 1000);

    return () => {
      window.clearInterval(countdownInterval);
      window.clearTimeout(redirectTimer);
    };
  }, [successData?.whatsappUrl]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldError(null);

    const fullName = formData.fullName.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();

    if (fullName.length < 2) {
      setFieldError('Sila masukkan nama penuh anda atau nama anak.');
      return;
    }

    const cleanedPhone = phone.replace(/[\s()-]/g, '');
    if (!/^(\+?6?01\d{8,9}|0\d{8,10})$/.test(cleanedPhone)) {
      setFieldError('Sila masukkan nombor telefon Malaysia yang sah (contoh: 016-9865648).');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldError('Sila masukkan alamat emel yang sah.');
      return;
    }

    setIsSubmitting(true);

    const fallbackMsg = [
      'Salam sejahtera GIS College Malaysia,',
      'Saya berminat untuk mengetahui maklumat lanjut mengenai Kursus Elektrik (Pengambilan 2026).',
      '',
      `Nama Penuh: ${fullName}`,
      `No. Telefon: ${phone}`,
      `Emel: ${email}`,
    ].join('\n');

    let waUrl = `https://wa.me/60169865648?text=${encodeURIComponent(fallbackMsg)}`;

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phone, email }),
      });

      if (response.ok) {
        const result = (await response.json()) as {
          success?: boolean;
          whatsappUrl?: string;
        };
        if (result.whatsappUrl) {
          waUrl = result.whatsappUrl;
        }
      } else if (response.status === 400) {
        const result = (await response.json()) as { error?: string };
        setFieldError(result.error ?? 'Sila semak semula maklumat borang anda.');
        setIsSubmitting(false);
        return;
      }
    } catch {
      // Proceed cleanly with localStorage CRM storage and WhatsApp flow if offline/static
    }

    // Persist lead automatically to localStorage under "gis_college_leads"
    const newLead: LeadRecord = {
      id: 'lead-' + Date.now(),
      fullName: fullName,
      phone: phone,
      email: email,
      submittedAt: new Date().toISOString(),
      status: 'Baru',
      notes: '',
    };

    try {
      const existingRaw = window.localStorage.getItem(LEADS_STORAGE_KEY);
      const existingLeads = existingRaw
        ? normalizeLeadList(JSON.parse(existingRaw))
        : [];
      const updatedLeads = [newLead, ...existingLeads];
      window.localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
      window.dispatchEvent(new Event('gis-leads-updated'));
    } catch {
      window.localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([newLead]));
      window.dispatchEvent(new Event('gis-leads-updated'));
    }

    setSuccessData({
      fullName,
      phone,
      email,
      whatsappUrl: waUrl,
      countdown: 1,
    });
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setSuccessData(null);
    setFieldError(null);
    setFormData({ fullName: '', phone: '', email: '' });
  };

  return (
    <>
      {/* Section 9: Frequently Asked Questions (FAQ) */}
      <section id="soalan" className="border-t border-[#0f2b5c]/10 bg-[#f8fafc] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-wide text-[#1e40af]">
              Soalan Lazim Ibu Bapa
            </p>
            <h2
              className="mt-2 font-bold tracking-tight text-[#0f2b5c]"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', textWrap: 'balance' }}
            >
              Jawapan Terus Tentang Syarat, Yuran &amp; Keselamatan
            </h2>
          </div>

          <div className="mt-10 divide-y divide-[#0f2b5c]/10 rounded-2xl border border-[#0f2b5c]/12 bg-white">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div key={item.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#f8fafc]/70 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1e40af]"
                  >
                    <span className="text-base font-bold text-[#0f2b5c]">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#1e40af] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm leading-relaxed text-[#0f2b5c]/80 sm:text-base">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 10: Final Conversion & Lead Capture Form */}
      <section
        id="daftar"
        className="border-t border-[#0f2b5c]/10 bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-8 rounded-2xl border border-[#0f2b5c]/12 bg-[#f8fafc] p-6 sm:p-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Info Column */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <p className="text-sm font-semibold tracking-wide text-[#1e40af]">
                  Langkah Pertama Masa Depan Anak
                </p>
                <h2
                  className="mt-2 font-bold tracking-tight text-[#0f2b5c]"
                  style={{ fontSize: 'clamp(1.65rem, 2.8vw, 2.25rem)', textWrap: 'balance' }}
                >
                  Dapatkan Info Yuran, Silibus &amp; Temujanji Kampus
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#0f2b5c]/80 sm:text-base">
                  Isi 3 maklumat ringkas di sebelah. Pegawai kemasukan kami akan menyambungkan anda terus ke talian WhatsApp rasmi GIS College ({WHATSAPP_DISPLAY}) untuk khidmat nasihat mesra ibu bapa.
                </p>
              </div>

              <div className="mt-8 space-y-4 border-t border-[#0f2b5c]/10 pt-6">
                <div className="flex items-start gap-3 text-sm text-[#0f2b5c]/85">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#1e40af]" aria-hidden="true" />
                  <span>
                    Maklumat anda direkodkan secara sulit untuk tujuan konsultasi kemasukan Kursus Elektrik GIS College sahaja.
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[#0f2b5c]/10 bg-white px-4 py-3 text-sm">
                  <span className="font-medium text-[#0f2b5c]/75">WhatsApp Rasmi</span>
                  <a
                    href={WHATSAPP_DIRECT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-bold text-[#1e40af] hover:underline tabular-nums"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Form / Success Column */}
            <div className="rounded-2xl border border-[#0f2b5c]/12 bg-white p-6 sm:p-8 lg:col-span-7">
              {successData ? (
                <div className="space-y-5" role="status" aria-live="polite">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" aria-hidden="true" />
                    <div>
                      <h3 className="text-xl font-bold text-[#0f2b5c]">
                        Permohonan Maklumat Berjaya Direkodkan
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#0f2b5c]/80">
                        Terima kasih, <strong className="text-[#0f2b5c]">{successData.fullName}</strong>. Data anda telah disimpan dan mesej WhatsApp kepada pegawai kami (<span className="font-mono tabular-nums">{WHATSAPP_DISPLAY}</span>) sedang dilancarkan.
                      </p>
                    </div>
                  </div>

                  {/* Hidden anchor for automatic 1-second WhatsApp redirect without window.open */}
                  <a
                    ref={whatsappAnchorRef}
                    href={successData.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sr-only"
                  >
                    Buka WhatsApp
                  </a>

                  <div className="rounded-xl border border-[#0f2b5c]/10 bg-[#f8fafc] p-4 text-sm text-[#0f2b5c]/80">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <div>
                        <span className="text-xs text-[#0f2b5c]/60">No. Telefon:</span>
                        <div className="font-mono font-semibold text-[#0f2b5c] tabular-nums">
                          {successData.phone}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-[#0f2b5c]/60">Emel:</span>
                        <div className="font-medium text-[#0f2b5c] truncate">
                          {successData.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Manual Fallback Link */}
                  <div className="space-y-3 pt-1">
                    <p className="text-xs text-[#0f2b5c]/70">
                      Jika tetingkap WhatsApp tidak terbuka secara automatik, sila tekan butang di bawah:
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <a
                        href={successData.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#f59e0b] px-5 py-3.5 text-sm font-bold text-[#0f2b5c] transition-colors hover:bg-[#d97706] hover:text-white whitespace-nowrap"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        <span>Buka WhatsApp Sekarang</span>
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center justify-center rounded-lg border border-[#0f2b5c]/20 px-4 py-3.5 text-sm font-semibold text-[#0f2b5c] hover:bg-[#f8fafc] whitespace-nowrap cursor-pointer"
                      >
                        Hantar Pertanyaan Lain
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label
                      htmlFor="lead-full-name"
                      className="block text-sm font-semibold text-[#0f2b5c]"
                    >
                      Nama Penuh <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="lead-full-name"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Contoh: Ahmad Razif bin Abdullah"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                      }
                      className="mt-1.5 w-full rounded-lg border border-[#0f2b5c]/20 bg-white px-4 py-3 text-base text-[#0f2b5c] placeholder:text-[#0f2b5c]/40 focus:border-[#1e40af] focus:outline-2 focus:outline-[#1e40af]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="block text-sm font-semibold text-[#0f2b5c]"
                    >
                      No. Telefon (WhatsApp) <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="Contoh: 012-3456789"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      className="mt-1.5 w-full rounded-lg border border-[#0f2b5c]/20 bg-white px-4 py-3 font-mono text-base text-[#0f2b5c] placeholder:font-sans placeholder:text-[#0f2b5c]/40 focus:border-[#1e40af] focus:outline-2 focus:outline-[#1e40af]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lead-email"
                      className="block text-sm font-semibold text-[#0f2b5c]"
                    >
                      Emel <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="Contoh: ibu.bapa@emel.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="mt-1.5 w-full rounded-lg border border-[#0f2b5c]/20 bg-white px-4 py-3 text-base text-[#0f2b5c] placeholder:text-[#0f2b5c]/40 focus:border-[#1e40af] focus:outline-2 focus:outline-[#1e40af]/20"
                    />
                  </div>

                  {fieldError && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
                    >
                      {fieldError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#f59e0b] px-6 py-4 text-base font-bold text-[#0f2b5c] shadow-sm transition-colors hover:bg-[#d97706] hover:text-white disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f2b5c]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                        <span>Sedang Memproses...</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle className="h-5 w-5" aria-hidden="true" />
                        <span>Hantar &amp; Terus ke WhatsApp</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-[#0f2b5c]/65">
                    Tiada paksaan pendaftaran. Konsultasi percuma bersama pegawai GIS College.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
