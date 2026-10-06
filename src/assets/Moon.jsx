import { Cloud, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function createGlowTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.2, "rgba(214, 226, 255, 0.7)");
  gradient.addColorStop(0.5, "rgba(160, 190, 255, 0.25)");
  gradient.addColorStop(1, "rgba(120, 160, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const MOON_SCALE = 0.03;
const MOON_POSITION = [15, 10, -10];

export default function Moon() {
  const { scene } = useGLTF("/moon.glb");
  const map = useTexture("/textures/moon_baseColor.jpg");
  const moonRef = useRef();
  const glow = useMemo(createGlowTexture, []);

  useEffect(() => {
    map.colorSpace = THREE.SRGBColorSpace;

    scene.traverse((child) => {
      if (!child.isMesh) return;

      child.material = new THREE.MeshStandardMaterial({
        map,
        emissiveMap: map,
        emissive: new THREE.Color("#ffffff"),
        emissiveIntensity: 1.4,
        roughness: 1,
        metalness: 0,
      });
    });
  }, [scene, map]);

  useFrame((_, delta) => {
    if (!moonRef.current) return;
    moonRef.current.rotation.y += delta * 0.05;
  });

return (
    <group position={MOON_POSITION}>
      <group ref={moonRef}>
        <primitive object={scene} scale={MOON_SCALE} />

        <sprite scale={[6, 6, 1]}>
          <spriteMaterial
            map={glow}
            color="#cfe0ff"
            transparent
            opacity={0.9}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      </group>

      <pointLight color="#bcd0ff" intensity={60} distance={40} decay={1.2} />

      <group position={[0, -2, 0]}>
        <Cloud
          width={16}
          depth={8}
          scale={1.5}
          segments={8}
          opacity={0.5}
          color="#5c6b8f"
          speed={0.5}
          position={[3.5, 0, 1]}
        />
        <Cloud
          width={13}
          depth={7}
          scale={1.4}
          segments={8}
          opacity={1}
          color="#4e5c7d"
          speed={0.4}
          position={[-3, 0.6, -1]}
        />
      </group>
    </group>
  );
}