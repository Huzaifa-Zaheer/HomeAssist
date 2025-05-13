import { useEffect, useState } from "react";
import { applyActionCode }      from "firebase/auth";
import { auth }                from "../firebase";
import { useSearchParams, Link } from "react-router-dom";

export default function VerifyEmail() {
  const [status, setStatus] = useState("Verifying…");
  const [qs] = useSearchParams();
  const oobCode = qs.get("oobCode");
  useEffect(() => {
    if (!oobCode) return setStatus("No code in URL.");
    applyActionCode(auth, oobCode)
      .then(() => setStatus("✅ Email verified!"))
      .catch(() => setStatus("❌ Invalid or expired code."));
  }, [oobCode]);
  return (
    <div className="p-6">
      <p>{status}</p>
      {status.startsWith("✅") && <Link to="/login">Go to Login</Link>}
    </div>
  );
}
