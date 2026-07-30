import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiHome, HiOutlineChartBar, HiOutlineSquare3Stack3D, HiOutlineUser, HiPlus } from "react-icons/hi2";
import { RiArrowDownCircleLine, RiArrowUpCircleLine, RiExchangeLine } from "react-icons/ri";
import RaisedCenterFAB from "./RaisedCenterFAB";
import QuickActionMenu from "./QuickActionMenu";

// Left two + right two items sit either side of the raised center FAB.
const leftItems = [
  { to: "/home", icon: HiHome },
  { to: "/analysis", icon: HiOutlineChartBar },
];
const rightItems = [
  { to: "/categories", icon: HiOutlineSquare3Stack3D },
  { to: "/profile", icon: HiOutlineUser },
];

const navLinkClass = ({ isActive }) =>
  `flex items-center justify-center w-11 h-11 rounded-full transition-colors duration-200 ${
    isActive ? "bg-brand-500 text-white" : "text-ink-400"
  }`;

export default function BottomNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const quickActions = [
    { label: "Add Income", icon: RiArrowDownCircleLine, onSelect: () => navigate("/transactions/add?type=income") },
    { label: "Add Expense", icon: RiArrowUpCircleLine, onSelect: () => navigate("/transactions/add?type=expense") },
    { label: "Transfer", icon: RiExchangeLine, onSelect: () => navigate("/transactions/add?type=transfer") },
  ];

  return (
    <>
      <QuickActionMenu open={menuOpen} onClose={() => setMenuOpen(false)} actions={quickActions} />

      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pt-2 z-40"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        <div className="relative flex items-center justify-between bg-surface/95 backdrop-blur rounded-full px-4 py-3 shadow-[0_4px_16px_rgba(9,48,48,0.08)]">
          {leftItems.map(({ to, icon: Icon }) => (
            <NavLink key={to} to={to} className={navLinkClass}>
              <Icon size={22} />
            </NavLink>
          ))}

          {/* Spacer reserves room for the raised FAB so the two side groups don't collide */}
          <div className="w-14" />

          {rightItems.map(({ to, icon: Icon }) => (
            <NavLink key={to} to={to} className={navLinkClass}>
              <Icon size={22} />
            </NavLink>
          ))}

          <RaisedCenterFAB icon={HiPlus} open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
        </div>
      </nav>
    </>
  );
}
