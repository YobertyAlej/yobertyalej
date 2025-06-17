"use client"

import { useState, useCallback } from 'react'
import { DeskScene, ViewState } from '@/components/three/desk-scene'
import { 
  HeroOverlay, 
  InteractiveHotspots, 
  NavigationGuide, 
  WelcomeTour, 
  MobileGuide 
} from '@/components/home'
// import { HotspotDebug } from '@/components/debug/HotspotDebug' // Solo para desarrollo

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>('default')
  const [hotspotPositions, setHotspotPositions] = useState<{
    arcade: {x: number, y: number, z: number}
    blueBox: {x: number, y: number, z: number}
    scale: number
    groupPosition: [number, number, number]
  } | null>(null)

  const handleViewChange = useCallback((view: ViewState) => {
    setCurrentView(view)
  }, [])

  const handleHotspotPositions = useCallback((positions: any) => {
    setHotspotPositions(positions)
  }, [])

  return (
    <div className="relative w-full" style={{ backgroundColor: '#101828' }}>
      <DeskScene 
        currentView={currentView}
        onViewChange={handleViewChange}
        onHotspotPositions={handleHotspotPositions}
      />
      
      {/* Debug Panel desactivado para producción */}
      {/* {process.env.NODE_ENV === 'development' && (
        <HotspotDebug hotspotPositions={hotspotPositions} />
      )} */}
      
      {/* UI Overlays en vista general */}
      {currentView === 'default' && (
        <>
          <HeroOverlay />
          <InteractiveHotspots 
            view={currentView} 
            onViewChange={handleViewChange}
            hotspotPositions={hotspotPositions}
          />
          <NavigationGuide 
            currentView={currentView} 
            onViewChange={handleViewChange} 
          />
          <WelcomeTour />
        </>
      )}
      
      {/* Mobile Guide - Siempre disponible para navegación */}
      <MobileGuide 
        currentView={currentView} 
        onViewChange={handleViewChange} 
      />
    </div>
  );
}

function SkillCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg bg-white/3 backdrop-blur-sm border border-white/5 hover:bg-white/8 transition-all duration-300 cursor-pointer">
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
