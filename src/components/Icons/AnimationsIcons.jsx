export function CaminarIcon({ size = 24, color = "currentColor" }) {
	return (
	  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
		<path d="M16 7L17 5H19L18 7M16 7L15 9M16 7L18 7M18 7L19 9M9 15L7 17H5L6 15M9 15L10 13M9 15L7 15M7 15L6 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
	  </svg>
	)
  }
export function FlotarIcon({ size = 24, color = "currentColor" }) {
	return (
	  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
		<path d="M12 18V12M12 12L15 15M12 12L9 15M3 10L5 6M21 10L19 6" 
		  stroke={color} strokeWidth="2" strokeLinecap="round"/>
		<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12" 
		  stroke={color} strokeWidth="2"/>
	  </svg>
	)
  }
  
export function RotarIcon({ size = 24, color = "currentColor" }) {
	return (
	  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
		<path d="M16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4" 
		  stroke={color} strokeWidth="2" strokeLinecap="round"/>
		<path d="M20 10H16V14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
	  </svg>
	)
  }
  
export function DetenerIcon({ size = 24, color = "currentColor" }) {
	return (
	  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
		<rect x="6" y="6" width="12" height="12" rx="2" fill={color}/>
		<rect x="6" y="6" width="12" height="12" rx="2" stroke={color} strokeWidth="2"/>
	  </svg>
	)
  }

  // IconosExportacion.jsx
export function ExportarPngIcon({ size = 24, color = "currentColor" }) {
	return (
	  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
		<rect x="4" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth="2"/>
		<path d="M12 15V9M12 15L9 12M12 15L15 12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
	  </svg>
	)
  }
  
  export function GrabarVideoIcon({ size = 24, color = "currentColor" }) {
	return (
	  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
		<circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
		<circle cx="12" cy="12" r="3" fill={color}/>
	  </svg>
	)
  }
  
  export function GrabandoVideoIcon({ size = 24, color = "currentColor" }) {
	return (
	  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
		<circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
		<circle cx="12" cy="12" r="3" fill="#FF0000"/>
		<animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite"/>
	  </svg>
	)
  }
  
  export function ExportarVideoIcon({ size = 24, color = "currentColor" }) {
	return (
	  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
		<rect x="2" y="6" width="20" height="12" rx="2" stroke={color} strokeWidth="2"/>
		<path d="M12 16V22M12 22L9 19M12 22L15 19" stroke={color} strokeWidth="2" strokeLinecap="round"/>
	  </svg>
	)
  }

  export function FrontIcon({ size = 24, color = "currentColor" }) {
	return (
	  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
		<rect x="5" y="5" width="14" height="14" rx="2" stroke={color} strokeWidth="2"/>
		<path d="M12 9V15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
		<path d="M9 12H15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
	  </svg>
	)
  }
  
  export function BackIcon({ size = 24, color = "currentColor" }) {
	return (
	  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
		<rect x="5" y="5" width="14" height="14" rx="2" stroke={color} strokeWidth="2"/>
		<path d="M9 9L15 15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
		<path d="M15 9L9 15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
	  </svg>
	)
  }