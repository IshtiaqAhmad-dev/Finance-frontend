import { motion } from "framer-motion";
import { HiOutlineInbox } from "react-icons/hi2";

export default function EmptyState({ icon: Icon = HiOutlineInbox, title = "Nothing here yet", subtitle = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center py-16 px-8"
    >
      <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
        <Icon size={26} className="text-brand-500" />
      </div>
      <p className="text-ink-900 font-semibold text-sm">{title}</p>
      {subtitle && <p className="text-ink-400 text-xs mt-1 max-w-[220px]">{subtitle}</p>}
    </motion.div>
  );
}
