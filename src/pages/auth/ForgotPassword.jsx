import { useState } from "react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { Link } from "react-router-dom";
import TopBar from "../../components/common/TopBar";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useToast } from "../../context/ToastContext";
import { forgotPasswordApi } from "../../api/auth";
import { getErrorMessage } from "../../api/client";

export default function ForgotPassword() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPasswordApi(email);
      setSent(true);
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar title="" />
        <div className="px-6 pt-6 flex flex-col flex-1 items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mb-6 mt-10">
            <HiOutlineEnvelope size={26} className="text-brand-600" />
          </div>
          <h1 className="text-2xl font-bold font-display text-ink-900">Check your email</h1>
          <p className="text-ink-400 text-sm mt-2 leading-relaxed max-w-[280px]">
            If an account exists for <span className="font-semibold text-ink-700">{email}</span>, a password reset link has been sent. The link expires in 10 minutes.
          </p>
          <Link to="/auth/login" className="text-brand-600 font-semibold text-sm mt-8">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar title="" />
      <div className="px-6 pt-6 flex flex-col flex-1">
        <h1 className="text-2xl font-bold font-display text-ink-900">Reset Password?</h1>
        <p className="text-ink-400 text-sm mt-2 leading-relaxed">
          Enter the email linked to your account and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 flex-1">
          <Input
            label="Enter Email Address"
            icon={HiOutlineEnvelope}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Button type="submit" loading={loading}>Send Reset Link</Button>
        </form>

        <p className="text-center text-sm text-ink-400 mb-6">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-brand-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
