import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";

export default function Farmer() {
  const farmerRef = useRef();

  const { scene, animations } = useGLTF("/Farmer.glb");
  const { actions } = useAnimations(animations, farmerRef);
  const [showChat, setShowChat] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const firstAnimName = animations[0]?.name;
    const action = actions[firstAnimName];

    if (action) {
      action.reset();
      action.setLoop(THREE.LoopRepeat); // Loop animasi terus
      action.play();
    }
  }, [actions, animations]);

  function handleClick() {
    setShowChat(true);

    setTimeout(() => setShowChat(false), 5000);
  }
  return (
    <>
      <primitive
        object={scene}
        ref={farmerRef}
        position={[8, 1.5, 6]}
        onClick={handleClick}
        scale={0.7}
      />

      {showChat && (
        <group>
          <Html position={[8, 6, 6]} distanceFactor={10}>
            <div
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
              <span style={{ display: "block", transform: "skew(10deg)" }}>
               Get To Know Me
              </span>

              <button
                onClick={() => navigate("/about")}
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
