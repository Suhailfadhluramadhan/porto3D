import { useGLTF, useAnimations ,Html} from "@react-three/drei";
import { useRef, useEffect,useState } from "react";
import * as THREE from "three";
import NeonClick from "./NeonClick";
import { useFrame } from "@react-three/fiber";

export default function Farmer({ onOpen , characterRef, isOpen = false}) {
  const farmerRef = useRef();
  const [isNear, setIsNear] = useState(false);

  const STATUE_POS = [10.3, 3, 4];
  const NEAR_DISTANCE = 3;
  const NEON_OFFSET_Y = 2;

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
      ref={farmerRef}
      position={[10, 3, 4]}
      onClick={() => onOpen?.()}
      scale={0.003}
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