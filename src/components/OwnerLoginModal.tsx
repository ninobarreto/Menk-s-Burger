import { useEffect, useState, type FormEvent } from 'react';
import { AlertCircle, Eye, EyeOff, Lock, X } from 'lucide-react';
import type { Translations } from '../i18n/translations';

interface OwnerLoginModalProps {
  open: boolean;
  t: Translations['ownerAuth'];
  onClose: () => void;
  onAuthenticate: (username: string, password: string) => boolean;
}

export function OwnerLoginModal({
  open,
  t,
  onClose,
  onAuthenticate,
}: OwnerLoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setUsername('');
    setPassword('');
    setShowPassword(false);
    setError(null);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ok = onAuthenticate(username.trim(), password);
    if (!ok) {
      setError(t.invalidCredentials);
      return;
    }
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/75 backdrop-blur-xs"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="owner-login-title"
        className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-[4px] bg-[#f6f1e8] text-[#211d1a] shadow-2xl"
      >
        <div className="flex items-center justify-between bg-[#171514] px-6 py-4 text-[#f8f4ec]">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5a623]/15 text-[#f5a623]">
              <Lock className="h-4 w-4" aria-hidden="true" />
            </span>
            <h2
              id="owner-login-title"
              className="font-display text-2xl uppercase leading-none tracking-wide"
            >
              {t.modalTitle}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeAria}
            className="flex h-9 w-9 items-center justify-center rounded-[3px] text-[#c1b9ae] transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <p className="text-xs leading-relaxed text-[#5c544c]">
            {t.modalSubtitle}
          </p>

          <div>
            <label
              htmlFor="ownerUsername"
              className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
            >
              {t.usernameLabel}
            </label>
            <input
              id="ownerUsername"
              type="text"
              required
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError(null);
              }}
              placeholder={t.usernamePlaceholder}
              className="h-10 w-full rounded-[2px] border border-[#d2c9bc] bg-white px-3 text-sm text-[#211d1a]"
            />
          </div>

          <div>
            <label
              htmlFor="ownerPassword"
              className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
            >
              {t.passwordLabel}
            </label>
            <div className="relative">
              <input
                id="ownerPassword"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder={t.passwordPlaceholder}
                className="h-10 w-full rounded-[2px] border border-[#d2c9bc] bg-white pl-3 pr-10 text-sm text-[#211d1a]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? t.hidePassword : t.showPassword}
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-[2px] text-[#6a6258] hover:text-[#211d1a]"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-[2px] border border-[#a83b2f] bg-[#a83b2f]/10 p-2.5 text-xs font-semibold text-[#7a2016]"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-[3px] border border-[#cfc6ba] px-4 text-xs font-extrabold uppercase tracking-[0.07em] text-[#3a332d] transition-colors hover:bg-[#e9e2d7]"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="h-10 rounded-[3px] bg-[#f5a623] px-5 text-xs font-extrabold uppercase tracking-[0.07em] text-[#23190e] transition-colors hover:bg-[#ffc34f]"
            >
              {t.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
