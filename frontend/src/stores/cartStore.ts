import create from 'zustand';

type CartItem = { _id: string; name: string; price: number; qty: number };

type CartState = {
  items: CartItem[];
  add: (p: CartItem) => void;
  remove: (id: string) => void;
  totalItems: number;
  subtotal: number;
  clear: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  add: (p) => {
    const items = get().items.slice();
    const idx = items.findIndex(i => i._id === p._id);
    if (idx === -1) items.push(p);
    else items[idx].qty += p.qty;
    set({ items });
  },
  remove: (id) => {
    set({ items: get().items.filter(i => i._id !== id) });
  },
  totalItems: 0,
  subtotal: 0,
  clear: () => set({ items: [] }),
}));

// derived selectors
useCartStore.subscribe(state => {
  const totalItems = state.items.reduce((s, i) => s + i.qty, 0);
  const subtotal = state.items.reduce((s, i) => s + i.qty * i.price, 0);
  // mutate store to keep derived values
  state.totalItems = totalItems;
  state.subtotal = subtotal;
});
