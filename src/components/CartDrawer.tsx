import { useEffect, useState } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  ExternalLink,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import {
  BRAND_IMAGES,
  buildWhatsAppMessage,
  formatMoney,
  formatPhoneMask,
  isValidEmail,
  SEED_CATALOG_MAP,
} from '../data/catalog';
import {
  getLocalizedProduct,
  type Translations,
} from '../i18n/translations';
import type {
  CartItem,
  CustomerInfo,
  Locale,
  OrderRecord,
  Product,
} from '../types';

interface CartDrawerProps {
  open: boolean;
  locale: Locale;
  t: Translations['cart'];
  cart: CartItem[];
  catalog: Product[];
  cartTotal: number;
  customer: CustomerInfo;
  onClose: () => void;
  onChangeQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onUpdateCustomer: (patch: Partial<CustomerInfo>) => void;
  onRecordOrder: (order: OrderRecord) => void;
  onNotify: (text: string, tone?: 'success' | 'info' | 'error') => void;
}

export function CartDrawer({
  open,
  locale,
  t,
  cart,
  catalog,
  cartTotal,
  customer,
  onClose,
  onChangeQty,
  onRemoveItem,
  onClearCart,
  onUpdateCustomer,
  onRecordOrder,
  onNotify,
}: CartDrawerProps) {
  const [pixAgree, setPixAgree] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [orderPreview, setOrderPreview] = useState<{
    protocol: string;
    message: string;
    url: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    setValidationError(null);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (cart.length === 0) {
      setOrderPreview(null);
      setPixAgree(false);
    }
  }, [cart.length]);

  if (!open) return null;

  const isTable = customer.mode === 'mesa';
  const isDelivery = customer.mode === 'delivery';

  const handleGenerateOrder = () => {
    if (cart.length === 0) {
      setValidationError(t.errEmptyCart);
      return;
    }

    if (isTable) {
      if (!customer.tableNumber.trim()) {
        setValidationError(t.errTable);
        return;
      }
      if (!customer.customerName.trim()) {
        setValidationError(t.errTableName);
        return;
      }
    } else {
      const phoneDigits = customer.customerPhone.replace(/\D/g, '');
      if (
        !customer.customerName.trim() ||
        phoneDigits.length < 10 ||
        !isValidEmail(customer.customerEmail)
      ) {
        setValidationError(t.errContact);
        return;
      }

      if (
        isDelivery &&
        (!customer.street.trim() ||
          !customer.number.trim() ||
          !customer.neighborhood.trim())
      ) {
        setValidationError(t.errAddress);
        return;
      }

      if (!pixAgree) {
        setValidationError(t.errPix);
        return;
      }
    }

    setValidationError(null);
    const payload = buildWhatsAppMessage(
      cart,
      catalog,
      customer,
      locale,
      (prod) => getLocalizedProduct(prod, locale, SEED_CATALOG_MAP).name,
      orderPreview?.protocol
    );
    onRecordOrder(payload.record);
    setOrderPreview({
      protocol: payload.protocol,
      message: payload.message,
      url: payload.url,
    });
    if (isTable) {
      onNotify(
        t.toastTableSaved(customer.tableNumber.trim(), payload.protocol),
        'success'
      );
    } else {
      onNotify(t.toastReady(payload.protocol), 'success');
    }
  };

  const handleCopySummary = async () => {
    if (!orderPreview) return;
    try {
      await navigator.clipboard.writeText(orderPreview.message);
      setCopied(true);
      onNotify(t.toastCopied, 'success');
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      onNotify(t.toastCopyManual, 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/70 backdrop-blur-xs"
      />

      {/* Drawer Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className="relative z-10 flex h-full w-full max-w-[460px] flex-col bg-[#f6f1e8] text-[#211d1a] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e2dad0] bg-[#171514] px-6 py-4 text-[#f8f4ec]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#f5a623]" aria-hidden="true" />
            <h2
              id="drawer-title"
              className="font-display text-2xl uppercase leading-none tracking-wide"
            >
              {t.title}
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

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#211d1a]/10 text-[#211d1a]">
                <ShoppingBag className="h-7 w-7" aria-hidden="true" />
              </div>
              <strong className="font-display mt-4 text-2xl uppercase text-[#211d1a]">
                {t.emptyTitle}
              </strong>
              <p className="mt-1 text-sm text-[#6a6258]">{t.emptyBody}</p>
              <a
                href="#cardapio"
                onClick={onClose}
                className="mt-6 inline-flex h-11 items-center rounded-[3px] bg-[#211d1a] px-5 text-xs font-extrabold uppercase tracking-[0.07em] text-white hover:bg-[#332d28]"
              >
                {t.viewMenu}
              </a>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Itemized Cart List */}
              <ul className="divide-y divide-[#e2dad0] rounded-[3px] border border-[#e2dad0] bg-white/80">
                {cart.map((entry) => {
                  const prod = catalog.find((p) => p.id === entry.id);
                  if (!prod || !prod.price) return null;
                  const localized = getLocalizedProduct(
                    prod,
                    locale,
                    SEED_CATALOG_MAP
                  );
                  return (
                    <li key={entry.id} className="flex items-center gap-3.5 p-3.5">
                      <img
                        src={prod.image || BRAND_IMAGES.logo}
                        alt={localized.name}
                        referrerPolicy="no-referrer"
                        className="h-14 w-14 shrink-0 rounded-[2px] bg-[#28231f] object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display truncate text-lg uppercase leading-tight text-[#211d1a]">
                          {localized.name}
                        </h3>
                        <p className="tabular-nums text-xs text-[#6e655b]">
                          {formatMoney(prod.price)} {t.each} ·{' '}
                          <strong className="text-[#211d1a]">
                            {formatMoney(prod.price * entry.qty)}
                          </strong>
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex h-7 items-center rounded-[2px] border border-[#d7d0c5] bg-[#f7f3eb]">
                            <button
                              type="button"
                              onClick={() => onChangeQty(entry.id, -1)}
                              aria-label={`- ${localized.name}`}
                              className="flex h-full w-7 items-center justify-center text-[#211d1a] hover:bg-[#e8e0d4]"
                            >
                              <Minus className="h-3 w-3" aria-hidden="true" />
                            </button>
                            <span className="tabular-nums min-w-[24px] text-center text-xs font-extrabold">
                              {entry.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => onChangeQty(entry.id, 1)}
                              aria-label={`+ ${localized.name}`}
                              className="flex h-full w-7 items-center justify-center text-[#211d1a] hover:bg-[#e8e0d4]"
                            >
                              <Plus className="h-3 w-3" aria-hidden="true" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(entry.id)}
                            aria-label={`${t.remove} ${localized.name}`}
                            className="inline-flex h-7 items-center gap-1 rounded-[2px] px-2 text-[11px] font-bold text-[#a83b2f] hover:bg-[#a83b2f]/10"
                          >
                            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>{t.remove}</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Totals Summary */}
              <div className="flex items-center justify-between rounded-[3px] bg-[#211d1a] px-4 py-3.5 text-[#f8f4ec]">
                <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#cfc6ba]">
                  {t.totalLabel}
                </span>
                <strong className="font-display tabular-nums text-2xl leading-none text-[#f5a623]">
                  {formatMoney(cartTotal)}
                </strong>
              </div>

              {/* Table / Pickup / Delivery Selector */}
              <div>
                <h3 className="font-display text-xl uppercase tracking-wide text-[#211d1a]">
                  {t.deliveryQuestion}
                </h3>

                <div className="mt-2 grid grid-cols-3 gap-1.5 rounded-[3px] bg-[#e9e2d7] p-1">
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateCustomer({ mode: 'mesa' });
                      setValidationError(null);
                    }}
                    className={`h-10 rounded-[2px] px-1.5 text-[11px] font-extrabold uppercase tracking-[0.05em] transition-colors ${
                      isTable
                        ? 'bg-[#211d1a] text-[#f5a623] shadow-xs'
                        : 'text-[#5b534b] hover:text-[#211d1a]'
                    }`}
                  >
                    {t.table}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateCustomer({ mode: 'retirada' });
                      setValidationError(null);
                    }}
                    className={`h-10 rounded-[2px] px-1.5 text-[11px] font-extrabold uppercase tracking-[0.05em] transition-colors ${
                      customer.mode === 'retirada'
                        ? 'bg-[#211d1a] text-[#f5a623] shadow-xs'
                        : 'text-[#5b534b] hover:text-[#211d1a]'
                    }`}
                  >
                    {t.pickup}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateCustomer({ mode: 'delivery' });
                      setValidationError(null);
                    }}
                    className={`h-10 rounded-[2px] px-1.5 text-[11px] font-extrabold uppercase tracking-[0.05em] transition-colors ${
                      isDelivery
                        ? 'bg-[#211d1a] text-[#f5a623] shadow-xs'
                        : 'text-[#5b534b] hover:text-[#211d1a]'
                    }`}
                  >
                    {t.delivery}
                  </button>
                </div>

                {isTable ? (
                  <div className="mt-3 rounded-[3px] border border-[#f5a623]/60 bg-white/85 p-3.5">
                    <label
                      htmlFor="tableNumber"
                      className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
                    >
                      {t.tableNumberLabel}
                    </label>
                    <input
                      id="tableNumber"
                      type="text"
                      maxLength={24}
                      placeholder={t.tableNumberPlaceholder}
                      value={customer.tableNumber}
                      onChange={(e) =>
                        onUpdateCustomer({ tableNumber: e.target.value })
                      }
                      className="h-10 w-full rounded-[2px] border border-[#d2c9bc] bg-white px-3 text-sm font-bold text-[#211d1a]"
                    />
                  </div>
                ) : !isDelivery ? (
                  <p className="mt-2.5 rounded-[3px] border border-[#dcd4c8] bg-white/70 p-3 text-xs leading-relaxed text-[#5c544c]">
                    {t.pickupNotePrefix}
                    <strong>{t.pickupRegion}</strong>
                    {t.pickupNoteSuffix}
                  </p>
                ) : (
                  <div className="mt-3 space-y-3 rounded-[3px] border border-[#dcd4c8] bg-white/75 p-3.5">
                    <div>
                      <label
                        htmlFor="street"
                        className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
                      >
                        {t.street}
                      </label>
                      <input
                        id="street"
                        type="text"
                        autoComplete="street-address"
                        value={customer.street}
                        onChange={(e) =>
                          onUpdateCustomer({ street: e.target.value })
                        }
                        className="h-10 w-full rounded-[2px] border border-[#d2c9bc] bg-white px-3 text-sm text-[#211d1a]"
                      />
                    </div>
                    <div className="grid grid-cols-[110px_1fr] gap-2.5">
                      <div>
                        <label
                          htmlFor="number"
                          className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
                        >
                          {t.number}
                        </label>
                        <input
                          id="number"
                          type="text"
                          value={customer.number}
                          onChange={(e) =>
                            onUpdateCustomer({ number: e.target.value })
                          }
                          className="h-10 w-full rounded-[2px] border border-[#d2c9bc] bg-white px-3 text-sm text-[#211d1a]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="neighborhood"
                          className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
                        >
                          {t.neighborhood}
                        </label>
                        <input
                          id="neighborhood"
                          type="text"
                          value={customer.neighborhood}
                          onChange={(e) =>
                            onUpdateCustomer({ neighborhood: e.target.value })
                          }
                          className="h-10 w-full rounded-[2px] border border-[#d2c9bc] bg-white px-3 text-sm text-[#211d1a]"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="complement"
                        className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
                      >
                        {t.complement}
                      </label>
                      <input
                        id="complement"
                        type="text"
                        value={customer.complement}
                        onChange={(e) =>
                          onUpdateCustomer({ complement: e.target.value })
                        }
                        className="h-10 w-full rounded-[2px] border border-[#d2c9bc] bg-white px-3 text-sm text-[#211d1a]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Customer Details */}
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="customerName"
                    className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
                  >
                    {t.fullName}
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    autoComplete="name"
                    value={customer.customerName}
                    onChange={(e) =>
                      onUpdateCustomer({ customerName: e.target.value })
                    }
                    className="h-10 w-full rounded-[2px] border border-[#d2c9bc] bg-white px-3 text-sm text-[#211d1a]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="customerPhone"
                    className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
                  >
                    {isTable ? t.phoneOptional : t.phone}
                  </label>
                  <input
                    id="customerPhone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={15}
                    placeholder={t.phonePlaceholder}
                    value={customer.customerPhone}
                    onChange={(e) =>
                      onUpdateCustomer({
                        customerPhone: formatPhoneMask(e.target.value),
                      })
                    }
                    className="tabular-nums h-10 w-full rounded-[2px] border border-[#d2c9bc] bg-white px-3 text-sm text-[#211d1a]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="customerEmail"
                    className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
                  >
                    {isTable ? t.emailOptional : t.email}
                  </label>
                  <input
                    id="customerEmail"
                    type="email"
                    autoComplete="email"
                    value={customer.customerEmail}
                    onChange={(e) =>
                      onUpdateCustomer({ customerEmail: e.target.value })
                    }
                    className="h-10 w-full rounded-[2px] border border-[#d2c9bc] bg-white px-3 text-sm text-[#211d1a]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="orderNotes"
                    className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
                  >
                    {t.notes}
                  </label>
                  <textarea
                    id="orderNotes"
                    rows={2}
                    placeholder={t.notesPlaceholder}
                    value={customer.orderNotes}
                    onChange={(e) =>
                      onUpdateCustomer({ orderNotes: e.target.value })
                    }
                    className="w-full rounded-[2px] border border-[#d2c9bc] bg-white p-2.5 text-sm text-[#211d1a]"
                  />
                </div>
              </div>

              {/* Payment Info: Pay at Table vs PIX */}
              {isTable ? (
                <div className="rounded-[3px] border border-[#f5a623]/55 bg-[#211d1a] p-4 text-[#f8f4ec]">
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#f5a623]">
                      {t.tablePayTitle}
                    </strong>
                    <span className="tabular-nums text-sm font-bold">
                      {formatMoney(cartTotal)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#d4cbc0]">
                    {t.tablePayBody}
                  </p>
                </div>
              ) : (
                <>
                  <div className="rounded-[3px] bg-[#211d1a] p-4 text-[#f8f4ec]">
                    <div className="flex items-center justify-between gap-2">
                      <strong className="text-xs font-extrabold uppercase tracking-[0.1em] text-[#f5a623]">
                        {t.pixTitle}
                      </strong>
                      <span className="tabular-nums text-sm font-bold">
                        {formatMoney(cartTotal)}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#d4cbc0]">
                      {t.pixSubtitle}
                    </p>
                  </div>

                  <div className="rounded-[3px] border border-[#a83b2f]/35 bg-[#a83b2f]/10 p-3.5 text-xs leading-relaxed text-[#5c1e17]">
                    <strong>{t.pixWarningPrefix}</strong> {t.pixWarningBody1}
                    <strong>{t.pixWarningHighlight}</strong>
                    {t.pixWarningBody2}
                  </div>

                  <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-[#38312b]">
                    <input
                      type="checkbox"
                      checked={pixAgree}
                      onChange={(e) => {
                        setPixAgree(e.target.checked);
                        if (e.target.checked) setValidationError(null);
                      }}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#638b25]"
                    />
                    <span>{t.pixAgreeText}</span>
                  </label>
                </>
              )}

              {/* Inline Validation Banner */}
              {validationError && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-[3px] border border-[#a83b2f] bg-[#a83b2f]/12 p-3 text-xs font-semibold text-[#7a2016]"
                >
                  <AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Generated Order Preview */}
              {orderPreview && (
                <div className="rounded-[3px] border border-[#638b25]/40 bg-white p-4">
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#456614]">
                      {t.previewLabel} · {orderPreview.protocol}
                    </strong>
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-1.5 rounded-[2px] border border-[#d2c9bc] px-2.5 py-1 text-[11px] font-bold text-[#211d1a] hover:bg-[#f6f1e8]"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#638b25]" />
                          <span>{t.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>{t.copySummary}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="mt-2.5 max-h-48 overflow-y-auto whitespace-pre-wrap rounded-[2px] bg-[#f6f1e8] p-3 font-mono text-[11.5px] leading-relaxed text-[#211d1a]">
                    {orderPreview.message}
                  </pre>

                  <a
                    href={orderPreview.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[3px] bg-[#638b25] px-4 text-xs font-extrabold uppercase tracking-[0.07em] text-white transition-colors hover:bg-[#6f9c2a]"
                  >
                    <span>{t.openWhatsApp}</span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      onClearCart();
                      setOrderPreview(null);
                    }}
                    className="mt-2 inline-flex h-9 w-full items-center justify-center rounded-[3px] border border-[#d2c9bc] bg-[#f6f1e8] px-4 text-[11px] font-extrabold uppercase tracking-[0.07em] text-[#211d1a] transition-colors hover:bg-[#ebe3d7]"
                  >
                    {t.newOrderButton}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sticky Footer CTA */}
        <div className="border-t border-[#e2dad0] bg-[#f6f1e8] px-6 py-4">
          <button
            type="button"
            disabled={cart.length === 0}
            onClick={handleGenerateOrder}
            className={`inline-flex h-12 w-full items-center justify-center rounded-[3px] px-5 text-xs font-extrabold uppercase tracking-[0.08em] text-white transition-colors ${
              cart.length === 0
                ? 'cursor-not-allowed bg-[#9a9389]'
                : 'bg-[#638b25] hover:bg-[#6f9c2a]'
            }`}
          >
            {cart.length === 0
              ? t.ctaEmpty
              : orderPreview
                ? t.ctaUpdate
                : isTable
                  ? t.ctaGenerateTable
                  : t.ctaGenerate}
          </button>
        </div>
      </aside>
    </div>
  );
}
