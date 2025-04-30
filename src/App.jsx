import { Suspense } from 'react'
import { CanvasContainer } from './components/CanvasContainer/CanvasContainer'
import { Shirt } from './components/Shirt/Shirt'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <CanvasContainer>
        <Suspense fallback={null}>
          <Shirt />
        </Suspense>
      </CanvasContainer>
    </div>
  )
}