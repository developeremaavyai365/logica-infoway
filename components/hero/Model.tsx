"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  /** Path under /public, e.g. "/models/laptop.glb". */
  url: string;
  /** Target size (world units) of the model's largest dimension. */
  targetSize?: number;
  /** Extra local rotation (radians) if a source model faces the wrong way. */
  rotation?: [number, number, number];
}

/**
 * Loads any GLB/GLTF and normalizes it: recentres to the origin and uniformly
 * scales so its largest dimension equals `targetSize`. Enables shadows on all
 * meshes. This lets us drop in arbitrary real-world product models and have
 * them sit consistently inside the scroll rig regardless of their native scale.
 */
export function Model({ url, targetSize = 3, rotation = [0, 0, 0] }: ModelProps) {
  // second arg enables the Draco decoder (models are often draco-compressed)
  const { scene } = useGLTF(url, true);

  const prepared = useMemo(() => {
    const root = scene.clone(true);

    // normalize scale + centre
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const s = targetSize / maxDim;

    root.position.sub(center); // recentre
    root.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });

    const wrapper = new THREE.Group();
    wrapper.add(root);
    wrapper.scale.setScalar(s);
    return wrapper;
  }, [scene, targetSize]);

  return <primitive object={prepared} rotation={rotation} />;
}
