// @ts-nocheck
"use client"

import { Canvas } from '@react-three/fiber'
import { Fisheye, CameraControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import { Level } from './components/Level'
import { Sudo } from './components/Sudo'
import { Camera } from './components/Camera'
import { Cactus } from './components/Cactus'
import { InteractiveBox } from './components/InteractiveBox'
import { WebScreen } from './components/WebScreen'
import { useDebugControls } from './hooks/useDebugControls'

type ViewState = 'default' | 'arcade' | 'blueBox'

export default function DeskScene() {
  const controlsRef = useRef<CameraControls>(null)
  const [view, setView] = useState<ViewState>('default')
  const [activeScreen, setActiveScreen] = useState<string | null>(null)
  
  // Estados para los controles de debugging
  const [interactiveBoxPosition, setInteractiveBoxPosition] = useState({ x: -0.595, y: 0.60, z: 0.65 })
  const [blueBoxPosition, setBlueBoxPosition] = useState({ x: 0.2, y: 0.8, z: 0.05 })
  const [arcadeCameraSettings, setArcadeCameraSettings] = useState({
    position: { x: 5.76, y: 7.37, z: 7.55 },
    target: { x: -5.8, y: 5.21, z: 7.6 }
  })
  const [blueBoxCameraSettings, setBlueBoxCameraSettings] = useState({
    position: { x: 9.21, y: 6.29, z: -14.52 },
    target: { x: 9.14, y: 4.19, z: -2.04 }
  })
  const [defaultCameraSettings, setDefaultCameraSettings] = useState({
    position: { x: 47, y: 21, z: 49 },
    target: { x: 4.5, y: 2, z:-2.92 }
  })

  // Configurar controles de debugging
  useDebugControls({
    cameraControlsRef: controlsRef,
    onInteractiveBoxChange: setInteractiveBoxPosition,
    onBlueBoxChange: setBlueBoxPosition,
    onSaveArcadeCamera: setArcadeCameraSettings,
    onSaveBlueBoxCamera: setBlueBoxCameraSettings,
    onSaveDefaultCamera: setDefaultCameraSettings
  })

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
    <div 
      style={{ 
        position: 'relative',
        width: '100%', 
        height: '80vh',
        minHeight: '600px',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        backgroundColor: '#101828'
      }}
    >
      {/* Botón para volver a la vista general */}
      {view !== 'default' && (
        <button
          onClick={() => setView('default')}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            padding: '12px 24px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
          }}
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
          minDistance={5}
          maxDistance={80}
        />
        <ambientLight intensity={Math.PI / 2} />
        <group scale={20} position={[5, -11, -5]}>
          <Level 
            onArcadeClick={() => setView('arcade')} 
            onBlueBoxClick={() => setView('blueBox')}
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
          fov={55}
          near={0.1}
          far={1000}
        />
      </Canvas>
    </div>
  )
} 