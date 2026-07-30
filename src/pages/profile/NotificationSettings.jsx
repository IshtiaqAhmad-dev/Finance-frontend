import { useState, useEffect } from "react";
import TopBar from "../../components/common/TopBar";
import SettingsToggleRow from "../../components/common/SettingsToggleRow";
import {
  HiOutlineBellAlert,
  HiOutlineSpeakerWave,
  HiOutlinePhone,
  HiOutlineDevicePhoneMobile,
  HiOutlineArrowPath,
  HiOutlineClock,
  HiOutlineWallet,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import { getPreferences, updatePreferences } from "../../api/notifications";
import { useToast } from "../../context/ToastContext";
import { getErrorMessage } from "../../api/client";

// Sirf ye 3 backend mein persist hoti hain (models/User.js -> notificationPreferences).
// Baaki (sound/vibrate/general etc.) device-level settings hain, is app mein local-only rehti hain.
const BACKEND_KEYS = {
  transactionUpdate: "transactions",
  budget: "budgetAlerts",
  expenseReminder: "reminders",
};

const initial = [
  { key: "general", icon: HiOutlineBellAlert, label: "General Notification", checked: true },
  { key: "sound", icon: HiOutlineSpeakerWave, label: "Sound", checked: true },
  { key: "soundCall", icon: HiOutlinePhone, label: "Sound Call", checked: true },
  { key: "vibrate", icon: HiOutlineDevicePhoneMobile, label: "Vibrate", checked: true },
  { key: "transactionUpdate", icon: HiOutlineArrowPath, label: "Transaction Update", checked: true },
  { key: "expenseReminder", icon: HiOutlineClock, label: "Expense Reminder", checked: true },
  { key: "budget", icon: HiOutlineWallet, label: "Budget Notifications", checked: true },
  { key: "lowBalance", icon: HiOutlineExclamationTriangle, label: "Low Balance Alerts", checked: false },
];

export default function NotificationSettings() {
  const [rows, setRows] = useState(initial);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getPreferences();
        const prefs = res.data;
        setRows((r) =>
          r.map((row) => {
            const backendKey = BACKEND_KEYS[row.key];
            return backendKey ? { ...row, checked: !!prefs[backendKey] } : row;
          })
        );
      } catch (error) {
        showToast(getErrorMessage(error), "error");
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = async (key, value) => {
    setRows((r) => r.map((row) => (row.key === key ? { ...row, checked: value } : row)));

    const backendKey = BACKEND_KEYS[key];
    if (!backendKey) return; // local-only toggle, nothing to save

    try {
      await updatePreferences({ [backendKey]: value });
    } catch (error) {
      showToast(getErrorMessage(error), "error");
      // revert on failure
      setRows((r) => r.map((row) => (row.key === key ? { ...row, checked: !value } : row)));
    }
  };

  return (
    <div className="min-h-screen">
      <TopBar title="Notification Settings" />

      <div className="px-6 mt-5">
        <div className="bg-white rounded-2xl divide-y divide-ink-200/60">
          {rows.map((row) => (
            <SettingsToggleRow
              key={row.key}
              icon={row.icon}
              label={row.label}
              checked={row.checked}
              disabled={loading}
              onChange={(v) => toggle(row.key, v)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
