import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RiPlaneLine } from "react-icons/ri";
import { HiOutlineArrowUpRight, HiOutlineDocumentText } from "react-icons/hi2";
import TopBar from "../../components/common/TopBar";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { getGoalById, contributeToGoal } from "../../api/goals";
import { useToast } from "../../context/ToastContext";
import { getErrorMessage } from "../../api/client";

export default function SavingsGoal() {
  const { id } = useParams();
  const { showToast } = useToast();
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);

  const loadGoal = async () => {
    try {
      const res = await getGoalById(id);
      setGoal(res.data);
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGoal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleContribute = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    setSaving(true);
    try {
      await contributeToGoal(id, Number(amount));
      showToast("Contribution added", "success");
      setAmount("");
      await loadGoal();
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !goal) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ink-400 text-sm">Loading goal...</div>
    );
  }

  const percent = goal.targetAmount ? Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100)) : 0;

  return (
    <div className="min-h-screen">
      <div className="bg-brand-500 rounded-b-[36px] pb-6 pt-4 px-6 text-white">
        <TopBar title={goal.title} dark />

        <div className="flex items-center gap-6 mt-6">
          <div>
            <div className="flex items-center gap-1.5 text-white/80 text-xs">
              <HiOutlineArrowUpRight size={14} />
              <span>Saved So Far</span>
            </div>
            <p className="text-2xl font-bold font-display mt-1">${goal.savedAmount.toLocaleString()}.00</p>
          </div>
          <div className="w-px h-9 bg-white/25" />
          <div>
            <div className="flex items-center gap-1.5 text-white/80 text-xs">
              <HiOutlineDocumentText size={14} />
              <span>Target</span>
            </div>
            <p className="text-2xl font-bold font-display mt-1 text-accent-blue">${goal.targetAmount.toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-5">
          <div className="h-9 rounded-full bg-white/25 relative overflow-hidden flex items-center px-1">
            <div className="h-7 rounded-full bg-ink-900 text-white text-xs font-semibold flex items-center px-3" style={{ width: `${Math.max(percent, 8)}%` }}>
              {percent}%
            </div>
            <span className="absolute right-4 text-sm font-semibold italic text-white">${goal.targetAmount.toLocaleString()}.00</span>
          </div>
          <p className="text-xs mt-2 text-white/90">
            {goal.status === "completed" ? "🎉 Goal completed!" : `✅ ${percent}% Of Your Goal, Looks Good.`}
          </p>
        </div>
      </div>

      <div className="px-6 mt-8 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-brand-50 flex items-center justify-center mb-4">
          <RiPlaneLine size={32} className="text-brand-600" />
        </div>
        <p className="text-ink-400 text-sm max-w-[260px]">
          Keep contributing regularly to reach your {goal.title.toLowerCase()} goal faster.
        </p>
      </div>

      <form onSubmit={handleContribute} className="px-6 mt-8 space-y-3">
        <Input
          type="number"
          step="0.01"
          min="0.01"
          placeholder="Amount to add"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button type="submit" loading={saving}>Add More</Button>
      </form>
    </div>
  );
}
