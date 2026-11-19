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
import { OwnerLoginModal } from './components/OwnerLoginModal';
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
const OWNER_CREDS_STORAGE_KEY = 'menks_owner_creds';
const OWNER_SESSION_STORAGE_KEY = 'menks_owner_session';
const DEFAULT_OWNER_USER = 'admin';
const DEFAULT_OWNER_PASS = 'menks2026';

interface OwnerCredentials {
  username: string;
  password: string;
}

function readInitialLocale(): Locale {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved === 'it' || saved === 'pt') return saved;
  } catch {
    // Ignore storage read errors
  }
  return 'pt';
}

function readOwnerCredentials(): OwnerCredentials {
  try {
    const raw = localStorage.getItem(OWNER_CREDS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<OwnerCredentials>;
      if (parsed.username && parsed.password) {
        return { username: parsed.username, password: parsed.password };
      }
    }
  } catch {
    // Ignore storage read errors
  }
  return { username: DEFAULT_OWNER_USER, password: DEFAULT_OWNER_PASS };
}

function readOwnerSession(): boolean {
  try {
    return sessionStorage.getItem(OWNER_SESSION_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
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
  const [ownerCreds, setOwnerCreds] = useState<OwnerCredentials>(
    readOwnerCredentials
  );
  const [isOwner, setIsOwner] = useState<boolean>(readOwnerSession);
  const [loginOpen, setLoginOpen] = useState(false);
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
    const locked =
      cartOpen || adminOpen || loginOpen || Boolean(pendingConfirm);
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [cartOpen, adminOpen, loginOpen, pendingConfirm]);

  const handleOpenAdmin = useCallback(
    (productId?: string) => {
      if (!isOwner) {
        setCartOpen(false);
        setLoginOpen(true);
        return;
      }
      setCartOpen(false);
      setEditingProductId(productId ?? null);
      setAdminOpen(true);
    },
    [isOwner]
  );

  const handleOpenOwnerArea = useCallback(() => {
    setCartOpen(false);
    if (isOwner) {
      setEditingProductId(null);
      setAdminOpen(true);
    } else {
      setLoginOpen(true);
    }
  }, [isOwner]);

  const handleOwnerAuthenticate = useCallback(
    (username: string, password: string): boolean => {
      const valid =
        username.toLowerCase() === ownerCreds.username.toLowerCase() &&
        password === ownerCreds.password;
      if (!valid) return false;

      setIsOwner(true);
      try {
        sessionStorage.setItem(OWNER_SESSION_STORAGE_KEY, '1');
      } catch {
        // Ignore storage write errors
      }
      setLoginOpen(false);
      setEditingProductId(null);
      setAdminOpen(true);
      notify(t.ownerAuth.toastLoggedIn, 'success');
      return true;
    },
    [notify, ownerCreds.password, ownerCreds.username, t.ownerAuth.toastLoggedIn]
  );

  const handleOwnerLogout = useCallback(() => {
    setIsOwner(false);
    setAdminOpen(false);
    setEditingProductId(null);
    try {
      sessionStorage.removeItem(OWNER_SESSION_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
    notify(t.ownerAuth.toastLoggedOut, 'info');
  }, [notify, t.ownerAuth.toastLoggedOut]);

  const handleChangeOwnerPassword = useCallback(
    (newPassword: string) => {
      const updated: OwnerCredentials = {
        username: ownerCreds.username,
        password: newPassword,
      };
      setOwnerCreds(updated);
      try {
        localStorage.setItem(OWNER_CREDS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage write errors
      }
      notify(t.ownerAuth.toastPasswordUpdated, 'success');
    },
    [notify, ownerCreds.username, t.ownerAuth.toastPasswordUpdated]
  );

  const handleOpenCart = useCallback(() => {
    setAdminOpen(false);
    setLoginOpen(false);
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
        <MenuSection
          catalog={catalog}
          locale={locale}
          isOwner={isOwner}
          t={t.menu}
          onAddToCart={handleAddToCart}
          onOpenAdmin={handleOpenAdmin}
          onOwnerLogout={handleOwnerLogout}
        />
        <HowToOrderSection t={t.steps} />
        <StoryAndReviewsSection story={t.story} reviews={t.reviews} />
        <ExperienceSection t={t.experience} />
        <LocationAndFooter
          t={t.location}
          isOwner={isOwner}
          onOpenOwnerArea={handleOpenOwnerArea}
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

      <OwnerLoginModal
        open={loginOpen}
        t={t.ownerAuth}
        onClose={() => setLoginOpen(false)}
        onAuthenticate={handleOwnerAuthenticate}
      />

      <AdminModal
        open={adminOpen && isOwner}
        t={t.admin}
        menuT={t.menu}
        ownerAuthT={t.ownerAuth}
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
        onChangePassword={handleChangeOwnerPassword}
        onLogout={handleOwnerLogout}
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
