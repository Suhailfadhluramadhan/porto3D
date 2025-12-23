import { Cloud } from "@react-three/drei";

export default function CloudLayer() {
  return (
    <>
      <Cloud
        position={[0, 9, 0]}
        speed={0.5}
        scale={2}
        opacity={0.5}
        width={30}
        depth={20}
        segments={20}
      />

      {/* contoh awan tambahan kalau mau */}
      <Cloud
        position={[-15, 9, 20]}
        scale={1.5}
        speed={0.3}
        opacity={0.45}
        width={60}
        depth={20}
      />
    </>
  );
}
