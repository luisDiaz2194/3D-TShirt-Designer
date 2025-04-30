export function AnimationControls({ currentAnimation, setCurrentAnimation }) {
	const animations = [
	  { id: 'walk', label: 'Caminar' },
	  { id: 'float', label: 'Flotar' },
	  { id: 'rotate', label: 'Rotar' },
	  { id: 'pulse', label: 'Latido' }
	]
  
	return (
	  <div style={{
		position: 'absolute',
		top: '20px',
		left: '50%',
		transform: 'translateX(-50%)',
		zIndex: 100,
		display: 'flex',
		gap: '10px',
		background: 'rgba(0,0,0,0.7)',
		padding: '10px',
		borderRadius: '20px'
	  }}>
		{animations.map(anim => (
		  <button
			key={anim.id}
			onClick={() => setCurrentAnimation(currentAnimation === anim.id ? null : anim.id)}
			style={{
			  background: currentAnimation === anim.id ? '#4CAF50' : '#333',
			  color: 'white',
			  border: 'none',
			  padding: '8px 16px',
			  borderRadius: '20px',
			  cursor: 'pointer'
			}}
		  >
			{currentAnimation === anim.id ? 'Detener' : anim.label}
		  </button>
		))}
	  </div>
	)
  }