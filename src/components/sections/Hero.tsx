import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Building, { FLOORS, BUILD_END } from "@/components/three/Building";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // 0 when the hero's top hits the screen top, 1 when its bottom hits the screen bottom
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // true only while the hero section is on screen
  const inView = useInView(ref);

  // Map scroll ranges to animation values
  const introOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
  const outroOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);
  const outroY = useTransform(scrollYProgress, [0.82, 0.95], [40, 0]);
  const floorCount = useTransform(scrollYProgress, (v) =>
    String(
      Math.min(FLOORS, Math.floor((v / BUILD_END) * (FLOORS + 1))),
    ).padStart(2, "0"),
  );

  return (
    <section id="top" ref={ref} className="relative h-[400vh] bg-concrete-50">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 3D canvas */}
        <div className="absolute inset-0">
          {/*<Canvas
            shadows
            dpr={[1, 1.5]}
            frameloop={inView ? "always" : "never"}
            camera={{ position: [8, 3, 12], fov: 35 }}
          >
            <Building progress={scrollYProgress} />
          </Canvas> */}
        </div>

        {/* Intro text */}
        <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-7xl flex-col justify-start px-6 pt-28 md:justify-center md:pt-0">
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="max-w-xl"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brick">
              Aakar Builders · Since 2004
            </p>
            <h1 className="text-5xl font-extrabold leading-[1.05] md:text-7xl">
              We build what stands.
            </h1>
            <p className="mt-6 max-w-md text-lg text-concrete-500">
              Residential towers, commercial spaces and homes, engineered to
              last generations.
            </p>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.p
          style={{ opacity: introOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.25em] text-concrete-400"
        >
          Scroll to build ↓
        </motion.p>

        {/* Floor counter */}
        <div className="absolute bottom-8 right-6 font-display text-sm font-bold tracking-widest text-concrete-500 md:right-12">
          FLOOR{" "}
          <motion.span className="text-concrete-900">{floorCount}</motion.span>{" "}
          / {FLOORS}
        </div>

        {/* Outro text */}
        <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-7xl items-end px-6 pb-24">
          <motion.div style={{ opacity: outroOpacity, y: outroY }}>
            <h2 className="text-4xl font-extrabold md:text-6xl">
              12 floors.
              <br />
              Zero compromises.
            </h2>
            <a
              href="#works"
              className="pointer-events-auto mt-6 inline-flex rounded-full bg-concrete-900 px-6 py-3 text-sm font-semibold text-concrete-50 transition-colors hover:bg-brick"
            >
              See our work →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
