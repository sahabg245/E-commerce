import create from 'zustand';

type User = { id: string; name: string; email: string; role: string; token: string } | null;

type AuthState = {
  user: User;
  setUser: (u: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("authUser") || "null"),  // 👈 load on init
  setUser: (u) => {
    if (u) localStorage.setItem("authUser", JSON.stringify(u));
    set({ user: u });
  },
  logout: () => {
    localStorage.removeItem("authUser");
    set({ user: null });
  },
}));
