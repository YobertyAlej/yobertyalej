'use client'

import { ThreeCanvas } from './ThreeCanvas'

interface ThreeSceneProps {
  children?: React.ReactNode
  className?: string
}

export function ThreeScene({ children, className = '' }: ThreeSceneProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <ThreeCanvas />
      {children && (
        <div className="relative z-10 pointer-events-none">
          {children}
        </div>
      )}
    </div>
  )
} 