import { HiChevronRight } from "react-icons/hi2";

/**
 * Shared row for settings/menu lists: icon chip + label (+ optional
 * description/value) + chevron. Used by Profile, Security & PIN, and
 * Settings hub screens so the list pattern isn't rebuilt three times.
 */
export default function MenuRow({ icon: Icon, label, description, value, danger = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
    >
      {Icon && (
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
            danger ? "bg-red-50 text-red-500" : "bg-brand-50 text-brand-600"
          }`}
        >
          <Icon size={18} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <span className={`block text-[15px] font-medium ${danger ? "text-red-500" : "text-ink-900"}`}>{label}</span>
        {description && <span className="block text-xs text-ink-400 mt-0.5">{description}</span>}
      </div>
      {value && <span className="text-sm text-ink-400 mr-1">{value}</span>}
      <HiChevronRight size={16} className={danger ? "text-red-300" : "text-ink-400"} />
    </button>
  );
}
