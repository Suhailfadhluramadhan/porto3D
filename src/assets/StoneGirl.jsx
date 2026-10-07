import { useGLTF } from "@react-three/drei";

function StoneGirl({ onOpen }) {
  const { scene } = useGLTF("/StoneGirl.glb");

  return (
    <primitive
      object={scene}
      position={[2.3, 0, 16.7]}
      scale={0.1}
      onClick={() => onOpen?.()}
      rotation={[0, Math.PI / 2, 0]}
    />
  );
}

export default StoneGirl;