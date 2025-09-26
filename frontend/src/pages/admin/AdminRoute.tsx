import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

type Props = {
  children: JSX.Element;
};

const AdminRoute = ({ children }: Props) => {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
