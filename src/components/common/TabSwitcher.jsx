import { motion } from "framer-motion";

export default function TabSwitcher({ tabs, active, onChange }) {
  return (
    <div className="flex items-center bg-white rounded-full p-1.5">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className="relative flex-1 h-10 rounded-full text-sm font-semibold"
        >
          {active === tab && (
            <motion.div
              layoutId="tab-pill"
              className="absolute inset-0 bg-brand-500 rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className={`relative z-10 ${active === tab ? "text-white" : "text-ink-400"}`}>
            {tab}
          </span>
        </button>
      ))}
    </div>
  );
}
