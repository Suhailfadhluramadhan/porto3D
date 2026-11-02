import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
useGLTF.preload("/walking.glb");

const allowedArea = [
  [4.5, 13],
  [2.5, 13],
  [2, 8],
  [2, 3],
  [4, 3],
  [5, 1],
  [8, -1],
  [12, 0],
  [13, 1],
  [14, 8],
  [14, 12],
  [6.5, 13],
  [6.5, 16],
  [8, 16],
  [15, 16],
  [14, 20],
  [10.5, 25.5],
  [0, 25],
  [-3, 20.4],
  [-8, 20.4],
  [-8, 23.5],
  [-9, 23.5],
  [-9, 15],
  [-8, 15],
  [-8, 18],
  [-3, 18],
  [5, 18],
  [4, 14],
];

const slopeArea = [
  [5, 11],
  [4, 14],
  [5, 18],
  [8, 20],
  [7, 15],
  [5, 11],
];

const isInsidePolygon = (point, polygon) => {
  const [x, z] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, zi] = polygon[i];
    const [xj, zj] = polygon[j];
    const intersect =
      zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};

const getTerrainHeight = (x, z) => {
  const inSlope = isInsidePolygon([x, z], slopeArea);
  let height;
  if (inSlope) {
    if (z < 11) height = 1.5;
    else if (z < 13) height = 1.5 - 0.5 * ((z - 11) / 2);
    else if (z < 15) height = 1 - (z - 13) / 2;
    else if (z < 17) height = -((z - 15) / 1) * 2;
    else height = -2;
  } else {
    height = z < 13 ? 1.5 : -2;
  }
  return Math.max(height, -2);
};

export function WalkingCharacter({ characterRef: externalRef }) {
  const { scene, animations } = useGLTF("/walking.glb");
  const { actions } = useAnimations(animations, scene);
  const internalRef = useRef();
  const characterRef = externalRef ?? internalRef;

  const [direction, setDirection] = useState({
    forward: false,
    back: false,
    left: false,
    right: false,
  });

  const speed = 0.05;

  useEffect(() => {
    const setKey = (key, value) => {
      switch (key.toLowerCase()) {
        case "w":
          setDirection((d) => ({ ...d, forward: value }));
          break;
        case "s":
          setDirection((d) => ({ ...d, back: value }));
          break;
        case "a":
          setDirection((d) => ({ ...d, left: value }));
          break;
        case "d":
          setDirection((d) => ({ ...d, right: value }));
          break;
      }
    };
    const handleKeyDown = (e) => setKey(e.key, true);
    const handleKeyUp = (e) => setKey(e.key, false);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const action = actions[animations[0]?.name];
    if (action) {
      action.reset().fadeIn(0.3).play();
      action.paused = true;
    }
  }, [actions, animations]);

  useEffect(() => {
    const action = actions[animations[0]?.name];
    if (!action) return;

    const isMoving =
      direction.forward ||
      direction.back ||
      direction.left ||
      direction.right;

    action.paused = !isMoving;
    if (isMoving) action.play();
  }, [direction, actions, animations]);

  useFrame(() => {
    const character = characterRef.current;
    if (!character) return;

    const moveVector = new THREE.Vector3();
    if (direction.forward) moveVector.z -= 1;
    if (direction.back) moveVector.z += 1;
    if (direction.left) moveVector.x -= 1;
    if (direction.right) moveVector.x += 1;

    if (moveVector.lengthSq() > 0) {
      moveVector.normalize().multiplyScalar(speed);
      const nextPos = character.position.clone().add(moveVector);
      if (isInsidePolygon([nextPos.x, nextPos.z], allowedArea)) {
        nextPos.y = getTerrainHeight(nextPos.x, nextPos.z);
        character.position.copy(nextPos);
        character.rotation.y = Math.atan2(moveVector.x, moveVector.z);
      }
    }
  });

  return (
    <group ref={characterRef} position={[8, -2, 23]} scale={0.8}>
      <primitive object={scene} />
    </group>
  );
}