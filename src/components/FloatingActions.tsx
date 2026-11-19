import {
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Info,
  MessageCircle,
  XCircle,
} from 'lucide-react';
import { formatMoney, WHATSAPP_NUMBER } from '../data/catalog';
import type { Translations } from '../i18n/translations';
import type { ToastMessage } from '../types';

interface FloatingActionsProps {
  t: Translations['floating'];
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  toasts: ToastMessage[];
}

export function FloatingActions({
  t,
  cartCount,
  cartTotal,
  onOpenCart,
  toasts,
}: FloatingActionsProps) {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Subtle Toast Stack */}
      {toasts.length > 0 && (
        <div
          aria-live="polite"
          className="pointer-events-none fixed right-4 top-22 z-50 flex flex-col gap-2 sm:right-6"
        >
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="pointer-events-auto flex items-center gap-2.5 rounded-[3px] border border-white/15 bg-[#171514]/95 px-4 py-3 text-xs font-semibold text-[#f8f4ec] shadow-xl backdrop-blur-md"
            >
              {toast.tone === 'success' ? (
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-[#86c232]"
                  aria-hidden="true"
                />
              ) : toast.tone === 'error' ? (
                <XCircle
                  className="h-4 w-4 shrink-0 text-[#ff8f80]"
                  aria-hidden="true"
                />
              ) : (
                <Info
                  className="h-4 w-4 shrink-0 text-[#f5a623]"
                  aria-hidden="true"
                />
              )}
              <span>{toast.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Fixed Right-Side Back-to-Start Arrow */}
      <button
        type="button"
        onClick={handleScrollTop}
        aria-label={t.backToTopAria}
        title={t.backToTopAria}
        className="fixed bottom-20 right-4 z-30 flex flex-col items-center justify-center gap-0.5 rounded-[3px] border border-[#f5a623]/55 bg-[#171514]/95 px-2.5 py-2 text-[#f5a623] shadow-xl backdrop-blur-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#f5a623] hover:text-[#23190e] sm:right-6"
      >
        <ArrowUp className="h-4 w-4" aria-hidden="true" />
        <span className="text-[9px] font-extrabold uppercase leading-none tracking-[0.08em]">
          {t.backToTopLabel}
        </span>
      </button>

      {/* Compact Bottom Floating Controls (<= 15% mobile viewport height) */}
      <div className="pointer-events-none fixed inset-x-4 bottom-4 z-30 flex items-center justify-between gap-3 sm:inset-x-6">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.whatsappAria}
          className="pointer-events-auto inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-[3px] border border-white/15 bg-[#171514]/95 px-4 text-xs font-extrabold uppercase tracking-[0.06em] text-[#f8f4ec] shadow-lg backdrop-blur-sm transition-colors hover:border-[#f5a623] hover:text-[#f5a623]"
        >
          <MessageCircle className="h-4 w-4 text-[#86c232]" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>

        {cartCount > 0 && (
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={t.openCartAria}
            className="pointer-events-auto inline-flex h-11 shrink-0 items-center gap-3 whitespace-nowrap rounded-[3px] bg-[#f5a623] px-4 text-xs font-extrabold text-[#23190e] shadow-xl transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#ffc34f]"
          >
            <span className="tabular-nums">
              {cartCount}{' '}
              {cartCount === 1 ? t.itemSingular : t.itemPlural} ·{' '}
              {formatMoney(cartTotal)}
            </span>
            <span className="inline-flex items-center gap-1 uppercase tracking-[0.06em]">
              <span>{t.viewOrder}</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
    </>
  );
}
