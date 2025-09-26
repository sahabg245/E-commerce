import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
  token: string;
};

type AuthState = {
  user: User | null;
  login: (data: { user: Omit<User, "token">; token: string }) => void;
  setUser: (u: User | null) => void;
  logout: () => void;
  checkToken: () => void;
};

type JwtPayload = {
  exp: number;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: (data) => {
    const u: User = { ...data.user, token: data.token };

    if (u?.token) {
      const decoded: JwtPayload = jwtDecode(u.token);
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        set({ user: null });
        localStorage.removeItem("auth-storage");
        return;
      }
    }

    set({ user: u });
    localStorage.setItem("auth-storage", JSON.stringify({ state: { user: u } }));
  },

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

  logout: () => {
    set({ user: null });
    localStorage.removeItem("auth-storage");
  },

  checkToken: () => {
    const data = JSON.parse(localStorage.getItem("auth-storage") || "null");
    if (data?.state?.user?.token) {
      try {
        const decoded: any = jwtDecode(data.state.user.token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("auth-storage");
          set({ user: null });
        } else {
          set({ user: data.state.user });
        }
      } catch {
        set({ user: null });
      }
    }
  },
}));
