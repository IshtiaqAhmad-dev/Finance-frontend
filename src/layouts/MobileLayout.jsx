import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import BottomNav from "../components/common/BottomNav";

// Screens that shouldn't show the bottom nav (auth flow, add-transaction sheet, etc.)
const HIDE_NAV_PREFIXES = ["/auth", "/onboarding", "/launch", "/session-timeout"];

export default function MobileLayout() {
  const location = useLocation();
  const hideNav = HIDE_NAV_PREFIXES.some((p) => location.pathname.startsWith(p));

  return (
    <div className="app-shell overflow-x-hidden">
      <div className={hideNav ? "" : "pb-28"}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
      {!hideNav && <BottomNav />}
    </div>
  );
}
