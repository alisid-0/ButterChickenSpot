import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingElements() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Floating butter cubes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float
          key={`butter-${i}`}
          speed={1.5} 
          rotationIntensity={1} 
          floatIntensity={2}
        >
          <mesh
            position={[
              Math.random() * 30 - 15,
              Math.random() * 30 - 15,
              Math.random() * 30 - 15,
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#F6BF23" metalness={0.1} roughness={0.2} />
          </mesh>
        </Float>
      ))}

      {/* Floating cream spheres */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Float
          key={`sphere-${i}`}
          speed={1} 
          rotationIntensity={0.5} 
          floatIntensity={1.5}
        >
          <Sphere
            position={[
              Math.random() * 30 - 15,
              Math.random() * 30 - 15,
              Math.random() * 30 - 15,
            ]}
            scale={Math.random() * 0.5 + 0.2}
          >
            <meshStandardMaterial 
              color="#FFF8CC" 
              transparent 
              opacity={0.7}
              metalness={0.2}
              roughness={0.1}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 20] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <FloatingElements />
      </Canvas>
    </div>
  );
}