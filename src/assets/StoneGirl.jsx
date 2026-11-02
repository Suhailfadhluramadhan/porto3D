import { useGLTF, Html } from "@react-three/drei";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import NeonClick from "../assets/NeonClick.jsx";

const STATUE_POS = [2.3, 0, 16.7];
const NEAR_DISTANCE = 3;
const NEON_OFFSET_Y = 2;

function StoneGirl({ onOpen, characterRef, isOpen = false }) {
  const { scene } = useGLTF("/StoneGirl.glb");
  const [isNear, setIsNear] = useState(false);

  useFrame(() => {
    const character = characterRef?.current;
    if (!character) return;

    const dx = character.position.x - STATUE_POS[0];
    const dz = character.position.z - STATUE_POS[2];
    const near = Math.hypot(dx, dz) <= NEAR_DISTANCE;

    setIsNear((prev) => (prev === near ? prev : near));
  });

  return (
    <>
      <primitive
        object={scene}
        position={STATUE_POS}
        scale={0.1}
        onClick={() => onOpen?.()}
        rotation={[0, Math.PI / 2, 0]}
      />

      {isNear && !isOpen && (
        <Html
          position={[STATUE_POS[0], STATUE_POS[1] + NEON_OFFSET_Y, STATUE_POS[2]]}
          center
         distanceFactor={10}
          zIndexRange={[9990, 0]}
        >
          <NeonClick onClick={() => onOpen?.()} />
        </Html>
      )}
    </>
  );
}

export default StoneGirl;