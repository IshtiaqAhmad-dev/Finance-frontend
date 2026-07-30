import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineBell, HiOutlineMagnifyingGlass, HiOutlineCalendarDays } from "react-icons/hi2";
import { RiCarLine } from "react-icons/ri";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import TabSwitcher from "../../components/common/TabSwitcher";
import TransactionItem from "../../components/cards/TransactionItem";
import { getTrend, getReportSummary } from "../../api/analysis";
import { getTransactions } from "../../api/transactions";
import { formatTransactionForUI } from "../../utils/categoryIcons";
import { useToast } from "../../context/ToastContext";
import { getErrorMessage } from "../../api/client";

const titles = { Daily: "Daily Expenses", Weekly: "Weekly Expenses", Monthly: "Monthly Expenses", Yearly: "Yearly Expenses" };

function AnalysisTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-white px-3 py-2 shadow-[0_8px_20px_rgba(5,34,36,0.15)] text-xs">
      <p className="font-semibold text-ink-900 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.fill }}>
          ${p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export default function Analysis() {
  const [tab, setTab] = useState("Monthly");
  const [chartData, setChartData] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const period = tab.toLowerCase();
      try {
        const [trendRes, summaryRes, txRes] = await Promise.all([
          getTrend({ period }),
          getReportSummary({ period }),
          getTransactions({ type: "expense" }),
        ]);
        setChartData(trendRes.data.map((d) => ({ label: d.period, a: d.income || 0, b: d.expense || 0 })));
        setSummary(summaryRes.data);
        setTransactions(txRes.data.slice(0, 5).map(formatTransactionForUI));
      } catch (error) {
        showToast(getErrorMessage(error), "error");
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <div className="min-h-screen">
      <div className="bg-brand-500 rounded-b-[36px] pb-6 pt-4 px-6 text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold font-display">Quickly Analysis</h1>
          <button
            onClick={() => navigate("/notifications")}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
            aria-label="Notifications"
          >
            <HiOutlineBell size={18} />
          </button>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <div className="w-16 h-16 rounded-full border-2 border-white/70 flex items-center justify-center shrink-0">
            <RiCarLine size={24} />
          </div>
          <span className="text-xs font-semibold leading-tight">
            {tab}
            <br />
            Summary
          </span>
          <div className="w-px h-9 bg-white/30" />
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="opacity-90">Total Income</span>
              <span className="font-bold">${summary.totalIncome?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="h-px bg-white/25" />
            <div className="flex items-center justify-between text-xs">
              <span className="opacity-90">Total Expense</span>
              <span className="font-bold text-accent-blue-light">-${summary.totalExpense?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-1">
        <div className="bg-white mt-5 rounded-3xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold font-display text-ink-900">{titles[tab]}</p>
            <div className="flex gap-2">
              <button onClick={() => navigate("/analysis/search")} className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center" aria-label="Search">
                <HiOutlineMagnifyingGlass size={14} />
              </button>
              <button onClick={() => navigate("/analysis/calendar")} className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center" aria-label="Calendar">
                <HiOutlineCalendarDays size={14} />
              </button>
            </div>
          </div>

          {chartData.length === 0 ? (
            <p className="text-sm text-ink-400 text-center py-10">{loading ? "Loading..." : "No data for this period yet"}</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} barGap={4} barCategoryGap="28%">
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#DFF7E2" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#7D9791" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#7D9791" }} tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)} width={30} />
                <Tooltip cursor={{ fill: "rgba(0,104,255,0.06)" }} content={<AnalysisTooltip />} />
                <Bar dataKey="a" name="Income" fill="#6DB6FE" radius={[6, 6, 6, 6]} maxBarSize={10} />
                <Bar dataKey="b" name="Expense" fill="#0068FF" radius={[6, 6, 6, 6]} maxBarSize={10} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="mt-5">
          <TabSwitcher tabs={["Daily", "Weekly", "Monthly", "Yearly"]} active={tab} onChange={setTab} />
        </div>

        <div className="mt-4 divide-y divide-ink-200/60">
          {transactions.length === 0 && !loading ? (
            <p className="text-sm text-ink-400 text-center py-6">No expense transactions yet.</p>
          ) : (
            transactions.map((t) => <TransactionItem key={t.id} {...t} />)
          )}
        </div>
      </div>
    </div>
  );
}
