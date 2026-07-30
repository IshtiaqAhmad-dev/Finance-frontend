import { useState } from "react";
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    setLoading(true);
    const result = await signup({ name: form.name, email: form.email, password: form.password });
    setLoading(false);

    if (result.success) {
      navigate("/auth/security-pin");
    } else {
      showToast(result.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 pt-16 pb-10">
      <div className="mb-8">
        <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center mb-6">
          <span className="text-white text-2xl font-bold font-display">F</span>
        </div>
        <h1 className="text-2xl font-bold font-display text-ink-900">Create account</h1>
        <p className="text-ink-400 text-sm mt-1">Start tracking your finances today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        <Input label="Full Name" icon={HiOutlineUser} type="text" name="name" value={form.name} onChange={handleChange} placeholder="Ishtiaq" required />
        <Input label="Email" icon={HiOutlineEnvelope} type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
        <Input label="Password" icon={HiOutlineLockClosed} type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" minLength={6} required />
        <Input label="Confirm Password" icon={HiOutlineLockClosed} type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" minLength={6} required />

        <label className="flex items-center gap-2.5 pt-1">
          <input type="checkbox" required className="w-4 h-4 accent-brand-500" />
          <span className="text-xs text-ink-400">
            I agree to the <span className="text-brand-600 font-semibold">Terms & Conditions</span>
          </span>
        </label>

        <Button type="submit" className="mt-6!" loading={loading}>
          Sign Up
        </Button>
      </form>

      <p className="text-center text-sm text-ink-400 mt-8">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-brand-600 font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
}
