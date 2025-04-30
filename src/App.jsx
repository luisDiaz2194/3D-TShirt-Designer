import { Suspense, useState } from 'react'
import { CanvasContainer } from './components/CanvasContainer/CanvasContainer'
import { Shirt } from './components/Shirt/Shirt'
import { AnimationControls } from './components/UI/AnimationControls'

export default function App() {
  const [currentAnimation, setCurrentAnimation] = useState(null)
  const [color, setColor] = useState("#ffffff")

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <AnimationControls 
        currentAnimation={currentAnimation}
        setCurrentAnimation={setCurrentAnimation}
      />
      
      <CanvasContainer>
        <Suspense fallback={null}>
          <Shirt 
            currentAnimation={currentAnimation} 
            color={color}
          />
        </Suspense>
      </CanvasContainer>
    </div>
  )
}