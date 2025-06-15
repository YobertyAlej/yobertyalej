"use client"

import * as THREE from 'three'
import { useDeskModel } from '../hooks/useDeskModel'

export function Level() {
  const { nodes } = useDeskModel()
  
  return (
    <mesh 
      geometry={(nodes as any).Level.geometry} 
      material={(nodes as any).Level.material} 
      position={[-0.38, 0.69, 0.62]} 
      rotation={[Math.PI / 2, -Math.PI / 9, 0]} 
    />
  )
} 