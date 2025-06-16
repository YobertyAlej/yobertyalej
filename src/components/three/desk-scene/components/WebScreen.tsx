// @ts-nocheck
"use client"

import { Html } from '@react-three/drei'
import { useState, useRef, useEffect } from 'react'
import * as THREE from 'three'

interface WebScreenProps {
  url: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  width?: number
  height?: number
  isActive?: boolean
  tilt?: number
}

export function WebScreen({ 
  url, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1,
  width = 400,
  height = 300,
  isActive = false,
  tilt = 0
}: WebScreenProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const tiltInRadians = THREE.MathUtils.degToRad(tilt);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <group rotation={[tiltInRadians, 0, 0]}>
        {/* Pantalla base */}
        <mesh ref={meshRef}>
          <planeGeometry args={[width / 30, height / 30]} />
          <meshBasicMaterial 
            color={isActive ? "#ffffff" : "transparent"} 
            transparent 
            opacity={isActive ? 0 : 0}
          />
        </mesh>

        {/* Contenido web renderizado */}
        {isActive && (
          <Html
            transform
            occlude
            position={[1, 0, 0.01]}
            style={{
              width: `${width}px`,
              height: `${height}px`,
              pointerEvents: 'auto',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                border: '2px solid #444',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#000',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)'
              }}
            >
              <iframe
                src={url}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                onLoad={() => setIsLoaded(true)}
                style={{
                  border: 'none',
                  borderRadius: '6px'
                }}
                title="Web Content"
              />
            </div>
          </Html>
        )}

        {/* Indicador de carga */}
        {isActive && !isLoaded && (
          <Html
            transform
            position={[0, 0, 0.02]}
            style={{
              width: `${width}px`,
              height: `${height}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none'
            }}
          >
            <div
              style={{
                color: 'white',
                fontSize: '16px',
                textAlign: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '10px',
                borderRadius: '5px'
              }}
            >
              Cargando...
            </div>
          </Html>
        )}
      </group>
    </group>
  )
} 