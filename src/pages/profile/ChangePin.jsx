import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLockClosed, HiOutlineShieldCheck } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";
import TopBar from "../../components/common/TopBar";
import PinInput from "../../components/common/PinInput";
import { useToast } from "../../context/ToastContext";
import { verifyPin, setPin } from "../../api/security";
import { getErrorMessage } from "../../api/client";

export default function ChangePin() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [step, setStep] = useState("current");
  const [busy, setBusy] = useState(false);

  const handleCurrentComplete = async (pin) => {
    setBusy(true);
    try {
      await verifyPin(pin);
      setStep("new");
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    } finally {
      setBusy(false);
    }
  };

  const handleNewComplete = async (pin) => {
    setBusy(true);
    try {
      await setPin(pin);
      showToast("PIN updated successfully", "success");
      setTimeout(() => navigate("/profile/security"), 400);
    } catch (error) {
      showToast(getErrorMessage(error), "error");
      setBusy(false);
    }
  };

  const copy = {
    current: {
      icon: HiOutlineLockClosed,
      title: "Enter Current PIN",
      desc: "Confirm your current 4-digit PIN before setting a new one.",
    },
    new: {
      icon: HiOutlineShieldCheck,
      title: "Set New PIN",
      desc: "Choose a new 4-digit PIN to secure your account.",
    },
  }[step];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar title="" />
      <div className="px-6 pt-8 flex flex-col items-center text-center flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mb-6">
              <copy.icon size={26} className="text-brand-600" />
            </div>
            <h1 className="text-2xl font-bold font-display text-ink-900">{copy.title}</h1>
            <p className="text-ink-400 text-sm mt-2 leading-relaxed max-w-[280px]">{copy.desc}</p>

            <div className="mt-10">
              <PinInput length={4} onComplete={busy ? undefined : (step === "current" ? handleCurrentComplete : handleNewComplete)} />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-2 mt-10">
          <span className={`h-1.5 rounded-full transition-all ${step === "current" ? "w-6 bg-brand-500" : "w-1.5 bg-ink-200"}`} />
          <span className={`h-1.5 rounded-full transition-all ${step === "new" ? "w-6 bg-brand-500" : "w-1.5 bg-ink-200"}`} />
        </div>
      </div>
    </div>
  );
}
