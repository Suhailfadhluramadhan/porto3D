import { useRef, useLayoutEffect } from "react";
import { ScrollIndicator } from "./ScrollIndicator.jsx";
import { SuhaillName } from "./SuhaillName.jsx";

import { HeroLines } from "./HeroLines.jsx";
import { TitleSection } from "./TitleSection.jsx";
import { LoremSection } from "./LoremSection.jsx";

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

  useLayoutEffect(() => {
    containerRef.current = getScrollParent(rootRef.current);
  }, []);

  return (
    <div ref={rootRef} className="flex w-full flex-col overflow-x-clip">
      <ScrollIndicator />
      <SuhaillName />
      <HeroLines containerRef={containerRef} />
      <TitleSection containerRef={containerRef} />
      <LoremSection />
    </div>
  );
}

export default HomeContent;