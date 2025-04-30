import { useState, useEffect } from 'react';
import { DesignUploader } from './DesignUploader';
import { DesignControls } from './DesignControls';
import './../../styles/DesignPanel.css';

export function DesignPanel({ 
  designs = { front: null, back: null }, 
  onUpload = () => {},
  onPositionChange = () => {},
  onDimensionsChange = () => {},
  onRemoveDesign = () => {}
}) {
  const [activePosition, setActivePosition] = useState('front');
  const [localPosition, setLocalPosition] = useState({ x: 0, y: 1.26 });
  const [localDimensions, setLocalDimensions] = useState({ width: 0.5, height: 0.5 });

  // Sincronización segura con el padre
  useEffect(() => {
    onPositionChange(activePosition, localPosition);
  }, [localPosition, activePosition]);

  useEffect(() => {
    onDimensionsChange(activePosition, localDimensions);
  }, [localDimensions, activePosition]);

  // Verificación segura del diseño activo
  const hasDesign = designs && designs[activePosition];

  const handleCenterDesign = () => {
    setLocalPosition({ x: 0, y: 1.26 });
    setLocalDimensions({ width: 0.5, height: 0.5 });
  };

  return (
    <div className="design-panel">
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

      <div className="design-preview-container">
        {hasDesign ? (
          <div className="design-preview">
            <img 
              src={designs[activePosition]} 
              alt={`${activePosition} design preview`}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '200px', 
                objectFit: 'contain',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '5px'
              }}
            />
          </div>
        ) : (
          <div className="design-preview-placeholder">
            No design uploaded
          </div>
        )}
      </div>

      <DesignUploader 
        position={activePosition} 
        onUpload={onUpload} 
      />

      {hasDesign && (
        <>
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
        </>
      )}
    </div>
  );
}