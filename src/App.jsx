import { Routes, Route } from "react-router-dom";
import Home              from "./pages/Home";
import Signup            from "./pages/Signup";
import Login             from "./pages/Login";
import VerifyEmail       from "./pages/VerifyEmail";
import UserDashboard     from "./pages/UserDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import ProtectedRoute    from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* public */}
      <Route path="/"              element={<Home />} />
      <Route path="/signup"        element={<Signup />} />
      <Route path="/verify-email"  element={<VerifyEmail />} />
      <Route path="/login"         element={<Login />} />

      {/* user-only */}
      <Route element={<ProtectedRoute requiredRole="user" />}>
        <Route path="/dashboard"   element={<UserDashboard />} />
      </Route>

      {/* provider-only */}
      <Route element={<ProtectedRoute requiredRole="provider" />}>
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
      </Route>

      {/* catch-all */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}