import { useState } from "react";
import { RiHeadphoneLine } from "react-icons/ri";
import TopBar from "../../components/common/TopBar";
import Button from "../../components/common/Button";
import { useToast } from "../../context/ToastContext";

// Kit ref: 9.5.4.2-A/B — live chat support screen (previously not built at all).
const activeChats = [
  { name: "Support Assistant", preview: "Hello! I'm here to assist you", time: "2 Min Ago" },
];

const endedChats = [
  { name: "Help Center", preview: "Your account is ready to use...", time: "Feb 08, 2024" },
  { name: "Support Assistant", preview: "Hello! I'm here to assist you", time: "Dec 24, 2023" },
  { name: "Support Assistant", preview: "Hello! I'm here to assist you", time: "Sep 10, 2023" },
  { name: "Help Center", preview: "Hi, how are you today?", time: "June 12, 2023" },
];

function ChatRow({ name, preview, time }) {
  return (
    <div className="flex items-center gap-3 bg-brand-50 rounded-2xl p-4">
      <div className="w-11 h-11 rounded-2xl bg-brand-500 text-white flex items-center justify-center shrink-0">
        <RiHeadphoneLine size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold text-ink-900">{name}</p>
        <p className="text-xs text-ink-400 truncate">{preview}</p>
      </div>
      <span className="text-xs text-ink-400 shrink-0 bg-white rounded-full px-2 py-1">{time}</span>
    </div>
  );
}

export default function OnlineSupport() {
  const { showToast } = useToast();
  const [starting, setStarting] = useState(false);

  const handleStartChat = () => {
    setStarting(true);
    setTimeout(() => {
      setStarting(false);
      showToast("A new chat has been started", "success");
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar title="Online Support" />

      <div className="px-6 mt-5 flex-1">
        <p className="text-sm font-semibold text-ink-700 mb-3">Active Chats</p>
        <div className="space-y-3">
          {activeChats.map((c) => (
            <ChatRow key={c.name + c.time} {...c} />
          ))}
        </div>

        <p className="text-sm font-semibold text-ink-700 mb-3 mt-6">Ended Chats</p>
        <div className="space-y-3">
          {endedChats.map((c, i) => (
            <ChatRow key={c.name + i} {...c} />
          ))}
        </div>
      </div>

      <div className="px-6 pb-4">
        <Button onClick={handleStartChat} loading={starting}>Start Another Chat</Button>
      </div>
    </div>
  );
}
