import { useState } from 'react'

export function DesignUploader({ position, onUpload }) {
  const [preview, setPreview] = useState(null)
  
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
      onUpload(position, reader.result)
    }
    reader.readAsDataURL(file)
  }
  
  return (
    <div className="design-uploader">
      <label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <button className="upload-button">
          Upload {position} Design
        </button>
      </label>
      {preview && (
        <img src={preview} alt={`${position} preview`} className="design-preview" />
      )}
    </div>
  )
}