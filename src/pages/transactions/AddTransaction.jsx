import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HiOutlinePencilSquare, HiOutlineCalendarDays } from "react-icons/hi2";
import { RiRestaurantLine, RiCarLine, RiShoppingBasketLine, RiHome6Line, RiGiftLine, RiHeartPulseLine, RiFilmLine } from "react-icons/ri";
import TopBar from "../../components/common/TopBar";
import Button from "../../components/common/Button";
import { useToast } from "../../context/ToastContext";
import { addTransaction } from "../../api/transactions";
import { getErrorMessage } from "../../api/client";

const categories = [
  { name: "Food", icon: RiRestaurantLine },
  { name: "Transport", icon: RiCarLine },
  { name: "Groceries", icon: RiShoppingBasketLine },
  { name: "Rent", icon: RiHome6Line },
  { name: "Gifts", icon: RiGiftLine },
  { name: "Medicine", icon: RiHeartPulseLine },
  { name: "Entertainment", icon: RiFilmLine },
];

export default function AddTransaction() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") === "income" ? "income" : "expense";
  const [type, setType] = useState(initialType);
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await addTransaction({
        amount: Number(amount),
        type,
        category,
        note,
        date: date || undefined,
      });
      showToast(`${type === "income" ? "Income" : "Expense"} added successfully`, "success");
      navigate("/home");
    } catch (error) {
      showToast(getErrorMessage(error), "error");
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      <TopBar title="Add Transaction" />

      <form onSubmit={handleSave} className="px-6 mt-4">
        {/* Income / Expense toggle */}
        <div className="flex bg-white rounded-full p-1.5">
          {["expense", "income"].map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setType(t)}
              className={`flex-1 h-11 rounded-full text-sm font-semibold capitalize transition-colors ${
                type === t ? "bg-brand-500 text-white" : "text-ink-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Amount */}
        <div className="text-center mt-8 mb-8">
          <p className="text-xs text-ink-400 mb-2">Enter Amount</p>
          <div className="flex items-center justify-center gap-1">
            <span className="text-2xl font-bold text-ink-400">$</span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              className="text-4xl font-bold font-display text-ink-900 text-center w-40 outline-none bg-transparent placeholder:text-ink-200"
              required
            />
          </div>
        </div>

        {/* Category picker */}
        <p className="text-sm font-semibold text-ink-700 mb-3">Category</p>
        <div className="grid grid-cols-4 gap-3 mb-8">
          {categories.map((c) => (
            <button
              type="button"
              key={c.name}
              onClick={() => setCategory(c.name)}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                  category === c.name ? "bg-brand-500 text-white" : "bg-white text-ink-400"
                }`}
              >
                <c.icon size={22} />
              </div>
              <span className="text-[11px] text-ink-700 font-medium">{c.name}</span>
            </button>
          ))}
        </div>

        {/* Note + Date */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 h-14 px-4 rounded-2xl bg-white border border-ink-200">
            <HiOutlinePencilSquare size={19} className="text-ink-400" />
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note"
              className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-ink-400"
            />
          </div>
          <div className="flex items-center gap-3 h-14 px-4 rounded-2xl bg-white border border-ink-200">
            <HiOutlineCalendarDays size={19} className="text-ink-400" />
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="flex-1 bg-transparent outline-none text-[15px] text-ink-700"
            />
          </div>
        </div>

        <Button type="submit" loading={saving}>Save Transaction</Button>
      </form>
    </div>
  );
}
