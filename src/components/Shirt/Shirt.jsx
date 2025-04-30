import { useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Shirt({ currentAnimation, color = "#ffffff" }) {
  const { nodes } = useGLTF('/models/T_shirt_gltf.zip.gltf')
  const groupRef = useRef()
  const animationTime = useRef(0)
  const prevAnimation = useRef(null)

  // Referencias para partes de la camisa
  const rightShoulderRef = useRef(null)
  const leftShoulderRef = useRef(null)
  const rightArmRef = useRef(null)
  const leftArmRef = useRef(null)
  const rightSleeveRef = useRef(null)
  const leftSleeveRef = useRef(null)

  // Valores iniciales
  const INITIAL_POSITION = [0, -2, 0]
  const INITIAL_SCALE = 1.5
  const INITIAL_ROTATION = [0, 0, 0]

  // Configuración inicial
  useEffect(() => {
    Object.values(nodes).forEach(node => {
      if (node.isMesh) {
        if (/Right_(Shoulder|Clavicle)/i.test(node.name)) {
          rightShoulderRef.current = node
        } else if (/Left_(Shoulder|Clavicle)/i.test(node.name)) {
          leftShoulderRef.current = node
        } else if (/Right_Arm/i.test(node.name) && !/Fore/i.test(node.name)) {
          rightArmRef.current = node
        } else if (/Left_Arm/i.test(node.name) && !/Fore/i.test(node.name)) {
          leftArmRef.current = node
        } else if (/Right.*Sleeve/i.test(node.name)) {
          rightSleeveRef.current = node
        } else if (/Left.*Sleeve/i.test(node.name)) {
          leftSleeveRef.current = node
        }

        if (node.material) {
          node.material.color.set(color)
          node.material.transparent = true
          node.material.side = THREE.FrontSide
        }
      }
    })

    resetToInitialPosition()
  }, [color, nodes])

  const resetToInitialPosition = () => {
    if (groupRef.current) {
      groupRef.current.position.set(...INITIAL_POSITION)
      groupRef.current.rotation.set(...INITIAL_ROTATION)
      groupRef.current.scale.set(INITIAL_SCALE, INITIAL_SCALE, INITIAL_SCALE)
    }
    
    if (rightShoulderRef.current) rightShoulderRef.current.rotation.set(0, 0, 0)
    if (leftShoulderRef.current) leftShoulderRef.current.rotation.set(0, 0, 0)
    if (rightArmRef.current) rightArmRef.current.rotation.set(0, 0, 0)
    if (leftArmRef.current) leftArmRef.current.rotation.set(0, 0, 0)
    if (rightSleeveRef.current) rightSleeveRef.current.rotation.set(0, 0, 0)
    if (leftSleeveRef.current) leftSleeveRef.current.rotation.set(0, 0, 0)
  }

  // Parámetros de animación
  const WALK_PARAMS = {
    speed: 1.5,
    bodyBounce: 0.06,
    bodySwing: 0.08,
    shoulderSwing: 1.5,
    armFollow: 0.7,
    sleeveFollow: 0.5,
    elbowBend: 0.5
  }

  useFrame((state, delta) => {
    if (!groupRef.current || !currentAnimation) return

    // Reset al cambiar animación
    if (currentAnimation !== prevAnimation.current) {
      animationTime.current = 0
      prevAnimation.current = currentAnimation
      resetToInitialPosition()
    }

    animationTime.current += delta

    switch(currentAnimation) {
      case 'walk':
        animateWalk()
        break
      case 'float':
        animateFloat()
        break
      case 'rotate':
        animateRotate()
        break
      case 'pulse':
        animatePulse()
        break
    }
  })

  const animateWalk = () => {
    const time = animationTime.current * WALK_PARAMS.speed
    
    groupRef.current.position.y = INITIAL_POSITION[1] + Math.abs(Math.sin(time * 2)) * WALK_PARAMS.bodyBounce
    groupRef.current.rotation.z = Math.sin(time) * WALK_PARAMS.bodySwing

    if (leftShoulderRef.current && rightShoulderRef.current) {
      leftShoulderRef.current.rotation.z = Math.sin(time) * WALK_PARAMS.shoulderSwing
      rightShoulderRef.current.rotation.z = -Math.sin(time) * WALK_PARAMS.shoulderSwing
      
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = leftShoulderRef.current.rotation.z * WALK_PARAMS.armFollow
        leftArmRef.current.rotation.x = Math.cos(time) * 0.3
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = rightShoulderRef.current.rotation.z * WALK_PARAMS.armFollow
        rightArmRef.current.rotation.x = Math.cos(time + Math.PI) * 0.3
      }
      
      if (leftSleeveRef.current) {
        leftSleeveRef.current.rotation.z = leftShoulderRef.current.rotation.z * WALK_PARAMS.sleeveFollow
        leftSleeveRef.current.rotation.x = leftArmRef.current?.rotation.x * 0.6 || 0
      }
      if (rightSleeveRef.current) {
        rightSleeveRef.current.rotation.z = rightShoulderRef.current.rotation.z * WALK_PARAMS.sleeveFollow
        rightSleeveRef.current.rotation.x = rightArmRef.current?.rotation.x * 0.6 || 0
      }
    }
  }

  const animateFloat = () => {
    groupRef.current.position.y = Math.sin(animationTime.current * 2) * 0.1 + INITIAL_POSITION[1]
  }

  const animateRotate = () => {
    groupRef.current.rotation.y = animationTime.current * 0.5
  }

  const animatePulse = () => {
    const scale = INITIAL_SCALE + Math.sin(animationTime.current * 3) * 0.05
    groupRef.current.scale.set(scale, scale, scale)
  }

  return (
    <group ref={groupRef}>
      {Object.values(nodes).map((node, idx) => {
        if (node.isMesh) {
          let meshRef = null
          if (/Right_(Shoulder|Clavicle)/i.test(node.name)) {
            meshRef = rightShoulderRef
          } else if (/Left_(Shoulder|Clavicle)/i.test(node.name)) {
            meshRef = leftShoulderRef
          } else if (/Right_Arm/i.test(node.name) && !/Fore/i.test(node.name)) {
            meshRef = rightArmRef
          } else if (/Left_Arm/i.test(node.name) && !/Fore/i.test(node.name)) {
            meshRef = leftArmRef
          } else if (/Right.*Sleeve/i.test(node.name)) {
            meshRef = rightSleeveRef
          } else if (/Left.*Sleeve/i.test(node.name)) {
            meshRef = leftSleeveRef
          }
          
          return (
            <mesh
              key={idx}
              geometry={node.geometry}
              material={node.material.clone()}
              ref={meshRef}
            />
          )
        }
        return null
      })}
    </group>
  )
}