import {
  ArrowLeft,
  Check,
  Download,
  LogOut,
  MessageCircle,
  Plus,
  Save,
  Search,
  Trash2,
  Users,
} from 'lucide-react';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  appendLeadToStorage,
  buildLeadsCsv,
  formatDateTimeMY,
  formatPhoneForWhatsApp,
  LEAD_STATUS_OPTIONS,
  LEADS_STORAGE_KEY,
  normalizeLeadList,
  saveLeadsToStorage,
  type LeadRecord,
  type LeadStatus,
} from '../utils/leadsStorage';
import {
  AdminLoginCard,
  clearCrmSession,
  isCrmSessionAuthenticated,
} from './AdminLoginModal';

interface AdminCrmDashboardProps {
  onBackToLanding: () => void;
  onGoToRegistrationForm: () => void;
}

const STATUS_STYLE_MAP: Record<LeadStatus, string> = {
  Baru: 'border-[#1e40af]/25 bg-[#eff6ff] text-[#1e40af]',
  'Sedang Dihubungi': 'border-amber-600/25 bg-amber-50 text-amber-800',
  Berminat: 'border-sky-700/25 bg-sky-50 text-sky-800',
  Berdaftar: 'border-emerald-700/25 bg-emerald-50 text-emerald-800',
  Batal: 'border-red-700/20 bg-red-50 text-red-800',
};

