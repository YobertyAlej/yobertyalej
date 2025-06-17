"use client"

import React from 'react'

interface HotspotData {
  id: string
  position: { x: string; y: string }
  title: string
  description: string
  isVisible: boolean
}

interface InteractiveHotspotsProps {
  view: string
  onViewChange: (view: string) => void
  hotspotPositions?: {
    arcade: {x: number, y: number, z: number}
    blueBox: {x: number, y: number, z: number}
    scale: number
    groupPosition: [number, number, number]
  } | null
}

export function InteractiveHotspots({ view, onViewChange, hotspotPositions }: InteractiveHotspotsProps) {
  // Función para convertir posiciones 3D a coordenadas 2D de pantalla
  const project3DTo2D = (pos3D: {x: number, y: number, z: number}) => {
    if (!hotspotPositions) return { x: '50%', y: '50%' }
    
    // Aplicar transformaciones de la escena (scale y groupPosition)
    const scaledX = pos3D.x * hotspotPositions.scale + hotspotPositions.groupPosition[0]
    const scaledY = pos3D.y * hotspotPositions.scale + hotspotPositions.groupPosition[1]
    const scaledZ = pos3D.z * hotspotPositions.scale + hotspotPositions.groupPosition[2]
    
    // Proyección simplificada a coordenadas de pantalla
    // Estas fórmulas proyectan la vista isométrica a coordenadas 2D
    const screenX = 50 + (scaledX - scaledZ) * 1.5  // Perspectiva isométrica
    const screenY = 50 - (scaledY + (scaledX + scaledZ) * 0.5) * 1.2  // Altura + profundidad
    
    // Limitar a valores razonables y convertir a porcentajes
    const clampedX = Math.max(10, Math.min(90, screenX))
    const clampedY = Math.max(10, Math.min(90, screenY))
    
    return { 
      x: `${clampedX}%`, 
      y: `${clampedY}%` 
    }
  }

  // Calcular posiciones dinámicamente basadas en las coordenadas 3D reales
  const hotspots: HotspotData[] = [
    {
      id: 'arcade',
      position: hotspotPositions ? project3DTo2D(hotspotPositions.arcade) : { x: '25%', y: '60%' },
      title: 'Arcade Machine',
      description: 'Juego Flood Fill desarrollado con IA',
      isVisible: view === 'default'
    },
    {
      id: 'blueBox',
      position: hotspotPositions ? project3DTo2D(hotspotPositions.blueBox) : { x: '75%', y: '70%' },
      title: 'About Me Screen',
      description: 'Mi historia profesional interactiva',
      isVisible: view === 'default'
    }
  ]

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {hotspots.map(hotspot => (
        hotspot.isVisible && (
          <div
            key={hotspot.id}
            className="absolute pointer-events-auto animate-pulse"
            style={{ 
              left: hotspot.position.x, 
              top: hotspot.position.y,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                onViewChange(hotspot.id)
              }}
              className="group relative"
              aria-label={`Ver ${hotspot.title}`}
            >
              {/* Punto pulsante principal */}
              <div className="w-6 h-6 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50 border-2 border-white/20 relative z-10" />
              
              {/* Anillo exterior animado */}
              <div className="absolute inset-0 w-6 h-6 bg-orange-400/30 rounded-full animate-ping" />
              
              {/* Tooltip mejorado */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100">
                <div className="bg-slate-900/95 backdrop-blur-sm rounded-lg p-3 min-w-[200px] border border-slate-700 shadow-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <h4 className="text-white font-medium text-sm">{hotspot.title}</h4>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{hotspot.description}</p>
                  <div className="mt-2 text-orange-400 text-xs font-medium">
                    Click para explorar →
                  </div>
                  
                  {/* Flecha del tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/95" />
                  </div>
                </div>
              </div>
            </button>
          </div>
        )
      ))}
    </div>
  )
} 