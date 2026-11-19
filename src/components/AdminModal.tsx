import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import {
  AlertCircle,
  KeyRound,
  LogOut,
  Pencil,
  RotateCcw,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  BRAND_IMAGES,
  formatMoney,
  PRODUCT_CATEGORIES,
} from '../data/catalog';
import type { Translations } from '../i18n/translations';
import type { Product, ProductCategory } from '../types';

interface AdminModalProps {
  open: boolean;
  t: Translations['admin'];
  menuT: Translations['menu'];
  ownerAuthT: Translations['ownerAuth'];
  editingProductId: string | null;
  catalog: Product[];
  onClose: () => void;
  onSaveProduct: (product: Product) => void;
  onRequestDeleteProduct: (product: Product) => void;
  onRequestRestoreCatalog: () => void;
  onChangePassword: (newPassword: string) => void;
  onLogout: () => void;
  onNotify: (text: string, tone?: 'success' | 'info' | 'error') => void;
}

export function AdminModal({
  open,
  t,
  menuT,
  ownerAuthT,
  editingProductId,
  catalog,
  onClose,
  onSaveProduct,
  onRequestDeleteProduct,
  onRequestRestoreCatalog,
  onChangePassword,
  onLogout,
  onNotify,
}: AdminModalProps) {
  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [priceStr, setPriceStr] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Burgers');
  const [badge, setBadge] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string>(BRAND_IMAGES.logo);
  const [formError, setFormError] = useState<string | null>(null);
  const [passwordPanelOpen, setPasswordPanelOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const resetForm = () => {
    setProductId('');
    setName('');
    setPriceStr('');
    setCategory('Burgers');
    setBadge('');
    setDescription('');
    setImageUrl('');
    setUploadedImage(null);
    setExistingImage(BRAND_IMAGES.logo);
    setFormError(null);
  };

  const loadIntoForm = (prod: Product) => {
    setProductId(prod.id);
    setName(prod.name);
    setPriceStr(prod.price != null ? String(prod.price) : '');
    setCategory(prod.category);
    setBadge(prod.badge || '');
    setDescription(prod.description || '');
    setImageUrl('');
    setUploadedImage(null);
    setExistingImage(prod.image || BRAND_IMAGES.logo);
    setFormError(null);
  };

  useEffect(() => {
    if (!open) return;
    setPasswordPanelOpen(false);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError(null);
    if (editingProductId) {
      const target = catalog.find((p) => p.id === editingProductId);
      if (target) {
        loadIntoForm(target);
      } else {
        resetForm();
      }
    } else {
      resetForm();
    }
  }, [open, editingProductId, catalog]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const previewSrc =
    uploadedImage || imageUrl.trim() || existingImage || BRAND_IMAGES.logo;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      setFormError(t.errFileSize);
      e.target.value = '';
      return;
    }
    setFormError(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setUploadedImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setFormError(t.errNameRequired);
      return;
    }

    let parsedPrice: number | null = null;
    if (priceStr.trim() !== '') {
      const num = Number(priceStr.replace(',', '.'));
      if (Number.isNaN(num) || num <= 0) {
        setFormError(t.errInvalidPrice);
        return;
      }
      parsedPrice = Math.round(num * 100) / 100;
    }

    const id = productId || `prod-${Date.now()}`;
    const finalImage =
      uploadedImage || imageUrl.trim() || existingImage || BRAND_IMAGES.logo;

    onSaveProduct({
      id,
      name: trimmedName,
      price: parsedPrice,
      category,
      badge: badge.trim(),
      description: description.trim(),
      image: finalImage,
    });

    onNotify(
      productId ? t.toastUpdated(trimmedName) : t.toastCreated(trimmedName),
      'success'
    );
    resetForm();
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newPassword.trim();
    if (trimmed.length < 4) {
      setPasswordError(ownerAuthT.passwordMinLengthError);
      return;
    }
    if (trimmed !== confirmPassword.trim()) {
      setPasswordError(ownerAuthT.passwordMismatchError);
      return;
    }
    onChangePassword(trimmed);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError(null);
    setPasswordPanelOpen(false);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/75 backdrop-blur-xs"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
        className="relative z-10 flex max-h-[90vh] w-full max-w-[980px] flex-col overflow-hidden rounded-[4px] bg-[#f6f1e8] text-[#211d1a] shadow-2xl"
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-[#171514] px-4 py-4 text-[#f8f4ec] sm:px-6">
          <h2
            id="admin-modal-title"
            className="font-display text-2xl uppercase leading-none tracking-wide"
          >
            {t.title}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setPasswordPanelOpen((prev) => !prev);
                setPasswordError(null);
              }}
              className="inline-flex h-9 items-center gap-1.5 rounded-[3px] border border-white/20 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#e6ddd2] transition-colors hover:border-[#f5a623] hover:text-[#f5a623]"
            >
              <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">
                {ownerAuthT.changePasswordToggle}
              </span>
            </button>
            <button
              type="button"
              onClick={onLogout}
              title={ownerAuthT.logoutButton}
              className="inline-flex h-9 items-center gap-1.5 rounded-[3px] border border-white/20 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#e6ddd2] transition-colors hover:border-[#f5a623] hover:text-[#f5a623]"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">{menuT.ownerLogout}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.closeAria}
              className="flex h-9 w-9 items-center justify-center rounded-[3px] text-[#c1b9ae] hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {passwordPanelOpen && (
            <form
              onSubmit={handlePasswordSubmit}
              className="mb-5 rounded-[3px] border border-[#d6c29d] bg-white p-4"
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-end">
                <div>
                  <label
                    htmlFor="ownerNewPassword"
                    className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
                  >
                    {ownerAuthT.newPasswordLabel}
                  </label>
                  <input
                    id="ownerNewPassword"
                    type="password"
                    required
                    minLength={4}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (passwordError) setPasswordError(null);
                    }}
                    className="h-10 w-full rounded-[2px] border border-[#d2c9bc] bg-[#fbf9f5] px-3 text-sm text-[#211d1a]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ownerConfirmPassword"
                    className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
                  >
                    {ownerAuthT.confirmPasswordLabel}
                  </label>
                  <input
                    id="ownerConfirmPassword"
                    type="password"
                    required
                    minLength={4}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (passwordError) setPasswordError(null);
                    }}
                    className="h-10 w-full rounded-[2px] border border-[#d2c9bc] bg-[#fbf9f5] px-3 text-sm text-[#211d1a]"
                  />
                </div>
                <button
                  type="submit"
                  className="h-10 rounded-[3px] bg-[#211d1a] px-4 text-xs font-extrabold uppercase tracking-[0.07em] text-[#f5a623] transition-colors hover:bg-[#342e29]"
                >
                  {ownerAuthT.savePasswordButton}
                </button>
              </div>
              {passwordError && (
                <p
                  role="alert"
                  className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-[#7a2016]"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{passwordError}</span>
                </p>
              )}
            </form>
          )}

          <div className="mb-6 rounded-[3px] border border-[#d6c29d] bg-[#fdf5e6] p-3.5 text-xs leading-relaxed text-[#5c4521]">
            <strong>{t.warningPrefix}</strong> {t.warningBeforeCode}
            <code className="font-mono">localStorage</code>
            {t.warningAfterCode}
          </div>

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_1fr]">
            {/* Left: Create / Edit Product Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-3.5 rounded-[3px] border border-[#e2dad0] bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl uppercase leading-none text-[#211d1a]">
                  {productId ? t.editTitle : t.newTitle}
                </h3>
                {productId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-xs font-bold text-[#a83b2f] hover:underline"
                  >
                    {t.cancelEdit}
                  </button>
                )}
              </div>

              <div>
                <label
                  htmlFor="pName"
                  className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
                >
                  {t.nameLabel}
                </label>
                <input
                  id="pName"
                  type="text"
                  required
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 w-full rounded-[2px] border border-[#d2c9bc] bg-[#fbf9f5] px-3 text-sm text-[#211d1a]"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="pPrice"
                    className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
                  >
                    {t.priceLabel}
                  </label>
                  <input
                    id="pPrice"
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder={t.pricePlaceholder}
                    value={priceStr}
                    onChange={(e) => setPriceStr(e.target.value)}
                    className="tabular-nums h-10 w-full rounded-[2px] border border-[#d2c9bc] bg-[#fbf9f5] px-3 text-sm text-[#211d1a]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="pCategory"
                    className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
                  >
                    {t.categoryLabel}
                  </label>
                  <select
                    id="pCategory"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as ProductCategory)
                    }
                    className="h-10 w-full rounded-[2px] border border-[#d2c9bc] bg-[#fbf9f5] px-3 text-sm text-[#211d1a]"
                  >
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {menuT.categories[cat]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="pBadge"
                  className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
                >
                  {t.badgeLabel}
                </label>
                <input
                  id="pBadge"
                  type="text"
                  maxLength={32}
                  placeholder={t.badgePlaceholder}
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="h-10 w-full rounded-[2px] border border-[#d2c9bc] bg-[#fbf9f5] px-3 text-sm text-[#211d1a]"
                />
              </div>

              <div>
                <label
                  htmlFor="pDesc"
                  className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
                >
                  {t.descLabel}
                </label>
                <textarea
                  id="pDesc"
                  rows={2}
                  maxLength={180}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-[2px] border border-[#d2c9bc] bg-[#fbf9f5] p-2.5 text-sm text-[#211d1a]"
                />
              </div>

              <div>
                <label
                  htmlFor="pImageUrl"
                  className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
                >
                  {t.imageUrlLabel}
                </label>
                <input
                  id="pImageUrl"
                  type="url"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setUploadedImage(null);
                  }}
                  className="h-10 w-full rounded-[2px] border border-[#d2c9bc] bg-[#fbf9f5] px-3 text-sm text-[#211d1a]"
                />
              </div>

              <div>
                <label
                  htmlFor="pImageFile"
                  className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#574f47]"
                >
                  {t.imageFileLabel}
                </label>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="pImageFile"
                    className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-[2px] border border-[#d2c9bc] bg-[#f6f1e8] px-3.5 text-xs font-bold text-[#211d1a] hover:bg-[#ebe3d7]"
                  >
                    <Upload className="h-4 w-4" aria-hidden="true" />
                    <span>{t.chooseFile}</span>
                  </label>
                  <input
                    id="pImageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                  <img
                    src={previewSrc}
                    alt={t.previewAlt}
                    referrerPolicy="no-referrer"
                    className="h-14 w-20 rounded-[2px] border border-[#d2c9bc] bg-[#28231f] object-cover"
                  />
                </div>
              </div>

              {formError && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-[2px] border border-[#a83b2f] bg-[#a83b2f]/10 p-2.5 text-xs font-semibold text-[#7a2016]"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2.5 pt-2">
                <button
                  type="submit"
                  className="h-10 flex-1 rounded-[3px] bg-[#638b25] px-4 text-xs font-extrabold uppercase tracking-[0.07em] text-white transition-colors hover:bg-[#6f9c2a]"
                >
                  {productId ? t.saveChanges : t.saveProduct}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="h-10 rounded-[3px] bg-[#211d1a] px-4 text-xs font-extrabold uppercase tracking-[0.07em] text-white transition-colors hover:bg-[#352f2a]"
                >
                  {t.clear}
                </button>
              </div>
            </form>

            {/* Right: Registered Products List */}
            <div className="flex flex-col">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-2xl uppercase leading-none text-[#211d1a]">
                  {t.registeredTitle(catalog.length)}
                </h3>
              </div>

              <div className="max-h-[420px] flex-1 space-y-2.5 overflow-y-auto pr-1">
                {catalog.length === 0 ? (
                  <p className="rounded-[3px] border border-[#e2dad0] bg-white p-6 text-center text-sm text-[#6a6258]">
                    {t.noProducts}
                  </p>
                ) : (
                  catalog.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 rounded-[3px] border bg-white p-2.5 transition-colors ${
                        productId === item.id
                          ? 'border-[#f5a623] ring-1 ring-[#f5a623]'
                          : 'border-[#e2dad0]'
                      }`}
                    >
                      <img
                        src={item.image || BRAND_IMAGES.logo}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="h-12 w-12 shrink-0 rounded-[2px] bg-[#28231f] object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <strong className="block truncate text-sm font-bold text-[#211d1a]">
                          {item.name}
                        </strong>
                        <span className="tabular-nums text-xs text-[#6e655b]">
                          {menuT.categories[item.category]} ·{' '}
                          {item.price ? formatMoney(item.price) : menuT.onRequest}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => loadIntoForm(item)}
                          aria-label={t.editAria(item.name)}
                          className="inline-flex h-8 items-center gap-1 rounded-[2px] border border-[#d2c9bc] px-2.5 text-[11px] font-bold text-[#211d1a] hover:bg-[#f6f1e8]"
                        >
                          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{t.edit}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onRequestDeleteProduct(item)}
                          aria-label={t.deleteAria(item.name)}
                          className="inline-flex h-8 items-center justify-center rounded-[2px] border border-[#a83b2f]/30 px-2 text-[#a83b2f] hover:bg-[#a83b2f]/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <button
                type="button"
                onClick={onRequestRestoreCatalog}
                className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-[3px] border border-[#8a8175] bg-transparent px-4 text-xs font-extrabold uppercase tracking-[0.07em] text-[#211d1a] transition-colors hover:bg-[#211d1a] hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.restoreButton}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
