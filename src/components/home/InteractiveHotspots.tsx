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
}

export function InteractiveHotspots({ view, onViewChange }: InteractiveHotspotsProps) {
  const hotspots: HotspotData[] = [
    {
      id: 'arcade',
      position: { x: '25%', y: '60%' },
      title: 'Arcade Machine',
      description: 'Juego Flood Fill desarrollado con IA',
      isVisible: view === 'default'
    },
    {
      id: 'blueBox',
      position: { x: '75%', y: '70%' },
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