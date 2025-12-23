// import { useGLTF, useAnimations, Html } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import { useRef, useEffect, useState } from "react";

// export function WalkingCharacter() {
//   const { scene, animations } = useGLTF("/walking.glb");
//   const { actions } = useAnimations(animations, scene);
//   const characterRef = useRef();

//   const [direction, setDirection] = useState({
//     forward: false,
//     back: false,
//     left: false,
//     right: false,
//   });

//   const [showDialog, setShowDialog] = useState("welcome");
//   const [name, setName] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [selectedMenu, setSelectedMenu] = useState(null);

//   const speed = 0.05;

//   const allowedArea = [
//     [4.5, 13],
//     [2.5, 13],
//     [2, 8],
//     [2, 3],
//     [4, 3],
//     [5, 1],
//     [8, -1],
//     [12, 0],
//     [13, 1],
//     [14, 8],
//     [14, 12],
//     [6.5, 13],
//     [6.5, 16],
//     [8, 16],
//     [15, 16],
//     [14, 20],
//     [10.5, 25.5],
//     [0, 25],
//     [-3, 20.4],
//     [-8, 20.4],
//     [-8, 23.5],
//     [-9, 23.5],
//     [-9, 15],
//     [-8, 15],
//     [-8, 18],
//     [-3, 18],
//     [5, 18],
//     [4, 14],
//   ];

//   const slopeArea = [
//     [5, 11],
//     [4, 14],
//     [5, 18],
//     [8, 20],
//     [7, 15],
//     [5, 11],
//   ];

//   const isInsidePolygon = (point, polygon) => {
//     const [x, z] = point;
//     let inside = false;
//     for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
//       const [xi, zi] = polygon[i];
//       const [xj, zj] = polygon[j];
//       const intersect =
//         zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi;
//       if (intersect) inside = !inside;
//     }
//     return inside;
//   };

