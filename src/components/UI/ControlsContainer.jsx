import React from 'react';
import { AnimationControls } from './AnimationControls';
import { DesignPanel } from '../DesignPanel/DesignPanel';



export function ControlsContainer({
	currentAnimation,
	setCurrentAnimation,
	designs,
	onUpload,
	onPositionChange,
	onDimensionsChange,
	onRemoveDesign,
	color,
	setColor,
	onExportPNG,
	onExportVideo,
	isRecording
  }) {
	return (
	  <div className="controls-container">
		<AnimationControls 
		  currentAnimation={currentAnimation}
		  setCurrentAnimation={setCurrentAnimation}
		  onExportPNG={onExportPNG}
		  onExportVideo={onExportVideo}
		  isRecording={isRecording}
		/>
		<DesignPanel
		  designs={designs}
		  onUpload={onUpload}
		  onPositionChange={onPositionChange}
		  onDimensionsChange={onDimensionsChange}
		  onRemoveDesign={onRemoveDesign}
		  color={color}
		  setColor={setColor}
		/>
	  </div>
	);
  }