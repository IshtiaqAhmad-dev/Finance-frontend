import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, initializing } = useAuth();

  // Jab tak /auth/me se session verify ho raha hai, blank rehne dena (flash of login screen avoid karne ke liye)
  if (initializing) return null;

  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;

  return <Outlet />;
}
