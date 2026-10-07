import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

const BAT_SCALE = 0.3;
const ORBIT_RADIUS = 6;
const ORBIT_SPEED = 0.5;
const BOB_HEIGHT = 1.2;
const BOB_SPEED = 2;

export default function Bat({
  radius = ORBIT_RADIUS,
  speed = ORBIT_SPEED,
  phase = 0,
}) {
  const { scene, animations } = useGLTF("/bat.glb");
  const batScene = useMemo(() => clone(scene), [scene]);
  const { actions } = useAnimations(animations, batScene);
  const batRef = useRef();
  const angleRef = useRef(phase);

  useEffect(() => {
    const action = actions[animations[0]?.name];
    if (!action) return;

    action.reset().fadeIn(0.3).play();
  }, [actions, animations]);

  useFrame((_, delta) => {
    const bat = batRef.current;
    if (!bat) return;

    angleRef.current += delta * speed;
    const angle = angleRef.current;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.sin(angle * BOB_SPEED) * BOB_HEIGHT + 1;

    bat.position.set(x, y, z);

    const nextAngle = angle + 0.01;
    bat.rotation.y = Math.atan2(
      Math.cos(nextAngle) * radius - x,
      Math.sin(nextAngle) * radius - z
    );
  });

  return <primitive ref={batRef} object={batScene} scale={BAT_SCALE} />;
}