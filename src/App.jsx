import { useState } from 'react';
import { CanvasContainer } from './components/CanvasContainer/CanvasContainer';
import { Shirt } from './components/Shirt/Shirt';
import { ControlsContainer } from './components/UI/ControlsContainer';
import { Suspense } from 'react';

function App() {
  // Estados principales
  const [currentAnimation, setCurrentAnimation] = useState(null);
  const [color, setColor] = useState("#ffffff");
  const [designs, setDesigns] = useState({ front: null, back: null });
  const [designPositions, setDesignPositions] = useState({
    front: { x: 0, y: 1.26 },
    back: { x: 0, y: 1.26 }
  });
  const [designDimensions, setDesignDimensions] = useState({
    front: { width: 0.5, height: 0.5 },
    back: { width: 0.5, height: 0.5 }
  });

  // Handlers
  const handleUpload = (position, image) => {
    setDesigns(prev => ({ ...prev, [position]: image }));
  };

  const handlePositionChange = (position, newPosition) => {
    setDesignPositions(prev => ({ ...prev, [position]: newPosition }));
  };

  const handleDimensionChange = (position, newDimensions) => {
    setDesignDimensions(prev => ({ ...prev, [position]: newDimensions }));
  };

  const handleRemoveDesign = (position) => {
    setDesigns(prev => ({ ...prev, [position]: null }));
    setDesignPositions(prev => ({ ...prev, [position]: { x: 0, y: 1.26 } }));
    setDesignDimensions(prev => ({ ...prev, [position]: { width: 0.5, height: 0.5 } }));
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ControlsContainer
        currentAnimation={currentAnimation}
        setCurrentAnimation={setCurrentAnimation}
        designs={designs}
        onUpload={handleUpload}
        onPositionChange={handlePositionChange}
        onDimensionsChange={handleDimensionChange}
        onRemoveDesign={handleRemoveDesign}
        color={color}
        setColor={setColor}
      />

      <CanvasContainer>
        <Suspense fallback={null}>
          <Shirt
            currentAnimation={currentAnimation}
            color={color}
            designs={designs}
            designPositions={designPositions}
            designDimensions={designDimensions}
          />
        </Suspense>
      </CanvasContainer>
    </div>
  );
}

export default App;