import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser, HiOutlinePhone, HiOutlineCamera } from "react-icons/hi2";
import TopBar from "../../components/common/TopBar";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { updateProfile } from "../../api/profile";
import { resolveImageUrl, getErrorMessage } from "../../api/client";

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, updateLocalUser } = useAuth();
  const { showToast } = useToast();
  const fileInputRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar ? resolveImageUrl(user.avatar) : null);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateProfile({ name, phone, avatarFile });
      updateLocalUser(res.data);
      showToast("Profile updated", "success");
      navigate("/profile");
    } catch (error) {
      showToast(getErrorMessage(error), "error");
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      <TopBar title="Edit Profile" />

      <div className="flex flex-col items-center mt-4 mb-6">
        <div className="relative">
          {avatarPreview ? (
            <img src={avatarPreview} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-brand-50 flex items-center justify-center text-3xl font-bold font-display text-brand-600">
              {name?.[0]?.toUpperCase() || "U"}
            </div>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center border-2 border-white"
          >
            <HiOutlineCamera size={14} />
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 space-y-4">
        <Input label="Full Name" icon={HiOutlineUser} value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Email" value={user?.email || ""} disabled className="opacity-60" />
        <Input label="Phone Number" icon={HiOutlinePhone} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92 300 1234567" />

        <Button type="submit" className="mt-6!" loading={saving}>Save Changes</Button>
      </form>
    </div>
  );
}
