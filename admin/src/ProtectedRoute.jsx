import { Navigate } from "react-router-dom";
import useAuthStore from "../Zustand/user.store";
import { LogIn } from "lucide-react";
import Login from "./pages/Login/Login";

function ProtectedRoute({ children, allowedRoles }) {
  const { token, user } = useAuthStore((state) => state);
  // const location = useLocation();

  if (!token || !user) {
    return <Login />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;