export const LEADS_STORAGE_KEY = 'gis_college_leads';

export const LEAD_STATUS_OPTIONS = [
  'Baru',
  'Sedang Dihubungi',
  'Berminat',
  'Berdaftar',
  'Batal',
] as const;

export type LeadStatus = (typeof LEAD_STATUS_OPTIONS)[number];

export interface LeadRecord {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  status: LeadStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

function isValidLeadStatus(value: unknown): value is LeadStatus {
  return (
    typeof value === 'string' &&
    (LEAD_STATUS_OPTIONS as readonly string[]).includes(value)
  );
}

export function loadLeadsFromStorage(): LeadRecord[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'))
      .map((item) => {
        const createdAt =
          typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString();
        return {
          id:
            typeof item.id === 'string' && item.id.trim()
              ? item.id
              : `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          fullName: typeof item.fullName === 'string' ? item.fullName : '',
          phone: typeof item.phone === 'string' ? item.phone : '',
          email: typeof item.email === 'string' ? item.email : '',
          status: isValidLeadStatus(item.status) ? item.status : 'Baru',
          notes: typeof item.notes === 'string' ? item.notes : '',
          createdAt,
          updatedAt: typeof item.updatedAt === 'string' ? item.updatedAt : createdAt,
        };
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch {
    return [];
  }
}

export function saveLeadsToStorage(leads: LeadRecord[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
}

export function appendLeadToStorage(input: {
  fullName: string;
  phone: string;
  email: string;
  notes?: string;
}): LeadRecord {
  const now = new Date().toISOString();
  const newLead: LeadRecord = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    fullName: input.fullName.trim(),
    phone: input.phone.trim(),
    email: input.email.trim(),
    status: 'Baru',
    notes: input.notes?.trim() ?? '',
    createdAt: now,
    updatedAt: now,
  };

  const existing = loadLeadsFromStorage();
  const updated = [newLead, ...existing];
  saveLeadsToStorage(updated);
  return newLead;
}

export function formatPhoneForWhatsApp(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, '');
  if (digits.startsWith('60')) {
    return digits;
  }
  if (digits.startsWith('0')) {
    return `6${digits}`;
  }
  return `60${digits}`;
}

export function formatDateTimeMY(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }
  return new Intl.DateTimeFormat('ms-MY', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function escapeCsvCell(value: string): string {
  const sanitized = value.replace(/"/g, '""');
  return `"${sanitized}"`;
}

export function buildLeadsCsv(leads: LeadRecord[]): string {
  const headers = [
    'ID Prospek',
    'Nama Penuh',
    'No. Telefon (WhatsApp)',
    'Emel',
    'Status',
    'Nota Susulan',
    'Tarikh Daftar',
    'Kemas Kini Terakhir',
  ];

  const rows = leads.map((lead) =>
    [
      lead.id,
      lead.fullName,
      lead.phone,
      lead.email,
      lead.status,
      lead.notes,
      formatDateTimeMY(lead.createdAt),
      formatDateTimeMY(lead.updatedAt),
    ]
      .map(escapeCsvCell)
      .join(','),
  );

  // Include UTF-8 BOM for proper Malay character rendering in Excel
  return '\uFEFF' + [headers.map(escapeCsvCell).join(','), ...rows].join('\r\n');
}
