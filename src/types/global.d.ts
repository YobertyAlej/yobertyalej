import { extend, ReactThreeFiber } from '@react-three/fiber'
import { SpringValue, a } from '@react-spring/three'
import * as THREE from 'three'

// Extend the global namespace with Three.js elements
extend(THREE)

declare global {
  namespace JSX {
    interface IntrinsicElements extends ReactThreeFiber.IntrinsicElements {}
  }
}

// Fix for react-spring/three animated elements
declare module '@react-spring/three' {
  export interface AnimatedComponent<T = any> {
    group: any
    mesh: any
    points: any
    line: any
    lineSegments: any
    lineLoop: any
    sprite: any
  }
}

export {} 