export default function Input({ label, icon: Icon, className = "", ...props }) {
  return (
    <label className="block">
      {label && (
        <span className="text-sm font-medium text-ink-700 mb-2 block">{label}</span>
      )}
      <div className="flex items-center gap-3 h-14 px-4 rounded-2xl bg-white border border-ink-200 focus-within:border-brand-500 transition-colors">
        {Icon && <Icon size={19} className="text-ink-400 shrink-0" />}
        <input
          className={`flex-1 bg-transparent outline-none text-[15px] text-ink-900 placeholder:text-ink-400 ${className}`}
          {...props}
        />
      </div>
    </label>
  );
}
