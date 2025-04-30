import { useState } from 'react';

export function useImageUpload(initialState = { front: null, back: null }) {
  const [designs, setDesigns] = useState(initialState);

  const handleUpload = (position, image) => {
    if (!['front', 'back'].includes(position)) return;
    setDesigns(prev => ({ ...prev, [position]: image }));
  };

  return [designs, handleUpload];
}