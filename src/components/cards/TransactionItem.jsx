const iconBg = {
  blue: "bg-accent-blue-light",
  brand: "bg-brand-500",
  navy: "bg-accent-blue",
};

export default function TransactionItem({ icon: Icon, title, subtitle, date, amount, positive, color = "blue" }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 ${iconBg[color]}`}>
        <Icon size={19} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold text-ink-900 truncate">{title}</p>
        <p className="text-xs text-accent-blue mt-0.5">{date}</p>
      </div>
      <div className="text-right shrink-0 pl-2 border-l border-ink-200">
        <p className="text-xs text-ink-400 mb-0.5">{subtitle}</p>
        <p className={`text-[15px] font-bold ${positive ? "text-ink-900" : "text-accent-blue"}`}>
          {positive ? "" : "-"}${amount}
        </p>
      </div>
    </div>
  );
}
