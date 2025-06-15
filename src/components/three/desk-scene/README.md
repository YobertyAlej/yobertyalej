# Desk Scene Module

## Overview
Este módulo implementa una escena 3D interactiva basada en el boilerplate Three.js Journey Level 1. Incluye animaciones, interactividad y efectos visuales avanzados.

## Estructura
```
desk-scene/
├── DeskScene.tsx          # Componente principal
├── components/            # Componentes individuales
│   ├── Level.tsx         # Geometría del nivel/escritorio
│   ├── Sudo.tsx          # Personaje con animación de cabeza
│   ├── Camera.tsx        # Cámara con rotación animada
│   ├── Cactus.tsx        # Cactus con efecto wobble
│   └── InteractiveBox.tsx # Caja interactiva hover/click
├── hooks/
│   └── useDeskModel.ts   # Hook para cargar modelo GLB
├── types/
│   └── desk.types.ts     # Definiciones TypeScript
└── index.ts              # Exportaciones del módulo
```

## Características

### 🎨 **Efectos Visuales**
- **Fisheye Effect**: Distorsión de lente de ojo de pez
- **Environment Mapping**: Preset "city" para reflejos
- **Animaciones Spring**: Movimientos orgánicos usando @react-spring/three

### 🎮 **Interactividad**
- **Hover Effects**: Cambios visuales al pasar el mouse
- **Click Interactions**: Elementos que responden a clicks
- **Rotación Automática**: Elementos que rotan continuamente

### 🏗️ **Arquitectura**
- **Componentes Modulares**: Cada elemento del escritorio es un componente separado
- **Hooks Personalizados**: `useDeskModel` para carga de modelos
- **TypeScript**: Tipado completo para mejor desarrollo
- **Lazy Loading**: Preload del modelo GLB para mejor performance

## Uso

### Básico
\`\`\`tsx
import { DeskScene } from '@/components/three/desk-scene'

export default function App() {
  return <DeskScene />
}
\`\`\`

### Componentes Individuales
\`\`\`tsx
import { Level, Sudo, Camera, Cactus, InteractiveBox } from '@/components/three/desk-scene'

export default function CustomScene() {
  return (
    <Canvas>
      <group scale={20} position={[5, -11, -5]}>
        <Level />
        <Sudo />
        <Camera />
        <Cactus />
        <InteractiveBox position={[-0.8, 1.4, 0.4]} scale={0.15} />
      </group>
    </Canvas>
  )
}
\`\`\`

## Dependencias
- `@react-three/fiber` - React renderer para Three.js
- `@react-three/drei` - Helpers y controles para R3F
- `@react-spring/three` - Animaciones spring para 3D
- `three` - Biblioteca 3D base

## Modelo 3D
- **Archivo**: `public/models/level-react-draco.glb`
- **Formato**: GLTF comprimido con Draco
- **Tamaño**: ~723KB
- **Objetos**: Level, Sudo, SudoHead, Camera, Camera_1, Cactus

## Performance
- **Preload**: El modelo se precarga para evitar delays
- **Optimización**: Usa geometrías compartidas cuando es posible
- **Memory Management**: Cleanup automático de recursos

## Integración
 