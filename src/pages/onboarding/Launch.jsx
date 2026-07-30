import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RiWallet3Fill } from "react-icons/ri";

export default function Launch() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/onboarding"), 1800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-brand-500 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-24 h-24 rounded-[28px] bg-white/15 flex items-center justify-center mb-5"
      >
        <RiWallet3Fill size={44} className="text-white" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-white text-2xl font-bold font-display"
      >
        Finance Manager
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-white/80 text-sm mt-1"
      >
        Track. Save. Grow.
      </motion.p>
    </div>
  );
}
