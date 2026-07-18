"use client";

import { MutableRefObject, Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { Model } from "./Model";

/**
 * Real product models. Drop a .glb into /public/models and set its entry here;
 * it auto-replaces the stylized fallback (auto-centred + scaled to `size`).
 * `rot` corrects a model that faces the wrong way. null = use the fallback mesh.
 */
type Slot = { url: string; size: number; rot?: [number, number, number] } | null;
const MODELS: Record<"laptop" | "phone" | "tablet" | "monitor" | "watch", Slot> = {
  laptop: { url: "/models/macbook-pro.glb", size: 4.0, rot: [0, 0, 0] },
  phone: { url: "/models/phone.glb", size: 2.3, rot: [0, 0, 0] },
  // Native orientation already faces the camera (screen toward viewer).
  tablet: { url: "/models/graphic-tablet.glb", size: 3.0, rot: [0, 0, 0] },
  // The printer occupies the upper-left ("monitor") position in the cluster.
  // rot Y = 180° so its front (output tray) faces the camera.
  monitor: { url: "/models/generic-printer.glb", size: 3.0, rot: [0, Math.PI, 0] },
  watch: null,
};

/* ---------- helpers ---------- */
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
/** normalized ramp 0..1 across [a,b] */
const ramp = (x: number, a: number, b: number) => clamp((x - a) / (b - a), 0, 1);
const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = THREE.MathUtils.lerp;
const damp = THREE.MathUtils.damp;

/** Glossy brand-gradient screen → emissive canvas texture. */
function useScreenTexture(kind: "laptop" | "phone" | "tablet" | "watch") {
  return useMemo(() => {
    const portrait = kind === "phone" || kind === "watch";
    const w = 512;
    const h = kind === "laptop" ? 320 : portrait ? 1024 : 700;
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d")!;
    // Brand sweep: emerald green → sky blue (mirrors the logo/brand gradient).
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#065f46");
    g.addColorStop(0.55, "#10b981");
    g.addColorStop(1, "#38bdf8");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    const rg = ctx.createRadialGradient(w * 0.7, h * 0.25, 10, w * 0.7, h * 0.25, w * 0.7);
    rg.addColorStop(0, "rgba(255,255,255,0.35)");
    rg.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, w, h);
    const pad = w * 0.08;
    const round = (x: number, y: number, ww: number, hh: number, r: number) => {
      ctx.beginPath();
      ctx.roundRect(x, y, ww, hh, r);
      ctx.fill();
    };
    ctx.fillStyle = "rgba(255,255,255,0.16)";
    if (kind === "laptop") {
      round(pad, pad, w * 0.5, h * 0.18, 12);
      round(pad, pad + h * 0.24, w * 0.84, h * 0.12, 10);
      round(pad, pad + h * 0.42, w * 0.6, h * 0.12, 10);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      round(w * 0.66, pad, w * 0.26, h * 0.5, 14);
    } else if (kind === "watch") {
      round(pad, pad, w * 0.84, h * 0.84, 40);
    } else {
      round(pad, pad, w * 0.84, h * 0.06, 14);
      round(pad, pad + h * 0.1, w * 0.84, h * 0.22, 18);
      for (let i = 0; i < 3; i++) round(pad, pad + h * (0.36 + i * 0.12), w * 0.84, h * 0.08, 12);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      round(pad, pad + h * 0.74, w * 0.84, h * 0.1, 16);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, [kind]);
}

function Screen({ tex, w, h }: { tex: THREE.Texture; w: number; h: number }) {
  return (
    <mesh position={[0, 0, 0.061]}>
      <planeGeometry args={[w, h]} />
      <meshStandardMaterial
        map={tex}
        emissiveMap={tex}
        emissive="#ffffff"
        emissiveIntensity={1.2}
        toneMapped={false}
        roughness={0.18}
      />
    </mesh>
  );
}

const darkBody = { color: "#16181d", metalness: 0.85, roughness: 0.34 };

/* ---------- device meshes ---------- */
function Laptop() {
  const tex = useScreenTexture("laptop");
  return (
    <group>
      <RoundedBox args={[3.4, 0.14, 2.3]} radius={0.06} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial {...darkBody} />
      </RoundedBox>
      <mesh position={[0, 0.075, 0.6]}>
        <boxGeometry args={[1.1, 0.01, 0.8]} />
        <meshStandardMaterial color="#20232a" metalness={0.6} roughness={0.4} />
      </mesh>
      <group position={[0, 0.07, -1.15]} rotation={[-0.22, 0, 0]}>
        <group position={[0, 1.15, 0]}>
          <RoundedBox args={[3.4, 2.3, 0.1]} radius={0.06} smoothness={4} castShadow>
            <meshStandardMaterial {...darkBody} />
          </RoundedBox>
          <Screen tex={tex} w={3.1} h={2.0} />
        </group>
      </group>
    </group>
  );
}

function Phone() {
  const tex = useScreenTexture("phone");
  return (
    <group>
      <RoundedBox args={[1.02, 2.1, 0.11]} radius={0.14} smoothness={5} castShadow receiveShadow>
        <meshStandardMaterial color="#1b1d23" metalness={0.9} roughness={0.28} />
      </RoundedBox>
      <Screen tex={tex} w={0.9} h={1.98} />
      <mesh position={[-0.28, 0.72, -0.07]}>
        <cylinderGeometry args={[0.12, 0.12, 0.03, 24]} />
        <meshStandardMaterial color="#0c0d10" metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Monitor() {
  const tex = useScreenTexture("laptop");
  return (
    <group>
      <RoundedBox args={[3.0, 1.8, 0.12]} radius={0.06} smoothness={4} castShadow>
        <meshStandardMaterial {...darkBody} />
      </RoundedBox>
      <Screen tex={tex} w={2.7} h={1.55} />
      <mesh position={[0, -1.25, -0.05]}>
        <boxGeometry args={[0.16, 0.9, 0.16]} />
        <meshStandardMaterial {...darkBody} />
      </mesh>
      <mesh position={[0, -1.7, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.06, 32]} />
        <meshStandardMaterial {...darkBody} />
      </mesh>
    </group>
  );
}

function Tablet() {
  const tex = useScreenTexture("tablet");
  return (
    <group>
      <RoundedBox args={[1.5, 2.1, 0.08]} radius={0.1} smoothness={5} castShadow>
        <meshStandardMaterial color="#1b1d23" metalness={0.85} roughness={0.3} />
      </RoundedBox>
      <Screen tex={tex} w={1.35} h={1.95} />
    </group>
  );
}

/* ---------- scroll-driven rig ---------- */
function Rig({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const laptop = useRef<THREE.Group>(null);
  const phone = useRef<THREE.Group>(null);
  const monitor = useRef<THREE.Group>(null);
  const tablet = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame((state, delta) => {
    const p = progressRef.current;
    const t = state.clock.elapsedTime;
    const d = Math.min(delta, 0.05);

    // --- camera dolly: starts close (laptop fills), pulls back to reveal ---
    const reveal = smooth(ramp(p, 0, 1));
    camera.position.z = damp(camera.position.z, lerp(5.4, 9.2, reveal), 4, d);
    camera.position.y = damp(camera.position.y, lerp(1.2, 2.4, reveal), 4, d);
    // subtle mouse parallax
    camera.position.x = damp(camera.position.x, state.pointer.x * 0.5, 3, d);
    camera.lookAt(0, -0.1, 0);

    // --- laptop: center & huge, then slides left as phone arrives ---
    const lp = smooth(ramp(p, 0.05, 0.5));
    if (laptop.current) {
      laptop.current.position.x = damp(laptop.current.position.x, lerp(0, -1.7, lp), 4, d);
      laptop.current.position.y = damp(laptop.current.position.y, lerp(-0.35, -0.1, lp) + Math.sin(t * 0.6) * 0.04, 5, d);
      const s = lerp(1.35, 0.9, lp);
      laptop.current.scale.setScalar(damp(laptop.current.scale.x, s, 4, d));
      laptop.current.rotation.y = damp(laptop.current.rotation.y, lerp(-0.12, -0.5, lp), 4, d);
    }

    // --- phone: flies in from the right ---
    const pp = smooth(ramp(p, 0.28, 0.56));
    if (phone.current) {
      phone.current.position.x = damp(phone.current.position.x, lerp(6.5, 1.6, pp), 4, d);
      phone.current.position.y = damp(phone.current.position.y, lerp(0.6, -0.2, pp) + Math.sin(t * 0.7 + 1) * 0.05, 5, d);
      phone.current.position.z = lerp(0, 0.8, pp);
      phone.current.rotation.y = damp(phone.current.rotation.y, lerp(1.1, 0.4, pp), 4, d);
      phone.current.scale.setScalar(damp(phone.current.scale.x, lerp(0.001, 0.95, pp), 4, d));
    }

    // --- other products: rise/arc in during the final beat ---
    const op = smooth(ramp(p, 0.6, 0.95));
    const place = (
      ref: React.RefObject<THREE.Group>,
      x: number,
      yEnd: number,
      z: number,
      rotY: number,
      scale: number,
      phase: number,
    ) => {
      if (!ref.current) return;
      ref.current.position.x = damp(ref.current.position.x, x, 4, d);
      ref.current.position.y = damp(ref.current.position.y, lerp(-4, yEnd, op) + Math.sin(t * 0.6 + phase) * 0.04, 5, d);
      ref.current.position.z = z;
      ref.current.rotation.y = damp(ref.current.rotation.y, rotY, 4, d);
      ref.current.scale.setScalar(damp(ref.current.scale.x, lerp(0.001, scale, op), 4, d));
    };
    place(monitor, -3.5, 0.2, -1.2, 0, 0.62, 0);
    place(tablet, 3.6, 0.0, -0.6, 0, 0.8, 2);
  });

  // Render the real GLB model when one is wired for the slot; otherwise fall
  // back to the stylized 3D device mesh (real geometry + emissive screen, not a
  // flat box). Both paths share the scene lighting so they read consistently.
  const slot = (kind: keyof typeof MODELS, fallback: React.ReactNode) => {
    const m = MODELS[kind];
    return m ? <Model url={m.url} targetSize={m.size} rotation={m.rot} /> : fallback;
  };

  return (
    <Suspense fallback={null}>
      <group ref={laptop} position={[0, -0.35, 0]} scale={1.35}>
        {slot("laptop", <Laptop />)}
      </group>
      <group ref={phone} position={[6.5, 0.6, 0]} scale={0.001}>
        {slot("phone", <Phone />)}
      </group>
      <group ref={monitor} position={[-3.5, -4, -1.2]} scale={0.001}>
        {slot("monitor", <Monitor />)}
      </group>
      <group ref={tablet} position={[3.6, -4, -0.6]} scale={0.001}>
        {slot("tablet", <Tablet />)}
      </group>
    </Suspense>
  );
}

export default function DeviceScene({ progressRef }: { progressRef: MutableRefObject<number> }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 1.2, 5.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 5]} intensity={1.7} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-6, 2, -4]} intensity={0.6} color="#34d399" />
      <pointLight position={[0, 1, 4]} intensity={0.8} />

      <Environment resolution={256}>
        <Lightformer intensity={2} position={[0, 4, 4]} scale={[8, 4, 1]} />
        <Lightformer intensity={1} position={[-4, 1, 2]} scale={[4, 4, 1]} color="#34d399" />
        <Lightformer intensity={1} position={[4, 1, 2]} scale={[4, 4, 1]} color="#38bdf8" />
      </Environment>

      <Rig progressRef={progressRef} />

      <ContactShadows position={[0, -1.9, 0]} opacity={0.45} scale={16} blur={2.8} far={5} />
    </Canvas>
  );
}
