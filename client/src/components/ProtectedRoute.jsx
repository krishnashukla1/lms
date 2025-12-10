
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";

// export default function ProtectedRoute({ children, allowed }) {
//   const { token, role } = useAuth();

//   if (!token) return <Navigate to="/" replace />;

//   if (allowed && !allowed.includes(role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

//===today kp====
// components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../store/authStore";

export default function ProtectedRoute({ children, allowed }) {
  const { token, role, user } = useAuth();
  const location = useLocation();

  // If no token → go to login
  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // If role is wrong → send to correct dashboard (NOT to login!)
  if (allowed && allowed.length > 0 && !allowed.includes(role)) {
    if (role === "student") {
      return <Navigate to="/student" replace />;
    }
    if (role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    // Fallback (should never happen)
    return <Navigate to="/" replace />;
  }

  // All good → show the protected page
  return children;
}