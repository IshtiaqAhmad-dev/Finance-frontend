import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineTag } from "react-icons/hi2";
import { RiRestaurantLine, RiCarLine, RiGiftLine, RiFilmLine, RiPlaneLine, RiHeartPulseLine, RiShoppingBasketLine, RiHome6Line } from "react-icons/ri";
import TopBar from "../../components/common/TopBar";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useToast } from "../../context/ToastContext";
import { createCategory } from "../../api/categories";
import { getErrorMessage } from "../../api/client";

const icons = [RiRestaurantLine, RiCarLine, RiGiftLine, RiFilmLine, RiPlaneLine, RiHeartPulseLine, RiShoppingBasketLine, RiHome6Line];
const colors = [
  "var(--color-brand-500)",
  "var(--color-accent-blue)",
  "var(--color-brand-400)",
  "var(--color-accent-blue-mid)",
  "var(--color-brand-600)",
  "var(--color-accent-blue-light)",
  "var(--color-brand-700)",
  "var(--color-ink-900)",
];

// icon component ko backend-friendly string se map karna (icon-picker sirf visual hai,
// asal icon lookup category *name* se hota hai — see utils/categoryIcons.js)
const iconNames = ["RiRestaurantLine", "RiCarLine", "RiGiftLine", "RiFilmLine", "RiPlaneLine", "RiHeartPulseLine", "RiShoppingBasketLine", "RiHome6Line"];

export default function NewCategory() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [type, setType] = useState("expense");
  const [selectedIcon, setSelectedIcon] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createCategory({
        name,
        type,
        icon: iconNames[selectedIcon],
        color: colors[selectedColor].startsWith("var(") ? undefined : colors[selectedColor],
      });
      showToast("Category created", "success");
      navigate("/categories");
    } catch (error) {
      showToast(getErrorMessage(error), "error");
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      <TopBar title="New Category" />

      <form onSubmit={handleSubmit} className="px-6 mt-4 space-y-6">
        <Input label="Category Name" icon={HiOutlineTag} placeholder="e.g. Subscriptions" value={name} onChange={(e) => setName(e.target.value)} required />

        <div>
          <p className="text-sm font-medium text-ink-700 mb-3">Type</p>
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
        </div>

        <div>
          <p className="text-sm font-medium text-ink-700 mb-3">Choose Icon</p>
          <div className="grid grid-cols-4 gap-3">
            {icons.map((Icon, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setSelectedIcon(i)}
                className={`w-full aspect-square rounded-2xl flex items-center justify-center transition-colors ${
                  selectedIcon === i ? "bg-brand-500 text-white" : "bg-white text-ink-400 border border-ink-200"
                }`}
              >
                <Icon size={22} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-ink-700 mb-3">Choose Color</p>
          <div className="flex flex-wrap gap-3">
            {colors.map((c, i) => (
              <button
                type="button"
                key={c}
                onClick={() => setSelectedColor(i)}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: c, outline: selectedColor === i ? "3px solid var(--color-ink-900)" : "none", outlineOffset: 2 }}
              />
            ))}
          </div>
        </div>

        <Button type="submit" className="mt-4!" loading={saving}>Create Category</Button>
      </form>
    </div>
  );
}
