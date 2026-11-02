import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import NeonClick from "./NeonClick";
useGLTF.preload("/Chest.glb");

const CHEST_POS = [13, -2, 15];
const NEAR_DISTANCE = 3;
const NEON_OFFSET_Y = 3;
const LABEL_OFFSET_Y = 2;
const LABEL_TEXT = "Home";

export default function Cest({
  isProfileOpen = false,
  onProfileOpen,
  characterRef,
}) {
  const chestRef = useRef();
  const { scene, animations } = useGLTF("/Chest.glb");
  const { actions } = useAnimations(animations, chestRef);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    if (animations.length && actions[animations[0].name]) {
      const action = actions[animations[0].name];
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
    }
  }, [animations, actions]);

  useEffect(() => {
    if (isProfileOpen) return;
    const action = actions[animations[0]?.name];
    if (action) {
      action.stop();
      action.reset();
    }
  }, [isProfileOpen, actions, animations]);

  useFrame(() => {
    const character = characterRef?.current;
    if (!character) return;

    const dx = character.position.x - CHEST_POS[0];
    const dz = character.position.z - CHEST_POS[2];
    const near = Math.hypot(dx, dz) <= NEAR_DISTANCE;

    setIsNear((prev) => (prev === near ? prev : near));
  });

  const openChest = () => {
    const action = actions[animations[0]?.name];
    if (action) action.reset().play();
    onProfileOpen?.();
  };

  const handleClick = (event) => {
    event.stopPropagation();
    openChest();
  };

  return (
    <>
      <primitive
        object={scene}
        ref={chestRef}
        position={CHEST_POS}
        scale={0.5}
        onClick={handleClick}
      />

      {!isProfileOpen && !isNear && (
        <Html
          position={[CHEST_POS[0], CHEST_POS[1] + LABEL_OFFSET_Y, CHEST_POS[2]]}
          center
          zIndexRange={[9990, 0]}
          style={{ pointerEvents: "none" }}
        >
          <span
            style={{
              color: "#ffe6f7",
              fontSize: "20px",
              fontWeight: 300,
              letterSpacing: "0.15em",
              whiteSpace: "nowrap",
              textShadow:
                "0 0 4px #fff, 0 0 10px #ff4fd8, 0 0 20px #ff2fb3",
            }}
          >
            {LABEL_TEXT}
          </span>
        </Html>
      )}

      {!isProfileOpen && isNear && (
        <Html
          position={[CHEST_POS[0], CHEST_POS[1] + NEON_OFFSET_Y, CHEST_POS[2]]}
          center
          distanceFactor={10}
          zIndexRange={[9990, 0]}
        >
          <NeonClick onClick={openChest} />
        </Html>
      )}
    </>
  );
}