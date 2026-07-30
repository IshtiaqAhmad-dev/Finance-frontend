import { useState, useEffect } from "react";
import { RiWallet3Line, RiAlarmWarningLine, RiGiftLine, RiNotification3Line, RiTimeLine } from "react-icons/ri";
import TopBar from "../../components/common/TopBar";
import EmptyState from "../../components/common/EmptyState";
import { getNotifications, markAsRead } from "../../api/notifications";
import { useToast } from "../../context/ToastContext";
import { getErrorMessage } from "../../api/client";

const TYPE_STYLES = {
  transaction: { icon: RiWallet3Line, color: "bg-brand-500" },
  budget: { icon: RiAlarmWarningLine, color: "bg-accent-blue-mid" },
  reminder: { icon: RiTimeLine, color: "bg-accent-blue" },
  system: { icon: RiGiftLine, color: "bg-brand-400" },
};

const timeAgo = (dateStr) => {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
};

export default function Notifications() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getNotifications();
        setItems(res.data);
      } catch (error) {
        showToast(getErrorMessage(error), "error");
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTap = async (n) => {
    if (n.isRead) return;
    setItems((prev) => prev.map((x) => (x._id === n._id ? { ...x, isRead: true } : x)));
    try {
      await markAsRead(n._id);
    } catch {
      // silent — UI already updated optimistically
    }
  };

  return (
    <div className="min-h-screen">
      <TopBar title="Notifications" />
      <div className="px-6 mt-4 space-y-3">
        {loading ? (
          <p className="text-sm text-ink-400 text-center py-8">Loading...</p>
        ) : items.length === 0 ? (
          <EmptyState icon={RiNotification3Line} title="No notifications" subtitle="You're all caught up." />
        ) : (
          items.map((n) => {
            const style = TYPE_STYLES[n.type] || TYPE_STYLES.system;
            return (
              <button
                key={n._id}
                onClick={() => handleTap(n)}
                className={`w-full flex gap-3 bg-white rounded-2xl p-4 text-left ${!n.isRead ? "ring-1 ring-brand-200" : ""}`}
              >
                <div className={`w-11 h-11 rounded-2xl ${style.color} flex items-center justify-center text-white shrink-0`}>
                  <style.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[15px] font-semibold text-ink-900 truncate">{n.title}</p>
                    <span className="text-xs text-ink-400 shrink-0">{timeAgo(n.createdAt)}</span>
                  </div>
                  <p className="text-xs text-ink-400 mt-1 leading-relaxed">{n.message}</p>
                </div>
                {!n.isRead && <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0 mt-1.5" />}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
