import { motion } from "motion/react";

type Props = { text: string; className?: string };

export default function RevealHeading({ text, className = "" }: Props) {
  const words = text.split(" ");
  return (
    <h2
      className={`text-4xl font-extrabold leading-[1.1] md:text-6xl ${className}`}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="mr-[0.25em] inline-block overflow-hidden pb-1 align-top"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.7,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}
