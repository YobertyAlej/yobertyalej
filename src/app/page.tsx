import { ThreeCanvas } from '@/components/three/ThreeCanvas'

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Three.js Background */}
      <ThreeCanvas className="fixed inset-0 -z-10" />
      
      {/* UI Content con glassmorphism */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-16">
        {/* <div className="bg-white/5 dark:bg-gray-900/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 max-w-4xl mx-auto">
          <h1 className="mb-6 text-4xl font-bold text-center sm:text-5xl md:text-6xl">
            Portfolio <span className="text-blue-500">Iterativo</span>
          </h1>
          
          <p className="max-w-2xl mb-8 text-lg text-center text-gray-700 dark:text-gray-300 mx-auto">
            Desarrollador de software especializado en aplicaciones web modernas con experiencia en Next.js,
            React y arquitecturas potenciadas por IA.
          </p>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SkillCard
              title="Desarrollo Frontend"
              description="Especializado en React, TypeScript y Next.js"
            />
            <SkillCard
              title="Integración con IA"
              description="Implementación de soluciones aumentadas con LLMs"
            />
            <SkillCard
              title="Arquitectura Escalable"
              description="Diseño de sistemas robustos y adaptables"
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Versión: 1.0.0 - Proyecto con experiencias 3D
            </p>
            <p className="text-xs text-cyan-400 mt-2 animate-pulse">
              🎮 ¡Controles activos! Arrastra para rotar • Rueda para zoom • F12 → Console → unlockCamera()
            </p>
          </div>
        </div> */}
      </div>
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
