import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  // Exact mouse position (for the dot)
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Delayed, springy position (for the ring)
  const spring = { stiffness: 300, damping: 28, mass: 0.5 };
  const ringX = useSpring(x, spring);
  const ringY = useSpring(y, spring);

  useEffect(() => {
    // Only on devices with a real mouse (not phones/tablets)
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      // Are we over something interactive?
      const target = (e.target as Element).closest<HTMLElement>(
        "a, button, [data-cursor]",
      );
      setHovering(!!target);
      setLabel(target?.dataset.cursor ?? "");
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("pointermove", handleMove);
    document.documentElement.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = hovering ? 60 : 36;

  return (
    <>
      {/* Dot: follows exactly */}
      <motion.div
        style={{ x, y }}
        animate={{ opacity: visible && !label ? 1 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[200] -ml-1 -mt-1 h-2 w-2 rounded-full bg-brick"
      />

      {/* Ring: follows with a spring, grows on hover */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[200]"
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: visible && !label ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-concrete-400"
        />
      </motion.div>

      {/* Label bubble: "View", "Drag" etc. */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[200]"
      >
        <motion.div
          animate={{ scale: visible && label ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brick text-xs font-bold uppercase tracking-widest text-white"
        >
          {label}
        </motion.div>
      </motion.div>
    </>
  );
}
