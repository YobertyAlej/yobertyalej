import { useGLTF } from '@react-three/drei'

// Precargar el modelo
useGLTF.preload('/models/level-react-draco.glb')

export function useDeskModel() {
  const { nodes, materials } = useGLTF('/models/level-react-draco.glb')
  return { nodes, materials }
} 