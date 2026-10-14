import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useTransform,
} from "motion/react";

export default function Loader() {
  const [done, setDone] = useState(false);
  const progress = useMotionValue(0);

  // Derived values from progress
  const percent = useTransform(progress, (v) =>
    String(Math.round(v)).padStart(3, "0"),
  );
  const barWidth = useTransform(progress, (v) => `${v}%`);
  const status = useTransform(progress, (v): string =>
    v < 30
      ? "Laying the foundation"
      : v < 60
        ? "Raising the structure"
        : v < 95
          ? "Fitting the glass"
          : "Ready",
  );

  // Lock scrolling and always start at the top while loading
  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Unlock scrolling when done
  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  useEffect(() => {
    let cancelled = false;
    let finish: ReturnType<typeof animate> | undefined;

    // Count up to 90% while we wait
    const toNinety = animate(progress, 90, { duration: 1.6, ease: "easeOut" });

    const fontsReady = document.fonts.ready;
    const pageLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    const minTime = new Promise((resolve) => setTimeout(resolve, 1600));

    // When everything is ready, finish 90 → 100, then close
    Promise.all([fontsReady, pageLoaded, minTime]).then(() => {
      if (cancelled) return;
      toNinety.stop();
      finish = animate(progress, 100, {
        duration: 0.5,
        ease: "easeOut",
        onComplete: () => setDone(true),
      });
    });

    return () => {
      cancelled = true;
      toNinety.stop();
      finish?.stop();
    };
  }, [progress]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          data-lenis-prevent
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-concrete-900 p-6 text-concrete-50 md:p-12"
        >
          {/* Logo */}
          <p className="font-display text-xl font-extrabold">
            AAKAR<span className="text-brick">.</span>
          </p>

          <div>
            {/* Big counter */}
            <motion.p className="font-display text-[22vw] font-extrabold leading-none tracking-tighter md:text-[14vw]">
              {percent}
            </motion.p>

            {/* Progress bar */}
            <div className="mt-6 h-[2px] w-full bg-concrete-700">
              <motion.div
                style={{ width: barWidth }}
                className="h-full bg-brick"
              />
            </div>

            {/* Status text */}
            <div className="mt-4 flex justify-between text-xs font-semibold uppercase tracking-[0.2em] text-concrete-400">
              <motion.span>{status}</motion.span>
              <span>Since 2004</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
