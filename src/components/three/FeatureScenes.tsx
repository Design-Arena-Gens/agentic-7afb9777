"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls, Sparkles, Points, PointMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";

type FeatureCanvasProps = {
  children: ReactNode;
};

function FeatureCanvas({ children }: FeatureCanvasProps) {
  return (
    <Canvas camera={{ position: [2.6, 2.2, 3.2], fov: 40 }}>
      <color attach="background" args={["transparent"]} />
      <hemisphereLight args={["#9f7aea", "#0f172a", 1.2]} />
      <spotLight position={[5, 6, 5]} angle={0.4} intensity={2.1} penumbra={0.8} color="#60a5fa" />
      <spotLight position={[-5, 3, -2]} angle={0.4} intensity={1.6} color="#f472b6" />
      <Suspense fallback={null}>{children}</Suspense>
      <OrbitControls enablePan={false} maxDistance={8} minDistance={3} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
}

function BrainNodeCluster() {
  const nodes = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const connections: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < 16; i += 1) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.random() * 0.4;
      const position = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
      positions.push(position);
    }
    positions.forEach((a, i) => {
      positions.slice(i + 1).forEach((b) => {
        if (Math.random() > 0.6) {
          connections.push([a, b]);
        }
      });
    });
    return { positions, connections };
  }, []);

  const neon = new THREE.Color("#38bdf8");
  const pulseRef = useRef<{ intensity: number }>({ intensity: 0 });

  useFrame(({ clock }) => {
    pulseRef.current.intensity = (Math.sin(clock.elapsedTime * 2.2) + 1) / 2;
  });

  return (
    <group>
      {nodes.connections.map(([start, end], idx) => (
        <Line
          key={`connection-${idx}`}
          points={[start, end]}
          color={neon.clone().lerp(new THREE.Color("#f472b6"), Math.random() * 0.6)}
          lineWidth={1.5}
          transparent
          opacity={0.65}
        />
      ))}
      {nodes.positions.map((position, idx) => (
        <Float key={`node-${idx}`} speed={2} rotationIntensity={0.6} floatIntensity={1.5}>
          <mesh position={position.toArray()}>
            <sphereGeometry args={[0.15 + Math.random() * 0.08, 32, 32]} />
            <meshStandardMaterial
              color="#9f7aea"
              emissive="#38bdf8"
              emissiveIntensity={0.8 + (pulseRef.current.intensity ?? 0)}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}
      <Sparkles count={80} speed={0.6} scale={[3, 3, 3]} size={2.5} color="#38bdf8" opacity={0.4} />
    </group>
  );
}

export function SpacedRepetitionScene() {
  return (
    <FeatureCanvas>
      <group position={[0, 0.5, 0]}>
        <BrainNodeCluster />
      </group>
    </FeatureCanvas>
  );
}

function CourseStack() {
  const cards = useMemo(() => new Array(5).fill(0).map((_, idx) => idx), []);
  return (
    <group>
      {cards.map((index) => (
        <Float key={index} speed={1 + index * 0.1} rotationIntensity={0.4} floatIntensity={1.2}>
          <mesh position={[0, index * 0.15, 0]}
            rotation={[THREE.MathUtils.degToRad(-15 + index * 2), THREE.MathUtils.degToRad(8 * index), 0]}
          >
            <boxGeometry args={[2.2 - index * 0.12, 0.08, 1.4 - index * 0.06]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#1e3a8a" : "#312e81"}
              emissive="#22d3ee"
              emissiveIntensity={0.2 + index * 0.1}
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}
      <Sparkles count={50} speed={0.4} scale={[2.4, 2.4, 2.4]} size={3} color="#a855f7" opacity={0.35} />
    </group>
  );
}

export function InteractiveLibraryScene() {
  return (
    <FeatureCanvas>
      <CourseStack />
    </FeatureCanvas>
  );
}

function MoveTrainerBoard() {
  const piecesRef = useRef<THREE.Mesh[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    piecesRef.current.forEach((piece, idx) => {
      if (!piece) return;
      piece.position.x = Math.sin(t * 0.6 + idx) * 1.1;
      piece.position.z = Math.cos(t * 0.6 + idx) * 1.1;
      piece.rotation.y = THREE.MathUtils.lerp(piece.rotation.y, Math.sin(t + idx) * 0.6, 0.05);
    });
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.02, 0]}
      >
        <circleGeometry args={[2.2, 64]} />
        <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.4} />
      </mesh>
      {[0, 1, 2, 3].map((idx) => (
        <mesh key={idx} ref={(el) => { if (el) piecesRef.current[idx] = el; }} position={[0, 0.25, 0]}>
          <coneGeometry args={[0.25, 0.5, 32]} />
          <meshStandardMaterial
            color={idx % 2 === 0 ? "#38bdf8" : "#f472b6"}
            emissive={idx % 2 === 0 ? "#38bdf8" : "#f472b6"}
            emissiveIntensity={0.5}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

export function MoveTrainerScene() {
  return (
    <FeatureCanvas>
      <MoveTrainerBoard />
    </FeatureCanvas>
  );
}

function OpponentNetwork() {
  const count = 420;
  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 2.2 * Math.random();
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = radius * Math.cos(phi);
      array[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return array;
  }, [count]);

  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3}>
        <PointMaterial
          transparent
          vertexColors={false}
          color="#22d3ee"
          size={0.08}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
      <Sparkles count={120} speed={0.8} scale={[3.4, 3.4, 3.4]} size={2} color="#22d3ee" opacity={0.45} />
    </group>
  );
}

export function OpponentPrepScene() {
  return (
    <FeatureCanvas>
      <OpponentNetwork />
    </FeatureCanvas>
  );
}

function TacticBoard() {
  const highlightRef = useRef<THREE.Mesh>(null);
  const pieceRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const phase = (Math.sin(t * 1.5) + 1) / 2;
    if (highlightRef.current) {
      (highlightRef.current.material as THREE.MeshStandardMaterial).emissive = new THREE.Color().lerpColors(
        new THREE.Color("#ef4444"),
        new THREE.Color("#38bdf8"),
        phase
      );
    }
    if (pieceRef.current) {
      pieceRef.current.rotation.y = THREE.MathUtils.lerp(pieceRef.current.rotation.y, phase * Math.PI, 0.1);
      pieceRef.current.position.y = 0.2 + Math.sin(t * 2) * 0.06;
    }
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.1, 6]} />
        <meshStandardMaterial color="#0b1120" metalness={0.8} roughness={0.36} />
      </mesh>
      <mesh ref={highlightRef} position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 0.9, 64]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh ref={pieceRef} position={[0, 0.4, 0]}>
        <torusKnotGeometry args={[0.2, 0.06, 128, 32]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

export function TacticsGeneratorScene() {
  return (
    <FeatureCanvas>
      <TacticBoard />
    </FeatureCanvas>
  );
}

function ProgressDashboard() {
  const lineRef = useRef<THREE.Line>(null);
  const badgeRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (lineRef.current) {
      lineRef.current.rotation.z = Math.sin(t * 0.4) * 0.1;
    }
    if (badgeRef.current) {
      badgeRef.current.rotation.y += 0.01;
    }
  });

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 12; i += 1) {
      pts.push(new THREE.Vector3((i / 2) - 3, Math.sin(i / 2) + i * 0.05, 0));
    }
    return pts;
  }, []);

  return (
    <group>
      <Float speed={1.2} floatIntensity={0.6}>
        <mesh position={[0, 0.4, 0]} ref={badgeRef}>
          <icosahedronGeometry args={[0.6, 1]} />
          <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.6} metalness={0.5} roughness={0.3} />
        </mesh>
      </Float>
      <Line points={points} color="#22d3ee" lineWidth={3} ref={lineRef as any} />
      <mesh position={[1.5, -0.6, 0]}>
        <torusGeometry args={[0.6, 0.1, 32, 64]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.4} metalness={0.6} roughness={0.3} />
      </mesh>
      <Sparkles count={60} speed={0.7} scale={[2.6, 2.6, 2.6]} size={2.6} color="#facc15" opacity={0.35} />
    </group>
  );
}

