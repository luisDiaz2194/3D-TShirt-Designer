export function UploadIcon({ size = 24, color = "currentColor" }) {
	return (
	  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M4 16V20H20V16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M12 4V16M12 4L8 8M12 4L16 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
	  </svg>
	)
  }