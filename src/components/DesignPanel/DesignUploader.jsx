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