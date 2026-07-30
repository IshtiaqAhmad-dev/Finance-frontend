import { useState, useEffect } from "react";
import { RiInboxLine } from "react-icons/ri";
import TopBar from "../../components/common/TopBar";
import TabSwitcher from "../../components/common/TabSwitcher";
import TransactionItem from "../../components/cards/TransactionItem";
import FilterButton from "../../components/common/FilterButton";
import EmptyState from "../../components/common/EmptyState";
import { SkeletonTransactionItem } from "../../components/common/Skeleton";
import { getTransactions } from "../../api/transactions";
import { formatTransactionForUI } from "../../utils/categoryIcons";
import { useToast } from "../../context/ToastContext";
import { getErrorMessage } from "../../api/client";

const sortOptions = [
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
  { label: "Amount: high to low", value: "amount-desc" },
  { label: "Amount: low to high", value: "amount-asc" },
];

export default function Transactions() {
  const [tab, setTab] = useState("All");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [all, setAll] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getTransactions();
        setAll(res.data.map(formatTransactionForUI));
      } catch (error) {
        showToast(getErrorMessage(error), "error");
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = all
    .filter((t) => {
      if (tab === "All") return true;
      if (tab === "Income") return t.positive;
      return !t.positive;
    })
    .slice()
    .sort((a, b) => {
      if (sort === "amount-desc") return b.rawAmount - a.rawAmount;
      if (sort === "amount-asc") return a.rawAmount - b.rawAmount;
      if (sort === "oldest") return new Date(a.rawDate) - new Date(b.rawDate);
      return new Date(b.rawDate) - new Date(a.rawDate); // newest
    });

  return (
    <div className="min-h-screen">
      <TopBar title="Transactions" showBack={false} right={<FilterButton options={sortOptions} active={sort} onChange={setSort} />} />

      <div className="px-6 mt-4">
        <TabSwitcher tabs={["All", "Income", "Expense"]} active={tab} onChange={setTab} />
      </div>

      <div className="px-6 mt-4 divide-y divide-ink-200/60">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonTransactionItem key={i} />)
        ) : filtered.length === 0 ? (
          <EmptyState icon={RiInboxLine} title="No transactions yet" subtitle="Transactions you add will show up here." />
        ) : (
          filtered.map((t) => <TransactionItem key={t.id} {...t} />)
        )}
      </div>
    </div>
  );
}