//   // Keyboard controls
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       switch (e.key.toLowerCase()) {
//         case "w":
//           setDirection((d) => ({ ...d, forward: true }));
//           break;
//         case "s":
//           setDirection((d) => ({ ...d, back: true }));
//           break;
//         case "a":
//           setDirection((d) => ({ ...d, left: true }));
//           break;
//         case "d":
//           setDirection((d) => ({ ...d, right: true }));
//           break;
//       }
//     };
//     const handleKeyUp = (e) => {
//       switch (e.key.toLowerCase()) {
//         case "w":
//           setDirection((d) => ({ ...d, forward: false }));
//           break;
//         case "s":
//           setDirection((d) => ({ ...d, back: false }));
//           break;
//         case "a":
//           setDirection((d) => ({ ...d, left: false }));
//           break;
//         case "d":
//           setDirection((d) => ({ ...d, right: false }));
//           break;
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//     };
//   }, []);

//   // Main animation
//   useEffect(() => {
//     const name = animations[0]?.name;
//     const action = actions[name];
//     if (action) {
//       action.reset().fadeIn(0.3).play();
//     }
//   }, [actions, animations]);

//   // Pause/resume animation
//   useEffect(() => {
//     const name = animations[0]?.name;
//     const action = actions[name];
//     if (!action) return;

//     const isMoving =
//       direction.forward || direction.back || direction.left || direction.right;

//     action.paused = !isMoving;
//     if (isMoving) action.play();
//   }, [direction, actions, animations]);

// const getTerrainHeight = (x, z) => {
//   const inSlope = isInsidePolygon([x, z], slopeArea);

//   let height;

//   if (inSlope) {
//     if (z < 11) height = 1.5;
//     else if (z < 13) height = 1.5 - 0.5 * ((z - 11) / 2);
//     else if (z < 15) height = 1 - (z - 13) / 2;
//     else if (z < 17) height = -((z - 15) / 1) * 2;
//     else height = -2;
//   } else {
//     height = z < 13 ? 1.5 : -2;
//   }

//   // Cegah turun lebih dari -2
//   return Math.max(height, -2);
// };

//   // const getTerrainHeight = (x, z) => {
//   //   const inSlope = isInsidePolygon([x, z], slopeArea);

//   //   if (inSlope) {
//   //     if (z < 11) return 1.5;
//   //     if (z < 13) return 1.5 - 0.5 * ((z - 11) / 2);
//   //     if (z < 15) return 1 - (z - 13) / 2;
//   //     if (z < 17) return -((z - 15) / 1) * 2;
//   //     return -2;
//   //   }

//   //   return z < 13 ? 1.5 : -2;
//   // };

//   // Movement
//   useFrame(() => {
//     const character = characterRef.current;
//     if (!character) return;

//     const moveVector = new THREE.Vector3();
//     if (direction.forward) moveVector.z -= 1;
//     if (direction.back) moveVector.z += 1;
//     if (direction.left) moveVector.x -= 1;
//     if (direction.right) moveVector.x += 1;

//     if (moveVector.lengthSq() > 0) {
//       moveVector.normalize().multiplyScalar(speed);
//       const nextPos = character.position.clone().add(moveVector);

//       if (isInsidePolygon([nextPos.x, nextPos.z], allowedArea)) {
//         nextPos.y = getTerrainHeight(nextPos.x, nextPos.z);
//         character.position.copy(nextPos);

//         const angle = Math.atan2(moveVector.x, moveVector.z);
//         character.rotation.y = angle;
//       }
//     }
//   });

// useEffect(() => {
//   const handleDir = (e) => {
//     const dir = e.type.replace("move-", "");
//     setDirection((prev) => ({ ...prev, [dir]: e.detail }));
//   };

//   const dirs = ["forward", "back", "left", "right"];
//   dirs.forEach((dir) => {
//     window.addEventListener(`move-${dir}`, handleDir);
//   });

//   return () => {
//     dirs.forEach((dir) => {
//       window.removeEventListener(`move-${dir}`, handleDir);
//     });
//   };
// }, []);

//   // Handle input submit (Enter key)
//   const handleSubmit = () => {
//     if (name.trim() !== "") {
//       setSubmitted(true);
//       setShowDialog(false);
//     }
//   };

//     const handleMenuClick = (menu) => {
//     setSelectedMenu(menu);
//     setShowDialog(" ");
//   };

//   return (
//     <group
//       ref={characterRef}
//       position={[8, -2, 23]}

//       scale={0.8}
//       onClick={() => {setShowDialog("menu"); setSelectedMenu(null);}}
//     >
//       <primitive object={scene} />
//       <Html
//         position={[0, 6, 0]}
//         center
//         distanceFactor={10}
//         style={{
//           color: "white",
//           fontSize: "20px",
//           minWidth: "200px",
//           textAlign: "center",
//         }}
//       >
//       {showDialog === "welcome" &&(
//           <div style={{ background: "rgba(0,0,0,0.7)" , padding: "6px 10px",
//           borderRadius: "8px",}}>
//             Hallo selamat datang 👋
//             <br />
//             Zoom out dan klik karakter untuk mulai interaksi
//           </div>
//         )}
//       {showDialog === "menu"  &&(
//           <div style={{ background: "rgba(0,0,0,0.7)", padding: "6px 10px",
//           borderRadius: "8px",}}>
//             <div style={{ marginBottom: "10px", fontWeight: "bold"   }}>
//               Mana yang ingin kamu kunjungi?
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "8px",
//               }}
//             >
//               {["Home", "About", "Project", "Contact"].map((menu) => (
//                 <button
//                   key={menu}
//                   onClick={() => handleMenuClick(menu)} // klik salah satu → langsung hilang
//                   style={{
//                     padding: "6px 10px",
//                     borderRadius: "6px",
//                     border: "none",
//                     background: "#4caf50",
//                     color: "white",
//                     cursor: "pointer",
//                     fontSize: "16px",
//                   }}
//                 >
//                   {menu}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//       </Html>
//     </group>
//   );
// }

import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect, useState } from "react";

