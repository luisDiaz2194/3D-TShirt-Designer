import React from 'react';
import './Controls.css';

export function AnimationControls({ currentAnimation, setCurrentAnimation }) {
  const animations = [
    { id: 'walk', label: 'Caminar' },
    { id: 'float', label: 'Flotar' },
    { id: 'rotate', label: 'Rotar' },
    { id: 'pulse', label: 'Latido' }
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