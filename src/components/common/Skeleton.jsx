export function SkeletonLine({ className = "" }) {
  return <div className={`animate-pulse bg-ink-200/60 rounded-lg ${className}`} />;
}

export function SkeletonTransactionItem() {
  return (
    <div className="flex items-center gap-3 py-3">
      <SkeletonLine className="w-11 h-11 rounded-2xl shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonLine className="h-3.5 w-2/5" />
        <SkeletonLine className="h-2.5 w-1/3" />
      </div>
      <SkeletonLine className="h-4 w-14" />
    </div>
  );
}

export function SkeletonHome() {
  return (
    <div className="px-6 pt-6 space-y-6">
      <SkeletonLine className="h-28 w-full rounded-3xl" />
      <SkeletonLine className="h-24 w-full rounded-3xl" />
      <div className="space-y-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonTransactionItem key={i} />
        ))}
      </div>
    </div>
  );
}

export function SkeletonGrid({ items = 6, columns = 3 }) {
  const size = columns === 4 ? "w-16 h-16" : "w-[76px] h-[76px]";
  return (
    <div className={`grid gap-5`} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <SkeletonLine className={`${size} rounded-3xl`} />
          <SkeletonLine className="h-2.5 w-10" />
        </div>
      ))}
    </div>
  );
}
