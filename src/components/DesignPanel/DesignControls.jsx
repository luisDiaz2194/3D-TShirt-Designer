import React, { useState, useEffect } from 'react'
import  './../../styles/DesignPanel.css';


export function DesignControls({ position, dimensions, onPositionChange, onDimensionsChange }) {
  const [lockRatio, setLockRatio] = useState(true);

  const handlePosition = (axis, value) => {
    onPositionChange({ ...position, [axis]: parseFloat(value) });
  };

  const handleDimension = (axis, value) => {
    const numValue = parseFloat(value);
    if (lockRatio) {
      const ratio = dimensions.width / dimensions.height;
      const newDims = {
        width: axis === 'width' ? numValue : numValue * ratio,
        height: axis === 'height' ? numValue : numValue / ratio
      };
      onDimensionsChange(newDims);
    } else {
      onDimensionsChange({ ...dimensions, [axis]: numValue });
    }
  };

  return (
    <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
        <input
          type="checkbox"
          checked={lockRatio}
          onChange={() => setLockRatio(!lockRatio)}
        />
        Lock Aspect Ratio
      </label>

      <h4 style={{ marginBottom: '10px' }}>Position</h4>
      <SliderControl
        label="X"
        value={position.x}
        min="-1"
        max="1"
        step="0.01"
        onChange={(v) => handlePosition('x', v)}
      />
      <SliderControl
        label="Y"
        value={position.y}
        min="-1"
        max="2"
        step="0.01"
        onChange={(v) => handlePosition('y', v)}
      />

      <h4 style={{ margin: '15px 0 10px' }}>Size</h4>
      <SliderControl
        label="Width"
        value={dimensions.width}
        min="0.1"
        max="2"
        step="0.1"
        onChange={(v) => handleDimension('width', v)}
      />
      <SliderControl
        label="Height"
        value={dimensions.height}
        min="0.1"
        max="2"
        step="0.1"
        onChange={(v) => handleDimension('height', v)}
      />
    </div>
  );
}

function SliderControl({ label, value, onChange, ...props }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label>{label}</label>
        <span>{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%' }}
        {...props}
      />
    </div>
  );
}