"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Model } from "@/components/hero/Model";

/**
 * Internal-only utility route: renders one real GLB from /public/models at a
 * fixed flattering angle on a transparent background, then exposes the pixels
 * via `window.__exportPNG()` so an external script can pull a lossless capture
 * of the ACTUAL model (not a mockup). Not linked anywhere in the site nav.
 *
 * Usage: /_render?model=macbook-pro.glb&size=4&yaw=35&pitch=12
 */
function CaptureReady() {
  const { gl, scene, camera, invalidate } = useThree();
  useEffect(() => {
    let frames = 0;
    const id = setInterval(() => {
      frames++;
      invalidate();
      if (frames > 12) {
        clearInterval(id);
        gl.render(scene, camera);
        (window as unknown as { __exportPNG: () => string }).__exportPNG = () =>
          gl.domElement.toDataURL("image/png");
        (window as unknown as { __renderReady: boolean }).__renderReady = true;
      }
    }, 80);
    return () => clearInterval(id);
  }, [gl, scene, camera, invalidate]);
  return null;
}

export default function RenderPage() {
  const params = useSearchParams();
  const model = params.get("model") ?? "macbook-pro.glb";
  const size = Number(params.get("size") ?? 4);
  const yaw = (Number(params.get("yaw") ?? 35) * Math.PI) / 180;
  const pitch = (Number(params.get("pitch") ?? 12) * Math.PI) / 180;
  const ref = useRef<HTMLDivElement>(null);

  const camDist = 8;
  const camPos: [number, number, number] = [
    camDist * Math.sin(yaw),
    camDist * Math.sin(pitch),
    camDist * Math.cos(yaw),
  ];

  return (
    <div ref={ref} style={{ width: "1024px", height: "1024px", background: "transparent" }}>
      <Canvas
        shadows
        dpr={1}
        camera={{ position: camPos, fov: 32 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={2} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-6, 3, -4]} intensity={0.5} />
        <Environment resolution={256}>
          <Lightformer intensity={2.4} position={[0, 4, 4]} scale={[10, 5, 1]} />
          <Lightformer intensity={1} position={[-5, 1, 2]} scale={[5, 5, 1]} />
          <Lightformer intensity={0.8} position={[5, 1, 2]} scale={[5, 5, 1]} />
        </Environment>
        <Suspense fallback={null}>
          <Model url={`/models/${model}`} targetSize={size} />
        </Suspense>
        <CaptureReady />
      </Canvas>
    </div>
  );
}
