import { Eye, EyeOff, Lock, ShieldCheck, X } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';

export const CRM_SESSION_KEY = 'gis_college_crm_auth';
const CRM_ADMIN_PASSCODE = 'gisadmin2026';

export function isCrmSessionAuthenticated(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    return window.sessionStorage.getItem(CRM_SESSION_KEY) === 'authenticated';
  } catch {
    return false;
  }
}

export function verifyAndStartCrmSession(passcode: string): boolean {
  if (passcode.trim() !== CRM_ADMIN_PASSCODE) {
    return false;
  }
  if (typeof window !== 'undefined') {
    try {
      window.sessionStorage.setItem(CRM_SESSION_KEY, 'authenticated');
    } catch {
      // Fallback gracefully if sessionStorage is restricted
    }
  }
  return true;
}

export function clearCrmSession(): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.sessionStorage.removeItem(CRM_SESSION_KEY);
  } catch {
    // Ignore storage errors
  }
}

interface AdminLoginCardProps {
  onSuccess: () => void;
  onCancel?: () => void;
  isModal?: boolean;
}

export function AdminLoginCard({
  onSuccess,
  onCancel,
  isModal = false,
}: AdminLoginCardProps) {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!passcode.trim()) {
      setErrorMsg('Sila masukkan kod laluan pentadbir.');
      return;
    }

    if (!verifyAndStartCrmSession(passcode)) {
      setErrorMsg('Kod laluan tidak sah. Sila cuba semula.');
      return;
    }

    setPasscode('');
    onSuccess();
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-[#0f2b5c]/15 bg-white p-6 shadow-xl sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0f2b5c] text-[#f59e0b]">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0f2b5c]">
              Akses CRM Pentadbir
            </h2>
            <p className="text-xs text-[#0f2b5c]/65">
              GIS College Malaysia · Portal Kemasukan
            </p>
          </div>
        </div>

        {isModal && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            aria-label="Tutup modal log masuk"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#0f2b5c]/60 transition-colors hover:bg-[#f8fafc] hover:text-[#0f2b5c] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-[#0f2b5c]/80">
        Sila masukkan kod laluan pentadbir untuk membuka rekod prospek ibu bapa, status susulan, dan eksport CSV.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="crm-admin-passcode"
            className="block text-sm font-semibold text-[#0f2b5c]"
          >
            Kod Laluan Pentadbir
          </label>
          <div className="relative mt-1.5">
            <input
              ref={inputRef}
              id="crm-admin-passcode"
              type={showPasscode ? 'text' : 'password'}
              autoComplete="current-password"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                if (errorMsg) {
                  setErrorMsg(null);
                }
              }}
              placeholder="Masukkan kod laluan..."
              className="w-full rounded-lg border border-[#0f2b5c]/20 bg-[#f8fafc] py-3 pr-11 pl-4 font-mono text-sm text-[#0f2b5c] placeholder:font-sans placeholder:text-[#0f2b5c]/40 focus:border-[#1e40af] focus:bg-white focus:outline-2 focus:outline-[#1e40af]/20"
            />
            <button
              type="button"
              onClick={() => setShowPasscode((prev) => !prev)}
              aria-label={showPasscode ? 'Sembunyikan kod laluan' : 'Tunjuk kod laluan'}
              className="absolute top-1/2 right-2.5 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#0f2b5c]/55 hover:bg-[#0f2b5c]/5 hover:text-[#0f2b5c] cursor-pointer"
            >
              {showPasscode ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-800"
          >
            {errorMsg}
          </div>
        )}

        <div className="flex items-center gap-2 rounded-lg border border-[#0f2b5c]/10 bg-[#f8fafc] px-3 py-2 text-xs text-[#0f2b5c]/70">
          <ShieldCheck className="h-4 w-4 shrink-0 text-[#1e40af]" aria-hidden="true" />
          <span>Sesi pengesahan disimpan sementara sehingga pelayar ditutup.</span>
        </div>

        <div className="flex flex-col-reverse gap-2.5 pt-1 sm:flex-row sm:justify-end">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center justify-center rounded-lg border border-[#0f2b5c]/20 bg-white px-4 py-2.5 text-sm font-semibold text-[#0f2b5c] hover:bg-[#f8fafc] cursor-pointer"
            >
              {isModal ? 'Batal' : 'Kembali ke Laman Utama'}
            </button>
          )}
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f59e0b] px-5 py-2.5 text-sm font-bold text-[#0f2b5c] transition-colors hover:bg-[#d97706] hover:text-white cursor-pointer"
          >
            <Lock className="h-4 w-4" aria-hidden="true" />
            <span>Buka Portal CRM</span>
          </button>
        </div>
      </form>
    </div>
  );
}

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export default function AdminLoginModal({
  isOpen,
  onClose,
  onAuthenticated,
}: AdminLoginModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Log Masuk CRM Pentadbir"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f2b5c]/55 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <AdminLoginCard
        isModal
        onCancel={onClose}
        onSuccess={onAuthenticated}
      />
    </div>
  );
}
