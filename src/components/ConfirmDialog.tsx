import { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  closeAria?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Cancelar',
  closeAria = 'Fechar confirmação',
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-desc"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
    >
      <div className="w-full max-w-md rounded-[4px] border border-white/15 bg-[#211d1a] p-6 text-[#f8f4ec] shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                destructive
                  ? 'bg-[#a83b2f]/25 text-[#ff8f80]'
                  : 'bg-[#f5a623]/20 text-[#f5a623]'
              }`}
            >
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3
              id="confirm-dialog-title"
              className="font-display text-2xl uppercase leading-none text-[#f8f4ec]"
            >
              {title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label={closeAria}
            className="flex h-8 w-8 items-center justify-center rounded-[2px] text-[#c1b9ae] hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <p
          id="confirm-dialog-desc"
          className="mt-4 text-sm leading-relaxed text-[#cfc6ba]"
        >
          {description}
        </p>

        <div className="mt-6 flex flex-wrap justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 rounded-[3px] border border-white/25 px-4 text-xs font-extrabold uppercase tracking-[0.06em] text-[#f8f4ec] transition-colors hover:border-white/50 hover:bg-white/5"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`h-10 rounded-[3px] px-4 text-xs font-extrabold uppercase tracking-[0.06em] text-white transition-colors ${
              destructive
                ? 'bg-[#a83b2f] hover:bg-[#be4335]'
                : 'bg-[#638b25] hover:bg-[#6f9c2a]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
