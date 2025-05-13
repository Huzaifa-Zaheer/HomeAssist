import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProtectedRoute({ requiredRole }) {
  const [user, loading] = useAuthState(auth);
  const [allowed, setAllowed] = useState(null); // null = not checked yet
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    if (loading || !user) return;
    const col = requiredRole === "provider" ? "providers" : "users";

    getDoc(doc(db, col, user.uid)).then(snap => {
      setAllowed(snap.exists());
      setCheckingRole(false);
    });
  }, [user, loading, requiredRole]);

  if (loading || checkingRole) return <p>Loading…</p>;
  if (!user) return <Navigate to="/login" />;
  if (!allowed) return <Navigate to="/" />;

  return <Outlet />;
}
