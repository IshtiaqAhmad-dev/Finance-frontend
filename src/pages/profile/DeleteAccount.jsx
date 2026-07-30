import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLockClosed } from "react-icons/hi2";
import TopBar from "../../components/common/TopBar";
import Input from "../../components/common/Input";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import { deleteAccount } from "../../api/profile";
import { getErrorMessage } from "../../api/client";

export default function DeleteAccount() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { logout } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleFinalConfirm = async () => {
    setDeleting(true);
    try {
      await deleteAccount();
      setConfirmOpen(false);
      showToast("Your account has been deleted", "success");
      logout();
      navigate("/auth/login");
    } catch (error) {
      showToast(getErrorMessage(error), "error");
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
      <TopBar title="Delete Account" />

      <div className="px-6 mt-5">
        <h1 className="text-lg font-bold font-display text-ink-900 text-center leading-snug">
          Are You Sure You Want To Delete Your Account?
        </h1>

        <div className="bg-brand-50 rounded-2xl p-4 mt-5">
          <p className="text-sm text-ink-700 leading-relaxed">
            This action will permanently delete all of your data, and you will not be able to recover it. Please keep the following in mind before proceeding:
          </p>
          <ul className="list-disc list-inside text-sm text-ink-700 mt-3 space-y-2">
            <li>All your expenses, income and associated transactions will be eliminated.</li>
            <li>You will not be able to access your account or any related information.</li>
            <li>This action cannot be undone.</li>
          </ul>
        </div>

        <p className="text-sm font-semibold text-ink-900 text-center mt-6">
          Confirm below to permanently delete your account.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setConfirmOpen(true);
          }}
          className="mt-4 space-y-5"
        >
          <Input type="password" icon={HiOutlineLockClosed} placeholder="Password" required />

          <button type="submit" className="w-full h-14 rounded-full bg-red-500 text-white font-semibold text-[15px]">
            Yes, Delete Account
          </button>
          <button type="button" onClick={() => navigate(-1)} className="w-full h-14 rounded-full bg-brand-50 text-ink-900 font-semibold text-[15px]">
            Cancel
          </button>
        </form>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Account"
        message="By deleting your account, you agree that you understand the consequences of this action and that you agree to permanently delete your account and all associated data."
        confirmLabel={deleting ? "Deleting..." : "Yes, Delete Account"}
        cancelLabel="Cancel"
        danger
        onConfirm={handleFinalConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
