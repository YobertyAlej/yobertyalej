import { extend } from '@react-three/fiber'
import * as THREE from 'three'

// Extend React Three Fiber with all Three.js objects
extend(THREE)

// This ensures all Three.js primitives are available as JSX elements
export {} 