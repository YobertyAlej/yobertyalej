// @ts-nocheck
"use client"

import * as THREE from 'three'
import { useDeskModel } from '../hooks/useDeskModel'
import { useEffect, useRef } from 'react'

interface LevelProps {
  onArcadeClick?: () => void
  onBlueBoxClick?: () => void
  interactiveBoxPosition?: { x: number; y: number; z: number }
  blueBoxPosition?: { x: number; y: number; z: number }
}

export function Level({ 
  onArcadeClick, 
  onBlueBoxClick,
  interactiveBoxPosition = { x: 0.2, y: 0.8, z: 0.3 },
  blueBoxPosition = { x: 0.5, y: 0.8, z: -0.3 }
}: LevelProps) {
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

  // Manejador para la caja azul
  const handleBlueBoxClick = (event: any) => {
    event.stopPropagation()
    if (onBlueBoxClick) {
      onBlueBoxClick()
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
        <boxGeometry args={[0.2, 1, 0.6]} />
        <meshStandardMaterial 
          color={0xff0000} 
          transparent 
          opacity={0}
        />
      </mesh>

      {/* Nueva caja azul interactiva */}
      {/* Posicionada dinámicamente usando lil-gui */}
      <mesh
        position={[blueBoxPosition.x, blueBoxPosition.y, blueBoxPosition.z]}
        onClick={handleBlueBoxClick}
        onPointerOver={(event: any) => {
          event.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(event: any) => {
          event.stopPropagation()
          document.body.style.cursor = 'auto'
        }}
      >
        <boxGeometry args={[0.5, 0.4, 0.03]} />
        <meshStandardMaterial 
          color={0x0000ff} 
          transparent 
          opacity={0}
        />
      </mesh>
    </>
  )
} 