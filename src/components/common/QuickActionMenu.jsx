import { AnimatePresence, motion } from "framer-motion";

/**
 * Expandable quick-action menu launched from the raised bottom-nav FAB
 * (kit ref: "5. Floating Menu.png"). Renders a translucent backdrop plus a
 * vertical stack of action buttons that fan up from the FAB's position.
 *
 * actions: [{ label, icon: Component, onSelect }]
 */
export default function QuickActionMenu({ open, onClose, actions = [] }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-900/40 z-40"
            aria-hidden="true"
          />
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-[390px] z-50 flex flex-col gap-2"
            role="menu"
          >
            {actions.map(({ label, icon: Icon, onSelect }, i) => (
              <motion.button
                key={label}
                type="button"
                role="menuitem"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  onSelect?.();
                  onClose?.();
                }}
                className="w-full h-14 rounded-2xl bg-white shadow-[0_10px_24px_rgba(9,48,48,0.15)] flex items-center gap-3 px-5"
              >
                <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                  <Icon size={18} />
                </div>
                <span className="text-[15px] font-semibold text-ink-900">{label}</span>
              </motion.button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
