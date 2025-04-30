import { useRef } from 'react'

export function useShirtAnimations(groupRef, currentAnimation) {
  const animationTime = useRef(0)
  const prevAnimation = useRef(null)
  
  // Referencias para partes de la camisa
  const rightShoulderRef = useRef(null)
  const leftShoulderRef = useRef(null)
  const rightArmRef = useRef(null)
  const leftArmRef = useRef(null)

  // Configuración inicial
  const setupReferences = (nodes) => {
    Object.values(nodes).forEach(node => {
      if (node.isMesh) {
        if (/Right_(Shoulder|Clavicle)/i.test(node.name)) {
          rightShoulderRef.current = node
        } else if (/Left_(Shoulder|Clavicle)/i.test(node.name)) {
          leftShoulderRef.current = node
        } else if (/Right_Arm/i.test(node.name)) {
          rightArmRef.current = node
        } else if (/Left_Arm/i.test(node.name)) {
          leftArmRef.current = node
        }
      }
    })
  }

  // Animaciones
  const animateWalk = (time) => {
    const WALK_PARAMS = {
      speed: 1.5,
      bodyBounce: 0.06,
      shoulderSwing: 1.5,
      armFollow: 0.7
    }
    
    groupRef.current.position.y = Math.sin(time * 2) * WALK_PARAMS.bodyBounce - 2
    
    if (leftShoulderRef.current && rightShoulderRef.current) {
      leftShoulderRef.current.rotation.z = Math.sin(time) * WALK_PARAMS.shoulderSwing
      rightShoulderRef.current.rotation.z = -Math.sin(time) * WALK_PARAMS.shoulderSwing
      
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = leftShoulderRef.current.rotation.z * WALK_PARAMS.armFollow
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = rightShoulderRef.current.rotation.z * WALK_PARAMS.armFollow
      }
    }
  }

  const animateFloat = (time) => {
    groupRef.current.position.y = Math.sin(time * 2) * 0.1 - 2
  }

  const animateRotate = (time) => {
    groupRef.current.rotation.y = time * 0.5
  }

  const animatePulse = (time) => {
    const scale = 1.5 + Math.sin(time * 3) * 0.05
    groupRef.current.scale.set(scale, scale, scale)
  }

  return {
    setupReferences,
    updateAnimation: (delta) => {
      if (!groupRef.current || !currentAnimation) return
      
      animationTime.current += delta
      
      switch(currentAnimation) {
        case 'walk': animateWalk(animationTime.current); break
        case 'float': animateFloat(animationTime.current); break
        case 'rotate': animateRotate(animationTime.current); break
        case 'pulse': animatePulse(animationTime.current); break
      }
    }
  }
}