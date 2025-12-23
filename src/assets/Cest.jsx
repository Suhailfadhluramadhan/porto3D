import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useNavigate } from "react-router-dom"; // ✅ pake navigate

export default function Cest() {
  const chestRef = useRef();
  const { scene, animations } = useGLTF("/Chest.glb");
  const { actions } = useAnimations(animations, chestRef);

  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate(); 

  // Setup animasi
  useEffect(() => {
    if (animations.length && actions[animations[0].name]) {
      const action = actions[animations[0].name];
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
    }
  }, [animations, actions]);

  const handleClick = () => {
    const action = actions[animations[0]?.name];
    if (action) {
      action.reset().play();
    }

    setShowMessage(true);

   

    setTimeout(() => {
      setShowMessage(false);
  
    }, 5000);

    setTimeout(() => {
      if (action) {
        action.stop();
        action.reset();
      }
    }, 5000);
  };

  return (
    <>
      <primitive
        object={scene}
        ref={chestRef}
        position={[13, -2, 15]}
        scale={0.5}
        onClick={handleClick}
      />

      {showMessage && (
        <Html
          position={[11, 3, 15]}
          distanceFactor={10}
          style={{
            position: "relative",
            color: "white",
            fontSize: "24px",
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "'Times New Roman', serif",
            pointerEvents: "auto", // penting biar bisa klik button
            minWidth: "260px",
          }}
        >
          <div
            style={{
              position: "relative",
              background: "blue",
              padding: "18px 28px",
              borderRadius: "12px",
              transform: "skew(-10deg)",
              boxShadow: "15px 15px 0px white",
              display: "inline-block",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                transform: "skew(10deg)",
              }}
            >
              <span>Hello There!</span>
              <span
                style={{
                  display: "inline-block",
                  animation: "wiggle 1s infinite",
                }}
              >
                👋🏻
              </span>
            </div>

            <div style={{ marginTop: "12px", transform: "skew(10deg)" }}>
              I'M Suhail Fadhlu Ramadhan
            </div>

            {/* ✅ Tombol pake button biar lebih aman */}
           
              <button
                onClick={() => navigate("/home")}
                
                style={{
                  display: "inline-block",
                  marginTop: "14px",
                  padding: "8px 16px",
                  fontSize: "24px",
                  fontFamily: "'Times New Roman', serif",
                  fontWeight: "bold",
                  color: "blue",
                  background: "white",
                  border: "2px solid blue",
                  borderRadius: "6px",
                  cursor: "pointer",
                  textDecoration: "none",
                  transform: "skew(10deg)",
                }}
              >
                See More
              </button>
            
          </div>

          <style>
            {`
              @keyframes wiggle {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(20deg); }
              }
            `}
          </style>
        </Html>
      )}
    </>
  );
}
