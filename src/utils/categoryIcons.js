import {
  RiRestaurantLine,
  RiCarLine,
  RiShoppingBasketLine,
  RiHome6Line,
  RiGiftLine,
  RiHeartPulseLine,
  RiFilmLine,
  RiCake2Line,
  RiWallet3Line,
  RiPlaneLine,
} from "react-icons/ri";

// Category name (lowercase) -> icon. Naya/unknown category default icon le lega.
const ICON_MAP = {
  food: RiRestaurantLine,
  transport: RiCarLine,
  groceries: RiShoppingBasketLine,
  rent: RiHome6Line,
  gifts: RiGiftLine,
  medicine: RiHeartPulseLine,
  entertainment: RiFilmLine,
  salary: RiCake2Line,
  travel: RiPlaneLine,
};

export const getCategoryIcon = (categoryName = "") =>
  ICON_MAP[categoryName.toLowerCase()] || RiWallet3Line;

const COLOR_CYCLE = ["blue", "brand", "navy"];
export const getCategoryColor = (categoryName = "") => {
  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) hash += categoryName.charCodeAt(i);
  return COLOR_CYCLE[hash % COLOR_CYCLE.length];
};

// Backend Transaction document -> UI-friendly shape used by <TransactionItem />
export const formatTransactionForUI = (t) => {
  const date = new Date(t.date || t.createdAt);
  const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateLabel = date.toLocaleDateString([], { month: "long", day: "numeric" });
  return {
    id: t._id,
    icon: getCategoryIcon(t.category),
    title: t.category,
    subtitle: t.note || t.category,
    date: `${time} - ${dateLabel}`,
    rawDate: t.date,
    amount: Number(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    rawAmount: Number(t.amount),
    positive: t.type === "income",
    color: getCategoryColor(t.category),
    type: t.type,
    category: t.category,
    note: t.note,
  };
};
