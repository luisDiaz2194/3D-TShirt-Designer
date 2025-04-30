import { useState } from 'react'
import { DesignUploader } from './DesignUploader'
import  './../../styles/DesignPanel.css'

export function DesignPanel() {
  const [activePosition, setActivePosition] = useState('front')
  const [designs, setDesigns] = useState({
    front: null,
    back: null
  })
  
  const handleUpload = (position, image) => {
    setDesigns(prev => ({ ...prev, [position]: image }))
  }
  
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
      
      <DesignUploader 
        position={activePosition} 
        onUpload={handleUpload}
      />
    </div>
  )
}