import { useState, useEffect } from 'react';
import { DesignUploader } from './DesignUploader';
import { DesignControls } from './DesignControls';
import './../../styles/DesignPanel.css';
import { IoShirtOutline } from "react-icons/io5";
import { FaTshirt } from "react-icons/fa";
import { IoMdColorPalette } from "react-icons/io";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
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
  
  const [localPositions, setLocalPositions] = useState({
    front: { x: 0, y: 1.26 },
    back: { x: 0, y: 1.26 }
  });

  const [localDimensions, setLocalDimensions] = useState({
    front: { width: 0.5, height: 0.5 },
    back: { width: 0.5, height: 0.5 }
  });

  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    onPositionChange(activePosition, localPositions[activePosition]);
  }, [localPositions, activePosition]);

  useEffect(() => {
    onDimensionsChange(activePosition, localDimensions[activePosition]);
  }, [localDimensions, activePosition]);

  const hasDesign = designs && designs[activePosition];

  const handleCenterDesign = () => {
    handlePositionChange({ x: 0, y: 1.26 });
    handleDimensionsChange({ width: 0.5, height: 0.5 });
  };

  const handlePositionChange = (newPos) => {
    setLocalPositions(prev => ({
      ...prev,
      [activePosition]: newPos
    }));
  };

  const handleDimensionsChange = (newDims) => {
    setLocalDimensions(prev => ({
      ...prev,
      [activePosition]: newDims
    }));
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="design-panel">
      <div className="basic-controls">
        <div className="color-picker">
          <div className='colorPick'>
            <div className='palette'><IoMdColorPalette size={35}/></div>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="color-input"
            />
          </div>
          <div className="color-preview" style={{ backgroundColor: color }} />
        </div>

        <div className="position-selector">
          <button 
            onClick={() => setActivePosition('front')}
            className={activePosition === 'front' ? 'active' : ''}
          >
            <IoShirtOutline /> <span className='shirtDescription'>Front</span>
          </button>
          <button
            onClick={() => setActivePosition('back')}
            className={activePosition === 'back' ? 'active' : ''}
          >
            <FaTshirt/> <span className='shirtDescription'>Back</span>
          </button>
        </div>

        <DesignUploader 
          position={activePosition} 
          onUpload={onUpload}
          designPreview={designs[activePosition]}
        />
      </div>

      {hasDesign && (
        <div className={`advanced-controls ${isCollapsed ? 'collapsed' : ''}`}>
          <button 
            className="collapse-button"
            onClick={toggleCollapse}
            aria-label={isCollapsed ? 'Expandir controles' : 'Minimizar controles'}
          >
            {isCollapsed ? <FaLongArrowAltDown/> : <FaLongArrowAltUp/>}
          </button>
          
          <div className="controls-content">
            <DesignControls
              position={localPositions[activePosition]}
              dimensions={localDimensions[activePosition]}
              onPositionChange={handlePositionChange}
              onDimensionsChange={handleDimensionsChange}
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
