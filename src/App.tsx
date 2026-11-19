import { useCallback, useEffect, useState } from 'react';
import { AdminModal } from './components/AdminModal';
import { CartDrawer } from './components/CartDrawer';
import { ConfirmDialog } from './components/ConfirmDialog';
import { ExperienceSection } from './components/ExperienceSection';
import { FloatingActions } from './components/FloatingActions';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HowToOrderSection } from './components/HowToOrderSection';
import { LocationAndFooter } from './components/LocationAndFooter';
import { MenuSection } from './components/MenuSection';
import { StoryAndReviewsSection } from './components/StoryAndReviewsSection';
import { SEED_CATALOG_MAP } from './data/catalog';
import { useMenksStore } from './hooks/useMenksStore';
import { getLocalizedProduct, TRANSLATIONS } from './i18n/translations';
import type { Locale, Product, ToastMessage } from './types';

type PendingConfirm =
  | { kind: 'delete'; product: Product }
  | { kind: 'restore' }
  | null;

const LOCALE_STORAGE_KEY = 'menks_locale';

function readInitialLocale(): Locale {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved === 'it' || saved === 'pt') return saved;
  } catch {
    // Ignore storage read errors
  }
  return 'pt';
}

export default function App() {
  const {
    catalog,
    cart,
    customer,
    cartCount,
    cartTotal,
    addToCart,
    changeCartQty,
    removeFromCart,
    saveProduct,
    deleteProduct,
    restoreCatalog,
    updateCustomer,
  } = useMenksStore();

  const [locale, setLocale] = useState<Locale>(readInitialLocale);
  const [cartOpen, setCartOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirm>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const t = TRANSLATIONS[locale];

  useEffect(() => {
    document.documentElement.lang = locale === 'it' ? 'it' : 'pt-BR';
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Ignore storage write errors
    }
  }, [locale]);

  const notify = useCallback(
    (text: string, tone: ToastMessage['tone'] = 'info') => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setToasts((prev) => [...prev.slice(-2), { id, text, tone }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== id));
      }, 2800);
    },
    []
  );

  // Lock body scroll when any overlay is active
  useEffect(() => {
    const locked = cartOpen || adminOpen || Boolean(pendingConfirm);
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [cartOpen, adminOpen, pendingConfirm]);

  const handleOpenAdmin = useCallback((productId?: string) => {
    setCartOpen(false);
    setEditingProductId(productId ?? null);
    setAdminOpen(true);
  }, []);

  const handleOpenCart = useCallback(() => {
    setAdminOpen(false);
    setCartOpen(true);
  }, []);

  const handleAddToCart = useCallback(
    (productId: string, qty: number) => {
      const ok = addToCart(productId, qty);
      if (ok) {
        const prod = catalog.find((p) => p.id === productId);
        if (prod) {
          const localizedName = getLocalizedProduct(
            prod,
            locale,
            SEED_CATALOG_MAP
          ).name;
          notify(t.toasts.addedToCart(qty, localizedName), 'success');
        }
      }
    },
    [addToCart, catalog, locale, notify, t.toasts]
  );

  const handleConfirmAction = () => {
    if (!pendingConfirm) return;
    if (pendingConfirm.kind === 'delete') {
      deleteProduct(pendingConfirm.product.id);
      notify(t.toasts.removedProduct(pendingConfirm.product.name), 'info');
    } else if (pendingConfirm.kind === 'restore') {
      restoreCatalog();
      notify(t.toasts.restoredCatalog, 'success');
    }
    setPendingConfirm(null);
  };

  return (
    <div className="min-h-screen bg-[#171514] text-[#f8f4ec]">
      <Header
        cartCount={cartCount}
        locale={locale}
        t={t.nav}
        onChangeLocale={setLocale}
        onOpenCart={handleOpenCart}
      />

      <main>
        <HeroSection t={t.hero} />
        <ExperienceSection t={t.experience} />
        <MenuSection
          catalog={catalog}
          locale={locale}
          t={t.menu}
          onAddToCart={handleAddToCart}
          onOpenAdmin={handleOpenAdmin}
        />
        <HowToOrderSection t={t.steps} />
        <StoryAndReviewsSection story={t.story} reviews={t.reviews} />
        <LocationAndFooter
          t={t.location}
          onOpenAdmin={() => handleOpenAdmin()}
        />
      </main>

      <FloatingActions
        t={t.floating}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={handleOpenCart}
        toasts={toasts}
      />

      <CartDrawer
        open={cartOpen}
        locale={locale}
        t={t.cart}
        cart={cart}
        catalog={catalog}
        cartTotal={cartTotal}
        customer={customer}
        onClose={() => setCartOpen(false)}
        onChangeQty={changeCartQty}
        onRemoveItem={removeFromCart}
        onUpdateCustomer={updateCustomer}
        onNotify={notify}
      />

      <AdminModal
        open={adminOpen}
        t={t.admin}
        menuT={t.menu}
        editingProductId={editingProductId}
        catalog={catalog}
        onClose={() => {
          setAdminOpen(false);
          setEditingProductId(null);
        }}
        onSaveProduct={saveProduct}
        onRequestDeleteProduct={(product) =>
          setPendingConfirm({ kind: 'delete', product })
        }
        onRequestRestoreCatalog={() => setPendingConfirm({ kind: 'restore' })}
        onNotify={notify}
      />

      <ConfirmDialog
        open={Boolean(pendingConfirm)}
        title={
          pendingConfirm?.kind === 'delete'
            ? t.confirm.deleteTitle
            : t.confirm.restoreTitle
        }
        description={
          pendingConfirm?.kind === 'delete'
            ? t.confirm.deleteDesc(pendingConfirm.product.name)
            : t.confirm.restoreDesc
        }
        confirmLabel={
          pendingConfirm?.kind === 'delete'
            ? t.confirm.deleteConfirm
            : t.confirm.restoreConfirm
        }
        cancelLabel={t.confirm.cancel}
        closeAria={t.confirm.closeAria}
        destructive={pendingConfirm?.kind === 'delete'}
        onConfirm={handleConfirmAction}
        onCancel={() => setPendingConfirm(null)}
      />
    </div>
  );
}
