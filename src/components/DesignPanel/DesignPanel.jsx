
import { useState, useEffect } from 'react';
import { DesignUploader } from './DesignUploader';
import { DesignControls } from './DesignControls';
import './../../styles/DesignPanel.css';

export function DesignPanel({ 
  designs = { front: null, back: null }, 
  onUpload = () => {},
  onPositionChange = () => {},
  onDimensionsChange = () => {},
  onRemoveDesign = () => {},
  color,
  setColor
}) {
  const [activePosition, setActivePosition] = useState('front');
  const [localPosition, setLocalPosition] = useState({ x: 0, y: 1.26 });
  const [localDimensions, setLocalDimensions] = useState({ width: 0.5, height: 0.5 });
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    onPositionChange(activePosition, localPosition);
  }, [localPosition, activePosition]);

  useEffect(() => {
    onDimensionsChange(activePosition, localDimensions);
  }, [localDimensions, activePosition]);

  const hasDesign = designs && designs[activePosition];

  const handleCenterDesign = () => {
    setLocalPosition({ x: 0, y: 1.26 });
    setLocalDimensions({ width: 0.5, height: 0.5 });
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="design-panel">
      <div className="basic-controls">
        <div className="color-picker">
          <label>Color de la camisa:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="color-input"
          />
          <div className="color-preview" style={{ backgroundColor: color }} />
        </div>

        <div className="position-selector">
          <button 
            onClick={() => setActivePosition('front')}
            className={activePosition === 'front' ? 'active' : ''}
          >
            Front
          </button>
          <button
            onClick={() => setActivePosition('back')}
            className={activePosition === 'back' ? 'active' : ''}
          >
            Back
          </button>
        </div>

        <DesignUploader 
          position={activePosition} 
          onUpload={onUpload}
          designPreview={designs[activePosition]}
        />
      </div>

      {/* Resto del componente permanece igual */}
	  {hasDesign && (
        <div className={`advanced-controls ${isCollapsed ? 'collapsed' : ''}`}>
          <button 
            className="collapse-button"
            onClick={toggleCollapse}
            aria-label={isCollapsed ? 'Expandir controles' : 'Minimizar controles'}
          >
            {isCollapsed ? '↑' : '↓'}
          </button>
          
          <div className="controls-content">
            <DesignControls
              position={localPosition}
              dimensions={localDimensions}
              onPositionChange={setLocalPosition}
              onDimensionsChange={setLocalDimensions}
            />
            
            <div className="design-actions">
              <button 
                onClick={handleCenterDesign}
                className="center-button"
              >
                Center Design
              </button>
              <button 
                onClick={() => onRemoveDesign(activePosition)}
                className="remove-button"
              >
                Remove Design
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}