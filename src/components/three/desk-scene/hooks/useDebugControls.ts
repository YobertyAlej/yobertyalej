import { useEffect, useRef } from 'react'
import { GUI } from 'lil-gui'
import { CameraControls } from '@react-three/drei'
import * as THREE from 'three'

interface CameraInfo {
  position: { x: number; y: number; z: number }
  target: { x: number; y: number; z: number }
}

interface DebugControls {
  // Posición del área interactiva (controlable)
  interactiveBox: {
    x: number
    y: number
    z: number
  }
  // Posición de la caja azul (controlable)
  blueBox: {
    x: number
    y: number
    z: number
  }
  // Información actual de la cámara (solo lectura)
  currentCamera: CameraInfo
  // Valores guardados para arcade
  savedArcadeCamera: CameraInfo
  // Valores guardados para caja azul
  savedBlueBoxCamera: CameraInfo
  // Valores guardados para default
  savedDefaultCamera: CameraInfo
}

interface UseDebugControlsProps {
  cameraControlsRef: React.RefObject<CameraControls>
  onInteractiveBoxChange: (position: { x: number; y: number; z: number }) => void
  onBlueBoxChange: (position: { x: number; y: number; z: number }) => void
  onSaveArcadeCamera: (camera: CameraInfo) => void
  onSaveBlueBoxCamera: (camera: CameraInfo) => void
  onSaveDefaultCamera: (camera: CameraInfo) => void
}

