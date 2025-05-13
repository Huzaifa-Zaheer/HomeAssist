import { useState }    from "react";
import Tesseract        from "tesseract.js";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db }      from "../firebase";

export default function CNICUploader() {
  const [status, setStatus]       = useState("");
  const [cnic, setCnic]           = useState("");
  const [rawText, setRawText]     = useState("");

  const handle = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus("OCR in progress…");
    try {
      const { data: { text } } = await Tesseract.recognize(file, "eng");
      setRawText(text);
      const m = text.match(/\d{5}-\d{7}-\d/);
      setCnic(m?.[0] || "");
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        cnicNumber:  m?.[0] || null,
        cnicRawText: text
      });
      setStatus("Saved!");
    } catch {
      setStatus("OCR failed.");
    }
  };

  return (
    <div className="p-4 border rounded">
      <input type="file" accept="image/*" onChange={handle}/>
      <p>{status}</p>
      {cnic && <p>CNIC: {cnic}</p>}
      {rawText && <details><summary>Raw text</summary><pre>{rawText}</pre></details>}
    </div>
  );
}
