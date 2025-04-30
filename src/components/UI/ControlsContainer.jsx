import React from 'react';
import { AnimationControls } from './AnimationControls'; // Importaci�n correcta
import { DesignPanel } from '../DesignPanel/DesignPanel';
import './Controls.css';


export function ControlsContainer({
  currentAnimation,
  setCurrentAnimation,
  designs = { front: null, back: null }, // Valor por defecto
  onUpload = () => {},
  onPositionChange = () => {},
  onDimensionsChange = () => {},
  onRemoveDesign = () => {},
  color,
  setColor
}) {
  return (
    <div className="controls-container">
      <AnimationControls 
        currentAnimation={currentAnimation}
        setCurrentAnimation={setCurrentAnimation}
      />
      <DesignPanel
        designs={designs}
        onUpload={onUpload}
        onPositionChange={onPositionChange}
        onDimensionsChange={onDimensionsChange}
        onRemoveDesign={onRemoveDesign}
        color={color}
        setColor={setColor}
      />
    </div>
  );
}