import * as THREE from 'three'

export interface DeskModelNodes {
  Level: THREE.Mesh
  Sudo: THREE.Mesh
  SudoHead: THREE.Mesh
  Camera: THREE.Mesh
  Camera_1: THREE.Mesh
  Cactus: THREE.Mesh
}

export interface DeskModelMaterials {
  Lens: THREE.Material
  Cactus: THREE.Material
}

export interface DeskGLTF {
  nodes: DeskModelNodes
  materials: DeskModelMaterials
}

export interface InteractiveBoxProps {
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export interface SpringConfig {
  friction: number
}

export interface RotationSpring {
  rotation: [number, number, number]
  config: SpringConfig
}

export interface RotationZSpring {
  'rotation-z': number
  config: SpringConfig
} 