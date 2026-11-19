import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_CUSTOMER, SEED_CATALOG } from '../data/catalog';
import type { CartItem, CustomerInfo, Product } from '../types';

const STORAGE_KEYS = {
  catalog: 'menks_catalog',
  cart: 'menks_cart',
  customer: 'menks_customer',
} as const;

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return structuredClone(fallback);
    const parsed = JSON.parse(raw);
    return parsed ?? structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
}

export function useMenksStore() {
  const [catalog, setCatalog] = useState<Product[]>(() => {
    const stored = readStorage<Product[]>(STORAGE_KEYS.catalog, SEED_CATALOG);
    return Array.isArray(stored) && stored.length > 0 ? stored : structuredClone(SEED_CATALOG);
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = readStorage<CartItem[]>(STORAGE_KEYS.cart, []);
    return Array.isArray(stored) ? stored : [];
  });

  const [customer, setCustomer] = useState<CustomerInfo>(() => ({
    ...DEFAULT_CUSTOMER,
    ...readStorage<Partial<CustomerInfo>>(STORAGE_KEYS.customer, DEFAULT_CUSTOMER),
  }));

  // Normalize cart whenever catalog changes (removes deleted or unpriced items)
  const normalizedCart = useMemo(() => {
    return cart
      .filter((entry) => {
        const prod = catalog.find((p) => p.id === entry.id);
        return Boolean(prod && typeof prod.price === 'number' && prod.price > 0);
      })
      .map((entry) => ({
        ...entry,
        qty: Math.max(1, Math.floor(Number(entry.qty) || 1)),
      }));
  }, [cart, catalog]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.catalog, JSON.stringify(catalog));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [catalog]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(normalizedCart));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [normalizedCart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.customer, JSON.stringify(customer));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [customer]);

  const cartCount = useMemo(
    () => normalizedCart.reduce((sum, item) => sum + item.qty, 0),
    [normalizedCart]
  );

  const cartTotal = useMemo(() => {
    return normalizedCart.reduce((sum, item) => {
      const prod = catalog.find((p) => p.id === item.id);
      return sum + (Number(prod?.price) || 0) * item.qty;
    }, 0);
  }, [normalizedCart, catalog]);

  const addToCart = useCallback(
    (productId: string, qty = 1) => {
      const prod = catalog.find((p) => p.id === productId);
      if (!prod || !prod.price || prod.price <= 0) return false;
      const safeQty = Math.max(1, Math.floor(qty));
      setCart((prev) => {
        const existing = prev.find((c) => c.id === productId);
        if (existing) {
          return prev.map((c) =>
            c.id === productId ? { ...c, qty: c.qty + safeQty } : c
          );
        }
        return [...prev, { id: productId, qty: safeQty }];
      });
      return true;
    },
    [catalog]
  );

  const changeCartQty = useCallback((productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === productId ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((c) => c.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const saveProduct = useCallback((product: Product) => {
    setCatalog((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) => (p.id === product.id ? product : p));
      }
      return [...prev, product];
    });
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    setCatalog((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((c) => c.id !== productId));
  }, []);

  const restoreCatalog = useCallback(() => {
    setCatalog(structuredClone(SEED_CATALOG));
    setCart([]);
  }, []);

  const updateCustomer = useCallback((patch: Partial<CustomerInfo>) => {
    setCustomer((prev) => ({ ...prev, ...patch }));
  }, []);

  return {
    catalog,
    cart: normalizedCart,
    customer,
    cartCount,
    cartTotal,
    addToCart,
    changeCartQty,
    removeFromCart,
    clearCart,
    saveProduct,
    deleteProduct,
    restoreCatalog,
    updateCustomer,
  };
}
