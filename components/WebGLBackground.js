'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingParticles({ count = 100 }) {
  const mesh = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;
      const scale = Math.random() * 0.5 + 0.1;
      const speed = Math.random() * 0.5 + 0.2;
      temp.push({ x, y, z, scale, speed });
    }
    return temp;
  }, [count]);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    
    particles.forEach((particle, i) => {
      pos[i * 3] = particle.x;
      pos[i * 3 + 1] = particle.y;
      pos[i * 3 + 2] = particle.z;
      scales[i] = particle.scale;
    });
    
    return { pos, scales };
  }, [particles, count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.getElapsedTime();
    const positions = mesh.current.geometry.attributes.position.array;
    
    particles.forEach((particle, i) => {
      positions[i * 3 + 1] = particle.y + Math.sin(time * particle.speed + i) * 0.5;
      positions[i * 3] = particle.x + Math.cos(time * particle.speed * 0.5 + i) * 0.3;
    });
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.pos}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#2d9fe3"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function GradientSphere() {
  const mesh = useRef();
  
  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = time * 0.1;
    mesh.current.rotation.y = time * 0.15;
    mesh.current.position.y = Math.sin(time * 0.3) * 0.2;
  });

  return (
    <mesh ref={mesh} position={[3, 0, -5]}>
      <icosahedronGeometry args={[2, 1]} />
      <meshBasicMaterial
        color="#1e7fc4"
        transparent
        opacity={0.08}
        wireframe
      />
    </mesh>
  );
}

function FloatingRings() {
  const group = useRef();
  
  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.getElapsedTime();
    group.current.rotation.z = time * 0.1;
    group.current.rotation.x = Math.sin(time * 0.2) * 0.2;
  });

  return (
    <group ref={group} position={[-4, 2, -6]}>
      <mesh>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#5bb0e8" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#74bfed" transparent opacity={0.15} />
      </mesh>
      <mesh rotation={[Math.PI / -4, Math.PI / 4, 0]}>
        <torusGeometry args={[0.9, 0.02, 16, 100]} />
        <meshBasicMaterial color="#9ed1f2" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export default function WebGLBackground() {
  return (
    <div className="webgl-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <FloatingParticles count={80} />
        <GradientSphere />
        <FloatingRings />
      </Canvas>
    </div>
  );
}
