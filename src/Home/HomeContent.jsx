import { useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ScrollIndicator } from "./ScrollIndicator.jsx";
import { SuhaillName } from "./SuhaillName.jsx";
import { HeroLines } from "./HeroLines.jsx";
import { TitleSection } from "./TitleSection.jsx";
import { Specialization } from "./Specialization.jsx";




function getScrollParent(el) {
  let node = el?.parentElement;
  while (node) {
    const { overflowY } = getComputedStyle(node);
    if (overflowY === "auto" || overflowY === "scroll") return node;
    node = node.parentElement;
  }
  return null;
}

export function HomeContent() {
  const rootRef = useRef(null);
  const containerRef = useRef(null);
  const titleSectionRef = useRef(null);

  useLayoutEffect(() => {
    containerRef.current = getScrollParent(rootRef.current);
  }, []);

  const { scrollYProgress } = useScroll({
    target: titleSectionRef,
    container: containerRef,
    offset: ["start start", "end end"],
  });

  const specProgress = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

return (
  <div ref={rootRef} className="relative h-screen w-full flex-col overflow-x-clip ">
    

    <div className="relative z-10 flex w-full flex-col">
     
      <ScrollIndicator />
      <SuhaillName />
      <HeroLines containerRef={containerRef} />
      <TitleSection ref={titleSectionRef} containerRef={containerRef} />
      <Specialization containerRef={containerRef} />
    </div>
  </div>

 

);
}

export default HomeContent;