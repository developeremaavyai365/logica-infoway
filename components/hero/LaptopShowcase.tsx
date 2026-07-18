"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

const TARGET = 4.2; // world size of the laptop's largest dimension

function LaptopModel() {
  const { scene } = useGLTF("/models/laptop.glb");

  const model = useMemo(() => {
    const root = scene.clone(true);

    // premium brushed-aluminium look (source model is untextured grey)
    const silver = new THREE.MeshStandardMaterial({
      color: "#d9dce1",
      metalness: 0.3,
      roughness: 0.55,
    });
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
        m.material = silver;
      }
    });

    // centre + uniform scale to TARGET
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const s = TARGET / (Math.max(size.x, size.y, size.z) || 1);
    root.position.sub(center);

    const g = new THREE.Group();
    g.add(root);
    g.scale.setScalar(s);
    return g;
  }, [scene]);

  return <primitive object={model} />;
}

export default function LaptopShowcase() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 1.6, 8], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 8, 5]} intensity={1.9} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-6, 3, -4]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 2, 5]} intensity={0.6} />

      <Environment resolution={256}>
        <Lightformer intensity={2.4} position={[0, 4, 4]} scale={[10, 5, 1]} />
        <Lightformer intensity={1.2} position={[-5, 1, 2]} scale={[5, 5, 1]} />
        <Lightformer intensity={0.8} position={[5, 1, 2]} scale={[5, 5, 1]} color="#bcd4ff" />
      </Environment>

      <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.5}>
        <LaptopModel />
      </Float>

      <OrbitControls
        autoRotate
        autoRotateSpeed={1.3}
        enableZoom={false}
        enablePan={false}
        target={[0, 0, 0]}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.85}
      />

      <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={14} blur={2.6} far={4.5} />
    </Canvas>
  );
}

useGLTF.preload("/models/laptop.glb");
