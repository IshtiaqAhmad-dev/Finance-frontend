import { useState } from "react";
import { HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(form);
    setLoading(false);

    if (result.success) {
      showToast("Welcome back!", "success");
      navigate("/home");
    } else {
      showToast(result.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 pt-16 pb-10">
      <div className="mb-10">
        <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center mb-6">
          <span className="text-white text-2xl font-bold font-display">F</span>
        </div>
        <h1 className="text-2xl font-bold font-display text-ink-900">Welcome back</h1>
        <p className="text-ink-400 text-sm mt-1">Login to manage your finances</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        <Input
          label="Email"
          icon={HiOutlineEnvelope}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
        <Input
          label="Password"
          icon={HiOutlineLockClosed}
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />

        <div className="text-right">
          <Link to="/auth/forgot-password" className="text-sm font-semibold text-brand-600">
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" className="mt-6!" loading={loading}>
          Login
        </Button>
      </form>

      <p className="text-center text-sm text-ink-400 mt-8">
        Don't have an account?{" "}
        <Link to="/auth/signup" className="text-brand-600 font-semibold">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
