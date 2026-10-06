import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import { WalkingCharacter } from "../assets/CraterAnimation.jsx";
import { FlyingDragon } from "../assets/Dragon.jsx";
import { ControlButton } from "./ControlButton.jsx";
import { GridNumbers } from "./GridNumbers.jsx";
import Cest from "../assets/Cest.jsx";
import { ProfileModal } from "../Home/ProfileModal.jsx";
import Tree from "../assets/Tree.jsx";
import Farmer from "../assets/Farmer.jsx";
import StoneGirl from "../assets/StoneGirl.jsx";
import CloudLooper from "../assets/CloudAnimation.jsx";
import CloudLayer from "../assets/Cloud.jsx";
import Switch from "../assets/Toggle.jsx";
import Moon from "../assets/Moon.jsx";
import { useContext, Suspense, useState, useEffect, useCallback } from "react";
import { Darkmode } from "../context/DarkmodeContext.js";
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


function TerminalLoader({ progress }) {
  const [logs, setLogs] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  
  const loadingSteps = [
    { text: '> Initializing 3D world...', delay: 300 },
    { text: '> Loading island environment...', delay: 600 },
    { text: '> Fetching character models...', delay: 900 },
    { text: '> Loading animations...', delay: 1200 },
    { text: '> Building scene objects...', delay: 1500 },
    { text: '> Preparing textures...', delay: 1800 },
    { text: '> Optimizing shaders...', delay: 2100 },
    { text: '> Almost ready...', delay: 2400 },
  ];
  
  useEffect(() => {
    if (currentStep < loadingSteps.length) {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, loadingSteps[currentStep].text]);
        setCurrentStep(prev => prev + 1);
      }, loadingSteps[currentStep].delay);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep]);
  
  useEffect(() => {
    if (progress === 100 && currentStep >= loadingSteps.length) {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, '> Done.']);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, currentStep]);
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#0a0e27',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      fontFamily: '"Courier New", monospace',
      padding: '20px'
    }}>
      
      <div style={{
        width: '600px',
        maxWidth: '90vw',
        background: '#1a1d29',
        borderRadius: '8px',
        border: '1px solid #2a2d39',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        overflow: 'hidden'
      }}>
        
        <div style={{
          background: '#16171d',
          padding: '12px 16px',
          borderBottom: '1px solid #2a2d39',
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
          <span style={{ marginLeft: '12px', color: '#8b8b8b', fontSize: '13px' }}>
            terminal — loading
          </span>
        </div>
        
        
        <div style={{
          padding: '20px',
          minHeight: '300px',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          {logs.map((log, index) => (
            <div
              key={index}
              style={{
                color: log.includes('Done') ? '#27c93f' : '#4ade80',
                fontSize: '15px',
                marginBottom: '8px',
                animation: 'fadeIn 0.3s ease-in',
                textShadow: '0 0 10px rgba(74, 222, 128, 0.3)'
              }}
            >
              {log}
              {index === logs.length - 1 && !log.includes('Done') && (
                <span style={{
                  animation: 'blink 1s infinite',
                  marginLeft: '4px'
                }}>
                  _
                </span>
              )}
            </div>
          ))}
          
         
          {progress > 0 && (
            <div style={{ marginTop: '20px' }}>
              <div style={{
                color: '#8b8b8b',
                fontSize: '13px',
                marginBottom: '8px'
              }}>
                Progress: {progress.toFixed(0)}%
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: '#2a2d39',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid #3a3d49'
              }}>
                <div style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #4ade80, #22c55e)',
                  transition: 'width 0.3s ease',
                  boxShadow: '0 0 10px rgba(74, 222, 128, 0.5)'
                }} />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { 
            opacity: 0;
            transform: translateY(-5px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}


function LoadingTracker({ onLoadComplete, onProgress }) {
  const { active, progress } = useProgress();

  useEffect(() => {
    onProgress?.(progress);
  }, [progress, onProgress]);

  useEffect(() => {
    
    if (progress === 100 && !active) {
    
      const timer = setTimeout(() => {
        onLoadComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress, active, onLoadComplete]);
  
  return null;
}


function SceneContent({ isProfileOpen, onProfileOpen }) {
  return (
    <>
      <group position={[10, 15, 0]}>
        <Island scale={0.3} />
        <WalkingCharacter />
        <Cest isProfileOpen={isProfileOpen} onProfileOpen={onProfileOpen} />
        <Tree />
        <Farmer />
        <StoneGirl />
        <FlyingDragon />
        <CloudLooper direction="right-to-left" />
        <CloudLooper direction="left-to-right" />
        <Moon />
      </group>
     
    </>
  );
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

const DESKTOP_BREAKPOINT = 1024;

const MOBILE_CAMERA = { position: [50, 60, 90], fov: 50 };
const DESKTOP_CAMERA = { position: [42, 50, 78], fov: 20 };

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => window.innerWidth >= DESKTOP_BREAKPOINT
  );

  useEffect(() => {
    const onResize = () =>
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isDesktop;
}

function ResponsiveCamera({ position, fov }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...position);
    if (camera.isPerspectiveCamera) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }, [camera, position, fov]);

  return null;
}

export default function AnimationPage() {
  const { toggle, setToggle } = useContext(Darkmode);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const isDesktop = useIsDesktop();
  const cameraConfig = isDesktop ? DESKTOP_CAMERA : MOBILE_CAMERA;
  
  const handleLoadComplete = () => {
    setIsLoaded(true);
  };

  const handleProgress = useCallback((value) => {
    setLoadProgress(value);
  }, []);
  
  return (
    <>
      
      {!isLoaded && <TerminalLoader progress={loadProgress} />}
      
      
      <div style={{ 
        opacity: isLoaded ? 1 : 0, 
        transition: 'opacity 0.8s ease',
        pointerEvents: isLoaded ? 'auto' : 'none'
      }}>
        <div className="absolute top-5 right-5 z-50">
          <Switch checked={toggle} onChange={setToggle} />
        </div>

        <Canvas
          camera={{ position: cameraConfig.position, fov: cameraConfig.fov }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: "high-performance" }}
          style={{
            width: "100vw",
            height: "100vh",
            backgroundImage: toggle ? 'url("/Skt.jpg")' : 'url("/mlm2.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {toggle ? (
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

          <ResponsiveCamera
            position={cameraConfig.position}
            fov={cameraConfig.fov}
          />

          <OrbitControls
            target={[10, 15, 5]}
            minDistance={30}
            maxDistance={100}
          />

          <LoadingTracker
            onLoadComplete={handleLoadComplete}
            onProgress={handleProgress}
          />

          <Suspense fallback={null}>
            <SceneContent
              isProfileOpen={showProfile}
              onProfileOpen={() => setShowProfile(true)}
            />
          </Suspense>
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
      </div>

      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </>
  );
}