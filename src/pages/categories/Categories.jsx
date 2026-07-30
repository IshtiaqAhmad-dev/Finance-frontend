import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi2";
import { RiPlaneLine } from "react-icons/ri";
import TopBar from "../../components/common/TopBar";
import { SkeletonGrid } from "../../components/common/Skeleton";
import { getCategories } from "../../api/categories";
import { getGoals } from "../../api/goals";
import { getCategoryIcon } from "../../utils/categoryIcons";
import { useToast } from "../../context/ToastContext";
import { getErrorMessage } from "../../api/client";

function CategoryGrid({ items, onSelect, columns = 3 }) {
  const iconSize = columns === 4 ? "w-16 h-16" : "w-[76px] h-[76px]";
  return (
    <div className={`grid gap-5 ${columns === 4 ? "grid-cols-4" : "grid-cols-3"}`}>
      {items.map((c) => (
        <button key={c.id} onClick={() => onSelect(c)} className="flex flex-col items-center gap-2">
          <div className={`${iconSize} rounded-3xl flex items-center justify-center text-white`} style={{ backgroundColor: c.colorHex }}>
            <c.icon size={24} />
          </div>
          <span className="text-xs font-medium text-ink-700 text-center">{c.name}</span>
        </button>
      ))}
    </div>
  );
}

export default function Categories() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [savingsGoals, setSavingsGoals] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const [catRes, goalsRes] = await Promise.all([getCategories(), getGoals()]);
        setExpenseCategories(
          catRes.data
            .filter((c) => c.type !== "income")
            .map((c) => ({ id: c._id, name: c.name, icon: getCategoryIcon(c.name), colorHex: c.color }))
        );
        setSavingsGoals(
          goalsRes.data.map((g) => ({ id: g._id, name: g.title, icon: RiPlaneLine, colorHex: g.color }))
        );
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
      <TopBar title="Categories" />

      <div className="px-6 mt-5">
        <p className="text-sm font-semibold text-ink-700 mb-4">Expenses</p>
        {loading ? (
          <SkeletonGrid items={7} />
        ) : expenseCategories.length === 0 ? (
          <p className="text-sm text-ink-400">No categories yet — create your first one below.</p>
        ) : (
          <CategoryGrid items={expenseCategories} onSelect={(c) => navigate(`/categories/${c.id}?name=${encodeURIComponent(c.name)}`)} />
        )}
      </div>

      <div className="px-6 mt-8">
        <p className="text-sm font-semibold text-ink-700 mb-4">Savings Goals</p>
        {loading ? (
          <SkeletonGrid items={4} columns={4} />
        ) : savingsGoals.length === 0 ? (
          <p className="text-sm text-ink-400">No savings goals yet.</p>
        ) : (
          <CategoryGrid items={savingsGoals} columns={4} onSelect={(c) => navigate(`/savings/${c.id}`)} />
        )}
      </div>

      <div className="px-6 mt-8">
        <button
          onClick={() => navigate("/categories/new")}
          className="w-full h-14 rounded-2xl border-2 border-dashed border-brand-400 text-brand-600 font-semibold flex items-center justify-center gap-2"
        >
          <HiOutlinePlus size={18} /> New Category
        </button>
      </div>
    </div>
  );
}
