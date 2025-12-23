import { Html } from "@react-three/drei";

export function GridNumbers() {
  const labels = [];

  for (let x = -20; x <= 20; x += 5) {
    for (let z = -20; z <= 25; z += 5) {
      labels.push(
        <Html key={`${x}-${z}`} position={[x, 0.5, z]} center>
          <div style={{ fontSize: "15px", color: "#fb2a2aff" }}>
            ({x}, 0, {z})
          </div>
        </Html>
      );
    }
  }

  return <>{labels}</>;
}