export function WalkingCharacter() {
  const { scene, animations } = useGLTF("/walking.glb");
  const { actions } = useAnimations(animations, scene);
  const characterRef = useRef();

  const [direction, setDirection] = useState({
    forward: false,
    back: false,
    left: false,
    right: false,
  });

  const [showDialog, setShowDialog] = useState("welcome");
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [path, setPath] = useState([]); // rute otomatis (waypoints)

  const speed = 0.05;

  // batas jalan
  const allowedArea = [
    [4.5, 13],
    [2.5, 13],
    [2, 8],
    [2, 3],
    [4, 3],
    [5, 1],
    [8, -1],
    [12, 0],
    [13, 1],
    [14, 8],
    [14, 12],
    [6.5, 13],
    [6.5, 16],
    [8, 16],
    [15, 16],
    [14, 20],
    [10.5, 25.5],
    [0, 25],
    [-3, 20.4],
    [-8, 20.4],
    [-8, 23.5],
    [-9, 23.5],
    [-9, 15],
    [-8, 15],
    [-8, 18],
    [-3, 18],
    [5, 18],
    [4, 14],
  ];

  const slopeArea = [
    [5, 11],
    [4, 14],
    [5, 18],
    [8, 20],
    [7, 15],
    [5, 11],
  ];

  const isInsidePolygon = (point, polygon) => {
    const [x, z] = point;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, zi] = polygon[i];
      const [xj, zj] = polygon[j];
      const intersect =
        zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  };

  // tinggi tanah
  const getTerrainHeight = (x, z) => {
    const inSlope = isInsidePolygon([x, z], slopeArea);
    let height;
    if (inSlope) {
      if (z < 11) height = 1.5;
      else if (z < 13) height = 1.5 - 0.5 * ((z - 11) / 2);
      else if (z < 15) height = 1 - (z - 13) / 2;
      else if (z < 17) height = -((z - 15) / 1) * 2;
      else height = -2;
    } else {
      height = z < 13 ? 1.5 : -2;
    }
    return Math.max(height, -2);
  };

  // keyboard control
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key.toLowerCase()) {
        case "w":
          setDirection((d) => ({ ...d, forward: true }));
          break;
        case "s":
          setDirection((d) => ({ ...d, back: true }));
          break;
        case "a":
          setDirection((d) => ({ ...d, left: true }));
          break;
        case "d":
          setDirection((d) => ({ ...d, right: true }));
          break;
      }
    };
    const handleKeyUp = (e) => {
      switch (e.key.toLowerCase()) {
        case "w":
          setDirection((d) => ({ ...d, forward: false }));
          break;
        case "s":
          setDirection((d) => ({ ...d, back: false }));
          break;
        case "a":
          setDirection((d) => ({ ...d, left: false }));
          break;
        case "d":
          setDirection((d) => ({ ...d, right: false }));
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // animasi jalan
  useEffect(() => {
    const name = animations[0]?.name;
    const action = actions[name];
    if (action) {
      action.reset().fadeIn(0.3).play();
      action.paused = true; // awalnya idle
    }
  }, [actions, animations]);

  useEffect(() => {
    const handleDir = (e) => {
      const dir = e.type.replace("move-", "");
      setDirection((prev) => ({ ...prev, [dir]: e.detail }));
    };

    const dirs = ["forward", "back", "left", "right"];
    dirs.forEach((dir) => {
      window.addEventListener(`move-${dir}`, handleDir);
    });

    return () => {
      dirs.forEach((dir) => {
        window.removeEventListener(`move-${dir}`, handleDir);
      });
    };
  }, []);
  // update animasi jalan / idle
  useEffect(() => {
    const name = animations[0]?.name;
    const action = actions[name];
    if (!action) return;

    const isMoving =
      direction.forward ||
      direction.back ||
      direction.left ||
      direction.right ||
      path.length > 0;

    action.paused = !isMoving;
    if (isMoving) action.play();
  }, [direction, path, actions, animations]);

  // movement manual & auto
  useFrame(() => {
    const character = characterRef.current;
    if (!character) return;

    // --- manual WASD ---
    const moveVector = new THREE.Vector3();
    if (direction.forward) moveVector.z -= 1;
    if (direction.back) moveVector.z += 1;
    if (direction.left) moveVector.x -= 1;
    if (direction.right) moveVector.x += 1;

    if (moveVector.lengthSq() > 0) {
      moveVector.normalize().multiplyScalar(speed);
      const nextPos = character.position.clone().add(moveVector);
      if (isInsidePolygon([nextPos.x, nextPos.z], allowedArea)) {
        nextPos.y = getTerrainHeight(nextPos.x, nextPos.z);
        character.position.copy(nextPos);
        const angle = Math.atan2(moveVector.x, moveVector.z);
        character.rotation.y = angle;
      }
    }

    // --- auto jalan sesuai path ---
    if (path.length > 0) {
      const target = path[0];
      const currentPos = character.position.clone();
      const step = target.clone().sub(currentPos);

      if (step.length() > 0.1) {
        step.normalize().multiplyScalar(speed);
        const nextPos = currentPos.clone().add(step);
        if (isInsidePolygon([nextPos.x, nextPos.z], allowedArea)) {
          nextPos.y = getTerrainHeight(nextPos.x, nextPos.z);
          character.position.copy(nextPos);
          const angle = Math.atan2(step.x, step.z);
          character.rotation.y = angle;
        }
      } else {
        // sampai di waypoint → hapus dari path
        setPath((prev) => prev.slice(1));

        // kalau ini waypoint terakhir → hadapkan ke object sesuai menu
        if (path.length === 1 && selectedMenu) {
          let lookTarget;
          if (selectedMenu === "Home") {
            lookTarget = new THREE.Vector3(13, 0, 15);
          } else if (selectedMenu === "Project") {
            lookTarget = new THREE.Vector3(2.3, 0, 16.7);
          } else if (selectedMenu === "About") {
            lookTarget = new THREE.Vector3(10, 0, 4);
          } else if (selectedMenu === "Contact") {
            lookTarget = new THREE.Vector3(3, 0, 5);
          }

          if (lookTarget) {
            const dir = lookTarget.clone().sub(character.position);
            const angle = Math.atan2(dir.x, dir.z);
            character.rotation.y = angle;
          }
        }
      }
    }
  });

  // klik menu → set path sesuai logika
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setShowDialog(menu);

    setTimeout(() => setShowDialog(""), 5000);

    const currentZ = characterRef.current.position.z;
    let waypoints = [];

    if (menu === "About") {
      if (currentZ <= 10) {
        waypoints = [new THREE.Vector3(10, getTerrainHeight(10, 6), 6)];
      } else {
        waypoints = [
          new THREE.Vector3(6, getTerrainHeight(6, 22), 22),
          new THREE.Vector3(6, getTerrainHeight(6, 10), 10),
          new THREE.Vector3(10, getTerrainHeight(10, 6), 6),
        ];
      }
    } else if (menu === "Contact") {
      if (currentZ <= 10) {
        waypoints = [new THREE.Vector3(3, getTerrainHeight(3, 8), 8)];
      } else {
        waypoints = [
          new THREE.Vector3(6, getTerrainHeight(6, 22), 22),
          new THREE.Vector3(6, getTerrainHeight(6, 10), 10),
          new THREE.Vector3(3, getTerrainHeight(3, 8), 8),
        ];
      }
    } else if (menu === "Home") {
      if (currentZ >= 10) {
        waypoints = [new THREE.Vector3(13, getTerrainHeight(13, 20), 17.5)];
      } else {
        waypoints = [
          new THREE.Vector3(6, getTerrainHeight(6, 10), 10),
          new THREE.Vector3(6, getTerrainHeight(6, 22), 22),
          new THREE.Vector3(13, getTerrainHeight(13, 20), 17.5),
        ];
      }
    } else if (menu === "Project") {
      if (currentZ >= 10) {
        waypoints = [new THREE.Vector3(3, getTerrainHeight(3, 19), 19)];
      } else {
        waypoints = [
          new THREE.Vector3(6, getTerrainHeight(6, 10), 10),
          new THREE.Vector3(6, getTerrainHeight(6, 22), 22),
          new THREE.Vector3(3, getTerrainHeight(3, 19), 19),
        ];
      }
    }

    setPath(waypoints);
  };

  return (
    <group
      ref={characterRef}
      position={[8, -2, 23]}
      scale={0.8}
      onClick={() => {
        setShowDialog("menu");
        setSelectedMenu(null);
      }}
    >
      <primitive object={scene} />
      <Html
        position={[0, 6, 0]}
        center
        distanceFactor={10}
        style={{
          color: "white",
          fontSize: "20px",
          minWidth: "200px",
          textAlign: "center",
        }}
      >
        {showDialog === "welcome" && (
          <div
            style={{
              background: "rgba(0,0,0,0.7)",
              padding: "6px 10px",
              borderRadius: "8px",
            }}
          >
            Hallo selamat datang{" "}
            <span
              style={{
                display: "inline-block",
                animation: "wiggle 1s infinite",
              }}
            >
              👋
            </span>
            <br />
            Zoom out dan klik karakter untuk mulai interaksi
            <style>
              {`
      @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(20deg); }
      }
    `}
            </style>
          </div>
        )}
        {showDialog === "menu" && (
          <div
            style={{
              background: "rgba(0,0,0,0.75)",
              padding: "12px 16px",
              borderRadius: "10px",
              minWidth: "240px",
            }}
          >
            <div
              style={{
                marginBottom: "14px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Mana yang ingin kamu kunjungi?
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {["Home", "About", "Project", "Contact"].map((menu) => (
                <button
                  key={menu}
                  onClick={() => handleMenuClick(menu)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#4caf50",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "17px",
                  }}
                >
                  {menu}
                </button>
              ))}
            </div>
          </div>
        )}

        {showDialog === "Home" && (
          <div
            style={{
              background: "rgba(0,0,0,0.7)",
              padding: "6px 10px",
              borderRadius: "8px",
            }}
          >
            Silahkan klik peti tersebut
          </div>
        )}

        {showDialog === "Project" && (
          <div
            style={{
              background: "rgba(0,0,0,0.7)",
              padding: "6px 10px",
              borderRadius: "8px",
            }}
          >
            Silahkan klik patung di kolam tersebut
          </div>
        )}

        {showDialog === "About" && (
          <div
            style={{
              background: "rgba(0,0,0,0.7)",
              padding: "6px 10px",
              borderRadius: "8px",
            }}
          >
            Silahkan klik Skeleton tersebut
          </div>
        )}

        {showDialog === "Contact" && (
          <div
            style={{
              background: "rgba(0,0,0,0.7)",
              padding: "6px 10px",
              borderRadius: "8px",
            }}
          >
            Silahkan klik patung batu di depan mu
          </div>
        )}
      </Html>
    </group>
  );
}
