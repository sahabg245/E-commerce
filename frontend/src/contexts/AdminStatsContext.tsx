import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import toast from "react-hot-toast";

type Stats = { products: number; orders: number; users: number };

type AdminStatsContextType = {
  stats: Stats;
  refreshStats: () => void;
};

const AdminStatsContext = createContext<AdminStatsContextType | undefined>(undefined);

export const AdminStatsProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats] = useState<Stats>({ products: 0, orders: 0, users: 0 });
  const user = useAuthStore((s) => s.user);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get("/api/admin/stats", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setStats(data);
    } catch {
      toast.error("Failed to fetch stats");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <AdminStatsContext.Provider value={{ stats, refreshStats: fetchStats }}>
      {children}
    </AdminStatsContext.Provider>
  );
};

export const useAdminStats = () => {
  const ctx = useContext(AdminStatsContext);
  if (!ctx) throw new Error("useAdminStats must be used within AdminStatsProvider");
  return ctx;
};
