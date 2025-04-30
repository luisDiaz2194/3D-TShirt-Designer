import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function Shirt({ color = "#ffffff" }) {
  const { nodes } = useGLTF('/models/T_shirt_gltf.zip.gltf')
  const groupRef = useRef()

  // Animación básica de rotación
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={groupRef} position={[0, -2, 0]} scale={1.5}>
      {Object.values(nodes).map((node, idx) => {
        if (node.isMesh) {
          return (
            <mesh
              key={idx}
              geometry={node.geometry}
              material={node.material.clone()}
            />
          )
        }
        return null
      })}
    </group>
  )
}