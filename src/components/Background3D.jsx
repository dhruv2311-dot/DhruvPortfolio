import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

/**
 * Animated 3D particles component
 * Creates a subtle floating particle effect in the background
 */
function ParticleField(props) {
  const ref = useRef();
  
  // Generate random particle positions in a sphere
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 });
  
  // Validate positions to prevent NaN values
  for (let i = 0; i < sphere.length; i++) {
    if (isNaN(sphere[i])) {
      sphere[i] = 0;
    }
  }

  useFrame((state, delta) => {
    if (ref.current) {
      // Slow rotation for subtle movement
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#667eea"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

/**
 * Gradient sphere component
 * Creates a subtle glowing sphere in the background
 */
function GradientSphere() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        color="#764ba2"
        emissive="#667eea"
        emissiveIntensity={0.5}
        wireframe={false}
        transparent
        opacity={0.1}
      />
    </mesh>
  );
}

/**
 * Main 3D Background Component
 * Combines particles and gradient sphere for subtle 3D effect
 */
const Background3D = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ParticleField />
        <GradientSphere />
      </Canvas>
    </div>
  );
};

export default Background3D;
