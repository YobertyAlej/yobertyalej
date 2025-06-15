import { ThreeCanvas } from '@/components/three/ThreeCanvas'
import R3FScene from '@/components/three/R3FScene'

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Three.js Background (vanilla) */}
      {/* <ThreeCanvas className="fixed inset-0 -z-10" /> */}
      {/* R3F Scene (react-three-fiber) */}
      <R3FScene />
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
