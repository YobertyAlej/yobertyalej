// Main component
export { default as DeskScene } from './DeskScene'
export type { ViewState } from './DeskScene'

// Individual components
export { Level } from './components/Level'
export { Sudo } from './components/Sudo'
export { Camera } from './components/Camera'
export { Cactus } from './components/Cactus'
export { InteractiveBox } from './components/InteractiveBox'

// Hooks
export { useDeskModel } from './hooks/useDeskModel'

// Types
export * from './types/desk.types' 