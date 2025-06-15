"use client"

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { Suspense, useEffect, useMemo } from 'react'
import * as THREE from 'three'

// Precargar el modelo
useGLTF.preload('/models/ramenShop/glTF/ramenShop.gltf')

function useRamenShopModel() {
  const { scene } = useGLTF('/models/ramenShop/glTF/ramenShop.gltf')
  
  // Cargar las texturas correctas que están disponibles
  const ramenShopTexture = useTexture('/textures/baked/ramenShopBaked1024.png')
  const machinesTexture = useTexture('/textures/baked/machinesBaked1024.png')
  const floorTexture = useTexture('/textures/baked/floorBaked1024.png')
  const miscTexture = useTexture('/textures/baked/miscBaked1024.png')
  const graphicsTexture = useTexture('/textures/baked/graphicsBaked512.png')

  // Configurar las texturas
  const configureTexture = (texture: THREE.Texture) => {
    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }

  // Crear materiales para diferentes partes
  const materials = useMemo(() => {
    return {
      ramenShop: new THREE.MeshStandardMaterial({
        map: configureTexture(ramenShopTexture),
        side: THREE.DoubleSide,
      }),
      machines: new THREE.MeshStandardMaterial({
        map: configureTexture(machinesTexture),
        side: THREE.DoubleSide,
      }),
      floor: new THREE.MeshStandardMaterial({
        map: configureTexture(floorTexture),
        side: THREE.DoubleSide,
      }),
      misc: new THREE.MeshStandardMaterial({
        map: configureTexture(miscTexture),
        side: THREE.DoubleSide,
      }),
      graphics: new THREE.MeshStandardMaterial({
        map: configureTexture(graphicsTexture),
        side: THREE.DoubleSide,
      }),
      // Materiales para luces de neón
      neonPink: new THREE.MeshStandardMaterial({
        color: '#ff0080',
        emissive: '#ff0080',
        emissiveIntensity: 0.8,
      }),
      neonBlue: new THREE.MeshStandardMaterial({
        color: '#00ffff',
        emissive: '#00ffff',
        emissiveIntensity: 0.8,
      }),
      neonYellow: new THREE.MeshStandardMaterial({
        color: '#ffff00',
        emissive: '#ffff00',
        emissiveIntensity: 0.8,
      }),
      neonGreen: new THREE.MeshStandardMaterial({
        color: '#00ff00',
        emissive: '#00ff00',
        emissiveIntensity: 0.8,
      }),
    }
  }, [ramenShopTexture, machinesTexture, floorTexture, miscTexture, graphicsTexture])

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Aplicar materiales basados en el nombre del objeto
        const name = child.name.toLowerCase()
        
        if (name.includes('ramenshop') || name.includes('shop')) {
          child.material = materials.ramenShop
        } else if (name.includes('machine')) {
          child.material = materials.machines
        } else if (name.includes('floor')) {
          child.material = materials.floor
        } else if (name.includes('misc')) {
          child.material = materials.misc
        } else if (name.includes('graphic')) {
          child.material = materials.graphics
        } else if (name.includes('neon') && name.includes('pink')) {
          child.material = materials.neonPink
        } else if (name.includes('neon') && name.includes('blue')) {
          child.material = materials.neonBlue
        } else if (name.includes('neon') && name.includes('yellow')) {
          child.material = materials.neonYellow
        } else if (name.includes('neon') && name.includes('green')) {
          child.material = materials.neonGreen
        } else {
          // Material por defecto usando la textura principal
          child.material = materials.ramenShop
        }
        
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene, materials])

  return scene
}

function RamenShopModel() {
  const scene = useRamenShopModel()
  
  return (
    // @ts-ignore
    <primitive object={scene} scale={0.08} position={[0, -1.5, 0]} />
  )
}

function Scene() {
  return (
    <>
      {/* Configuración de iluminación para ambiente cyberpunk */}
      {/* @ts-ignore */}
      <ambientLight intensity={0.3} color="#404040" />
      
      {/* Luz direccional principal */}
      {/* @ts-ignore */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.0} 
        color="#ffffff"
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Luces de neón para ambiente cyberpunk */}
      {/* @ts-ignore */}
      <pointLight position={[0, 4, 0]} intensity={3.0} color="#ff0080" distance={12} decay={2} />
      
      {/* @ts-ignore */}
      <pointLight position={[-3, 3, 2]} intensity={2.5} color="#00ffff" distance={10} decay={2} />
      
      {/* @ts-ignore */}
      <pointLight position={[3, 4, -2]} intensity={2.5} color="#ffff00" distance={10} decay={2} />
      
      {/* @ts-ignore */}
      <pointLight position={[0, 2, -4]} intensity={2.0} color="#ff4000" distance={8} decay={2} />
      
      {/* Luz de relleno suave */}
      {/* @ts-ignore */}
      <hemisphereLight skyColor="#87CEEB" groundColor="#362d1d" intensity={0.4} />

      <Suspense fallback={null}>
        <RamenShopModel />
      </Suspense>
      
      <OrbitControls 
        target={[0, -0.5, 0]} 
        enablePan={false}
        enableRotate={true}
        enableZoom={true}
        rotateSpeed={1.2}
        zoomSpeed={0.8}
        minDistance={2} 
        maxDistance={8}
        minAzimuthAngle={-Math.PI * 0.3}
        maxAzimuthAngle={Math.PI * 0.3}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.7}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

export default function R3FScene() {
  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw', 
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
    >
      <Canvas
        camera={{ 
          position: [0, 1, 4], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        shadows
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 2.0,
          outputColorSpace: THREE.SRGBColorSpace
        }}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      >
        <Scene />
      </Canvas>
    </div>
  )
} 