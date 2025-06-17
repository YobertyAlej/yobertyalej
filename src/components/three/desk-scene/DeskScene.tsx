// @ts-nocheck
"use client"

import { Canvas } from '@react-three/fiber'
import { CameraControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { Level } from './components/Level'
import { Sudo } from './components/Sudo'
import { Camera } from './components/Camera'
import { Cactus } from './components/Cactus'
import { InteractiveBox } from './components/InteractiveBox'
import { WebScreen } from './components/WebScreen'
// import { useDebugControls } from './hooks/useDebugControls' // Solo para desarrollo

export type ViewState = 'default' | 'arcade' | 'blueBox'

interface DeskSceneProps {
  onViewChange?: (view: ViewState) => void
  currentView?: ViewState
  onHotspotHover?: (hotspotId: string | null) => void
  onHotspotPositions?: (positions: { arcade: {x: number, y: number, z: number}, blueBox: {x: number, y: number, z: number}, scale: number, groupPosition: [number, number, number] }) => void
}

export default function DeskScene({ 
  onViewChange, 
  currentView,
  onHotspotHover,
  onHotspotPositions
}: DeskSceneProps) {
  const controlsRef = useRef<CameraControls>(null)
  const [view, setView] = useState<ViewState>(currentView || 'default')
  const [activeScreen, setActiveScreen] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es un dispositivo móvil
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Sincronizar con currentView prop (solo desde afuera hacia adentro)
  useEffect(() => {
    if (currentView && currentView !== view) {
      setView(currentView)
    }
  }, [currentView])

  // Solo notificar cambios internos (como clicks en el 3D)
  const handleInternalViewChange = useCallback((newView: ViewState) => {
    setView(newView)
    onViewChange?.(newView)
  }, [onViewChange])

  // Ajustes responsivos
  const scale = isMobile ? 15 : 22
  const fov = isMobile ? 80 : 65
  
  // Posiciones de cámara centradas para móvil y escritorio
  const cameraInitialPosition = useMemo(() => (
    isMobile 
      ? { x: 45, y: 25, z: 45 }  // Móvil: más alejado para vista completa sin cortes
      : { x: 50, y: 30, z: 50 }   // Escritorio: más alejado para vista completa sin cortes
  ), [isMobile])
  
  const cameraInitialTarget = useMemo(() => (
    isMobile 
      ? { x: 0, y: 0, z: 0 }     // Móvil: enfoque al centro
      : { x: 0, y: 0, z: 0 }      // Escritorio: enfoque central
  ), [isMobile])

  // Estados para posiciones de elementos interactivos
  const [interactiveBoxPosition, setInteractiveBoxPosition] = useState({ x: -0.595, y: 0.60, z: 0.65 })
  const [blueBoxPosition, setBlueBoxPosition] = useState({ x: 0.2, y: 0.8, z: 0.05 })
  // Configuraciones de cámara responsivas
  const arcadeCameraSettings = useMemo(() => (
    isMobile 
      ? {
          position: { x: 2.18, y: 7.08, z: 10.48 },
          target: { x: -4, y: 6, z: 10 }
        }
      : {
          position: { x: 3.21, y: 12.08, z: 14.28 },
          target: { x: -6.65, y: 10.42, z: 14.08 }
        }
  ), [isMobile])
  
  const blueBoxCameraSettings = useMemo(() => (
    isMobile 
      ? {
          position: { x: 3, y: 7, z: -8 },
          target: { x: 3, y: 4, z: -1.5 }
        }
      : {
          position: { x: 4.82, y: 10.6, z: -12.41 },
          target: { x: 4.67, y: 6.92, z: -2.18 }
        }
  ), [isMobile])
  const [defaultCameraSettings, setDefaultCameraSettings] = useState({
    position: cameraInitialPosition,
    target: cameraInitialTarget
  })

  // Comunicar posiciones 3D para hotspots
  useEffect(() => {
    if (onHotspotPositions) {
      onHotspotPositions({
        arcade: interactiveBoxPosition,
        blueBox: blueBoxPosition,
        scale: scale,
        groupPosition: isMobile ? [0, -6, 0] : [0, -9, 0]
      })
    }
  }, [interactiveBoxPosition, blueBoxPosition, scale, isMobile, onHotspotPositions])

  // Actualizar settings si cambia el modo de dispositivo (por ej. al redimensionar)
  useEffect(() => {
    setDefaultCameraSettings({
      position: cameraInitialPosition,
      target: cameraInitialTarget
    })
  }, [cameraInitialPosition, cameraInitialTarget])

  // Configurar la cámara inicial cuando se monta el componente
  useEffect(() => {
    if (!controlsRef.current) return

    // Pequeño delay para asegurar que el componente esté completamente montado
    const timer = setTimeout(() => {
      controlsRef.current?.setLookAt(
        cameraInitialPosition.x,
        cameraInitialPosition.y,
        cameraInitialPosition.z,
        cameraInitialTarget.x,
        cameraInitialTarget.y,
        cameraInitialTarget.z,
        false // Sin animación para la posición inicial
      )
    }, 100)

    return () => clearTimeout(timer)
  }, [cameraInitialPosition, cameraInitialTarget])

  // Debug controls removidos para producción

  // Manejar las transiciones de cámara
  useEffect(() => {
    if (!controlsRef.current) return

    if (view === 'arcade') {
      // Usar configuración guardada para la vista arcade
      controlsRef.current.setLookAt(
        arcadeCameraSettings.position.x, 
        arcadeCameraSettings.position.y, 
        arcadeCameraSettings.position.z,
        arcadeCameraSettings.target.x, 
        arcadeCameraSettings.target.y, 
        arcadeCameraSettings.target.z,
        true
      )
      // Activar la pantalla de arcade
      setActiveScreen('arcade')
    } else if (view === 'blueBox') {
      // Usar configuración para la vista de la caja azul
      controlsRef.current.setLookAt(
        blueBoxCameraSettings.position.x, 
        blueBoxCameraSettings.position.y, 
        blueBoxCameraSettings.position.z,
        blueBoxCameraSettings.target.x, 
        blueBoxCameraSettings.target.y, 
        blueBoxCameraSettings.target.z,
        true
      )
      // Activar otra pantalla si es necesario
      setActiveScreen('blueBox')
    } else if (view === 'default') {
      // Usar configuración guardada para la vista por defecto
      controlsRef.current.setLookAt(
        defaultCameraSettings.position.x, 
        defaultCameraSettings.position.y, 
        defaultCameraSettings.position.z,
        defaultCameraSettings.target.x, 
        defaultCameraSettings.target.y, 
        defaultCameraSettings.target.z,
        true
      )
      // Desactivar todas las pantallas en vista general
      setActiveScreen(null)
    }
  }, [view, arcadeCameraSettings, blueBoxCameraSettings, defaultCameraSettings])

  return (
    <div className="relative w-full h-screen">
      {/* Botón para volver a la vista general */}
      {view !== 'default' && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleInternalViewChange('default')
          }}
          className="absolute top-5 right-5 z-10 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-lg cursor-pointer backdrop-blur-md text-sm font-medium transition-all hover:bg-white/20"
        >
          ← Volver
        </button>
      )}
      
      <Canvas 
        flat 
        gl={{ 
          antialias: true,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
        style={{
          background: '#101828'
        }}
      >
        <color attach="background" args={['#101828']} />
        <CameraControls 
          ref={controlsRef}
          minPolarAngle={Math.PI / 8} 
          maxPolarAngle={Math.PI / 2.2}
          minDistance={10}
          maxDistance={120}
        />
        <ambientLight intensity={Math.PI / 2} />
        <group scale={scale} position={isMobile ? [0, -6, 0] : [0, -9, 0]}>
          <Level 
            onArcadeClick={() => handleInternalViewChange('arcade')} 
            onBlueBoxClick={() => handleInternalViewChange('blueBox')}
            interactiveBoxPosition={interactiveBoxPosition}
            blueBoxPosition={blueBoxPosition}
          />
          <Sudo />
          <Camera />
          <Cactus />
          <InteractiveBox position={[-0.8, 1.4, 0.4]} scale={0.15} />
          
          {/* Pantallas Web */}
          <WebScreen
            url="https://lidr-academy.github.io/AI4Devs-videogame/floodfill-YAG/index.html"
            position={[-0.49, 0.84, 0.64]}
            rotation={[0, 1.6, -0.0]}
            scale={0.021}
            width={821}
            height={620}
            isActive={activeScreen === 'arcade'}
            tilt={-10}
          />
          
          <WebScreen
            url="https://yobertyalej.com/about/"
            position={[0.213, 0.856, 0.009]}
            rotation={[0, Math.PI, 0]}
            scale={0.011}
            width={1820}
            height={870}
            isActive={activeScreen === 'blueBox'}
            tilt={-4.6}
          />
        </group>
        <Environment preset="city" />
        <PerspectiveCamera 
          makeDefault 
          position={[defaultCameraSettings.position.x, defaultCameraSettings.position.y, defaultCameraSettings.position.z]} 
          fov={fov}
          near={0.1}
          far={1000}
        />
      </Canvas>
    </div>
  )
} 