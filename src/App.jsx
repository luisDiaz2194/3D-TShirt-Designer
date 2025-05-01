  import { useState, useRef, Suspense } from 'react';
  import { Canvas } from '@react-three/fiber'
  import { OrbitControls } from '@react-three/drei'
  import { Shirt } from './components/Shirt/Shirt'
  import { ControlsContainer } from './components/UI/ControlsContainer';
  import './styles/App.css'
  import { DesignPanel } from './components/DesignPanel/DesignPanel'
  import { AnimationControls } from './components/UI/AnimationControls'

  export default function App() {
	const [currentAnimation, setCurrentAnimation] = useState(null)
	const [color, setColor] = useState("#ffffff")
	const [designs, setDesigns] = useState({ front: null, back: null })
	const [designDimensions, setDesignDimensions] = useState({
	  front: { width: 0.5, height: 0.5 },
	  back: { width: 0.5, height: 0.5 }
	})
	const [designPositions, setDesignPositions] = useState({
	  front: { x: 0, y: 1.26 },
	  back: { x: 0, y: 1.26 }
	})
	const [isRecording, setIsRecording] = useState(false);
	const mediaRecorderRef = useRef(null);
	const chunksRef = useRef([]);
  
	const handleUpload = (position, file) => {

	  if (file && file instanceof File) {
		const reader = new FileReader()
		reader.onload = (event) => {
		  if (event.target && typeof event.target.result === 'string') {
			setDesigns(prev => ({
			  ...prev,
			  [position]: event.target.result
			}))
		  }
		}
		reader.readAsDataURL(file)
	  }
	}
  
	const handlePositionChange = (position, newPosition) => {
	  setDesignPositions(prev => ({
		...prev,
		[position]: newPosition
	  }))
	}
  
	const handleDimensionsChange = (position, newDimensions) => {
	  setDesignDimensions(prev => ({
		...prev,
		[position]: newDimensions
	  }))
	}
  
	const handleRemoveDesign = (position) => {
	  setDesigns(prev => ({
		...prev,
		[position]: null
	  }))
	  setDesignPositions(prev => ({
		...prev,
		[position]: { x: 0, y: 1.26 }
	  }))
	  setDesignDimensions(prev => ({
		...prev,
		[position]: { width: 0.5, height: 0.5 }
	  }))
	}
  
	const handleExportPNG = async () => {
	  try {
		await new Promise(resolve => requestAnimationFrame(resolve));
		
		const canvas = document.querySelector('canvas');
		const tempCanvas = document.createElement('canvas');
		tempCanvas.width = canvas.width;
		tempCanvas.height = canvas.height;
		const ctx = tempCanvas.getContext('2d');
		
		ctx.fillStyle = '#444';
		ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
		ctx.drawImage(canvas, 0, 0);
		
		tempCanvas.toBlob((blob) => {
		  if (blob) {
			const a = document.createElement('a');
			a.href = URL.createObjectURL(blob);
			a.download = 'camisa-diseno.png';
			a.click();
			URL.revokeObjectURL(a.href);
		  }
		}, 'image/png', 1.0);
	  } catch (error) {
		console.error('Error al exportar PNG:', error);
		alert('Error al exportar PNG. Por favor intenta nuevamente.');
	  }
	};
  
	const handleExportVideo = async () => {
	  if (isRecording) {
		mediaRecorderRef.current?.stop();
		setIsRecording(false);
		return;
	  }
  
	  try {
		const canvas = document.querySelector('canvas');
		const stream = canvas.captureStream(30);
		
		chunksRef.current = [];
		mediaRecorderRef.current = new MediaRecorder(stream, {
		  mimeType: 'video/webm;codecs=vp9'
		});
		
		mediaRecorderRef.current.ondataavailable = (e) => {
		  if (e.data.size > 0) chunksRef.current.push(e.data);
		};
		
		mediaRecorderRef.current.onstop = () => {
		  const blob = new Blob(chunksRef.current, { type: 'video/webm' });
		  const url = URL.createObjectURL(blob);
		  const a = document.createElement('a');
		  a.href = url;
		  a.download = 'camisa-animacion.webm';
		  a.click();
		  URL.revokeObjectURL(url);
		};
		
		mediaRecorderRef.current.start(100);
		setIsRecording(true);
		
		setTimeout(() => {
		  if (isRecording) mediaRecorderRef.current?.stop();
		}, 5000);
	  } catch (error) {
		console.error('Error al exportar video:', error);
		setIsRecording(false);
	  }
	};
  
	return (
	  <div className="app">
	

      <AnimationControls
        currentAnimation={currentAnimation}
        setCurrentAnimation={setCurrentAnimation}
      />
		<ControlsContainer
		currentAnimation={currentAnimation}
		setCurrentAnimation={setCurrentAnimation}
		designs={designs}
		onUpload={handleUpload}
		onPositionChange={handlePositionChange}
		onDimensionsChange={handleDimensionsChange}
		onRemoveDesign={handleRemoveDesign}
		color={color}
		setColor={setColor}
		onExportPNG={handleExportPNG}
		onExportVideo={handleExportVideo}
		isRecording={isRecording}
		/>
  
		<Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
		  <color attach="background" args={['#444']} />
		  <ambientLight intensity={0.8} />
		  <directionalLight position={[5, 5, 5]} intensity={1} />
		  <Suspense fallback={null}>
			<Shirt
			  currentAnimation={currentAnimation}
			  color={color}
			  designs={designs}
			  designDimensions={designDimensions}
			  designPositions={designPositions}
			/>
		  </Suspense>
		  <OrbitControls
			enablePan={false}
			enableZoom={true}
			minPolarAngle={Math.PI / 2.5}
			maxPolarAngle={Math.PI / 1.5}
		  />
		</Canvas>
	  </div>
	)
  }