import { useRef, useState } from "react";

export default function PinInput({ length = 4, onComplete }) {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...values];
    next[i] = val.slice(-1);
    setValues(next);

    if (val && i < length - 1) {
      inputsRef.current[i + 1]?.focus();
    }
    if (next.every((v) => v !== "")) {
      onComplete?.(next.join(""));
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !values[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {values.map((v, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="password"
          inputMode="numeric"
          maxLength={1}
          value={v}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-14 h-14 rounded-2xl bg-white border border-ink-200 text-center text-xl font-bold text-ink-900 focus:border-brand-500 outline-none transition-colors"
        />
      ))}
    </div>
  );
}
