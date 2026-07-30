import { useState } from "react";
import { HiOutlineMagnifyingGlass, HiChevronDown } from "react-icons/hi2";
import { RiCustomerService2Line, RiGlobalLine, RiFacebookCircleLine, RiWhatsappLine, RiInstagramLine } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import TopBar from "../../components/common/TopBar";
import TabSwitcher from "../../components/common/TabSwitcher";
import Input from "../../components/common/Input";
import MenuRow from "../../components/common/MenuRow";
import EmptyState from "../../components/common/EmptyState";

// Kit ref: 9.5.4.1-A (FAQ list) / 9.5.4.1-B (Contact Us list). Previously the
// "Help Center" menu item routed back to /profile — a dead link.
const faqs = [
  { q: "How to use FinWise?", a: "Add your first transaction from the home screen and FinWise will start tracking your spending automatically." },
  { q: "How much does it cost to use FinWise?", a: "FinWise is free to use for personal budget tracking." },
  { q: "How to contact support?", a: "Use the Contact Us tab above to reach us by chat, email, or social media." },
  { q: "How can I reset my password if I forget it?", a: "Go to Login and tap \"Forgot Password\" to receive a reset link." },
  { q: "Are there any privacy or data security measures in place?", a: "Yes — your data is encrypted and never shared without consent." },
  { q: "Can I customize settings within the application?", a: "Yes, visit Profile → Settings to adjust notifications, password, and more." },
  { q: "How can I delete my account?", a: "Go to Profile → Settings → Delete Account and follow the confirmation steps." },
  { q: "How do I access my expense history?", a: "Open the Transactions or Analysis tab to review past activity." },
  { q: "Can I use the app offline?", a: "Some features are available offline; syncing resumes once you're back online." },
];

const contacts = [
  { icon: RiCustomerService2Line, label: "Customer Service" },
  { icon: RiGlobalLine, label: "Website" },
  { icon: RiFacebookCircleLine, label: "Facebook" },
  { icon: RiWhatsappLine, label: "Whatsapp" },
  { icon: RiInstagramLine, label: "Instagram" },
];

export default function HelpCenter() {
  const [tab, setTab] = useState("FAQ");
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = faqs.filter((f) => f.q.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen">
      <TopBar title="Help & FAQS" />

      <div className="px-6 mt-4">
        <p className="text-sm font-semibold text-ink-900 text-center mb-4">How Can We Help You?</p>
        <TabSwitcher tabs={["FAQ", "Contact Us"]} active={tab} onChange={setTab} />

        <div className="mt-4">
          <Input
            icon={HiOutlineMagnifyingGlass}
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="px-6 mt-4">
        {tab === "FAQ" ? (
          filteredFaqs.length === 0 ? (
            <EmptyState title="No results" subtitle="Try a different search term." />
          ) : (
            <div className="divide-y divide-ink-200/60">
              {filteredFaqs.map((f, i) => (
                <div key={f.q}>
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between gap-3 py-3.5 text-left"
                  >
                    <span className="text-[14px] font-medium text-ink-900">{f.q}</span>
                    <motion.span animate={{ rotate: openIndex === i ? 180 : 0 }} className="shrink-0 text-ink-400">
                      <HiChevronDown size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-ink-400 leading-relaxed pb-3.5">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="bg-white rounded-2xl divide-y divide-ink-200/60">
            {contacts.map((c) => (
              <MenuRow key={c.label} icon={c.icon} label={c.label} onClick={() => {}} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
