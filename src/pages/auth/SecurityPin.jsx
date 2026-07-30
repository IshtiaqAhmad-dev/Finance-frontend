import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLockClosed } from "react-icons/hi2";
import TopBar from "../../components/common/TopBar";
import PinInput from "../../components/common/PinInput";
import { useToast } from "../../context/ToastContext";
import { setPin as setPinApi } from "../../api/security";
import { getErrorMessage } from "../../api/client";

export default function SecurityPin() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleComplete = async (pin) => {
    setSaving(true);
    try {
      await setPinApi(pin);
      showToast("PIN set successfully", "success");
      setTimeout(() => navigate("/auth/fingerprint"), 300);
    } catch (error) {
      showToast(getErrorMessage(error), "error");
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar title="" />
      <div className="px-6 pt-8 flex flex-col items-center text-center flex-1">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mb-6">
          <HiOutlineLockClosed size={26} className="text-brand-600" />
        </div>
        <h1 className="text-2xl font-bold font-display text-ink-900">Set Security Pin</h1>
        <p className="text-ink-400 text-sm mt-2 leading-relaxed max-w-[280px]">
          Create a 4-digit PIN to keep your account secure and quickly log back in.
        </p>

        <div className="mt-10">
          <PinInput length={4} onComplete={saving ? undefined : handleComplete} />
        </div>
      </div>
    </div>
  );
}
