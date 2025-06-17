"use client"

import React, { useState } from 'react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

interface MobileGuideProps {
  currentView: string
  onViewChange: (view: string) => void
}

export function MobileGuide({ currentView, onViewChange }: MobileGuideProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const viewOptions = [
    { id: 'default', label: '🏠 General', description: 'Vista completa' },
    { id: 'arcade', label: '🎮 Arcade', description: 'Juego IA' },
    { id: 'blueBox', label: '👨‍💻 About', description: 'Mi perfil' }
  ]

  return (
    <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
      {!isExpanded ? (
        /* Vista colapsada */
        <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-white font-medium text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                Explora mi workspace
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Toca y arrastra para navegar • {viewOptions.find(v => v.id === currentView)?.description}
              </p>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setIsExpanded(true)}
              className="border-slate-600 text-slate-300 hover:bg-slate-800 ml-3"
            >
              Cambiar Vista
            </Button>
          </div>
        </div>
      ) : (
        /* Vista expandida */
        <div className="bg-slate-900/95 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium text-sm">Cambiar Vista</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white text-sm p-1"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2">
            {viewOptions.map(option => (
              <button
                key={option.id}
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  onViewChange(option.id)
                  setIsExpanded(false)
                }}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  currentView === option.id
                    ? 'bg-orange-500/20 border border-orange-500/50'
                    : 'bg-slate-800/50 border border-transparent hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white text-sm font-medium">
                      {option.label}
                    </div>
                    <div className="text-slate-400 text-xs">
                      {option.description}
                    </div>
                  </div>
                  {currentView === option.id && (
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  )}
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-slate-700/50">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs bg-slate-700/80 text-slate-300">
                👆 Toca para navegar
              </Badge>
              <Badge variant="secondary" className="text-xs bg-slate-700/80 text-slate-300">
                🔍 Pellizca para zoom
              </Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 