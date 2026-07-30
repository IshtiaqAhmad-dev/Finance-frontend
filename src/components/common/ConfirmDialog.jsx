import { AnimatePresence, motion } from "framer-motion";

/**
 * Reusable confirmation dialog for destructive/important actions
 * (kit ref: 9.5.5 Log Out, 9.5.3-F Delete Account, "End session.png").
 * Kit shows this as a centered card with stacked full-width pill buttons —
 * NOT a bottom sheet — with a dimmed backdrop and the page still faintly
 * visible/scrollable behind it.
 */
export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message = "",
  confirmLabel = "Yes",
  cancelLabel = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-ink-900/45 z-50"
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-8 pointer-events-none">
            <motion.div
              key="dialog"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="confirm-dialog-title"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className="w-full max-w-[340px] bg-white rounded-3xl p-6 pointer-events-auto"
            >
              <h2 id="confirm-dialog-title" className="text-lg font-bold font-display text-ink-900 text-center">
                {title}
              </h2>
              {message && <p className="text-sm text-ink-700 text-center mt-3 leading-relaxed">{message}</p>}

              <div className="flex flex-col gap-3 mt-6">
                <button
                  type="button"
                  onClick={onConfirm}
                  className={`w-full h-14 rounded-full font-semibold text-[15px] text-white ${
                    danger ? "bg-red-500" : "bg-brand-500"
                  }`}
                >
                  {confirmLabel}
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="w-full h-14 rounded-full bg-brand-50 text-ink-900 font-semibold text-[15px]"
                >
                  {cancelLabel}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
