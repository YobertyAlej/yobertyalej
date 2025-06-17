"use client"

import React from 'react'
import { Badge } from '../ui/Badge'

interface GuideItem {
  id: string
  title: string
  description: string
  icon: string
  controls: string[]
}

interface NavigationGuideProps {
  currentView: string
  onViewChange: (view: string) => void
}

export function NavigationGuide({ currentView, onViewChange }: NavigationGuideProps) {
  const guides: GuideItem[] = [
    {
      id: 'default',
      title: 'Vista General',
      description: 'Exploración libre del workspace',
      icon: '🏠',
      controls: ['Drag para rotar', 'Scroll para zoom']
    },
    {
      id: 'arcade',
      title: 'Arcade Machine',
      description: 'Juego Flood Fill desarrollado con IA',
      icon: '🎮',
      controls: ['Click para jugar', 'ESC para salir']
    },
    {
      id: 'blueBox',
      title: 'About Screen',
      description: 'Mi perfil profesional interactivo',
      icon: '👨‍💻',
      controls: ['Scroll para navegar', 'Click en enlaces']
    }
  ]

  return (
    <div className="hidden lg:block absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-30">
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-slate-700/50 max-w-xs shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
          <h3 className="text-white font-semibold text-sm">Navegación</h3>
        </div>
        
        <div className="space-y-3">
          {guides.map(guide => (
            <button
              key={guide.id}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                onViewChange(guide.id)
              }}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                currentView === guide.id 
                  ? 'bg-orange-500/20 border-orange-500/50 border shadow-lg' 
                  : 'hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{guide.icon}</span>
                <span className="text-white text-sm font-medium">{guide.title}</span>
                {currentView === guide.id && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full ml-auto animate-pulse" />
                )}
              </div>
              
              <p className="text-slate-400 text-xs mb-3 leading-relaxed">
                {guide.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {guide.controls.map((control, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs bg-slate-700/80 text-slate-300 border-slate-600"
                  >
                    {control}
                  </Badge>
                ))}
              </div>
            </button>
          ))}
        </div>
        
        {/* Footer del panel */}
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <p className="text-slate-500 text-xs text-center">
            Haz click para cambiar de vista
          </p>
        </div>
      </div>
    </div>
  )
} 