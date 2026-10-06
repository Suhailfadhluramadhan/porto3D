import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Cest({ isProfileOpen = false, onProfileOpen }) {
  const chestRef = useRef();
  const { scene, animations } = useGLTF("/Chest.glb");
  const { actions } = useAnimations(animations, chestRef);

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

  const handleClick = (event) => {
    event.stopPropagation();

    const action = actions[animations[0]?.name];
    if (action) {
      action.reset().play();
    }

    onProfileOpen?.();
  };

  return (
    <primitive
      object={scene}
      ref={chestRef}
      position={[13, -2, 15]}
      scale={0.5}
      onClick={handleClick}
    />
  );
}
