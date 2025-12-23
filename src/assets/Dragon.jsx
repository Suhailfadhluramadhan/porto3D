import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function FlyingDragon() {
  const dragonRef = useRef();
  const { scene, animations } = useGLTF("/dragon.glb");
  const { actions } = useAnimations(animations, scene);

  // Force apply material jika tidak ada (fallback)
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && (!child.material || !child.material.color)) {
        child.material = new THREE.MeshStandardMaterial({ color: "red" });
      }
    });
  }, [scene]);

  // Setup animasi dan posisi awal
  useEffect(() => {
    if (animations.length > 0) {
      const animName = animations[0].name;
      actions[animName]?.reset().fadeIn(0.5).play();
    }

    if (dragonRef.current) {
      dragonRef.current.position.set(23, -2, 8);
      dragonRef.current.rotation.set(0, 0, 0); // Menghadap Z+
    }
  }, [actions, animations]);

  return (
    <primitive object={scene} ref={dragonRef} scale={6}  />
  );
}
