import { useState, useEffect } from "react";
import { HiOutlineBell, HiOutlineArrowUpRight, HiOutlineDocumentText } from "react-icons/hi2";
import { RiCarLine } from "react-icons/ri";
import TabSwitcher from "../../components/common/TabSwitcher";
import TransactionItem from "../../components/cards/TransactionItem";
import AnimatedCounter from "../../components/common/AnimatedCounter";
import { SkeletonHome } from "../../components/common/Skeleton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getSummary } from "../../api/transactions";
import { getGoals } from "../../api/goals";
import { formatTransactionForUI } from "../../utils/categoryIcons";
import { useToast } from "../../context/ToastContext";
import { getErrorMessage } from "../../api/client";

export default function Home() {
  const [tab, setTab] = useState("Monthly");
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ totalBalance: 0, totalIncome: 0, totalExpense: 0, recentTransactions: [] });
  const [topGoal, setTopGoal] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const [summaryRes, goalsRes] = await Promise.all([getSummary(), getGoals({ status: "active" })]);
        setSummary(summaryRes.data);
        setTopGoal(goalsRes.data?.[0] || null);
      } catch (error) {
        showToast(getErrorMessage(error), "error");
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <SkeletonHome />;

  const expensePercent = summary.totalIncome
    ? Math.min(100, Math.round((summary.totalExpense / summary.totalIncome) * 100))
    : 0;

  return (
    <div className="min-h-screen">
      {/* Green header */}
      <div className="bg-brand-500 rounded-b-[36px] pb-16 pt-4 px-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold font-display">Hi, {user?.name || "Welcome Back"}</h1>
            <p className="text-white/80 text-sm">Good to see you</p>
          </div>
          <button
            onClick={() => navigate("/notifications")}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
            aria-label="Notifications"
          >
            <HiOutlineBell size={18} />
          </button>
        </div>

        <div className="flex items-center gap-6 mt-6">
          <div>
            <div className="flex items-center gap-1.5 text-white/80 text-xs">
              <HiOutlineArrowUpRight size={14} />
              <span>Total Balance</span>
            </div>
            <p className="text-2xl font-bold font-display mt-1">
              <AnimatedCounter value={summary.totalBalance} prefix="$" />
            </p>
          </div>
          <div className="w-px h-9 bg-white/25" />
          <div>
            <div className="flex items-center gap-1.5 text-white/80 text-xs">
              <HiOutlineDocumentText size={14} />
              <span>Total Expense</span>
            </div>
            <p className="text-2xl font-bold font-display mt-1 text-accent-blue">
              <AnimatedCounter value={summary.totalExpense} prefix="-$" />
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div className="h-9 rounded-full bg-white/25 relative overflow-hidden flex items-center px-1">
            <div className="h-7 rounded-full bg-ink-900 text-white text-xs font-semibold flex items-center px-3" style={{ width: `${Math.max(expensePercent, 8)}%` }}>
              {expensePercent}%
            </div>
            <span className="absolute right-4 text-sm font-semibold italic text-white">${summary.totalIncome.toLocaleString()}</span>
          </div>
          <p className="text-xs mt-2 text-white/90">
            {expensePercent <= 50 ? "✅" : "⚠️"} {expensePercent}% Of Your Income Spent This Period.
          </p>
        </div>
      </div>

      {/* Savings on Goals card — floats over the header */}
      {topGoal && (
        <div className="px-6 -mt-10">
          <button onClick={() => navigate(`/savings/${topGoal._id}`)} className="w-full bg-brand-500 rounded-3xl p-5 flex items-center gap-4 text-left">
            <div className="w-16 h-16 rounded-full border-2 border-white/70 flex items-center justify-center shrink-0">
              <RiCarLine size={26} className="text-white" />
            </div>
            <div className="text-white text-xs font-semibold leading-tight">
              Savings
              <br />
              On Goals
            </div>
            <div className="w-px h-9 bg-white/30" />
            <div className="flex-1 space-y-2 text-white">
              <div className="flex items-center justify-between text-xs">
                <span className="opacity-90">{topGoal.title}</span>
              </div>
              <p className="text-sm font-bold -mt-2">${topGoal.savedAmount.toLocaleString()}.00</p>
              <div className="h-px bg-white/25" />
              <div className="flex items-center justify-between text-xs">
                <span className="opacity-90">Target</span>
              </div>
              <p className="text-sm font-bold -mt-2 text-accent-blue">${topGoal.targetAmount.toLocaleString()}.00</p>
            </div>
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="px-6 mt-6">
        <TabSwitcher tabs={["Daily", "Weekly", "Monthly"]} active={tab} onChange={setTab} />
      </div>

      {/* Transaction list */}
      <div className="px-6 mt-2 divide-y divide-ink-200/60">
        {summary.recentTransactions.length === 0 ? (
          <p className="text-sm text-ink-400 text-center py-8">No transactions yet. Add your first one!</p>
        ) : (
          summary.recentTransactions.map((t) => <TransactionItem key={t._id} {...formatTransactionForUI(t)} />)
        )}
      </div>
    </div>
  );
}
