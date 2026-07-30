import { useState } from "react";
import { HiOutlineLockClosed, HiOutlineExclamationTriangle } from "react-icons/hi2";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import TopBar from "../../components/common/TopBar";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useToast } from "../../context/ToastContext";
import { resetPasswordApi } from "../../api/auth";
import { getErrorMessage } from "../../api/client";

export default function NewPassword() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Reset link mein token na ho to seedha yahan aana galat hai — forgot-password pe bhej dena
  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-5">
          <HiOutlineExclamationTriangle size={26} className="text-red-500" />
        </div>
        <h1 className="text-xl font-bold font-display text-ink-900">Invalid Reset Link</h1>
        <p className="text-sm text-ink-400 mt-2 max-w-[260px]">
          This link is missing or invalid. Please request a new password reset link.
        </p>
        <Link to="/auth/forgot-password" className="text-brand-600 font-semibold text-sm mt-6">
          Request New Link
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    setLoading(true);
    try {
      await resetPasswordApi(token, password);
      showToast("Password reset successfully. Please login.", "success");
      navigate("/auth/login");
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar title="" />
      <div className="px-6 pt-6 flex flex-col flex-1">
        <h1 className="text-2xl font-bold font-display text-ink-900">Set New Password</h1>
        <p className="text-ink-400 text-sm mt-2 leading-relaxed">
          Your new password must be different from previously used passwords.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 flex-1">
          <Input
            label="New Password"
            icon={HiOutlineLockClosed}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            minLength={6}
            required
          />
          <Input
            label="Confirm Password"
            icon={HiOutlineLockClosed}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            minLength={6}
            required
          />
          <Button type="submit" className="mt-6!" loading={loading}>Reset Password</Button>
        </form>
      </div>
    </div>
  );
}
