import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Farmer({ onOpen }) {
  const farmerRef = useRef();

  const { scene, animations } = useGLTF("/queen.glb");
  const { actions } = useAnimations(animations, farmerRef);

  useEffect(() => {
    const firstAnimName = animations[0]?.name;
    const action = actions[firstAnimName];

    if (action) {
      action.reset();
      action.setLoop(THREE.LoopRepeat);
      action.play();
    }
  }, [actions, animations]);

  return (
    <primitive
      object={scene}
      ref={farmerRef}
      position={[10, 3, 4]}
      onClick={() => onOpen?.()}
      scale={0.003}
    />
  );
}