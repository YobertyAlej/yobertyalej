"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '../ui/Button'

interface TourStep {
  title: string
  description: string
  action: string
}

export function WelcomeTour() {
  const [isVisible, setIsVisible] = useState(false)
  const [step, setStep] = useState(0)

  // Verificar si es la primera visita
  useEffect(() => {
    const hasVisited = localStorage.getItem('portfolio-tour-completed')
    if (!hasVisited) {
      setIsVisible(true)
    }
  }, [])

  const tourSteps: TourStep[] = [
    {
      title: '¡Bienvenido a mi Workspace!',
      description: 'Este es un portfolio interactivo en 3D. Puedes explorar libremente mi espacio de trabajo digital.',
      action: 'Arrastra para rotar la vista'
    },
    {
      title: 'Elementos Interactivos',
      description: 'Busca los puntos naranjas brillantes dispersos por la escena para descubrir mis proyectos.',
      action: 'Haz click en los hotspots'
    },
    {
      title: 'Múltiples Vistas',
      description: 'Cada elemento te llevará a una experiencia específica: juegos, información profesional y más.',
      action: 'Usa el panel de navegación'
    }
  ]

  if (!isVisible) return null

  const isLastStep = step === tourSteps.length - 1

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl p-6 lg:p-8 max-w-md w-full border border-slate-700 shadow-2xl">
        <div className="text-center">
          {/* Header con icono */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">
                {step === 0 ? '👋' : step === 1 ? '✨' : '🚀'}
              </span>
            </div>
            
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
              {tourSteps[step].title}
            </h2>
            
            <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
              {tourSteps[step].description}
            </p>
          </div>

          {/* Acción sugerida */}
          <div className="mb-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <p className="text-orange-400 text-sm font-medium">
              💡 {tourSteps[step].action}
            </p>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-6">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === step 
                    ? 'bg-orange-500 w-6' 
                    : index < step 
                      ? 'bg-emerald-500' 
                      : 'bg-slate-600'
                }`}
              />
            ))}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                localStorage.setItem('portfolio-tour-completed', 'true')
                setIsVisible(false)
              }}
              className="text-slate-400 hover:text-slate-300 text-sm font-medium transition-colors"
            >
              Saltar tour
            </button>
            
            <div className="flex gap-2">
              {step > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setStep(step - 1)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  Anterior
                </Button>
              )}
              
              <Button 
                size="sm"
                onClick={() => {
                  if (isLastStep) {
                    localStorage.setItem('portfolio-tour-completed', 'true')
                    setIsVisible(false)
                  } else {
                    setStep(step + 1)
                  }
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                {isLastStep ? '¡Comenzar!' : 'Siguiente'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 