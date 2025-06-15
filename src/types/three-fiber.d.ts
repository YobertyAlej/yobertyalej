import { extend } from '@react-three/fiber'
import * as THREE from 'three'

// Extender React Three Fiber con los tipos de Three.js
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any
      mesh: any
      boxGeometry: any
      meshStandardMaterial: any
      ambientLight: any
      directionalLight: any
      pointLight: any
      spotLight: any
      perspectiveCamera: any
      orthographicCamera: any
    }
  }
}

export {} 