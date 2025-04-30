import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export function CanvasContainer({ children }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 50 }}
      gl={{ alpha: false }}
      style={{ background: '#444' }}
    >
      <color attach="background" args={['#444']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {children}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  )
}