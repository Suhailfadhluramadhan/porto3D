import { Cloud } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

export default function CloudLooper({ direction = "right-to-left" }) {
  const cloudRef = useRef();
  const [range, setRange] = useState({ startX: 120, endX: -120 });

  // Tentukan batas kanan-kiri berdasarkan ukuran layar
  const updateRange = () => {
    const w = window.innerWidth;

    if (w <= 640) {
      setRange({ startX: 50, endX: -50 });
    } else if (w <= 1024) {
      setRange({ startX: 80, endX: -80 });
    } else {
      setRange({ startX: 120, endX: -120 });
    }
  };

  useEffect(() => {
    updateRange();
    window.addEventListener("resize", updateRange);
    return () => window.removeEventListener("resize", updateRange);
  }, []);

  useFrame((_, delta) => {
    if (!cloudRef.current) return;

    const speed = delta * 1;

    if (direction === "right-to-left") {
      cloudRef.current.position.x -= speed;

      if (cloudRef.current.position.x < range.endX) {
        cloudRef.current.position.x = range.startX;
      }
    }

    if (direction === "left-to-right") {
      cloudRef.current.position.x += speed;

      if (cloudRef.current.position.x > range.startX) {
        cloudRef.current.position.x = range.endX;
      }
    }
  });

  return (
    <group
      ref={cloudRef}
      position={[
        direction === "right-to-left" ? range.startX : range.endX,
        5,
        0,
      ]}
    >
      <Cloud
        width={40}
        depth={15}
        scale={2}
        color="#ffffff"
        opacity={0.3}
        position={[20, 6, 10]}
      />
      <Cloud
        width={30}
        depth={12}
        color="#ffffff"
        opacity={0.33}
        position={[25, 4, 10]}
      />
      <Cloud
        width={20}
        depth={10}
        color="#ffffff"
        opacity={0.4}
        position={[15, 6, 10]}
      />
    </group>
  );
}
