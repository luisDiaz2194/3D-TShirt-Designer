
import React from 'react';
import '../../styles/AnimationControls.css';
import { FaWalking } from "react-icons/fa";
import { LuArrowDownUp } from "react-icons/lu";
import { MdCropRotate } from "react-icons/md";
import { RiHeartPulseLine } from "react-icons/ri";
import { LuCircleStop } from "react-icons/lu";
import { BsFiletypePng } from "react-icons/bs";



import { 
	ExportarPngIcon,
	GrabarVideoIcon,
	GrabandoVideoIcon
  } from './../Icons/AnimationsIcons'

export function AnimationControls({ 
  currentAnimation, 
  setCurrentAnimation,
  onExportPNG = () => {},
  onExportVideo = () => {},
  isRecording = false
}) {
  const animations = [
    { id: 'caminar', label: 'Caminar', icon:<FaWalking size={20} /> },
    { id: 'flotar', label: 'Flotar' , icon:<LuArrowDownUp size={20} />},
    { id: 'rotar', label: 'Rotar' , icon:<MdCropRotate size={20} />},
    { id: 'latido', label: 'Latido', icon:<RiHeartPulseLine size={20} />}
  ];

  return (
    <div className="animation-controls">
      <div className="animation-buttons">
        {animations.map(anim => (
          <button
            key={anim.id}
            className={currentAnimation === anim.id ? 'active' : ''}
            onClick={() => setCurrentAnimation(currentAnimation === anim.id ? null : anim.id)}
          >
			
            {currentAnimation === anim.id ? <LuCircleStop/> : anim.icon}
          </button>
        ))}
      </div>
      
      <div className="export-buttons">
        <button onClick={onExportPNG} className="export-button">
          <BsFiletypePng size={20}/>
        </button>
        <button 
          onClick={onExportVideo} 
          className={`export-button ${isRecording ? 'recording' : ''}`}
        >
          {isRecording ? <GrabandoVideoIcon size={20}/> : <GrabarVideoIcon size={20}/>}
        </button>
      </div>
    </div>
  );
}