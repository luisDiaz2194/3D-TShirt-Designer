/* import React from 'react';
import '../../styles/AnimationControls.css';

export function AnimationControls({ 
  currentAnimation, 
  setCurrentAnimation
}) {
  const animations = [
    { id: 'caminar', label: 'Caminar' },
    { id: 'flotar', label: 'Flotar' },
    { id: 'rotar', label: 'Rotar' },
    { id: 'latido', label: 'Latido' }
  ];

  return (
    <div className="animation-controls">
      {animations.map(anim => (
        <button
          key={anim.id}
          className={currentAnimation === anim.id ? 'active' : ''}
          onClick={() => setCurrentAnimation(currentAnimation === anim.id ? null : anim.id)}
        >
          {currentAnimation === anim.id ? 'Detener' : anim.label}
        </button>
      ))}
    </div>
  );
} */

import React from 'react';
import '../../styles/AnimationControls.css';

export function AnimationControls({ 
  currentAnimation, 
  setCurrentAnimation,
  onExportPNG = () => {},
  onExportVideo = () => {},
  isRecording = false
}) {
  const animations = [
    { id: 'caminar', label: 'Caminar' },
    { id: 'flotar', label: 'Flotar' },
    { id: 'rotar', label: 'Rotar' },
    { id: 'latido', label: 'Latido' }
  ];

  return (
    <div className="animation-controls">
      <div className="animation-buttons">
        {animations.map(anim => (
          <button
            key={anim.id}
            className={currentAnimation === anim.id ? 'active' : ''}
            onClick={() => setCurrentAnimation(currentAnimation === anim.id ? null : anim.id)}
          >
            {currentAnimation === anim.id ? 'Detener' : anim.label}
          </button>
        ))}
      </div>
      
      <div className="export-buttons">
        <button onClick={onExportPNG} className="export-button">
          Exportar PNG
        </button>
        <button 
          onClick={onExportVideo} 
          className={`export-button ${isRecording ? 'recording' : ''}`}
        >
          {isRecording ? 'Grabando...' : 'Exportar Video'}
        </button>
      </div>
    </div>
  );
}