import { useGLTF } from "@react-three/drei";

function Tree({ onOpen }) {
  const { scene } = useGLTF("/Patung.glb");

  return (
    <primitive
      object={scene}
      position={[3, 2, 5]}
      scale={0.2}
      onClick={() => onOpen?.()}
      rotation={[0, Math.PI / 2, 0]}
    />
  );
}

export default Tree;