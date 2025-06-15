// @ts-nocheck
"use client"

import * as THREE from 'three'
import { useDeskModel } from '../hooks/useDeskModel'
import { useEffect, useRef } from 'react'

interface LevelProps {
  onArcadeClick?: () => void
  interactiveBoxPosition?: { x: number; y: number; z: number }
}

export function Level({ onArcadeClick, interactiveBoxPosition = { x: 0.2, y: 0.8, z: 0.3 } }: LevelProps) {
  const { nodes } = useDeskModel()
  const groupRef = useRef<THREE.Group>(null)
  
  // Debug: mostrar todos los nodos disponibles
  useEffect(() => {
    console.log('Available nodes:', Object.keys(nodes))
  }, [nodes])

  // Crear un mesh interactivo temporal para la máquina de arcade
  // Esto será reemplazado una vez que identifiquemos el nodo correcto
  const handleArcadeClick = (event: any) => {
    event.stopPropagation()
    if (onArcadeClick) {
      onArcadeClick()
    }
  }
  
  return (
    <>
      {/* Renderizar el nivel principal */}
      <mesh 
        geometry={(nodes as any).Level.geometry} 
        material={(nodes as any).Level.material} 
        position={[-0.38, 0.69, 0.62]} 
        rotation={[Math.PI / 2, -Math.PI / 9, 0]} 
      />
      
      {/* Área interactiva temporal para la máquina de arcade */}
      {/* Posicionada dinámicamente usando lil-gui */}
      <mesh
        position={[interactiveBoxPosition.x, interactiveBoxPosition.y, interactiveBoxPosition.z]}
        onClick={handleArcadeClick}
        onPointerOver={(event: any) => {
          event.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(event: any) => {
          event.stopPropagation()
          document.body.style.cursor = 'auto'
        }}
      >
        <boxGeometry args={[0.5, 1, 0.6]} />
        <meshStandardMaterial 
          color="transparent" 
          transparent 
          opacity={0.0}
        />
      </mesh>
    </>
  )
} 