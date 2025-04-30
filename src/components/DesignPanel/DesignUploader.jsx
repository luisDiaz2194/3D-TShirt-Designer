import React from 'react';

export function DesignUploader({ position, onUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      onUpload(position, event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ margin: '10px 0' }}>
      <input
        id={`file-input-${position}`}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <label
        htmlFor={`file-input-${position}`}
        style={{
          display: 'block',
          padding: '10px',
          background: '#4285F4',
          color: 'white',
          borderRadius: '4px',
          textAlign: 'center',
          cursor: 'pointer'
        }}
      >
        Upload {position} Design
      </label>
    </div>
  );
}