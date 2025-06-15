"use client"

import { Canvas } from '@react-three/fiber'
import { Fisheye, CameraControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { Level } from './components/Level'
import { Sudo } from './components/Sudo'
import { Camera } from './components/Camera'
import { Cactus } from './components/Cactus'
import { InteractiveBox } from './components/InteractiveBox'

export default function DeskScene() {
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
          minPolarAngle={Math.PI / 8} 
          maxPolarAngle={Math.PI / 2.2}
          minDistance={5}
          maxDistance={80}
        />
        <ambientLight intensity={Math.PI / 2} />
        <group scale={20} position={[5, -11, -5]}>
          <Level />
          <Sudo />
          <Camera />
          <Cactus />
          <InteractiveBox position={[-0.8, 1.4, 0.4]} scale={0.15} />
        </group>
        <Environment preset="city" />
        <PerspectiveCamera 
          makeDefault 
          position={[30, 20, 60]} 
          fov={55}
          near={0.1}
          far={1000}
        />
      </Canvas>
    </div>
  )
} 