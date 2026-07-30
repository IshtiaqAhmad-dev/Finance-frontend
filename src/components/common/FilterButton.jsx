import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineAdjustmentsHorizontal, HiCheck } from "react-icons/hi2";

/**
 * Icon button (matches the TopBar circular icon style) that opens a small
 * dropdown of filter/sort options. Kit ref: filter icon on the Transactions
 * list top bar (9.3.0), which the previous build was missing entirely.
 *
 * options: [{ label, value }]
 */
export default function FilterButton({ options = [], active, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Filter and sort"
        aria-expanded={open}
        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-ink-700"
      >
        <HiOutlineAdjustmentsHorizontal size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} aria-hidden="true" />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-12 z-40 w-52 bg-white rounded-2xl shadow-[0_10px_24px_rgba(9,48,48,0.15)] p-1.5"
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange?.(opt.value);
                    setOpen(false);
                  }}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left text-sm font-medium text-ink-900 hover:bg-brand-50"
                >
                  {opt.label}
                  {active === opt.value && <HiCheck size={16} className="text-brand-500 shrink-0" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
