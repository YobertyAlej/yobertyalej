// @ts-nocheck
"use client"

import { useEffect } from 'react'
import { useSpring, a } from '@react-spring/three'
import { useDeskModel } from '../hooks/useDeskModel'

export function Camera() {
  const { nodes, materials } = useDeskModel()
  const [spring, api] = useSpring(() => ({ 
    'rotation-z': 0, 
    config: { friction: 40 } 
  }), [])
  
  useEffect(() => {
    let timeout: NodeJS.Timeout
    
    const wander = () => {
      api.start({ 'rotation-z': Math.random() })
      timeout = setTimeout(wander, (1 + Math.random() * 2) * 800)
    }
    
    wander()
    return () => clearTimeout(timeout)
  }, [api])
  
  return (
    <a.group 
      position={[-0.58, 0.83, -0.03]} 
      rotation={[Math.PI / 2, 0, 0.47]} 
      {...spring}
    >
      <mesh 
        geometry={(nodes as any).Camera.geometry} 
        material={(nodes as any).Camera.material} 
      />
      <mesh 
        geometry={(nodes as any).Camera_1.geometry} 
        material={(materials as any).Lens} 
      />
    </a.group>
  )
} 