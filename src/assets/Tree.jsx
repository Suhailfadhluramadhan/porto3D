import { Html, useGLTF } from "@react-three/drei";
import { useState } from "react";

function Tree() {
  const { scene } = useGLTF("/Patung.glb");
  const [show, setShow] = useState(false);

  function handleClick() {
    setShow(true);

     setTimeout(() => setShow(false), 5000);
  }

  return (
    <>
      <primitive
        object={scene}
        position={[3, 2, 5]}
        scale={0.2}
        onClick={handleClick}
        rotation={[0, Math.PI / 2, 0]}
      />
      {show && (
        <group>
          <Html position={[1, 6, 5]} transform={false} distanceFactor={10}>
            <div
              transform={false}
              style={{
                position: "relative",
                background: "blue",
                padding: "18px 28px",
                borderRadius: "12px",
                transform: "skew(-10deg)",
                boxShadow: "15px 15px 0px white",
                display: "inline-block",
                fontSize: "24px",
                fontWeight: "bold",
                color: "white",
                textAlign: "center", // biar rapi
                minWidth: "250px", // ✅ kasih lebar minimal biar teks gak kependek
              }}
            >
              intrested with me?
              <button
                onClick={() => console.log("See More clicked")}
                style={{
                  display: "block", // ✅ bikin tombol selalu di bawah teks
                  margin: "14px auto 0", // tengah + jarak atas
                  padding: "6px 12px",
                  fontSize: "20px",
                  fontFamily: "'Times New Roman', serif",
                  fontWeight: "bold",
                  color: "blue",
                  background: "white",
                  border: "2px solid blue",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transform: "skew(10deg)",
                }}
              >
                See More
              </button>
            </div>
          </Html>
        </group>
      )}
    </>
  );
}

export default Tree;
