"use client"

import { DeskScene } from '@/components/three/desk-scene'

export default function Home() {
  return (
    <div className="relative w-full" style={{ backgroundColor: '#101828' }}>
      <DeskScene />
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
