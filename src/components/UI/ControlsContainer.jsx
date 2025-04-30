import React from 'react';
import { AnimationControls } from './AnimationControls'; // Importaci�n correcta
import { DesignPanel } from '../DesignPanel/DesignPanel';
import './Controls.css';

export function ControlsContainer({ currentAnimation, setCurrentAnimation }) {
  return (
    <div className="controls-container">
      <AnimationControls 
        currentAnimation={currentAnimation}
        setCurrentAnimation={setCurrentAnimation}
      />
      <DesignPanel />
    </div>
  );
}