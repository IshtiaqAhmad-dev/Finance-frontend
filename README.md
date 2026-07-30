# Finance Management App — Frontend (Phase 2)

React + Vite + Tailwind CSS v4 + React Router + Framer Motion + Recharts

## Ab tak kya bana hai (Phase 2 complete)

- ✅ Poora project scaffold (Vite + Tailwind + Router)
- ✅ Design tokens (colors, fonts) — Figma ke teal/green theme se match
- ✅ Reusable components: Button, Input, TopBar, BottomNav, TabSwitcher, TransactionItem
- ✅ MobileLayout (phone-width app shell, bottom nav)
- ✅ Saari 30+ routes wired up (abhi placeholder, Phase 3 mein har ek banegi)
- ✅ 2 fully-built screens: **Login** aur **Home** (design se match)

## Chalane ka tareeqa

```
npm install
npm run dev
```

Browser mein `http://localhost:5173` khol lo. `/auth/login` se shuru hoga.

## Folder Structure

```
src/
├── components/
│   ├── common/     → Button, Input, TopBar, BottomNav, TabSwitcher
│   └── cards/       → TransactionItem
├── pages/
│   ├── auth/         → Login (banaya hua), Signup/Forgot/Pin (placeholder)
│   ├── home/           → Home (banaya hua)
│   ├── transactions/, analysis/, categories/, profile/  → placeholders
├── layouts/            → MobileLayout (bottom nav wrapper)
├── routes/              → AppRoutes.jsx (saari routes yahan)
```

## Agla Step (Phase 3)

Baaki saari screens ek ek karke banayenge:
- Onboarding, Signup, Forgot Password, Security Pin, Fingerprint
- Notifications, Account Balance, Add Transaction
- Analysis (Daily/Weekly/Monthly/Yearly + charts), Search, Calendar
- Categories grid, Category detail, Savings goals, New Category
- Profile, Edit Profile

## Backend Connect Karna (baad mein)

Jab Phase 3-4 complete ho jaye, `src/services/api.js` bana kar Node.js backend
(jo pehle se bana hua hai) se connect karenge — login, transactions, categories
sab real data ke sath kaam karega.
