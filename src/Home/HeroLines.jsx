import { useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

const STROKE = "#34d399";

const HEADING_STYLE = {
  fontSize: "clamp(2.2rem, 7vw, 7rem)",
  lineHeight: 1.3,
};

const LINES = [
  { text: "LET ME INTRODUCE", dir: -1, outline: false },
  { text: "MYSELF", dir: 1, outline: true },
  { text: "AS A DEVELOPER", dir: -1, outline: false },
];

function HeroLine({ text, dir, outline, progress }) {
  const x = useTransform(progress, [0, 1], ["0vw", `${dir * 120}vw`]);
  const blurPx = useTransform(progress, [0, 0.7], [0, 16]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  const opacity = useTransform(progress, [0.5, 0.95], [1, 0]);

  return (
    <motion.h1
      style={{
        ...HEADING_STYLE,
        x,
        filter,
        opacity,
        ...(outline && {
          WebkitTextStroke: "2px #34d399",
          color: "transparent",
        }),
      }}
      className="whitespace-nowrap text-center font-extrabold text-slate-200"
    >
      {text}
    </motion.h1>
  );
}

export function HeroLines({ containerRef }) {
  const heroRef = useRef(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    container: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={heroRef} className="relative h-[150vh]">
      <div className="sticky top-0 font-serif flex h-screen flex-col items-center justify-center">
        {LINES.map((line) => (
          <HeroLine key={line.text} {...line} progress={heroProgress} />
        ))}
      </div>
    </section>
  );
}