import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "motion/react";

export const FLOORS = 12;
export const BUILD_END = 0.8; // building finishes at 80% of the hero scroll
const FLOOR_H = 0.5;
const PIECES = FLOORS + 1; // 12 floors + 1 roof

// Materials are created ONCE and shared by every floor (better performance)
const slabMat = new THREE.MeshStandardMaterial({
  color: "#dededa",
  roughness: 0.9,
});
const columnMat = new THREE.MeshStandardMaterial({
  color: "#9a9a94",
  roughness: 0.8,
});
const glassMat = new THREE.MeshStandardMaterial({
  color: "#b8c4cc",
  roughness: 0.15,
  metalness: 0.6,
  transparent: true,
  opacity: 0.55,
});
const accentMat = new THREE.MeshStandardMaterial({
  color: "#c8642c",
  roughness: 0.6,
});

const corners: [number, number][] = [
  [-1.4, -1],
  [1.4, -1],
  [-1.4, 1],
  [1.4, 1],
];

// Each piece gets its own "slot" of the scroll.
// Returns 0 before its turn, 0→1 while building, 1 after.
function pieceProgress(p: number, index: number) {
  const slot = BUILD_END / PIECES;
  return THREE.MathUtils.clamp((p - index * slot) / slot, 0, 1);
}
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

type FloorProps = {
  index: number;
  progress: MotionValue<number>;
  isRoof?: boolean;
};

function Floor({ index, progress, isRoof = false }: FloorProps) {
  const ref = useRef<THREE.Group>(null);
  const baseY = index * FLOOR_H;

  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const t = easeOut(pieceProgress(progress.get(), index));
    g.visible = t > 0;
    // Floor starts 2.5 units above its place and drops down
    const targetY = baseY + (1 - t) * 2.5;
    g.position.y = THREE.MathUtils.lerp(g.position.y, targetY, 0.12);
    g.scale.setScalar(0.85 + 0.15 * t);
  });

  return (
    <group ref={ref} position={[0, baseY + 2.5, 0]} visible={false}>
      {isRoof ? (
        <>
          <mesh material={slabMat} position={[0, 0.06, 0]} castShadow>
            <boxGeometry args={[3.1, 0.12, 2.3]} />
          </mesh>
          <mesh material={accentMat} position={[0, 0.14, 0]}>
            <boxGeometry args={[3.12, 0.05, 2.32]} />
          </mesh>
        </>
      ) : (
        <>
          {/* concrete slab */}
          <mesh
            material={slabMat}
            position={[0, 0.04, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[3, 0.08, 2.2]} />
          </mesh>
          {/* glass walls */}
          <mesh material={glassMat} position={[0, 0.29, 0]}>
            <boxGeometry args={[2.8, 0.42, 2.0]} />
          </mesh>
          {/* 4 corner columns */}
          {corners.map(([x, z]) => (
            <mesh
              key={`${x}-${z}`}
              material={columnMat}
              position={[x, 0.29, z]}
              castShadow
            >
              <boxGeometry args={[0.12, 0.42, 0.12]} />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

export default function Building({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const p = progress.get();
    // Slowly rotate the building as you scroll
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        -0.5 + p * 0.9,
        0.08,
      );
    }
    // Camera rises with the building.
    // On desktop, look slightly left so the building sits on the RIGHT (text is on the left).
    const offsetX = state.size.width > 768 ? -1.8 : 0;
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      3 + p * 4,
      0.08,
    );
    state.camera.lookAt(offsetX, 1 + p * 2.5, 0);
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <group ref={group}>
        {Array.from({ length: PIECES }, (_, i) => (
          <Floor key={i} index={i} progress={progress} isRoof={i === FLOORS} />
        ))}
      </group>
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.35}
        scale={12}
        blur={2.5}
        far={8}
      />
    </>
  );
}
