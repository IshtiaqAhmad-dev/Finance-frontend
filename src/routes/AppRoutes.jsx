import { Routes, Route, Navigate } from "react-router-dom";
import MobileLayout from "../layouts/MobileLayout";
import Placeholder from "../pages/Placeholder";
import Launch from "../pages/onboarding/Launch";
import Onboarding from "../pages/onboarding/Onboarding";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";

// Fully-built pages (added progressively in Phase 3)
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import NewPassword from "../pages/auth/NewPassword";
import SecurityPin from "../pages/auth/SecurityPin";
import SecurityFingerprint from "../pages/auth/SecurityFingerprint";
import SessionTimeout from "../pages/auth/SessionTimeout";
import Home from "../pages/home/Home";
import Notifications from "../pages/home/Notifications";
import AccountBalance from "../pages/home/AccountBalance";
import AddTransaction from "../pages/transactions/AddTransaction";
import Transactions from "../pages/transactions/Transactions";
import Analysis from "../pages/analysis/Analysis";
import Search from "../pages/analysis/Search";
import Calendar from "../pages/analysis/Calendar";
import Categories from "../pages/categories/Categories";
import CategoryDetail from "../pages/categories/CategoryDetail";
import SavingsGoal from "../pages/categories/SavingsGoal";
import NewCategory from "../pages/categories/NewCategory";
import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";
import SecuritySettings from "../pages/profile/SecuritySettings";
import ChangePin from "../pages/profile/ChangePin";
import FingerprintManagement from "../pages/profile/FingerprintManagement";
import SettingsHub from "../pages/profile/SettingsHub";
import NotificationSettings from "../pages/profile/NotificationSettings";
import PasswordSettings from "../pages/profile/PasswordSettings";
import DeleteAccount from "../pages/profile/DeleteAccount";
import HelpCenter from "../pages/profile/HelpCenter";
import OnlineSupport from "../pages/profile/OnlineSupport";

export default function AppRoutes() {
  const { isAuthenticated, initializing } = useAuth();

  return (
    <Routes>
      <Route element={<MobileLayout />}>
        {/* Launch / Onboarding */}
        <Route path="/launch" element={<Launch />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Auth flow */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/new-password" element={<NewPassword />} />
        <Route path="/auth/security-pin" element={<SecurityPin />} />
        <Route path="/auth/fingerprint" element={<SecurityFingerprint />} />
        <Route path="/session-timeout" element={<SessionTimeout />} />

        {/* Everything below requires a logged-in user */}
        <Route element={<ProtectedRoute />}>
          {/* Home / dashboard */}
          <Route path="/home" element={<Home />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/account-balance" element={<AccountBalance />} />

          {/* Transactions */}
          <Route path="/transactions/add" element={<AddTransaction />} />
          <Route path="/transactions" element={<Transactions />} />

          {/* Analysis */}
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/analysis/search" element={<Search />} />
          <Route path="/analysis/calendar" element={<Calendar />} />

          {/* Categories */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/new" element={<NewCategory />} />
          <Route path="/categories/:id" element={<CategoryDetail />} />
          <Route path="/savings/:id" element={<SavingsGoal />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile/security" element={<SecuritySettings />} />
          <Route path="/profile/security/change-pin" element={<ChangePin />} />
          <Route path="/profile/security/fingerprint" element={<FingerprintManagement />} />
          <Route path="/profile/settings" element={<SettingsHub />} />
          <Route path="/profile/settings/notifications" element={<NotificationSettings />} />
          <Route path="/profile/settings/password" element={<PasswordSettings />} />
          <Route path="/profile/settings/delete-account" element={<DeleteAccount />} />
          <Route path="/profile/help-center" element={<HelpCenter />} />
          <Route path="/profile/support" element={<OnlineSupport />} />
        </Route>
      </Route>

      <Route
        path="/"
        element={initializing ? null : <Navigate to={isAuthenticated ? "/home" : "/launch"} replace />}
      />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/launch"} replace />} />
    </Routes>
  );
}
