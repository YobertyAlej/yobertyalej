"use client"

import { MeshWobbleMaterial } from '@react-three/drei'
import { useDeskModel } from '../hooks/useDeskModel'

export function Cactus() {
  const { nodes, materials } = useDeskModel()
  
  return (
    <mesh 
      geometry={(nodes as any).Cactus.geometry} 
      position={[-0.42, 0.51, -0.62]} 
      rotation={[Math.PI / 2, 0, 0]}
    >
      <MeshWobbleMaterial 
        factor={0.4} 
        map={(materials as any).Cactus.map} 
      />
    </mesh>
  )
} 