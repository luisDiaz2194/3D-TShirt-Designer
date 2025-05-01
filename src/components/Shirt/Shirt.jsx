import { useGLTF, Decal } from '@react-three/drei'
import { useRef, useEffect, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { useShirtAnimations } from '../../hooks/useShirtAnimations'

export function Shirt({ 
  currentAnimation, 
  color = "#ffffff", 
  designs = { front: null, back: null },
  designDimensions = { front: { width: 0.5, height: 0.5 }, back: { width: 0.5, height: 0.5 } },
  designPositions = { front: { x: 0, y: 1.26 }, back: { x: 0, y: 1.26 } }
}) {
  const groupRef = useRef()
  const { nodes } = useGLTF('/models/T_shirt_gltf.zip.gltf')
  const animationTime = useRef(0)
  const prevAnimation = useRef(null)

  // Texturas con useMemo para evitar recreaciones innecesarias
  const frontTexture = useMemo(() => {
    return designs.front ? useLoader(THREE.TextureLoader, designs.front) : null
  }, [designs.front])

  const backTexture = useMemo(() => {
    return designs.back ? useLoader(THREE.TextureLoader, designs.back) : null
  }, [designs.back])

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

  // Configuracion inicial
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

  // Animaciones (caminar, flotar, rotar, latido)
  useFrame((state, delta) => {
    if (!groupRef.current || !currentAnimation) return

    if (currentAnimation !== prevAnimation.current) {
      animationTime.current = 0
      prevAnimation.current = currentAnimation
      resetToInitialPosition()
    }

    animationTime.current += delta

    switch(currentAnimation) {
		case 'caminar': animateWalk(); break  
		case 'flotar': animateFloat(); break
		case 'rotar': animateRotate(); break
		case 'latido': animatePulse(); break
		default: break
	  }
  })

  const animateWalk = () => {
    const time = animationTime.current * 1.5
    
    groupRef.current.position.y = INITIAL_POSITION[1] + Math.abs(Math.sin(time * 2)) * 0.06
    groupRef.current.rotation.z = Math.sin(time) * 0.08

    if (leftShoulderRef.current && rightShoulderRef.current) {
      leftShoulderRef.current.rotation.z = Math.sin(time) * 1.5
      rightShoulderRef.current.rotation.z = -Math.sin(time) * 1.5
      
      if (leftArmRef.current) leftArmRef.current.rotation.z = leftShoulderRef.current.rotation.z * 0.7
      if (rightArmRef.current) rightArmRef.current.rotation.z = rightShoulderRef.current.rotation.z * 0.7
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
          const isFront = node.name.includes('Front')
          const isBack = node.name.includes('Back')
          
          let meshRef = null
          if (/Right_(Shoulder|Clavicle)/i.test(node.name)) meshRef = rightShoulderRef
          else if (/Left_(Shoulder|Clavicle)/i.test(node.name)) meshRef = leftShoulderRef
          else if (/Right_Arm/i.test(node.name)) meshRef = rightArmRef
          else if (/Left_Arm/i.test(node.name)) meshRef = leftArmRef
          
          return (
            <mesh
              key={idx}
              geometry={node.geometry}
              material={node.material.clone()}
              ref={meshRef}
            >
              {isFront && frontTexture && (
                <Decal
                  position={[designPositions.front.x, designPositions.front.y, 0.1]}
                  rotation={[0, 0, 0]}
                  scale={[designDimensions.front.width, designDimensions.front.height, 1]}
                  map={frontTexture}
                  polygonOffset
                  polygonOffsetFactor={-5}
                  depthTest={true}
                  depthWrite={false}
                />
              )}
              {isBack && backTexture && (
                <Decal
                  position={[designPositions.back.x, designPositions.back.y, -0.1]}
                  rotation={[0, Math.PI, 0]}
                  scale={[designDimensions.back.width, designDimensions.back.height, 1]}
                  map={backTexture}
                  polygonOffset
                  polygonOffsetFactor={-5}
                  depthTest={true}
                  depthWrite={false}
                />
              )}
            </mesh>
          )
        }
        return null
      })}
    </group>
  )
}