"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function ChessBoard() {
  const group = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouse.x * 0.6,
      0.05
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -0.3 + mouse.y * 0.4,
      0.05
    );
    group.current.position.y = Math.sin(t * 0.6) * 0.05;
  });

  const tiles: React.ReactNode[] = [];
  const size = 8;
  const squareSize = 0.4;
  const offset = ((size - 1) * squareSize) / 2;

  for (let x = 0; x < size; x += 1) {
    for (let z = 0; z < size; z += 1) {
      const isDark = (x + z) % 2 === 0;
      tiles.push(
        <mesh key={`${x}-${z}`} position={[x * squareSize - offset, 0, z * squareSize - offset]}>
          <boxGeometry args={[squareSize, 0.04, squareSize]} />
          <meshStandardMaterial
            color={isDark ? "#13192f" : "#2b3353"}
            metalness={0.35}
            roughness={0.4}
          />
        </mesh>
      );
    }
  }

  const majorPieces: Array<{ position: [number, number, number]; color: string }> = [
    { position: [-offset + squareSize, 0.2, -offset + squareSize], color: "#5eead4" },
    { position: [offset - squareSize, 0.2, offset - squareSize], color: "#f472b6" },
    { position: [-offset + squareSize * 2, 0.2, offset - squareSize * 2], color: "#a855f7" },
    { position: [offset - squareSize * 2, 0.2, -offset + squareSize * 2], color: "#38bdf8" }
  ];

  return (
    <group ref={group} position={[0, 0.1, 0]}>
      <group>{tiles}</group>
      {majorPieces.map((piece, index) => (
        <Float key={index} speed={2 + index * 0.2} rotationIntensity={0.6} floatIntensity={1.5}>
          <mesh position={piece.position}>
            <cylinderGeometry args={[0.12, 0.08, 0.4, 32]} />
            <meshStandardMaterial color={piece.color} emissive={piece.color} emissiveIntensity={0.4} metalness={0.6} roughness={0.3} />
          </mesh>
        </Float>
      ))}
      <mesh position={[0, -0.04, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[2.2, 64]} />
        <meshStandardMaterial
          color="#0b1120"
          metalness={0.8}
          roughness={0.2}
          emissive="#0ea5e9"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

export function HeroBoardScene() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-[0_45px_120px_rgba(14,165,233,0.35)] backdrop-blur-3xl md:h-[540px]">
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="aurora" />
      </div>
      <Canvas camera={{ position: [2.5, 2.6, 2.4], fov: 45 }}>
        <color attach="background" args={["#05060f"]} />
        <hemisphereLight args={["#6ee7b7", "#1e1b4b", 0.5]} />
        <spotLight
          position={[5, 8, 5]}
          angle={0.35}
          penumbra={0.6}
          intensity={2.4}
          color="#38bdf8"
          castShadow
        />
        <spotLight
          position={[-6, 6, -4]}
          angle={0.4}
          penumbra={0.8}
          intensity={2.1}
          color="#a855f7"
        />
        <ChessBoard />
      </Canvas>
      <div className="absolute inset-x-10 bottom-6 z-30 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-center text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur-xl">
        AI-calibrated angles respond to your cursor
      </div>
    </div>
  );
}
