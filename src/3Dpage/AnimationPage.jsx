import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { WalkingCharacter } from "../assets/CraterAnimation.jsx";
import { FlyingDragon } from "../assets/Dragon.jsx";
import { ControlButton } from "./ControlButton.jsx";
import { GridNumbers } from "./GridNumbers.jsx";
import Cest from "../assets/Cest.jsx";
import Tree from "../assets/Tree.jsx";
import Farmer from "../assets/Farmer.jsx";
import StoneGirl from "../assets/StoneGirl.jsx";
import CloudLooper from "../assets/CloudAnimation.jsx";
import CloudLayer from "../assets/Cloud.jsx";
import Switch from "../assets/Toggle.jsx";
import { useContext } from "react";
import { Darkmode } from "../App.jsx";
import {
  FaArrowRight,
  FaArrowLeft,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

function Island(props) {
  const { scene } = useGLTF("/IslandNew.glb");
  return <primitive object={scene} {...props} />;
}

const styles = {
  container: {
    position: "absolute",
    bottom: 30,
    left: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    zIndex: 10,
  },
};
export default function AnimationPage() {
  const { toggle, setToggle } = useContext(Darkmode);
  return (
    <>
      <div className="absolute top-5 right-5 z-50">
        <Switch checked={toggle} onChange={setToggle} />
      </div>

      <Canvas
        camera={{ position: [50, 60, 90], fov: 50 }}
        style={{
          width: "100vw",
          height: "100vh",

          backgroundImage: toggle ? 'url("/Skt.jpg")' : 'url("/mlm4.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {toggle ? (
          <>
            <>
              <fog attach="fog" args={["#e0e0e0", 60, 200]} />

              <ambientLight intensity={0.8} color="#4a5a7a" />

              <hemisphereLight
                intensity={1}
                skyColor="#3a4a6a"
                groundColor="#2a2a3a"
              />
              <directionalLight
                position={[20, 20, 10]}
                intensity={1.2}
                color="#6a7a9a"
              />
              <pointLight
                position={[10, 30, 10]}
                intensity={1}
                color="#5a6a8a"
              />
            </>
          </>
        ) : (
          <>
            <ambientLight intensity={0.6} color="#5a6fa8" />
            <hemisphereLight
              intensity={0.4}
              skyColor="#1a1e2f"
              groundColor="#0a0c14"
            />
            <directionalLight
              position={[30, 50, 20]}
              intensity={1}
              color="#bcd2ff"
            />
            <pointLight
              position={[10, 30, 10]}
              intensity={0.5}
              color="#8ab4ff"
            />
          </>
        )}

        <OrbitControls
          target={[10, 15, 5]}
          minDistance={30}
          maxDistance={100}
        />

        <group position={[10, 15, 0]}>
          {/* <gridHelper args={[100, 20]} position={[0, 0.01, 0]} />
          <axesHelper args={[10]} />
          <GridNumbers /> */}
          <Island scale={0.3} />
          <WalkingCharacter />
          <Cest />
          <Tree />
          <Farmer />
          <StoneGirl />
          <FlyingDragon />

          {/* <CloudLayer color="#cfe3ff" opacity={0.35} />

          <CloudLayer /> */}
          <>
            <CloudLooper direction="right-to-left" />
            <CloudLooper direction="left-to-right" />
            {/* <CloudLooper direction="right-to-left" /> */}
          </>
        </group>
      </Canvas>
      <div style={styles.container}>
        <ControlButton dir="forward" toggle={toggle}>
          <FaArrowUp size={28} color={toggle ? "#000" : "#fff"} />
        </ControlButton>

        <div style={{ display: "flex", gap: "50px" }}>
          <ControlButton dir="left" toggle={toggle}>
            <FaArrowLeft size={28} color={toggle ? "#000" : "#fff"} />
          </ControlButton>
          <ControlButton dir="right" toggle={toggle}>
            <FaArrowRight size={28} color={toggle ? "#000" : "#fff"} />
          </ControlButton>
        </div>
        <ControlButton dir="back" toggle={toggle}>
          <FaArrowDown size={28} color={toggle ? "#000" : "#fff"} />
        </ControlButton>
      </div>
    </>
  );

  
}



