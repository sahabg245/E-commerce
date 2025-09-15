import create from "zustand";
import {jwtDecode} from "jwt-decode";

type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
  token: string;
} | null;

type AuthState = {
  user: User;
  setUser: (u: User) => void;
  logout: () => void;
  checkToken: () => void;
};

type JwtPayload = {
  exp: number;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  setUser: (u) => {
    if (u?.token) {
      const decoded: JwtPayload = jwtDecode(u.token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        set({ user: null });
        return;
      }
    }
    set({ user: u });
  },
  logout: () => set({ user: null }),
  checkToken: () => {
    const user = get().user;
    if (user?.token) {
      const decoded: JwtPayload = jwtDecode(user.token);
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        set({ user: null });
      }
    }
  },
}));
