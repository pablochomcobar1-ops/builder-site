import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SideBySideSlide } from "@/components/ui/side-by-side-slide";
import { transformations } from "@/data/transformations";
import RevealHeading from "@/components/common/RevealHeading";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Transformation() {
  const [active, setActive] = useState(0);
  const project = transformations[active];

  return (
    <section
      id="transformation"
      className="bg-concrete-100 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Label */}
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brick">
          Transformation
        </p>

        {/* Heading: each word slides up from behind a mask */}
        <RevealHeading
          text="From bare land to landmark."
          className="max-w-3xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-xl text-lg text-concrete-500"
        >
          Every project starts as an empty plot. Slide across to see what we
          made of it.
        </motion.p>

        {/* Tabs */}
        <div className="mt-12 flex flex-wrap gap-2">
          {transformations.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                active === i
                  ? "text-concrete-50"
                  : "text-concrete-700 hover:text-concrete-900"
              }`}
            >
              {active === i && (
                <motion.span
                  layoutId="transformation-tab"
                  className="absolute inset-0 rounded-full bg-concrete-900"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative">{t.name}</span>
            </button>
          ))}
        </div>

        {/* Slider + info card */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Slider */}
          <div className="relative" data-cursor="Drag">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease }}
              >
                <SideBySideSlide
                  beforeImage={project.before}
                  afterImage={project.after}
                  beforeAlt={`${project.name} before construction`}
                  afterAlt={`${project.name} after completion`}
                  cursor="col-resize"
                  dividerColor="#f8f8f6"
                  handleColor="#f8f8f6"
                  className="aspect-[16/10] w-full rounded-3xl bg-concrete-200"
                />
              </motion.div>
            </AnimatePresence>

            {/* Before / After labels */}
            <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-concrete-900/80 px-3 py-1 text-xs font-bold tracking-widest text-concrete-50">
              BEFORE
            </span>
            <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-concrete-50/90 px-3 py-1 text-xs font-bold tracking-widest text-concrete-900">
              AFTER
            </span>
          </div>

          {/* Info card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease }}
              className="flex flex-col justify-between rounded-3xl bg-concrete-50 p-8"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-concrete-400">
                  {project.type}
                </p>
                <h3 className="mt-2 text-3xl font-extrabold">{project.name}</h3>
                <p className="mt-1 text-concrete-500">{project.location}</p>
              </div>

              <dl className="mt-8 space-y-5">
                <div className="border-t border-concrete-200 pt-4">
                  <dt className="text-sm text-concrete-400">Built in</dt>
                  <dd className="font-display text-2xl font-bold">
                    {project.duration}
                  </dd>
                </div>
                <div className="border-t border-concrete-200 pt-4">
                  <dt className="text-sm text-concrete-400">
                    {project.stat.label}
                  </dt>
                  <dd className="font-display text-2xl font-bold">
                    {project.stat.value}
                  </dd>
                </div>
              </dl>

              <p className="mt-8 text-sm text-concrete-400">
                Move across the image to compare.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
