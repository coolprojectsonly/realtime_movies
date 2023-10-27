"use client";
import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(generateSpherePositions(5000));

  function generateSpherePositions(count) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 4 - 3;
      const y = Math.random() * 3 - 2;
      const z = Math.random() * 5 - 4;
      const length = Math.sqrt(x * x + y * y + z * z);
      positions[i * 3] = x / length;
      positions[i * 3 + 1] = y / length;
      positions[i * 3 + 2] = z / length;
    }
    return positions;
  }

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = ({ Header }) => {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100%",
      }}
    >
      <Header />

      <div
        style={{
          width: "100%",
          height: "auto",
          position: "absolute",
          inset: 0,
          zIndex: -1,
          backgroundColor: "transparent",
        }}
      >
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <Stars />
          </Suspense>

          <Preload all />
        </Canvas>
      </div>
    </div>
  );
};

export default StarsCanvas;
