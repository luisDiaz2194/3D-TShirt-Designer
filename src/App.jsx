import { Suspense, useState } from 'react'
import { CanvasContainer } from './components/CanvasContainer/CanvasContainer'
import { Shirt } from './components/Shirt/Shirt'
import { ControlsContainer } from './components/UI/ControlsContainer'

export default function App() {
  const [currentAnimation, setCurrentAnimation] = useState(null)
  const [color, setColor] = useState("#ffffff")
  const [designs, setDesigns] = useState({
    front: null,
    back: null
  })
  const [designDimensions, setDesignDimensions] = useState({
    front: { width: 0.5, height: 0.5 },
    back: { width: 0.5, height: 0.5 }
  })
  const [designPositions, setDesignPositions] = useState({
    front: { x: 0, y: 1.26 },
    back: { x: 0, y: 1.26 }
  })
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
	  <ControlsContainer 
        currentAnimation={currentAnimation}
        setCurrentAnimation={setCurrentAnimation}
      />
      
      <CanvasContainer>
        <Suspense fallback={null}>
        <Shirt
		currentAnimation={currentAnimation}
		color={color}
		designs={designs}
		designDimensions={designDimensions}
		designPositions={designPositions}
		/>
        </Suspense>
      </CanvasContainer>
    </div>
  )
}