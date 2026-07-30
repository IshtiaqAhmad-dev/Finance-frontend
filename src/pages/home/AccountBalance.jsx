import { useState, useEffect } from "react";
import { HiOutlineArrowUpRight, HiOutlineDocumentText } from "react-icons/hi2";
import { RiInboxLine } from "react-icons/ri";
import TopBar from "../../components/common/TopBar";
import TransactionItem from "../../components/cards/TransactionItem";
import EmptyState from "../../components/common/EmptyState";
import { SkeletonTransactionItem } from "../../components/common/Skeleton";
import { getSummary } from "../../api/transactions";
import { getTransactions } from "../../api/transactions";
import { formatTransactionForUI } from "../../utils/categoryIcons";
import { useToast } from "../../context/ToastContext";
import { getErrorMessage } from "../../api/client";

export default function AccountBalance() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ totalBalance: 0, totalExpense: 0 });
  const [transactions, setTransactions] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const [summaryRes, txRes] = await Promise.all([getSummary(), getTransactions()]);
        setSummary(summaryRes.data);
        setTransactions(txRes.data.map(formatTransactionForUI));
      } catch (error) {
        showToast(getErrorMessage(error), "error");
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen">
      <div className="bg-brand-500 rounded-b-[36px] pb-10 pt-4 px-6 text-white">
        <TopBar title="Account Balance" dark showBell={false} />

        <div className="flex items-center gap-6 mt-6">
          <div>
            <div className="flex items-center gap-1.5 text-white/80 text-xs">
              <HiOutlineArrowUpRight size={14} />
              <span>Total Balance</span>
            </div>
            <p className="text-2xl font-bold font-display mt-1">${summary.totalBalance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="w-px h-9 bg-white/25" />
          <div>
            <div className="flex items-center gap-1.5 text-white/80 text-xs">
              <HiOutlineDocumentText size={14} />
              <span>Total Expense</span>
            </div>
            <p className="text-2xl font-bold font-display mt-1 text-accent-blue">-${summary.totalExpense?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>

      <div className="px-6 mt-5">
        <p className="text-sm font-semibold text-ink-700 mb-1">All Transactions</p>
        <div className="divide-y divide-ink-200/60">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonTransactionItem key={i} />)
          ) : transactions.length === 0 ? (
            <EmptyState icon={RiInboxLine} title="No transactions yet" subtitle="Transactions you add will show up here." />
          ) : (
            transactions.map((t) => <TransactionItem key={t.id} {...t} />)
          )}
        </div>
      </div>
    </div>
  );
}
