import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlinePencilSquare, HiOutlineLockClosed, HiOutlineBell, HiOutlineCog6Tooth, HiOutlineQuestionMarkCircle, HiOutlineChatBubbleLeftRight, HiOutlineArrowRightOnRectangle, HiOutlineMoon } from "react-icons/hi2";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import SettingsToggleRow from "../../components/common/SettingsToggleRow";
import MenuRow from "../../components/common/MenuRow";
import { resolveImageUrl } from "../../api/client";

const menuGroups = [
  {
    title: "Account",
    items: [
      { label: "Edit Profile", icon: HiOutlinePencilSquare, to: "/profile/edit" },
      { label: "Security & PIN", icon: HiOutlineLockClosed, to: "/profile/security" },
      { label: "Notifications", icon: HiOutlineBell, to: "/notifications" },
      { label: "Settings", icon: HiOutlineCog6Tooth, to: "/profile/settings" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Help Center", icon: HiOutlineQuestionMarkCircle, to: "/profile/help-center" },
      { label: "Online Support", icon: HiOutlineChatBubbleLeftRight, to: "/profile/support" },
    ],
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const { dark, toggleDark } = useTheme();
  const { showToast } = useToast();
  const { user, logout } = useAuth();
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);

  const handleLogout = () => {
    setConfirmLogoutOpen(false);
    logout();
    showToast("Logged out successfully", "success");
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen">
      <div className="bg-brand-500 rounded-b-[36px] pb-10 pt-10 px-6 text-white flex flex-col items-center">
        {user?.avatar ? (
          <img src={resolveImageUrl(user.avatar)} alt="Avatar" className="w-20 h-20 rounded-full object-cover mb-3" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold font-display mb-3">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
        )}
        <p className="font-bold font-display text-lg">{user?.name}</p>
        <p className="text-white/80 text-sm">{user?.email}</p>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-2">{group.title}</p>
            <div className="bg-white rounded-2xl divide-y divide-ink-200/60">
              {group.items.map((item) => (
                <MenuRow key={item.label} icon={item.icon} label={item.label} onClick={() => navigate(item.to)} />
              ))}
            </div>
          </div>
        ))}

        <div>
          <p className="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-2">Preferences</p>
          <div className="bg-white rounded-2xl">
            <SettingsToggleRow icon={HiOutlineMoon} label="Dark Mode" checked={dark} onChange={toggleDark} />
          </div>
        </div>

        <button
          onClick={() => setConfirmLogoutOpen(true)}
          className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl bg-red-50 text-red-500 font-semibold text-sm mt-4"
        >
          <HiOutlineArrowRightOnRectangle size={18} /> Log Out
        </button>
      </div>

      <ConfirmDialog
        open={confirmLogoutOpen}
        title="Log Out"
        message="Are you sure you want to log out?"
        confirmLabel="Yes, Log Out"
        cancelLabel="Cancel"
        danger
        onConfirm={handleLogout}
        onCancel={() => setConfirmLogoutOpen(false)}
      />
    </div>
  );
}
