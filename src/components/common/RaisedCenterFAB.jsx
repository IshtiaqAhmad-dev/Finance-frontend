import { motion } from "framer-motion";
import { HiPlus } from "react-icons/hi2";

/**
 * The elevated, circular center action button that breaks the top edge of the
 * bottom navigation bar (kit ref: 9-A - Home - Bottom Navigation.png).
 * Purely presentational — the caller decides what tapping it does (open a
 * quick-action menu, navigate directly, etc.) via `onClick`.
 */
export default function RaisedCenterFAB({ onClick, icon: Icon = HiPlus, open = false, label = "Quick actions" }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-expanded={open}
      whileTap={{ scale: 0.92 }}
      animate={{ rotate: open ? 45 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      className="absolute left-1/2 -translate-x-1/2 -top-7 w-16 h-16 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-[0_10px_24px_rgba(0,208,158,0.45)] border-4 border-surface"
    >
      <Icon size={26} />
    </motion.button>
  );
}
