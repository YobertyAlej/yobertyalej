"use client"

import React from 'react'
import { Badge } from '../ui/Badge'

export function HeroOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Hero content en esquina superior izquierda - Solo desktop */}
      <div className="hidden lg:block absolute top-20 left-4 lg:left-8 max-w-sm lg:max-w-md pointer-events-auto">
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 lg:p-6 border border-slate-700/50 shadow-xl">
          <h1 className="text-xl lg:text-2xl font-bold text-white mb-2">
            Explora mi Workspace 3D
          </h1>
          <p className="text-slate-300 text-sm lg:text-base mb-4">
            Interactúa con los elementos para descubrir mis proyectos y experiencias
          </p>
          
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-orange-400 border-orange-400 text-xs">
                🖱️ Click & Drag para rotar
              </Badge>
              <Badge variant="outline" className="text-cyan-400 border-cyan-400 text-xs">
                🔍 Scroll para zoom
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-emerald-400 border-emerald-400 text-xs">
                ✨ Busca puntos naranjas
              </Badge>
            </div>
          </div>
          
          {/* Indicador de versión */}
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <p className="text-slate-400 text-xs">
              Portfolio v1.0.0 - AI Augmented Developer
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 