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