export function useDebugControls({
  cameraControlsRef,
  onInteractiveBoxChange,
  onBlueBoxChange,
  onSaveArcadeCamera,
  onSaveBlueBoxCamera,
  onSaveDefaultCamera
}: UseDebugControlsProps) {
  const guiRef = useRef<GUI | null>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  
  const controls: DebugControls = {
    interactiveBox: {
      x: 0.2,
      y: 0.8,
      z: 0.3
    },
    blueBox: {
      x: 0.5,
      y: 0.8,
      z: -0.3
    },
    currentCamera: {
      position: { x: 0, y: 0, z: 0 },
      target: { x: 0, y: 0, z: 0 }
    },
    savedArcadeCamera: {
      position: { x: 25, y: 15, z: 45 },
      target: { x: 5, y: -5, z: -5 }
    },
    savedBlueBoxCamera: {
      position: { x: 7.1, y: 6.94, z: -12.84 },
      target: { x: 7.65, y: 6.17, z: -7.54 }
    },
    savedDefaultCamera: {
      position: { x: 30, y: 20, z: 60 },
      target: { x: 5, y: -11, z: -5 }
    }
  }

  useEffect(() => {
    // Solo crear GUI en desarrollo
    if (process.env.NODE_ENV !== 'development') return

    // Crear GUI
    guiRef.current = new GUI({ title: 'Camera Debug Info' })
    const gui = guiRef.current

    // Controles para el área interactiva (controlable)
    const interactiveFolder = gui.addFolder('Interactive Box Position')
    interactiveFolder.add(controls.interactiveBox, 'x', -2, 2, 0.01)
      .onChange(() => onInteractiveBoxChange(controls.interactiveBox))
    interactiveFolder.add(controls.interactiveBox, 'y', -2, 2, 0.01)
      .onChange(() => onInteractiveBoxChange(controls.interactiveBox))
    interactiveFolder.add(controls.interactiveBox, 'z', -2, 2, 0.01)
      .onChange(() => onInteractiveBoxChange(controls.interactiveBox))

    // Controles para la caja azul (controlable)
    const blueBoxFolder = gui.addFolder('Blue Box Position')
    blueBoxFolder.add(controls.blueBox, 'x', -2, 2, 0.01)
      .onChange(() => onBlueBoxChange(controls.blueBox))
    blueBoxFolder.add(controls.blueBox, 'y', -2, 2, 0.01)
      .onChange(() => onBlueBoxChange(controls.blueBox))
    blueBoxFolder.add(controls.blueBox, 'z', -2, 2, 0.01)
      .onChange(() => onBlueBoxChange(controls.blueBox))

    // Información actual de la cámara (solo lectura)
    const currentFolder = gui.addFolder('Current Camera (Live)')
    const currentPosFolder = currentFolder.addFolder('Position')
    const posXController = currentPosFolder.add(controls.currentCamera.position, 'x').name('X').listen()
    const posYController = currentPosFolder.add(controls.currentCamera.position, 'y').name('Y').listen()
    const posZController = currentPosFolder.add(controls.currentCamera.position, 'z').name('Z').listen()
    
    const currentTargetFolder = currentFolder.addFolder('Target')
    const targetXController = currentTargetFolder.add(controls.currentCamera.target, 'x').name('X').listen()
    const targetYController = currentTargetFolder.add(controls.currentCamera.target, 'y').name('Y').listen()
    const targetZController = currentTargetFolder.add(controls.currentCamera.target, 'z').name('Z').listen()

    // Deshabilitar interacción en los controles de solo lectura
    posXController.disable()
    posYController.disable()
    posZController.disable()
    targetXController.disable()
    targetYController.disable()
    targetZController.disable()

    // Botones para guardar posiciones
    const actionsFolder = gui.addFolder('Actions')
    
    actionsFolder.add({
      saveAsArcade: () => {
        const currentPos = { ...controls.currentCamera.position }
        const currentTarget = { ...controls.currentCamera.target }
        controls.savedArcadeCamera = { position: currentPos, target: currentTarget }
        onSaveArcadeCamera(controls.savedArcadeCamera)
        console.log('🎮 Saved Arcade Camera:', controls.savedArcadeCamera)
      }
    }, 'saveAsArcade').name('💾 Save as Arcade View')

    actionsFolder.add({
      saveAsDefault: () => {
        const currentPos = { ...controls.currentCamera.position }
        const currentTarget = { ...controls.currentCamera.target }
        controls.savedDefaultCamera = { position: currentPos, target: currentTarget }
        onSaveDefaultCamera(controls.savedDefaultCamera)
        console.log('🏠 Saved Default Camera:', controls.savedDefaultCamera)
      }
    }, 'saveAsDefault').name('💾 Save as Default View')

    actionsFolder.add({
      saveAsBlueBox: () => {
        const currentPos = { ...controls.currentCamera.position }
        const currentTarget = { ...controls.currentCamera.target }
        controls.savedBlueBoxCamera = { position: currentPos, target: currentTarget }
        onSaveBlueBoxCamera(controls.savedBlueBoxCamera)
        console.log('🔵 Saved Blue Box Camera:', controls.savedBlueBoxCamera)
      }
    }, 'saveAsBlueBox').name('💾 Save as Blue Box View')

    actionsFolder.add({
      printAllValues: () => {
        console.log('=== CAMERA DEBUG VALUES ===')
        console.log('📦 Interactive Box:', controls.interactiveBox)
        console.log('🔵 Blue Box:', controls.blueBox)
        console.log('📷 Current Camera:', controls.currentCamera)
        console.log('🎮 Saved Arcade Camera:', controls.savedArcadeCamera)
        console.log('🔵 Saved Blue Box Camera:', controls.savedBlueBoxCamera)
        console.log('🏠 Saved Default Camera:', controls.savedDefaultCamera)
        console.log('============================')
        
        // También mostrar código listo para copiar
        console.log('\n=== READY TO COPY CODE ===')
        console.log(`// Arcade Camera Settings:`)
        console.log(`posX: ${controls.savedArcadeCamera.position.x}, posY: ${controls.savedArcadeCamera.position.y}, posZ: ${controls.savedArcadeCamera.position.z}`)
        console.log(`targetX: ${controls.savedArcadeCamera.target.x}, targetY: ${controls.savedArcadeCamera.target.y}, targetZ: ${controls.savedArcadeCamera.target.z}`)
        console.log(`\n// Blue Box Camera Settings:`)
        console.log(`posX: ${controls.savedBlueBoxCamera.position.x}, posY: ${controls.savedBlueBoxCamera.position.y}, posZ: ${controls.savedBlueBoxCamera.position.z}`)
        console.log(`targetX: ${controls.savedBlueBoxCamera.target.x}, targetY: ${controls.savedBlueBoxCamera.target.y}, targetZ: ${controls.savedBlueBoxCamera.target.z}`)
        console.log(`\n// Default Camera Settings:`)
        console.log(`posX: ${controls.savedDefaultCamera.position.x}, posY: ${controls.savedDefaultCamera.position.y}, posZ: ${controls.savedDefaultCamera.position.z}`)
        console.log(`targetX: ${controls.savedDefaultCamera.target.x}, targetY: ${controls.savedDefaultCamera.target.y}, targetZ: ${controls.savedDefaultCamera.target.z}`)
        console.log('==========================')
      }
    }, 'printAllValues').name('📋 Print All Values')

    // Función para actualizar los valores de la cámara en tiempo real
    const updateCameraInfo = () => {
      if (cameraControlsRef.current) {
        const camera = cameraControlsRef.current.camera
        const target = new THREE.Vector3()
        cameraControlsRef.current.getTarget(target)
        
        controls.currentCamera.position.x = Math.round(camera.position.x * 100) / 100
        controls.currentCamera.position.y = Math.round(camera.position.y * 100) / 100
        controls.currentCamera.position.z = Math.round(camera.position.z * 100) / 100
        
        controls.currentCamera.target.x = Math.round(target.x * 100) / 100
        controls.currentCamera.target.y = Math.round(target.y * 100) / 100
        controls.currentCamera.target.z = Math.round(target.z * 100) / 100
      }
      
      animationFrameRef.current = requestAnimationFrame(updateCameraInfo)
    }

    // Iniciar el loop de actualización
    updateCameraInfo()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (guiRef.current) {
        guiRef.current.destroy()
      }
    }
  }, [cameraControlsRef, onInteractiveBoxChange, onBlueBoxChange, onSaveArcadeCamera, onSaveBlueBoxCamera, onSaveDefaultCamera])

  return controls
} 