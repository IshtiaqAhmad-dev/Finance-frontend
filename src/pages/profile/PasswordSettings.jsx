import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLockClosed } from "react-icons/hi2";
import TopBar from "../../components/common/TopBar";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useToast } from "../../context/ToastContext";
import { changePassword } from "../../api/security";
import { getErrorMessage } from "../../api/client";

export default function PasswordSettings() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      showToast("New passwords do not match", "error");
      return;
    }

    setSaving(true);
    try {
      await changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
      showToast("Password has been changed successfully", "success");
      navigate("/profile/settings");
    } catch (error) {
      showToast(getErrorMessage(error), "error");
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      <TopBar title="Password Settings" />

      <form onSubmit={handleSubmit} className="px-6 mt-6 space-y-5">
        <Input label="Current Password" type="password" name="currentPassword" icon={HiOutlineLockClosed} value={form.currentPassword} onChange={handleChange} placeholder="••••••••" required />
        <Input label="New Password" type="password" name="newPassword" icon={HiOutlineLockClosed} value={form.newPassword} onChange={handleChange} placeholder="••••••••" minLength={6} required />
        <Input label="Confirm New Password" type="password" name="confirmPassword" icon={HiOutlineLockClosed} value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" minLength={6} required />

        <Button type="submit" className="mt-2!" loading={saving}>Change Password</Button>
      </form>
    </div>
  );
}
