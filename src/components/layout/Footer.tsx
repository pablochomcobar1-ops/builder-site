import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";

const links = [
  { label: "Transformation", href: "#transformation" },
  { label: "Works", href: "#works" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-hidden bg-concrete-900 px-6 pb-10 pt-20 text-concrete-400">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl font-extrabold text-concrete-50">
              AAKAR<span className="text-brick">.</span>
            </p>
            <p className="mt-4 max-w-xs">
              Building homes, offices and landmarks across Gujarat since 2004.
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-concrete-50">
              Explore
            </p>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="transition-colors hover:text-concrete-50"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-concrete-50">
              Get in touch
            </p>
            <ul className="space-y-2">
              <li>+91 90000 00000</li>
              <li>hello@aakarbuilders.com</li>
              <li>SG Highway, Ahmedabad</li>
            </ul>
          </div>
        </div>

        {/* Giant wordmark that slides up */}
        <div className="mt-16 overflow-hidden">
          <motion.p
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="select-none font-display text-[20vw] font-extrabold leading-[0.85] tracking-tighter text-concrete-700/50"
          >
            AAKAR
          </motion.p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-concrete-700 pt-8 text-sm md:flex-row">
          <p>© {year} Aakar Builders. All rights reserved.</p>
          <a
            href="#top"
            className="group flex items-center gap-2 transition-colors hover:text-concrete-50"
          >
            Back to top
            <ArrowUp
              size={16}
              className="transition-transform group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
