import React from 'react';
import { UploadIcon } from '../Icons/UploadIcon';
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
	  <UploadIcon size={18} /> <span className='shirtDescription'>Upload {position} Design</span>
      </label>
    </div>
  );
}
