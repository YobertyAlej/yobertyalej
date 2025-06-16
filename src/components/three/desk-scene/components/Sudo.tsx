// @ts-nocheck
"use client"

import { useEffect } from 'react'
import * as THREE from 'three'
import { useSpring, a } from '@react-spring/three'
import { useDeskModel } from '../hooks/useDeskModel'

export function Sudo() {
  const { nodes } = useDeskModel()
  const [spring, api] = useSpring(() => ({ 
    rotation: [Math.PI / 2, 0, 0.29], 
    config: { friction: 40 } 
  }), [])
  
  useEffect(() => {
    let timeout: NodeJS.Timeout
    
    const wander = () => {
      api.start({ 
        rotation: [
          Math.PI / 2 + THREE.MathUtils.randFloatSpread(2) * 0.3, 
          0, 
          0.29 + THREE.MathUtils.randFloatSpread(2) * 0.2
        ] 
      })
      timeout = setTimeout(wander, (1 + Math.random() * 2) * 800)
    }
    
    wander()
    return () => clearTimeout(timeout)
  }, [api])
  
  return (
    <>
      <mesh 
        geometry={(nodes as any).Sudo.geometry} 
        material={(nodes as any).Sudo.material} 
        position={[0.68, 0.33, -0.67]} 
        rotation={[Math.PI / 2, 0, 0.29]} 
      />
      <a.mesh 
        geometry={(nodes as any).SudoHead.geometry} 
        material={(nodes as any).SudoHead.material} 
        position={[0.68, 0.33, -0.67]} 
        {...spring} 
      />
    </>
  )
} 