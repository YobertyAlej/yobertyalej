"use client"

import React, { useState, useEffect } from 'react'

interface HotspotDebugProps {
  hotspotPositions?: {
    arcade: {x: number, y: number, z: number}
    blueBox: {x: number, y: number, z: number}
    scale: number
    groupPosition: [number, number, number]
  } | null
}

export function HotspotDebug({ hotspotPositions }: HotspotDebugProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !hotspotPositions) return null

  return (
    <div className="fixed top-16 left-4 z-50 bg-black/90 text-white p-3 rounded-lg text-xs font-mono max-w-xs">
      <div className="text-orange-400 font-bold mb-2">Hotspot Positions Debug</div>
      
      <div className="mb-2">
        <div className="text-cyan-400">Arcade (3D):</div>
        <div>x: {hotspotPositions.arcade.x.toFixed(3)}</div>
        <div>y: {hotspotPositions.arcade.y.toFixed(3)}</div>
        <div>z: {hotspotPositions.arcade.z.toFixed(3)}</div>
      </div>
      
      <div className="mb-2">
        <div className="text-emerald-400">BlueBox (3D):</div>
        <div>x: {hotspotPositions.blueBox.x.toFixed(3)}</div>
        <div>y: {hotspotPositions.blueBox.y.toFixed(3)}</div>
        <div>z: {hotspotPositions.blueBox.z.toFixed(3)}</div>
      </div>
      
      <div className="mb-2">
        <div className="text-yellow-400">Scene:</div>
        <div>Scale: {hotspotPositions.scale}</div>
        <div>Pos: [{hotspotPositions.groupPosition.join(', ')}]</div>
      </div>
    </div>
  )
} 