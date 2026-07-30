import { useNavigate } from "react-router-dom";
import { HiOutlineKey, HiFingerPrint } from "react-icons/hi2";
import TopBar from "../../components/common/TopBar";
import MenuRow from "../../components/common/MenuRow";

// Kit ref: 9.5.2-A. Previously Profile linked "Security & PIN" straight to the
// onboarding PIN-creation screen with no hub in between.
export default function SecuritySettings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <TopBar title="Security & PIN" />

      <div className="px-6 mt-5">
        <div className="bg-white rounded-2xl divide-y divide-ink-200/60">
          <MenuRow icon={HiOutlineKey} label="Change PIN" description="Update your 4-digit login PIN" onClick={() => navigate("/profile/security/change-pin")} />
          <MenuRow icon={HiFingerPrint} label="Fingerprint" description="Manage biometric login" onClick={() => navigate("/profile/security/fingerprint")} />
        </div>
      </div>
    </div>
  );
}
