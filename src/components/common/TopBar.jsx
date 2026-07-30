import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineBell } from "react-icons/hi2";

export default function TopBar({ title, showBack = true, showBell = false, dark = false, onBellClick, right = null }) {
  const navigate = useNavigate();

  const iconWrap = dark
    ? "bg-white/20 text-white"
    : "bg-white text-ink-900";

  return (
    <div className="flex items-center justify-between px-6 pt-4">
      {showBack ? (
        <button
          onClick={() => navigate(-1)}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${iconWrap}`}
          aria-label="Go back"
        >
          <HiOutlineArrowLeft size={18} />
        </button>
      ) : (
        <div className="w-10" />
      )}

      {title && (
        <h1 className={`text-lg font-bold font-display ${dark ? "text-white" : "text-ink-900"}`}>
          {title}
        </h1>
      )}

      {right ? (
        right
      ) : showBell ? (
        <button
          onClick={onBellClick}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${iconWrap}`}
          aria-label="Notifications"
        >
          <HiOutlineBell size={18} />
        </button>
      ) : (
        <div className="w-10" />
      )}
    </div>
  );
}
