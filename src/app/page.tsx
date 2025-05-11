export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h1 className="mb-6 text-4xl font-bold text-center sm:text-5xl md:text-6xl">
        Portfolio <span className="text-blue-500">Iterativo</span>
      </h1>

      <p className="max-w-2xl mb-8 text-lg text-center text-gray-600 dark:text-gray-300">
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

      <div className="mt-12">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Versión: 0.1.0 - Proyecto en desarrollo iterativo
        </p>
      </div>
    </div>
  );
}

function SkillCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg shadow-md dark:bg-gray-800 hover:shadow-lg transition-shadow">
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
