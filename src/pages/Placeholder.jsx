import TopBar from "../components/common/TopBar";

export default function Placeholder({ title }) {
  return (
    <div className="min-h-screen">
      <TopBar title={title} />
      <div className="flex flex-col items-center justify-center h-[70vh] px-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
          <span className="text-2xl">🚧</span>
        </div>
        <p className="text-ink-700 font-medium">{title}</p>
        <p className="text-ink-400 text-sm mt-1">Ye screen Phase 3 mein banegi</p>
      </div>
    </div>
  );
}
