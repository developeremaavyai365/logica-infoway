"use client";

/**
 * Client-side shop store: cart, wishlist and compare — all persisted to
 * localStorage so the user's selections survive reloads and navigation.
 * There's no backend; this is a fully functional front-end commerce state.
 */

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface CartLine {
  id: string;
  qty: number;
}

interface StoreState {
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
}

interface StoreApi extends StoreState {
  ready: boolean;
  // cart
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  inCart: (id: string) => boolean;
  // wishlist
  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;
  removeFromWishlist: (id: string) => void;
  // compare
  toggleCompare: (id: string) => boolean; // returns false if full
  inCompare: (id: string) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
}

const COMPARE_MAX = 4;
const KEY = "logica-shop-v1";

const StoreContext = createContext<StoreApi | null>(null);

export function ShopStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>({ cart: [], wishlist: [], compare: [] });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({
          cart: Array.isArray(parsed.cart) ? parsed.cart : [],
          wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
          compare: Array.isArray(parsed.compare) ? parsed.compare : [],
        });
      }
    } catch {}
    setReady(true);
  }, []);

  // Gated on `ready` STATE (not a ref): a ref flips synchronously within the
  // same effect pass as the hydration effect above, so a ref-based guard let
  // this effect see hydration's `hydrated.current = true` before React had
  // actually re-rendered with the hydrated `state` — it then persisted the
  // still-stale empty initial state right over the real saved cart on every
  // load. Gating on state instead means this only fires once a render has
  // actually committed with the hydrated values.
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
  }, [state, ready]);

  const api = useMemo<StoreApi>(() => {
    const addToCart = (id: string, qty = 1) =>
      setState((s) => {
        const found = s.cart.find((l) => l.id === id);
        const cart = found
          ? s.cart.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
          : [...s.cart, { id, qty }];
        return { ...s, cart };
      });

    const setQty = (id: string, qty: number) =>
      setState((s) => ({
        ...s,
        cart: qty <= 0 ? s.cart.filter((l) => l.id !== id) : s.cart.map((l) => (l.id === id ? { ...l, qty } : l)),
      }));

    const removeFromCart = (id: string) => setState((s) => ({ ...s, cart: s.cart.filter((l) => l.id !== id) }));
    const clearCart = () => setState((s) => ({ ...s, cart: [] }));

    const toggleWishlist = (id: string) =>
      setState((s) => ({
        ...s,
        wishlist: s.wishlist.includes(id) ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id],
      }));
    const removeFromWishlist = (id: string) =>
      setState((s) => ({ ...s, wishlist: s.wishlist.filter((w) => w !== id) }));

    let compareFull = false;
    const toggleCompare = (id: string) => {
      compareFull = false;
      setState((s) => {
        if (s.compare.includes(id)) return { ...s, compare: s.compare.filter((c) => c !== id) };
        if (s.compare.length >= COMPARE_MAX) {
          compareFull = true;
          return s;
        }
        return { ...s, compare: [...s.compare, id] };
      });
      return !compareFull;
    };
    const removeFromCompare = (id: string) =>
      setState((s) => ({ ...s, compare: s.compare.filter((c) => c !== id) }));
    const clearCompare = () => setState((s) => ({ ...s, compare: [] }));

    return {
      ...state,
      ready,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      cartCount: state.cart.reduce((n, l) => n + l.qty, 0),
      inCart: (id) => state.cart.some((l) => l.id === id),
      toggleWishlist,
      inWishlist: (id) => state.wishlist.includes(id),
      removeFromWishlist,
      toggleCompare,
      inCompare: (id) => state.compare.includes(id),
      removeFromCompare,
      clearCompare,
    };
  }, [state, ready]);

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useShopStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useShopStore must be used within ShopStoreProvider");
  return ctx;
}

export { COMPARE_MAX };
