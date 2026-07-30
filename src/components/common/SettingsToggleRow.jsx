/**
 * Reusable settings row: icon + label (+ optional description) + toggle switch.
 * Kit ref: 9.5.3 Notification Settings, which needs several of these rows.
 * Profile's Dark Mode row previously hand-built this inline as a one-off.
 */
export default function SettingsToggleRow({ icon: Icon, label, description, checked, onChange }) {
  return (
    <div className="w-full flex items-center gap-3 px-4 py-3.5">
      {Icon && (
        <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
          <Icon size={18} />
        </div>
      )}
      <div className="flex-1 text-left min-w-0">
        <span className="block text-[15px] font-medium text-ink-900">{label}</span>
        {description && <span className="block text-xs text-ink-400 mt-0.5">{description}</span>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange?.(!checked)}
        className={`w-11 h-6 rounded-full flex items-center px-0.5 shrink-0 transition-colors ${
          checked ? "bg-brand-500 justify-end" : "bg-ink-200 justify-start"
        }`}
      >
        <span className="w-5 h-5 rounded-full bg-white block" />
      </button>
    </div>
  );
}
