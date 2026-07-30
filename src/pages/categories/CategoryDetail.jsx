import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import TopBar from "../../components/common/TopBar";
import TransactionItem from "../../components/cards/TransactionItem";
import EmptyState from "../../components/common/EmptyState";
import { SkeletonTransactionItem } from "../../components/common/Skeleton";
import { getTransactions } from "../../api/transactions";
import { getCategoryIcon, formatTransactionForUI } from "../../utils/categoryIcons";
import { RiInboxLine } from "react-icons/ri";
import { useToast } from "../../context/ToastContext";
import { getErrorMessage } from "../../api/client";

export default function CategoryDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get("name") || "Category";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const { showToast } = useToast();

  const Icon = getCategoryIcon(categoryName);
  const total = transactions.reduce((sum, t) => sum + t.rawAmount, 0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getTransactions({ category: categoryName, type: "expense" });
        setTransactions(res.data.map(formatTransactionForUI));
      } catch (error) {
        showToast(getErrorMessage(error), "error");
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName]);

  return (
    <div className="min-h-screen">
      <TopBar title={categoryName} />

      <div className="px-6 mt-4">
        <div className="bg-white rounded-3xl p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center text-white">
            <Icon size={24} />
          </div>
          <div>
            <p className="text-xs text-ink-400">Total Spent This Category</p>
            <p className="text-xl font-bold font-display text-ink-900">-${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>

      <div className="px-6 mt-5 divide-y divide-ink-200/60">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonTransactionItem key={i} />)
        ) : transactions.length === 0 ? (
          <EmptyState icon={RiInboxLine} title="No transactions yet" subtitle={`No expenses recorded under ${categoryName} yet.`} />
        ) : (
          transactions.map((t) => <TransactionItem key={t.id} {...t} />)
        )}
      </div>

      <div className="px-6 mt-6">
        <button
          onClick={() => navigate(`/transactions/add?type=expense`)}
          className="w-full h-12 rounded-2xl bg-brand-50 text-brand-700 font-semibold text-sm"
        >
          + Add Expense to {categoryName}
        </button>
      </div>
    </div>
  );
}
