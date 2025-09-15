import create from "zustand";

type CartItem = { _id: string; name: string; price: number; qty: number };

type CartState = {
  items: CartItem[];
  add: (p: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  add: (p) => {
    const items = [...get().items];
    const idx = items.findIndex((i) => i._id === p._id);
    if (idx === -1) items.push(p);
    else items[idx].qty += p.qty;
    set({ items });
    updateTotals(set, items);
  },
  remove: (id) => {
    const items = get().items.filter((i) => i._id !== id);
    set({ items });
    updateTotals(set, items);
  },
  clear: () => {
    set({ items: [], totalItems: 0, subtotal: 0 });
  },
  totalItems: 0,
  subtotal: 0,
}));

function updateTotals(set: any, items: CartItem[]) {
  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  set({ totalItems, subtotal });
}
