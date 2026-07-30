import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function AnimatedCounter({ value, prefix = "", decimals = 2, className = "" }) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => v.toFixed(decimals));
  const ref = useRef(null);

  useEffect(() => {
    const controls = animate(motionVal, value, { duration: 1, ease: "easeOut" });
    return controls.stop;
  }, [value]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Number(v).toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}`;
      }
    });
  }, [rounded, prefix, decimals]);

  return <motion.span ref={ref} className={className}>{prefix}0</motion.span>;
}
