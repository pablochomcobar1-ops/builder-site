import { useEffect } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // 1. Create Lenis (the smooth scroll engine)
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      anchors: true,
    });

    // 2. Tell GSAP ScrollTrigger every time Lenis scrolls
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Drive Lenis using GSAP's animation clock, so both stay in sync
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // 4. Clean up when the component unmounts
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
