import { useState, useEffect } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import { RiFingerprint2Line } from "react-icons/ri";
import TopBar from "../../components/common/TopBar";
import MenuRow from "../../components/common/MenuRow";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import { toggleFingerprint } from "../../api/security";
import { getErrorMessage } from "../../api/client";

export default function FingerprintManagement() {
  const { showToast } = useToast();
  const { user, updateLocalUser } = useAuth();
  const [enabled, setEnabled] = useState(!!user?.fingerprintEnabled);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setEnabled(!!user?.fingerprintEnabled);
  }, [user]);

  const handleAdd = async () => {
    setBusy(true);
    try {
      await toggleFingerprint(true);
      updateLocalUser({ fingerprintEnabled: true });
      setEnabled(true);
      showToast("Fingerprint enabled", "success");
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      await toggleFingerprint(false);
      updateLocalUser({ fingerprintEnabled: false });
      setEnabled(false);
      showToast("Fingerprint disabled", "success");
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    } finally {
      setBusy(false);
      setConfirmOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
      <TopBar title="Fingerprint" />

      <div className="px-6 mt-5">
        <div className="bg-white rounded-2xl divide-y divide-ink-200/60">
          {enabled ? (
            <MenuRow icon={RiFingerprint2Line} label="Fingerprint Login" description="Enabled" onClick={() => setConfirmOpen(true)} />
          ) : (
            <MenuRow icon={HiOutlinePlus} label="Enable Fingerprint Login" onClick={handleAdd} />
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Disable Fingerprint"
        message="Remove fingerprint login from your account?"
        confirmLabel="Disable"
        cancelLabel="Cancel"
        danger
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
