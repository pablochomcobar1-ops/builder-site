import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import RevealHeading from "@/components/common/RevealHeading";
import { works, type WorkCategory } from "@/data/works";

type Filter = "All" | WorkCategory;
const filters: Filter[] = ["All", "Residential", "Commercial", "Villas"];
const ease = [0.22, 1, 0.36, 1] as const;

export default function Works() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible =
    filter === "All" ? works : works.filter((w) => w.category === filter);

  const countFor = (f: Filter) =>
    f === "All" ? works.length : works.filter((w) => w.category === f).length;

  return (
    <section id="works" className="bg-concrete-50 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brick">
              Our Works
            </p>
            <RevealHeading text="Built to be lived in." />
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  filter === f
                    ? "text-concrete-50"
                    : "text-concrete-700 hover:text-concrete-900"
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="works-filter"
                    className="absolute inset-0 rounded-full bg-concrete-900"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative">
                  {f} <span className="opacity-50">{countFor(f)}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease }}
          className="mt-12 grid grid-flow-dense auto-rows-[280px] gap-4 md:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((work) => (
              <motion.article
                key={work.id}
                data-cursor="View"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease }}
                className={`group relative cursor-pointer overflow-hidden rounded-3xl bg-concrete-200 ${
                  work.wide ? "md:col-span-2" : ""
                }`}
              >
                {/* Image (zooms on hover) */}
                <img
                  src={work.image}
                  alt={work.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark gradient so white text is readable */}
                <div className="absolute inset-0 bg-linear-to-t from-concrete-900/85 via-concrete-900/10 to-transparent" />

                {/* Arrow button (appears on hover) */}
                <span className="absolute right-5 top-5 flex h-10 w-10 -translate-y-2 items-center justify-center rounded-full bg-concrete-50 text-concrete-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={18} />
                </span>

                {/* Text */}
                <div className="absolute inset-x-0 bottom-0 p-6 text-concrete-50">
                  <p className="text-xs font-semibold uppercase tracking-widest text-concrete-300">
                    {work.category} · {work.year}
                  </p>
                  <h3 className="mt-1 text-2xl font-extrabold">{work.title}</h3>

                  {/* Description slides open on hover */}
                  <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="pt-2 text-sm text-concrete-200">
                        {work.location} · {work.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
