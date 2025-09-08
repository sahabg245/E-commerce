import create from "zustand";
import { persist } from "zustand/middleware";

type CartItem = { _id: string; name: string; price: number; qty: number };

type CartState = {
  items: CartItem[];
  add: (p: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  totalItems: () => number;
  subtotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (p) => {
        const items = [...get().items];
        const idx = items.findIndex((i) => i._id === p._id);
        if (idx === -1) items.push(p);
        else items[idx].qty += p.qty;
        set({ items });
      },
      remove: (id) => {
        set({ items: get().items.filter((i) => i._id !== id) });
      },
      clear: () => set({ items: [] }),
      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.qty, 0),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.qty * i.price, 0),
    }),
    { name: "cart-storage" } 
  )
);
