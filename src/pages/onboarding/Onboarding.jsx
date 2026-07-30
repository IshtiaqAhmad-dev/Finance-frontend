import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RiPieChart2Fill, RiWallet3Fill, RiShieldCheckFill } from "react-icons/ri";
import Button from "../../components/common/Button";

const slides = [
  {
    icon: RiWallet3Fill,
    title: "Track Every Expense",
    desc: "See exactly where your money goes with clean, simple transaction tracking.",
  },
  {
    icon: RiPieChart2Fill,
    title: "Understand Your Habits",
    desc: "Daily, weekly, and monthly breakdowns help you spot patterns at a glance.",
  },
  {
    icon: RiShieldCheckFill,
    title: "Reach Your Goals Safely",
    desc: "Set savings goals and keep your data protected with PIN & fingerprint lock.",
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const isLast = step === slides.length - 1;
  const Slide = slides[step];

  const handleNext = () => {
    if (isLast) {
      navigate("/auth/login");
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 pt-16 pb-10">
      <div className="flex justify-end">
        <button onClick={() => navigate("/auth/login")} className="text-sm font-semibold text-ink-400">
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="w-40 h-40 rounded-full bg-brand-50 flex items-center justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-brand-500 flex items-center justify-center">
                <Slide.icon size={40} className="text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold font-display text-ink-900 max-w-[280px]">{Slide.title}</h1>
            <p className="text-ink-400 text-sm mt-3 max-w-[280px] leading-relaxed">{Slide.desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-2 mb-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step ? "w-6 bg-brand-500" : "w-2 bg-ink-200"
            }`}
          />
        ))}
      </div>

      <Button onClick={handleNext}>{isLast ? "Get Started" : "Next"}</Button>
    </div>
  );
}
