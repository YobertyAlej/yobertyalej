"use client"

import React, { useEffect, useRef, useState } from 'react'
import { ViewState } from '@/components/three/desk-scene'

interface ViewStateDebugProps {
  currentView: ViewState
}

export function ViewStateDebug({ currentView }: ViewStateDebugProps) {
  const renderCount = useRef(0)
  const [mounted, setMounted] = useState(false)
  
  renderCount.current++

  useEffect(() => {
    setMounted(true)
    console.log(`🔍 ViewStateDebug: Render #${renderCount.current}, currentView: ${currentView}`)
  }, [currentView])

  // Evitar hydration mismatch
  if (!mounted) return null

  return (
    <div className="fixed top-4 left-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono">
      <div>Current View: <span className="text-orange-400">{currentView}</span></div>
      <div>Renders: <span className="text-cyan-400">{renderCount.current}</span></div>
    </div>
  )
} 