'use client'

import { useEffect, useRef, useCallback } from 'react'
import Experience from '@/lib/three/Experience'

interface ThreeCanvasProps {
  className?: string
  style?: React.CSSProperties
}

export function ThreeCanvas({ className = '', style }: ThreeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const experienceRef = useRef<Experience | null>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    // Delay para asegurar que el canvas esté en el DOM
    setTimeout(() => {
      initializeExperience()
    }, 100)

    return () => {
      if (experienceRef.current) {
        experienceRef.current.destroy()
        experienceRef.current = null
      }
    }
  }, [])

  const initializeExperience = useCallback(() => {
    if (!canvasRef.current || experienceRef.current) return

    try {
      experienceRef.current = new Experience(canvasRef.current)
    } catch (error) {
      console.error('Error initializing Three.js Experience:', error)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`webgl ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        outline: 'none',
        display: 'block',
        zIndex: -10,
        pointerEvents: 'auto',
        ...style
      }}
    />
  )
} 