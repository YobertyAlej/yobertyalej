import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Mí - Portfolio Iterativo',
  description: 'Conozca más sobre mi experiencia, habilidades y enfoque como desarrollador de software',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Sobre Mí</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Quién Soy</h2>
        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          Soy un desarrollador de software apasionado por crear soluciones web modernas,
          escalables y con gran experiencia de usuario. Me especializo en
          tecnologías JavaScript/TypeScript, con enfoque en React y Next.js.
        </p>
        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          Creo en el desarrollo iterativo y el crecimiento constante. Este portfolio
          es una demostración viva de ese enfoque, evolucionando continuamente con
          nuevas funcionalidades y mejoras.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Habilidades Técnicas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Frontend</h3>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>React / Next.js</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
            </ul>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Backend</h3>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>Node.js</li>
              <li>tRPC</li>
              <li>Bases de datos SQL/NoSQL</li>
              <li>API RESTful</li>
            </ul>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Desarrollo Aumentado por IA</h3>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>Integración con LLMs</li>
              <li>Prompt engineering</li>
              <li>RAG (Retrieval Augmented Generation)</li>
              <li>Fine-tuning de modelos</li>
            </ul>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2">DevOps</h3>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>CI/CD</li>
              <li>Docker</li>
              <li>Vercel / Netlify</li>
              <li>Testing automatizado</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Enfoque</h2>
        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          Mi filosofía de desarrollo se centra en:
        </p>
        <ul className="list-disc pl-5 text-lg text-gray-700 dark:text-gray-300 mb-4">
          <li>Desarrollo iterativo y valor incremental</li>
          <li>Código limpio y mantenible</li>
          <li>Experiencia de usuario excepcional</li>
          <li>Aprendizaje continuo y adaptación</li>
          <li>Integración de IA para potenciar soluciones</li>
        </ul>
      </section>

      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        <p>Versión: 0.1.0 - Página en desarrollo iterativo</p>
      </div>
    </div>
  );
}