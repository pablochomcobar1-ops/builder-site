import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  animate,
  type Variants,
} from "motion/react";
import RevealHeading from "@/components/common/RevealHeading";
import { team, type Member } from "@/data/team";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- Animation variants ---------- */
// Parent: tells children to animate one after another
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
// Each card: rises up and fades in
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/* ---------- Counting number ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const display = useTransform(
    count,
    (v) => Math.round(v).toLocaleString("en-IN") + suffix,
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration: 2, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, count, to]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const stats = [
  { value: 22, suffix: "+", label: "Years building" },
  { value: 48, suffix: "", label: "Projects delivered" },
  { value: 3200, suffix: "+", label: "Families housed" },
  { value: 14, suffix: "", label: "Industry awards" },
];

/* ---------- Team card with 3D tilt ---------- */
function TeamCard({ member }: { member: Member }) {
  const ref = useRef<HTMLDivElement>(null);
  const [imgFailed, setImgFailed] = useState(false);

  // Mouse position inside the card: 0 to 1 (0.5 = center)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Convert position to rotation, with a spring for smoothness
  const spring = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), spring);
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), spring);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const showImage = member.image && !imgFailed;

  return (
    <motion.div variants={cardVariants} style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY }}
        className="group relative overflow-hidden rounded-3xl bg-concrete-700"
      >
        {/* Photo or initials */}
        <div className="aspect-[4/5]">
          {showImage ? (
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              onError={() => setImgFailed(true)}
              className="h-full w-full object-cover grayscale transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-display text-7xl font-extrabold text-concrete-500 transition-colors duration-500 group-hover:text-brick">
              {initials}
            </div>
          )}
        </div>

        {/* Gradient for text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-concrete-900/90 via-transparent to-transparent" />

        {/* Text */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="text-2xl font-extrabold">{member.name}</h3>
          <p className="mt-1 text-sm text-concrete-300">{member.role}</p>
          <p className="mt-3 inline-block rounded-full border border-concrete-500 px-3 py-1 text-xs font-semibold text-concrete-300 transition-colors duration-300 group-hover:border-brick group-hover:text-brick">
            {member.experience} experience
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Section ---------- */
export default function Team() {
  return (
    <section
      id="team"
      className="bg-concrete-900 px-6 py-24 text-concrete-50 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brick">
          Our Team
        </p>
        <RevealHeading
          text="The people behind every brick."
          className="max-w-3xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-xl text-lg text-concrete-400"
        >
          Architects, engineers and builders who've spent decades getting the
          details right.
        </motion.p>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-y border-concrete-700 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl font-extrabold md:text-5xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-concrete-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Team grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {team.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
