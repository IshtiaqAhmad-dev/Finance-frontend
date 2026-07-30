import { useState, useEffect } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import TopBar from "../../components/common/TopBar";
import TransactionItem from "../../components/cards/TransactionItem";
import EmptyState from "../../components/common/EmptyState";
import { getTransactions } from "../../api/transactions";
import { formatTransactionForUI } from "../../utils/categoryIcons";
import { useToast } from "../../context/ToastContext";
import { getErrorMessage } from "../../api/client";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await getTransactions({ search: query.trim() });
        setResults(res.data.map(formatTransactionForUI));
      } catch (error) {
        showToast(getErrorMessage(error), "error");
      } finally {
        setLoading(false);
        setSearched(true);
      }
    }, 400); // debounce

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="min-h-screen">
      <TopBar title="Search" />
      <div className="px-6 mt-4">
        <div className="flex items-center gap-3 h-14 px-4 rounded-2xl bg-white border border-ink-200 focus-within:border-brand-500">
          <HiOutlineMagnifyingGlass size={19} className="text-ink-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search transactions"
            className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-ink-400"
          />
        </div>
      </div>

      <div className="px-6 mt-4 divide-y divide-ink-200/60">
        {!searched && !loading ? (
          <p className="text-sm text-ink-400 text-center py-8">Type to search your transactions</p>
        ) : loading ? (
          <p className="text-sm text-ink-400 text-center py-8">Searching...</p>
        ) : results.length ? (
          results.map((t) => <TransactionItem key={t.id} {...t} />)
        ) : (
          <EmptyState icon={HiOutlineMagnifyingGlass} title="No transactions found" subtitle="Try searching with a different keyword" />
        )}
      </div>
    </div>
  );
}
