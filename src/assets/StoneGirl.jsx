import { useGLTF, Html } from "@react-three/drei";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function StoneGirl() {
  const { scene } = useGLTF("/StoneGirl.glb"); 
  const [show , setShow] = useState(false)

  const navigate = useNavigate()

  function handleClick(){
    setShow(true)

    setTimeout(()=> setShow(false), 5000)

  }

  return (
    <>
    <primitive
      object={scene}
      position={[2.3, 0, 16.7]}
      scale={0.1}
      onClick={handleClick}
      rotation={[0, Math.PI / 2, 0]}
    />

  
          {show && (
            <group>
              <Html position={[0, 4, 16.7]} transform={false} distanceFactor={10}>
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
                    textAlign: "center", 
                    minWidth: "250px", 
                  }}
                >
                  Explore My Creations
                  <button
                    onClick={() => navigate("/project")}
                    style={{
                      display: "block", 
                      margin: "14px auto 0", 
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

export default StoneGirl;
