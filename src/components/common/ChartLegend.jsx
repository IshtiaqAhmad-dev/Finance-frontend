/**
 * Category-breakdown legend that pairs with the Quick Analysis bar chart
 * (kit ref: 7-A Quickly Analysis — colored dots + category name + share,
 * shown beside/under the chart). The previous build only rendered the bars.
 *
 * items: [{ label, value, color }]  — color is a CSS color/token string.
 */
export default function ChartLegend({ items = [] }) {
  const total = items.reduce((sum, i) => sum + i.value, 0) || 1;

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2.5 mt-4">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
          <span className="text-xs font-medium text-ink-700">{item.label}</span>
          <span className="text-xs text-ink-400">{Math.round((item.value / total) * 100)}%</span>
        </div>
      ))}
    </div>
  );
}