export function ProgressDashboardScene() {
  return (
    <FeatureCanvas>
      <ProgressDashboard />
    </FeatureCanvas>
  );
}

function OfflineCube() {
  const orbiters = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (orbiters.current) {
      orbiters.current.rotation.y = clock.elapsedTime * 0.8;
    }
  });

  return (
    <group>
      <mesh>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#38bdf8"
          emissiveIntensity={0.6}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <group ref={orbiters}>
        {[0, 1, 2].map((idx) => (
          <Float key={idx} speed={1.4 + idx * 0.2} rotationIntensity={1.2} floatIntensity={1.5}>
            <mesh position={[Math.cos((idx / 3) * Math.PI * 2) * 2.2, 0.5 - idx * 0.4, Math.sin((idx / 3) * Math.PI * 2) * 2.2]}>
              <ringGeometry args={[0.35, 0.55, 64]} />
              <meshStandardMaterial color={idx % 2 === 0 ? "#f97316" : "#f43f5e"} emissive="#f43f5e" emissiveIntensity={0.4} />
            </mesh>
          </Float>
        ))}
      </group>
      <Sparkles count={80} speed={0.5} scale={[3, 3, 3]} size={2} color="#38bdf8" opacity={0.4} />
    </group>
  );
}

export function OfflineModeScene() {
  return (
    <FeatureCanvas>
      <OfflineCube />
    </FeatureCanvas>
  );
}
