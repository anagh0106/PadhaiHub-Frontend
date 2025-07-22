import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";

const Electron = ({ radius, speed, color, offset }) => {
  const electronRef = useRef(null);

  useFrame((state) => {
    if (electronRef.current) {
      const time = state.clock.elapsedTime * speed + offset;
      electronRef.current.position.x = Math.cos(time) * radius;
      electronRef.current.position.z = Math.sin(time) * radius;
    }
  });

  return (
    <Sphere ref={electronRef} args={[0.1, 16, 16]} position={[radius, 0, 0]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </Sphere>
  );
};

const ElectronOrbit = ({ radius, rotationAxis }) => {
  const orbitRef = useRef(null);

  useFrame(() => {
    if (orbitRef.current) {
      orbitRef.current.rotation.x += 0.005;
      orbitRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={orbitRef} rotation={rotationAxis}>
      <Torus args={[radius, 0.01, 8, 32]}>
        <meshBasicMaterial color="#666" transparent opacity={0.3} />
      </Torus>
    </group>
  );
};

const AtomAnimation = () => {
  const nucleusRef = useRef(null);

  useFrame(() => {
    if (nucleusRef.current) {
      nucleusRef.current.rotation.x += 0.01;
      nucleusRef.current.rotation.y += 0.015;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Nucleus */}
      <Sphere ref={nucleusRef} args={[0.3, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#ff6b6b"
          emissive="#ff3333"
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Electron Orbits */}
      <ElectronOrbit radius={1} rotationAxis={[0, 0, 0]} />
      <ElectronOrbit radius={1.5} rotationAxis={[Math.PI / 3, 0, Math.PI / 4]} />
      <ElectronOrbit radius={2} rotationAxis={[0, Math.PI / 3, Math.PI / 6]} />

      {/* Electrons */}
      <group>
        <Electron radius={1} speed={2} color="#4ecdc4" offset={0} />
        <Electron radius={1} speed={2} color="#4ecdc4" offset={Math.PI} />
      </group>

      <group rotation={[Math.PI / 3, 0, Math.PI / 4]}>
        <Electron radius={1.5} speed={1.5} color="#45b7d1" offset={0} />
        <Electron radius={1.5} speed={1.5} color="#45b7d1" offset={Math.PI / 2} />
        <Electron radius={1.5} speed={1.5} color="#45b7d1" offset={Math.PI} />
        <Electron radius={1.5} speed={1.5} color="#45b7d1" offset={(3 * Math.PI) / 2} />
      </group>

      <group rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <Electron radius={2} speed={1} color="#96ceb4" offset={0} />
        <Electron radius={2} speed={1} color="#96ceb4" offset={(2 * Math.PI) / 3} />
        <Electron radius={2} speed={1} color="#96ceb4" offset={(4 * Math.PI) / 3} />
      </group>
    </>
  );
};

export default AtomAnimation;
