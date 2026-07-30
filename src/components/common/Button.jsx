import { motion } from "framer-motion";

const variants = {
  primary: "bg-brand-500 text-white",
  dark: "bg-ink-900 text-white",
  outline: "bg-white text-ink-900 border border-ink-200",
  ghost: "bg-brand-50 text-brand-700",
};

function Spinner() {
  return (
    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  loading = false,
  disabled = false,
  ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`w-full h-14 rounded-full font-semibold text-[15px] font-display flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </motion.button>
  );
}
