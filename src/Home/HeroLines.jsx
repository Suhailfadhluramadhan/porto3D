import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";

const STROKE = "#34d399";

const HEADING_STYLE = {
  fontSize: "clamp(2.2rem, 7vw, 7rem)",
  lineHeight: 1.3,
};

const LINES = [
  { text: "LET ME INTRODUCE", outline: false, delay: 0, dir: 1 },
  { text: "MYSELF", outline: true, delay: 0.1, dir: -1 },
  { text: "AS A DEVELOPER", outline: false, delay: 0.2, dir: 1 },
];

const POP_IN_DURATION = 0.25;
const LAST_DELAY = Math.max(...LINES.map(l => l.delay));
const HOLD_DURATION = 0.15;
const GLOBAL_SLIDE_START = LAST_DELAY + POP_IN_DURATION + HOLD_DURATION;
const GLOBAL_SLIDE_END = 1.0;

function HeroLine({ text, outline, delay, dir, progress }) {
  const opacity = useTransform(
    progress,
    [delay, delay + 0.25, GLOBAL_SLIDE_START, GLOBAL_SLIDE_END],
    [0, 1, 1, 0]
  );
  const scale = useSpring(useTransform(progress, [delay, delay + POP_IN_DURATION], [0.6, 1]), { stiffness: 100, damping: 25 });
  const blurPx = useTransform(progress, [delay, delay + POP_IN_DURATION], [16, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  const x = useTransform(progress, [GLOBAL_SLIDE_START, GLOBAL_SLIDE_END], ["0vw", `${dir * 120}vw`]);

  return (
    <motion.h1
      style={{
        ...HEADING_STYLE,
        opacity,
        scale,
        filter,
        x,
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
    <section ref={heroRef} className="relative h-[300vh]">
      <div className="sticky top-0 font-serif flex h-screen flex-col items-center justify-center">
        {LINES.map((line) => (
          <HeroLine key={line.text} {...line} progress={heroProgress} />
        ))}
      </div>
    </section>
  );
}