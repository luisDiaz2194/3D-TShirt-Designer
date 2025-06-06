import React, { useState } from 'react';
import './../../styles/DesignPanel.css';

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
    <div className="design-controls">
      <h4>Position</h4>
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

      <h4>Size</h4>
      <label className="aspect-ratio-label">
        <input
          type="checkbox"
          checked={lockRatio}
          onChange={() => setLockRatio(!lockRatio)}
        />
        Lock Aspect Ratio
      </label>
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
    <div className="slider-control">
      <div className="slider-header">
        <label>{label}</label>
        <span>{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
}
