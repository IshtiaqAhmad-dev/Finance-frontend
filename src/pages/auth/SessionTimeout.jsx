import { useNavigate } from "react-router-dom";
import { HiOutlineClock } from "react-icons/hi2";
import { useAuth } from "../../context/AuthContext";

export default function SessionTimeout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleEndSession = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
      <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mb-5">
        <HiOutlineClock size={26} className="text-brand-600" />
      </div>
      <h1 className="text-xl font-bold font-display text-ink-900">End Session</h1>
      <p className="text-sm text-ink-400 mt-2">Are you sure you want to log out?</p>

      <div className="w-full max-w-[300px] mt-8 space-y-3">
        <button
          onClick={handleEndSession}
          className="w-full h-14 rounded-full bg-brand-500 text-white font-semibold text-[15px]"
        >
          Yes, End Session
        </button>
        <button
          onClick={() => navigate("/home")}
          className="w-full h-14 rounded-full bg-brand-50 text-ink-900 font-semibold text-[15px]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
