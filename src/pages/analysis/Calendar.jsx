import { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import TopBar from "../../components/common/TopBar";
import TransactionItem from "../../components/cards/TransactionItem";
import { useNavigate } from "react-router-dom";
import { getTransactionsByDate } from "../../api/transactions";
import { formatTransactionForUI } from "../../utils/categoryIcons";
import { useToast } from "../../context/ToastContext";
import { getErrorMessage } from "../../api/client";

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Local date ko YYYY-MM-DD mein convert karna (UTC shift se bachne ke liye)
const toDateKey = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export default function Calendar() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(today.getDate());
  const [dayTransactions, setDayTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = new Date(year, month, 1).getDay();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const dateKey = toDateKey(new Date(year, month, selected));
      try {
        const res = await getTransactionsByDate(dateKey);
        setDayTransactions(res.data.map(formatTransactionForUI));
      } catch (error) {
        showToast(getErrorMessage(error), "error");
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, month, year]);

  const changeMonth = (delta) => {
    const next = new Date(year, month + delta, 1);
    setViewDate(next);
    setSelected(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar title="Calendar" />

      <div className="px-6 mt-4">
        <div className="flex items-center justify-between mb-5">
          <button onClick={() => changeMonth(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-ink-700">
            <HiChevronLeft size={18} />
          </button>
          <p className="font-bold font-display text-ink-900">{MONTH_NAMES[month]} {year}</p>
          <button onClick={() => changeMonth(1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-ink-700">
            <HiChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-y-3 text-center">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <span key={i} className="text-xs text-ink-400 font-medium">{d}</span>
          ))}
          {Array.from({ length: startOffset }).map((_, i) => (
            <span key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
            <button
              key={day}
              onClick={() => setSelected(day)}
              className={`w-9 h-9 rounded-full text-sm font-medium mx-auto flex items-center justify-center transition-colors ${
                selected === day ? "bg-brand-500 text-white" : "text-ink-700"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 mt-6 flex-1 divide-y divide-ink-200/60">
        <p className="text-sm font-semibold text-ink-700 mb-2">
          Transactions on {MONTH_NAMES[month]} {selected}, {year}
        </p>
        {loading ? (
          <p className="text-sm text-ink-400 py-4">Loading...</p>
        ) : dayTransactions.length === 0 ? (
          <p className="text-sm text-ink-400 py-4">No transactions on this day.</p>
        ) : (
          dayTransactions.map((t) => <TransactionItem key={t.id} {...t} />)
        )}
      </div>

      <div className="px-6 mb-6">
        <button onClick={() => navigate("/analysis")} className="w-full h-14 rounded-full bg-brand-500 text-white font-semibold text-[15px]">
          Back to Analysis
        </button>
      </div>
    </div>
  );
}
