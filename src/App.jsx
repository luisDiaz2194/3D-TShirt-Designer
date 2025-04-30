import { useState, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Camisa } from './components/Camisa'
import { DesignPanel } from './components/DesignPanel/DesignPanel'
import { AnimationControls } from './components/UI/AnimationControls'
import './styles/App.css'

export default function App() {
  const [currentAnimation, setCurrentAnimation] = useState(null)
  const [color, setColor] = useState("#ffffff")
  const [designs, setDesigns] = useState({ front: null, back: null })
  const [designDimensions, setDesignDimensions] = useState({
    front: { width: 0.5, height: 0.5 },
    back: { width: 0.5, height: 0.5 }
  })
  const [designPositions, setDesignPositions] = useState({
    front: { x: 0, y: 1.26 },
    back: { x: 0, y: 1.26 }
  })

  const handleUpload = (position, file) => {
    if (file && file instanceof File) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setDesigns(prev => ({
            ...prev,
            [position]: event.target.result
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePositionChange = (position, newPosition) => {
    setDesignPositions(prev => ({
      ...prev,
      [position]: newPosition
    }))
  }

  const handleDimensionsChange = (position, newDimensions) => {
    setDesignDimensions(prev => ({
      ...prev,
      [position]: newDimensions
    }))
  }

  const handleRemoveDesign = (position) => {
    setDesigns(prev => ({
      ...prev,
      [position]: null
    }))
    setDesignPositions(prev => ({
      ...prev,
      [position]: { x: 0, y: 1.26 }
    }))
    setDesignDimensions(prev => ({
      ...prev,
      [position]: { width: 0.5, height: 0.5 }
    }))
  }

  return (
    <div className="app">
      <DesignPanel
        designs={designs}
        onUpload={handleUpload}
        onPositionChange={handlePositionChange}
        onDimensionsChange={handleDimensionsChange}
        onRemoveDesign={handleRemoveDesign}
      />

      <AnimationControls
        currentAnimation={currentAnimation}
        setCurrentAnimation={setCurrentAnimation}
      />

      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <color attach="background" args={['#444']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Camisa
            currentAnimation={currentAnimation}
            color={color}
            designs={designs}
            designDimensions={designDimensions}
            designPositions={designPositions}
          />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  )
}