import React from 'react';

export function DesignUploader({ position, onUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onUpload(position, file);
  };

  return (
    <div className="design-uploader">
      <input
        id={`file-input-${position}`}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input"
      />
      <label htmlFor={`file-input-${position}`}>
        Upload {position} Design
      </label>
    </div>
  );
}
// DesignUploader.jsx
/* import React from 'react';
import './DesignUploader.css';

export function DesignUploader({ position, onUpload, designPreview }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      onUpload(position, event.target.result); // Asegúrate de pasar position aquí
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="design-uploader">
      <input
        id={`file-input-${position}`}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input"
      />
      <label htmlFor={`file-input-${position}`} className="upload-label">
        Upload {position} Design
      </label>
      
      {designPreview && (
        <div className="design-preview">
          <img src={designPreview} alt={`${position} design preview`} />
        </div>
      )}
    </div>
  );
} */