export default function AdminCrmDashboard({
  onBackToLanding,
  onGoToRegistrationForm,
}: AdminCrmDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    isCrmSessionAuthenticated(),
  );
  const readLeadsFromLocalStorage = (): LeadRecord[] => {
    if (typeof window === 'undefined') {
      return [];
    }
    try {
      const raw = window.localStorage.getItem('gis_college_leads');
      if (!raw) {
        return [];
      }
      return normalizeLeadList(JSON.parse(raw));
    } catch {
      return [];
    }
  };

  const [leads, setLeads] = useState<LeadRecord[]>(() => readLeadsFromLocalStorage());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Semua' | LeadStatus>('Semua');

  // Draft notes mapped by lead ID so admins can edit and save directly
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [savedNoticeId, setSavedNoticeId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Optional inline manual entry form for phone/walk-in parent inquiries
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newNote, setNewNote] = useState('');
  const [addError, setAddError] = useState<string | null>(null);

  // Keep synced with localStorage on mount, auth changes, cross-tab storage, and custom events
  useEffect(() => {
    const syncStorage = () => {
      setLeads(readLeadsFromLocalStorage());
    };

    syncStorage();

    const handleStorageEvent = (e: StorageEvent) => {
      if (!e.key || e.key === LEADS_STORAGE_KEY) {
        syncStorage();
      }
    };

    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener('gis-leads-updated', syncStorage);
    window.addEventListener('focus', syncStorage);
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('gis-leads-updated', syncStorage);
      window.removeEventListener('focus', syncStorage);
    };
  }, [isAuthenticated]);

  const filteredLeads = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesStatus = statusFilter === 'Semua' || lead.status === statusFilter;
      if (!matchesStatus) {
        return false;
      }
      if (!q) {
        return true;
      }
      return (
        lead.fullName.toLowerCase().includes(q) ||
        lead.phone.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.notes.toLowerCase().includes(q)
      );
    });
  }, [leads, searchQuery, statusFilter]);

  const statusCounts = useMemo(() => {
    const counts: Record<LeadStatus, number> = {
      Baru: 0,
      'Sedang Dihubungi': 0,
      Berminat: 0,
      Berdaftar: 0,
      Batal: 0,
    };
    for (const lead of leads) {
      counts[lead.status] += 1;
    }
    return counts;
  }, [leads]);

  const handleStatusChange = (leadId: string, nextStatus: LeadStatus) => {
    const now = new Date().toISOString();
    const updated = leads.map((lead) =>
      lead.id === leadId ? { ...lead, status: nextStatus, updatedAt: now } : lead,
    );
    setLeads(updated);
    saveLeadsToStorage(updated);
  };

  const getNoteValue = (lead: LeadRecord): string => {
    return noteDrafts[lead.id] !== undefined ? noteDrafts[lead.id] : lead.notes;
  };

  const handleNoteDraftChange = (leadId: string, value: string) => {
    setNoteDrafts((prev) => ({ ...prev, [leadId]: value }));
  };

  const handleSaveNote = (leadId: string) => {
    const targetLead = leads.find((l) => l.id === leadId);
    if (!targetLead) {
      return;
    }
    const nextNotes = (noteDrafts[leadId] ?? targetLead.notes).trim();
    const now = new Date().toISOString();
    const updated = leads.map((lead) =>
      lead.id === leadId ? { ...lead, notes: nextNotes, updatedAt: now } : lead,
    );
    setLeads(updated);
    saveLeadsToStorage(updated);
    setNoteDrafts((prev) => {
      const copy = { ...prev };
      delete copy[leadId];
      return copy;
    });
    setSavedNoticeId(leadId);
    window.setTimeout(() => {
      setSavedNoticeId((curr) => (curr === leadId ? null : curr));
    }, 2000);
  };

  const handleDeleteLead = (leadId: string) => {
    const updated = leads.filter((lead) => lead.id !== leadId);
    setLeads(updated);
    saveLeadsToStorage(updated);
    setConfirmDeleteId(null);
  };

  const handleAddManualLead = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddError(null);

    if (newName.trim().length < 2) {
      setAddError('Sila masukkan nama penuh yang sah.');
      return;
    }
    const cleanedPhone = newPhone.replace(/[\s()-]/g, '');
    if (!/^(\+?6?01\d{8,9}|0\d{8,10})$/.test(cleanedPhone)) {
      setAddError('Sila masukkan no. telefon Malaysia yang sah.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.trim())) {
      setAddError('Sila masukkan alamat emel yang sah.');
      return;
    }

    appendLeadToStorage({
      fullName: newName,
      phone: newPhone,
      email: newEmail,
      notes: newNote,
    });
    setLeads(readLeadsFromLocalStorage());
    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setNewNote('');
    setShowAddForm(false);
  };

  const handleExportCsv = () => {
    const exportList = filteredLeads.length > 0 ? filteredLeads : leads;
    if (exportList.length === 0) {
      return;
    }
    const csvContent = buildLeadsCsv(exportList);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStamp = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `prospek_gis_college_${dateStamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    clearCrmSession();
    setIsAuthenticated(false);
    onBackToLanding();
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 py-12 architectural-grid">
        <AdminLoginCard
          onSuccess={() => {
            setLeads(readLeadsFromLocalStorage());
            setIsAuthenticated(true);
          }}
          onCancel={onBackToLanding}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f2b5c]">
      {/* CRM Top Bar Contract: Breadcrumb Left — Primary Actions Right */}
      <header className="sticky top-0 z-40 border-b border-[#0f2b5c]/12 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onBackToLanding}
              className="inline-flex items-center gap-2 rounded-lg border border-[#0f2b5c]/15 bg-[#f8fafc] px-3 py-2 text-xs font-semibold text-[#0f2b5c] transition-colors hover:bg-[#eff6ff] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1e40af] sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Laman Utama</span>
            </button>
            <div className="hidden items-center gap-2 text-sm text-[#0f2b5c]/65 truncate md:flex">
              <span className="font-bold text-[#0f2b5c]">GIS College</span>
              <span aria-hidden="true">/</span>
              <span className="truncate">CRM Kemasukan Prospek</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowAddForm((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#0f2b5c]/20 bg-white px-3 py-2 text-xs font-semibold text-[#0f2b5c] transition-colors hover:bg-[#f8fafc] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1e40af] sm:px-3.5 sm:text-sm"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              <span>Tambah Prospek</span>
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-2 rounded-lg bg-[#f59e0b] px-3.5 py-2 text-xs font-bold text-[#0f2b5c] transition-colors hover:bg-[#d97706] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0f2b5c] sm:px-4 sm:text-sm"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Eksport CSV</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              title="Log keluar sesi pentadbir"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#0f2b5c]/15 bg-[#f8fafc] px-3 py-2 text-xs font-semibold text-[#0f2b5c]/80 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1e40af] sm:text-sm"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Log Keluar</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0f2b5c] sm:text-3xl">
              Papan Pemuka CRM Prospek Ibu Bapa
            </h1>
            <p className="mt-1.5 text-sm text-[#0f2b5c]/75">
              Urus pendaftaran Kursus Elektrik, kemas kini status panggilan, simpan nota susulan, dan eksport rekod CSV.
            </p>
          </div>
          <div className="text-xs font-medium text-[#0f2b5c]/65">
            Sumber Data: Penyimpanan Tempatan (<span className="font-mono">{LEADS_STORAGE_KEY}</span>)
          </div>
        </div>

        {/* Summary Strip (Real Counts, Tabular Numerals, Single-Elevation Border) */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-xl border border-[#0f2b5c]/12 bg-white p-4">
            <div className="text-xs font-medium text-[#0f2b5c]/65">Jumlah Prospek</div>
            <div className="mt-1 font-mono text-2xl font-bold text-[#0f2b5c] tabular-nums">
              {leads.length}
            </div>
          </div>
          {LEAD_STATUS_OPTIONS.map((status) => (
            <div key={status} className="rounded-xl border border-[#0f2b5c]/12 bg-white p-4">
              <div className="text-xs font-medium text-[#0f2b5c]/65 truncate">{status}</div>
              <div className="mt-1 font-mono text-2xl font-bold text-[#1e40af] tabular-nums">
                {statusCounts[status]}
              </div>
            </div>
          ))}
        </div>

        {/* Optional Inline Add Manual Lead Panel */}
        {showAddForm && (
          <form
            onSubmit={handleAddManualLead}
            noValidate
            className="mt-6 rounded-2xl border border-[#1e40af]/30 bg-white p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-base font-bold text-[#0f2b5c]">
                Rekod Prospek Baharu Secara Manual (Panggilan / Walk-in)
              </h2>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-xs font-semibold text-[#0f2b5c]/65 hover:text-[#0f2b5c] cursor-pointer"
              >
                Tutup
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label htmlFor="crm-add-name" className="block text-xs font-semibold text-[#0f2b5c]">
                  Nama Penuh
                </label>
                <input
                  id="crm-add-name"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nama ibu bapa / pelajar"
                  className="mt-1 w-full rounded-lg border border-[#0f2b5c]/20 px-3 py-2 text-sm text-[#0f2b5c] focus:border-[#1e40af] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="crm-add-phone" className="block text-xs font-semibold text-[#0f2b5c]">
                  No. Telefon
                </label>
                <input
                  id="crm-add-phone"
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="012-3456789"
                  className="mt-1 w-full rounded-lg border border-[#0f2b5c]/20 px-3 py-2 font-mono text-sm text-[#0f2b5c] focus:border-[#1e40af] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="crm-add-email" className="block text-xs font-semibold text-[#0f2b5c]">
                  Emel
                </label>
                <input
                  id="crm-add-email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="emel@contoh.com"
                  className="mt-1 w-full rounded-lg border border-[#0f2b5c]/20 px-3 py-2 text-sm text-[#0f2b5c] focus:border-[#1e40af] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="crm-add-note" className="block text-xs font-semibold text-[#0f2b5c]">
                  Nota Awal (Pilihan)
                </label>
                <input
                  id="crm-add-note"
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Cth: Tanya tentang asrama"
                  className="mt-1 w-full rounded-lg border border-[#0f2b5c]/20 px-3 py-2 text-sm text-[#0f2b5c] focus:border-[#1e40af] focus:outline-none"
                />
              </div>
            </div>

            {addError && (
              <p className="mt-3 text-xs font-semibold text-red-700" role="alert">
                {addError}
              </p>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="submit"
                className="rounded-lg bg-[#0f2b5c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e40af] cursor-pointer"
              >
                Simpan Prospek
              </button>
            </div>
          </form>
        )}

        {/* Filter & Search Toolbar */}
        <div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border border-[#0f2b5c]/12 bg-white p-4 lg:flex-row lg:items-center">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#0f2b5c]/45"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, no. telefon, emel atau nota..."
              aria-label="Cari prospek"
              className="w-full rounded-lg border border-[#0f2b5c]/18 bg-[#f8fafc] py-2.5 pr-4 pl-10 text-sm text-[#0f2b5c] placeholder:text-[#0f2b5c]/45 focus:border-[#1e40af] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Functional Segmented Status Filter */}
          <div
            role="group"
            aria-label="Tapis mengikut status prospek"
            className="flex flex-wrap items-center gap-1 rounded-xl border border-[#0f2b5c]/10 bg-[#f8fafc] p-1"
          >
            {(['Semua', ...LEAD_STATUS_OPTIONS] as const).map((status) => {
              const isActive = statusFilter === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  aria-pressed={isActive}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1e40af] ${
                    isActive
                      ? 'bg-[#0f2b5c] text-white'
                      : 'text-[#0f2b5c]/75 hover:bg-white hover:text-[#0f2b5c]'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State or Populated Data Views */}
        {leads.length === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-[#0f2b5c]/12 bg-white px-6 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eff6ff] text-[#1e40af]">
              <Users className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-[#0f2b5c]">
              Belum Ada Rekod Prospek Disimpan
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#0f2b5c]/70">
              Setiap pendaftaran ibu bapa atau pelajar melalui borang utama laman web akan direkodkan di sini secara automatik. Anda juga boleh menambah prospek panggilan secara manual.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onGoToRegistrationForm}
                className="rounded-lg bg-[#f59e0b] px-5 py-2.5 text-sm font-bold text-[#0f2b5c] hover:bg-[#d97706] hover:text-white cursor-pointer"
              >
                Pergi ke Borang Pendaftaran
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="rounded-lg border border-[#0f2b5c]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#0f2b5c] hover:bg-[#f8fafc] cursor-pointer"
              >
                Tambah Prospek Manual
              </button>
            </div>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-[#0f2b5c]/12 bg-white px-6 py-12 text-center">
            <p className="text-base font-semibold text-[#0f2b5c]">
              Tiada prospek sepadan dengan carian atau penapis anda.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('Semua');
              }}
              className="mt-3 text-sm font-semibold text-[#1e40af] hover:underline cursor-pointer"
            >
              Set Semula Carian &amp; Penapis
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="mt-6 hidden overflow-hidden rounded-2xl border border-[#0f2b5c]/12 bg-white lg:block">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#0f2b5c]/12 bg-[#0f2b5c] text-xs font-semibold text-white">
                      <th className="px-5 py-3.5">Prospek &amp; Tarikh</th>
                      <th className="px-5 py-3.5">Maklumat Perhubungan</th>
                      <th className="px-5 py-3.5">Status Prospek</th>
                      <th className="px-5 py-3.5">Nota Susulan (Follow-Up)</th>
                      <th className="px-5 py-3.5 text-right">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0f2b5c]/10">
                    {filteredLeads.map((lead) => {
                      const currentDraft = getNoteValue(lead);
                      const isDirty =
                        noteDrafts[lead.id] !== undefined &&
                        noteDrafts[lead.id] !== lead.notes;
                      const waLink = `https://wa.me/${formatPhoneForWhatsApp(
                        lead.phone,
                      )}?text=${encodeURIComponent(
                        `Salam sejahtera ${lead.fullName}, saya pegawai kemasukan dari GIS College Malaysia mengenai pertanyaan Kursus Elektrik.`,
                      )}`;

                      return (
                        <tr
                          key={lead.id}
                          className="align-top transition-colors hover:bg-[#f8fafc]"
                        >
                          <td className="px-5 py-4">
                            <div className="font-bold text-[#0f2b5c]">
                              {lead.fullName}
                            </div>
                            <div className="mt-1 font-mono text-xs text-[#0f2b5c]/60 tabular-nums">
                              {formatDateTimeMY(lead.submittedAt)}
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <div className="font-mono text-sm font-semibold text-[#0f2b5c] tabular-nums">
                              {lead.phone}
                            </div>
                            <div className="mt-0.5 text-xs text-[#0f2b5c]/75">
                              {lead.email}
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <select
                              aria-label={`Status untuk ${lead.fullName}`}
                              value={lead.status}
                              onChange={(e) =>
                                handleStatusChange(lead.id, e.target.value as LeadStatus)
                              }
                              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold cursor-pointer focus:outline-2 focus:outline-[#1e40af] ${
                                STATUS_STYLE_MAP[lead.status]
                              }`}
                            >
                              {LEAD_STATUS_OPTIONS.map((opt) => (
                                <option key={opt} value={opt} className="bg-white text-[#0f2b5c]">
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td className="px-5 py-4 min-w-[280px]">
                            <div className="flex items-start gap-2">
                              <textarea
                                rows={2}
                                aria-label={`Nota susulan untuk ${lead.fullName}`}
                                value={currentDraft}
                                onChange={(e) =>
                                  handleNoteDraftChange(lead.id, e.target.value)
                                }
                                placeholder="Catat hasil panggilan atau janji temu..."
                                className="w-full rounded-lg border border-[#0f2b5c]/18 bg-white px-3 py-2 text-xs leading-relaxed text-[#0f2b5c] placeholder:text-[#0f2b5c]/40 focus:border-[#1e40af] focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => handleSaveNote(lead.id)}
                                disabled={!isDirty && savedNoticeId !== lead.id}
                                title="Simpan Nota"
                                className={`inline-flex h-9 shrink-0 items-center gap-1 rounded-lg px-3 text-xs font-semibold transition-colors cursor-pointer ${
                                  savedNoticeId === lead.id
                                    ? 'bg-emerald-700 text-white'
                                    : isDirty
                                      ? 'bg-[#1e40af] text-white hover:bg-[#0f2b5c]'
                                      : 'border border-[#0f2b5c]/15 bg-[#f8fafc] text-[#0f2b5c]/45 cursor-default'
                                }`}
                              >
                                {savedNoticeId === lead.id ? (
                                  <>
                                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                    <span>Disimpan</span>
                                  </>
                                ) : (
                                  <>
                                    <Save className="h-3.5 w-3.5" aria-hidden="true" />
                                    <span>Simpan</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </td>

                          <td className="px-5 py-4 text-right">
                            <div className="inline-flex items-center justify-end gap-2">
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-lg border border-[#0f2b5c]/15 bg-white px-3 py-1.5 text-xs font-semibold text-[#0f2b5c] hover:border-[#1e40af] hover:text-[#1e40af] whitespace-nowrap"
                              >
                                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>WhatsApp</span>
                              </a>

                              {confirmDeleteId === lead.id ? (
                                <div className="inline-flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteLead(lead.id)}
                                    className="rounded-lg bg-red-700 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-red-800 cursor-pointer"
                                  >
                                    Sahkan
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="rounded-lg border border-[#0f2b5c]/20 px-2 py-1.5 text-xs text-[#0f2b5c] cursor-pointer"
                                  >
                                    Batal
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(lead.id)}
                                  aria-label={`Padam rekod ${lead.fullName}`}
                                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#0f2b5c]/12 text-[#0f2b5c]/55 hover:border-red-300 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile & Tablet Card View */}
            <div className="mt-6 space-y-4 lg:hidden">
              {filteredLeads.map((lead) => {
                const currentDraft = getNoteValue(lead);
                const isDirty =
                  noteDrafts[lead.id] !== undefined && noteDrafts[lead.id] !== lead.notes;
                const waLink = `https://wa.me/${formatPhoneForWhatsApp(
                  lead.phone,
                )}?text=${encodeURIComponent(
                  `Salam sejahtera ${lead.fullName}, saya pegawai kemasukan dari GIS College Malaysia mengenai pertanyaan Kursus Elektrik.`,
                )}`;

                return (
                  <article
                    key={lead.id}
                    className="rounded-2xl border border-[#0f2b5c]/12 bg-white p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-bold text-[#0f2b5c]">
                          {lead.fullName}
                        </h3>
                        <div className="mt-0.5 font-mono text-xs text-[#0f2b5c]/60 tabular-nums">
                          {formatDateTimeMY(lead.submittedAt)}
                        </div>
                      </div>
                      <select
                        aria-label={`Status untuk ${lead.fullName}`}
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead.id, e.target.value as LeadStatus)
                        }
                        className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold ${
                          STATUS_STYLE_MAP[lead.status]
                        }`}
                      >
                        {LEAD_STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-white text-[#0f2b5c]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-3 space-y-1 border-t border-[#0f2b5c]/10 pt-3 text-sm">
                      <div className="font-mono font-semibold text-[#0f2b5c] tabular-nums">
                        {lead.phone}
                      </div>
                      <div className="text-xs text-[#0f2b5c]/75">{lead.email}</div>
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor={`mobile-note-${lead.id}`}
                        className="block text-xs font-semibold text-[#0f2b5c]/70"
                      >
                        Nota Susulan
                      </label>
                      <textarea
                        id={`mobile-note-${lead.id}`}
                        rows={2}
                        value={currentDraft}
                        onChange={(e) => handleNoteDraftChange(lead.id, e.target.value)}
                        placeholder="Catat hasil panggilan atau janji temu..."
                        className="mt-1 w-full rounded-lg border border-[#0f2b5c]/18 bg-[#f8fafc] px-3 py-2 text-xs text-[#0f2b5c] focus:border-[#1e40af] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSaveNote(lead.id)}
                          disabled={!isDirty && savedNoticeId !== lead.id}
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${
                            savedNoticeId === lead.id
                              ? 'bg-emerald-700 text-white'
                              : isDirty
                                ? 'bg-[#1e40af] text-white'
                                : 'border border-[#0f2b5c]/15 bg-[#f8fafc] text-[#0f2b5c]/45'
                          }`}
                        >
                          <Save className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{savedNoticeId === lead.id ? 'Disimpan' : 'Simpan Nota'}</span>
                        </button>

                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#f59e0b] px-3 py-2 text-xs font-bold text-[#0f2b5c]"
                        >
                          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>WhatsApp</span>
                        </a>
                      </div>

                      {confirmDeleteId === lead.id ? (
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleDeleteLead(lead.id)}
                            className="rounded-lg bg-red-700 px-2.5 py-1.5 text-xs font-semibold text-white"
                          >
                            Sahkan Padam
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="rounded-lg border border-[#0f2b5c]/20 px-2 py-1.5 text-xs text-[#0f2b5c]"
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(lead.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#0f2b5c]/12 px-2.5 py-1.5 text-xs text-[#0f2b5c]/60 hover:text-red-700"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Padam</span>
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
