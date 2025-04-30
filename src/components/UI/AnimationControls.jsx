import React from 'react';
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
}