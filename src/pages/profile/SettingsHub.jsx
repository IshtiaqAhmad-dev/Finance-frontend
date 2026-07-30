import { useNavigate } from "react-router-dom";
import { HiOutlineBell, HiOutlineKey, HiOutlineUserMinus } from "react-icons/hi2";
import TopBar from "../../components/common/TopBar";
import MenuRow from "../../components/common/MenuRow";

// Kit ref: 9.5.3-A. Previously not built as its own screen — its contents
// were folded straight into Profile, one level shallower than the kit's IA.
export default function SettingsHub() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <TopBar title="Settings" />

      <div className="px-6 mt-5">
        <div className="bg-white rounded-2xl divide-y divide-ink-200/60">
          <MenuRow icon={HiOutlineBell} label="Notification Settings" onClick={() => navigate("/profile/settings/notifications")} />
          <MenuRow icon={HiOutlineKey} label="Password Settings" onClick={() => navigate("/profile/settings/password")} />
          <MenuRow icon={HiOutlineUserMinus} label="Delete Account" danger onClick={() => navigate("/profile/settings/delete-account")} />
        </div>
      </div>
    </div>
  );
}
