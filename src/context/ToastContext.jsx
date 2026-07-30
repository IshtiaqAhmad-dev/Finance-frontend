import { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiCheckCircle, HiXCircle, HiInformationCircle } from "react-icons/hi2";

const ToastContext = createContext(null);

const icons = {
  success: HiCheckCircle,
  error: HiXCircle,
  info: HiInformationCircle,
};

const colors = {
  success: "bg-brand-500",
  error: "bg-red-500",
  info: "bg-accent-blue",
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[999] w-full max-w-[400px] px-6 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = icons[t.type];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`flex items-center gap-2.5 ${colors[t.type]} text-white rounded-2xl px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.2)]`}
              >
                <Icon size={18} className="shrink-0" />
                <span className="text-sm font-medium">{t.message}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
