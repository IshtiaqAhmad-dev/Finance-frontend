import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiFingerPrint } from "react-icons/hi2";
import { motion } from "framer-motion";
import TopBar from "../../components/common/TopBar";
import Button from "../../components/common/Button";
import { useToast } from "../../context/ToastContext";
import { toggleFingerprint } from "../../api/security";
import { getErrorMessage } from "../../api/client";

export default function SecurityFingerprint() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleEnable = async () => {
    setSaving(true);
    try {
      await toggleFingerprint(true);
      showToast("Fingerprint enabled", "success");
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    } finally {
      setSaving(false);
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar title="" />
      <div className="px-6 pt-8 flex flex-col items-center text-center flex-1">
        <h1 className="text-2xl font-bold font-display text-ink-900">Enable Fingerprint</h1>
        <p className="text-ink-400 text-sm mt-2 leading-relaxed max-w-[280px]">
          Use your fingerprint for a faster and more secure way to log in.
        </p>

        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={handleEnable}
          className="w-36 h-36 rounded-full bg-brand-50 flex items-center justify-center my-14"
        >
          <div className="w-24 h-24 rounded-full bg-brand-500 flex items-center justify-center">
            <HiFingerPrint size={44} className="text-white" />
          </div>
        </motion.button>

        <div className="w-full mt-auto mb-6 space-y-3">
          <Button onClick={handleEnable} loading={saving}>Enable Fingerprint</Button>
          <button
            onClick={() => navigate("/home")}
            className="w-full h-12 text-sm font-semibold text-ink-400"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
