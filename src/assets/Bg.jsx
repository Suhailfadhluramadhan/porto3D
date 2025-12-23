import { useTexture } from "@react-three/drei";

export function BackgroundPlane() {
  const texture = useTexture("/Skt.jpg");

  return (
    <mesh position={[0, 0, -50]}>
      <planeGeometry args={[200, 100]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
