"use client"

import React from "react"
import Link from "next/link"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Brain,
  Code2,
  Search,
  GraduationCap,
  Rocket,
  Crown,
  MessageSquare,
  Layers,
  Settings,
  Code,
  TrendingUp,
  RefreshCw,
  Users,
  Sparkles,
  Calendar,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Copy,
  CheckCircle,
  ArrowRight,
  Zap,
} from "@/components/ui/Icons"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent } from "@/components/ui/Card"

interface TimelineNode {
  id: string
  era: string
  period: string
  title: string
  description: string
  technologies: string[]
  position: "left" | "right"
  status: "completed" | "current" | "future"
  icon: React.ReactNode
  color: string
  metrics?: {
    label: string
    value: string
  }[]
  quote?: string
  badge?: string
}

interface TechStackCard {
  category: string
  icon: React.ReactNode
  tools: string[]
  description: string
  proficiency: "expert" | "advanced" | "intermediate"
  color: string
}

const timelineData: TimelineNode[] = [
  {
    id: "5",
    era: "Leadership Vision",
    period: "2025+",
    title: "AI Tech Lead del Futuro",
    description:
      "Liderando equipos híbridos humano-IA hacia la innovación exponencial. Construyendo el futuro, una línea de código inteligente a la vez.",
    technologies: ["Team Leadership", "AI Strategy", "Innovation", "Mentoring", "Architecture"],
    position: "right",
    status: "future",
    icon: <Crown className="w-9 h-9" />,
    color: "purple",
    quote: "Liderando equipos híbridos humano-IA hacia la innovación exponencial",
    badge: "FUTURE VISION",
  },
  {
    id: "4",
    era: "AI Augmented Era",
    period: "2024-Presente",
    title: "AI Augmented Developer",
    description:
      "Cada línea de código potenciada por IA. Productividad y creatividad sin límites. Transformando la manera de construir software con inteligencia artificial.",
    technologies: ["Cursor", "Windsurf", "Claude", "ChatGPT-4", "Gemini", "Perplexity"],
    position: "left",
    status: "current",
    icon: <Rocket className="w-10 h-10" />,
    color: "gradient",
    metrics: [
      { label: "Velocidad", value: "5x faster" },
      { label: "Bugs", value: "-90%" },
      { label: "Documentación", value: "100%" },
    ],
    badge: "CURRENT FOCUS",
  },
  {
    id: "3",
    era: "Learning Acceleration",
    period: "2024 Q1-Q2",
    title: "Master AI4Devs 2024Q2",
    description:
      "Formación intensiva especializada en desarrollo aumentado por IA. Dominando las herramientas y metodologías que definen el futuro del desarrollo.",
    technologies: ["LangGraph", "LangChain", "Prompt Engineering", "RAG Systems", "AI Testing"],
    position: "right",
    status: "completed",
    icon: <GraduationCap className="w-8 h-8" />,
    color: "emerald",
    metrics: [
      { label: "Ranking", value: "Top 5%" },
      { label: "Proyectos IA", value: "15+" },
    ],
    badge: "CERTIFICATION",
  },
  {
    id: "2",
    era: "Discovery Phase",
    period: "2022-2023",
    title: "Descubriendo el Potencial de la IA",
    description:
      'Primeros experimentos con ChatGPT y GitHub Copilot. El momento "eureka" que cambió completamente mi perspectiva sobre el desarrollo de software.',
    technologies: ["ChatGPT", "GitHub Copilot", "OpenAI API", "Prompt Engineering"],
    position: "left",
    status: "completed",
    icon: <Search className="w-8 h-8" />,
    color: "cyan",
    quote: "La IA no reemplaza al developer, lo potencia exponencialmente",
    metrics: [
      { label: "Productividad", value: "+300%" },
      { label: "Calidad", value: "+150%" },
    ],
    badge: "BREAKTHROUGH",
  },
  {
    id: "1",
    era: "Foundation Era",
    period: "2018-2021",
    title: "Senior Full Stack Engineer",
    description:
      "Desarrollando aplicaciones web escalables con React, Node.js y bases de datos robustas. Construyendo los fundamentos sólidos que serían la base de mi transformación.",
    technologies: ["React", "Node.js", "PostgreSQL", "MongoDB", "Express", "Docker"],
    position: "right",
    status: "completed",
    icon: <Code2 className="w-8 h-8" />,
    color: "orange",
    metrics: [
      { label: "Proyectos", value: "25+" },
      { label: "Tecnologías", value: "15+" },
    ],
  },
]

const techStackData: TechStackCard[] = [
  {
    category: "Entorno de Desarrollo Aumentado",
    icon: <Brain className="w-8 h-8 text-orange-400" />,
    tools: ["Cursor", "GitHub Copilot", "Windsurf", "Tabnine"],
    description: "Convierto mi IDE en un copiloto inteligente para acelerar drásticamente el ciclo de desarrollo.",
    proficiency: "expert",
    color: "orange",
  },
  {
    category: "Modelos de Lenguaje y APIs",
    icon: <MessageSquare className="w-8 h-8 text-cyan-400" />,
    tools: ["Claude 3.5", "ChatGPT-4o", "Gemini 1.5 Pro", "Perplexity"],
    description: "Dominio de LLMs para razonamiento complejo, generación de código y solución avanzada de problemas.",
    proficiency: "expert",
    color: "cyan",
  },
  {
    category: "Orquestación de Flujos de IA",
    icon: <Layers className="w-8 h-8 text-emerald-400" />,
    tools: ["LangGraph", "LangChain", "Vercel AI SDK", "Assistants API"],
    description: "Construcción de sistemas de IA complejos, agentes autónomos y flujos de trabajo RAG optimizados.",
    proficiency: "advanced",
    color: "emerald",
  },
  {
    category: "DevOps y MLOps Inteligente",
    icon: <Settings className="w-8 h-8 text-purple-400" />,
    tools: ["GitHub Actions", "Agentes de Testing", "Terraform", "Datadog"],
    description: "Automatización del ciclo de vida del software, desde la infraestructura hasta el despliegue y monitoreo.",
    proficiency: "advanced",
    color: "purple",
  },
  {
    category: "Fundamento Full-Stack Potenciado",
    icon: <Code className="w-8 h-8 text-slate-400" />,
    tools: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
    description: "Stack tecnológico robusto y escalable, sobrealimentado con capacidades de IA en cada capa.",
    proficiency: "expert",
    color: "slate",
  },
]

const philosophyData = [
  {
    title: "Inteligencia Aumentada",
    icon: <TrendingUp className="w-6 h-6" />,
    quote: "La IA no es un reemplazo, es el máximo multiplicador de la capacidad humana. Mi rol es ser el director de esta orquesta.",
    example: "Aplicando IA para transformar un concepto en un prototipo funcional en horas, no semanas.",
    color: "orange",
  },
  {
    title: "Sistemas, no Metas",
    icon: <RefreshCw className="w-6 h-6" />,
    quote: "Creo sistemas de desarrollo donde la IA y el humano colaboran en un ciclo de feedback continuo y virtuoso.",
    example: "Generación de tests por IA → Refactorización asistida → Validación humana → Despliegue automatizado.",
    color: "cyan",
  },
  {
    title: "El Developer 10x es un Equipo",
    icon: <Users className="w-6 h-6" />,
    quote: "Un desarrollador con las herramientas de IA correctas puede alcanzar la productividad de un equipo completo.",
    example: "Liderando equipos donde la IA se encarga del 80% del código, liberando a los humanos para la innovación.",
    color: "emerald",
  },
  {
    title: "Calidad y Velocidad Sin Compromiso",
    icon: <Sparkles className="w-6 h-6" />,
    quote: "La velocidad que nos da la IA es una oportunidad para elevar la calidad, no para acumular deuda técnica.",
    example: "Uso de agentes de IA para refactorización automática y mantenimiento proactivo del código base.",
    color: "purple",
  },
]

export default function AboutPage() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [visibleNodes, setVisibleNodes] = useState<string[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const nodeId = entry.target.getAttribute("data-node-id")
            if (nodeId && !visibleNodes.includes(nodeId)) {
              setVisibleNodes((prev) => [...prev, nodeId])
            }
          }
        })
      },
      { 
        threshold: 0.3,
        rootMargin: "50px"
      }
    )

    const nodes = document.querySelectorAll("[data-node-id]")
    nodes.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [visibleNodes])

  const copyEmail = async () => {
    await navigator.clipboard.writeText("ai@yobertyalej.com")
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const getNodeColor = (color: string, opacity = "500") => {
    const colors = {
      orange: `border-orange-${opacity}`,
      cyan: `border-cyan-${opacity}`,
      emerald: `border-emerald-${opacity}`,
      gradient: "border-gradient-to-r from-orange-500 to-cyan-400",
      purple: `border-purple-${opacity}`,
      slate: `border-slate-${opacity}`,
    }
    return colors[color as keyof typeof colors] || colors.orange
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section - NUEVA IMPLEMENTACIÓN RESPONSIVE */}
      <section className="min-h-screen flex items-center relative overflow-hidden py-8 sm:py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Mobile-First Layout: Flex column en móvil, Grid en desktop */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* CONTENT SECTION - Prioridad en móvil */}
            <div className="order-2 lg:order-1 text-center lg:text-left space-y-6 lg:space-y-8 w-full">
              <div className="space-y-4">
                <Badge 
                  variant="outline" 
                  className="text-orange-400 border-orange-400 text-xs sm:text-sm tracking-wide inline-flex"
                >
                  AI Augmented Developer & Tech Lead
                </Badge>
                
                {/* Typography Fluida - Responsive Text Sizing */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight">
                  Yoberty Alejandro:{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
                    Transformando Código
                  </span>{" "}
                  en Soluciones{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    Inteligentes
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Mi journey desde Senior Full Stack hasta liderar equipos en la era de la IA. Donde cada línea de
                  código se potencia con inteligencia artificial para crear soluciones innovadoras.
                </p>
              </div>

              {/* CTAs - Touch Optimized */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="#journey">
                  <Button
                    size="lg"
                    className="min-h-[48px] bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                  >
                    Ver Mi Journey
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="min-h-[48px] border-slate-600 text-slate-300 hover:bg-slate-800 font-semibold"
                  >
                    Conectar
                  </Button>
                </Link>
              </div>

              {/* Stats - Siempre visibles en viewport */}
              <div className="flex items-center justify-center lg:justify-start gap-6 sm:gap-8 pt-4">
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-400">6+</div>
                  <div className="text-xs sm:text-sm text-slate-400">Años</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-400">50+</div>
                  <div className="text-xs sm:text-sm text-slate-400">Proyectos</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-400">AI4Devs</div>
                  <div className="text-xs sm:text-sm text-slate-400">Certified</div>
                </div>
              </div>
            </div>

            {/* AVATAR SECTION - Responsive Sizing */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-cyan-400/20 rounded-2xl blur-3xl" />
                <Image
                  src="/profile.jpg"
                  alt="Yoberty Alejandro - AI Augmented Developer"
                  fill
                  className="relative z-10 rounded-2xl ring-4 ring-orange-500/50 object-cover"
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 320px"
                  priority
                />

                {/* Floating badges - Responsive */}
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 animate-bounce">
                  <Badge className="bg-orange-500 text-white text-xs">
                    <Brain className="w-4 h-4 mr-1" />
                    AI Expert
                  </Badge>
                </div>
                <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 animate-pulse">
                  <Badge className="bg-cyan-500 text-white text-xs">
                    <Zap className="w-4 h-4 mr-1" />
                    5x Faster
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - RESPONSIVE DUAL VIEW */}
      <section id="journey" className="py-16 lg:py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
              Mi Journey de{" "}
              <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
                Transformación
              </span>
            </h2>
            <p className="text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto">
              La evolución de un desarrollador tradicional hacia un líder en la era de la IA
            </p>
          </div>

          {/* MOBILE TIMELINE - NORMALIZACIÓN COMPLETA */}
          <div className="md:hidden space-y-6">
            {timelineData.map((node) => (
              <Card
                key={node.id}
                className="bg-slate-800/80 border-slate-700 w-full max-w-full"
              >
                <CardContent className="p-0">
                  <div className="p-4 flex flex-col min-h-[320px]">
                    {/* PERIOD BADGE - Posicionamiento superior */}
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="bg-slate-700 text-slate-300 text-xs px-2 py-1">
                        {node.period}
                      </Badge>
                      {node.badge && (
                        <Badge className={`flex-shrink-0 ${
                          node.badge === "CURRENT FOCUS"
                            ? "bg-gradient-to-r from-orange-500 to-cyan-400"
                            : node.badge === "BREAKTHROUGH"
                              ? "bg-cyan-500"
                              : node.badge === "CERTIFICATION"
                                ? "bg-emerald-500"
                                : "bg-purple-500"
                        } text-white text-xs px-2 py-1`}>
                          {node.badge}
                        </Badge>
                      )}
                    </div>

                    {/* HEADER SECTION - Icono y título */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`p-2 rounded-full flex-shrink-0 [&>*]:w-5 [&>*]:h-5 ${
                        node.color === "gradient"
                          ? "bg-gradient-to-r from-orange-500 to-cyan-400"
                          : `bg-${node.color}-500/20`
                      }`}>
                        <div className={node.color === "gradient" ? "text-white" : `text-${node.color}-400`}>
                          {node.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2">
                          {node.title}
                        </h3>
                      </div>
                    </div>

                    {/* CONTENT SECTION - Expandible */}
                    <div className="flex-1 space-y-4">
                      {/* Descripción normalizada - Más líneas para móvil */}
                      <p className="text-sm text-slate-300 leading-relaxed line-clamp-5">
                        {node.description}
                      </p>

                      {/* Quote section - Altura reservada */}
                      <div className="min-h-[50px] flex items-start">
                        {node.quote ? (
                          <blockquote className="border-l-4 border-orange-500 pl-3 italic text-slate-300 text-sm line-clamp-2">
                            "{node.quote}"
                          </blockquote>
                        ) : (
                          <div className="h-0"></div>
                        )}
                      </div>

                      {/* Tecnologías - Altura fija */}
                      <div className="min-h-[40px] flex flex-wrap gap-2 items-start">
                        {node.technologies.slice(0, 5).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs px-2 py-1 bg-slate-700 text-slate-200">
                            {tech}
                          </Badge>
                        ))}
                        {node.technologies.length > 5 && (
                          <Badge variant="secondary" className="text-xs px-2 py-1 bg-slate-700 text-slate-200">
                            +{node.technologies.length - 5}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* FOOTER SECTION - Altura fija reservada */}
                    <div className="mt-auto pt-4 border-t border-slate-700 min-h-[64px] flex items-center">
                      {node.metrics ? (
                        <div className="grid grid-cols-2 gap-4 w-full">
                          {node.metrics.slice(0, 2).map((metric) => (
                            <div key={metric.label} className="text-center">
                              <div className={`text-base font-bold text-${node.color}-400`}>{metric.value}</div>
                              <div className="text-xs text-slate-400">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="w-full text-center">
                          <div className="text-sm text-slate-500">• • •</div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* DESKTOP TIMELINE - LAYOUT NORMALIZADO */}
          <div className="hidden md:block relative max-w-6xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 via-cyan-400 to-purple-500" />

            {timelineData.map((node) => (
              <div
                key={node.id}
                data-node-id={node.id}
                className={`relative mb-20 ${
                  node.position === "left" 
                    ? "md:pr-8 lg:pr-12 md:text-right flex justify-end" 
                    : "md:pl-8 lg:pl-12 md:ml-8 flex justify-start"
                }`}
              >
                {/* Timeline node */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 ${
                    node.status === "current" ? "w-20 h-20" : "w-16 h-16"
                  } ${
                    node.color === "gradient"
                      ? "bg-gradient-to-r from-orange-500 to-cyan-400"
                      : `bg-slate-700 border-4 ${getNodeColor(node.color)}`
                  } rounded-full flex items-center justify-center z-10 ${
                    visibleNodes.includes(node.id) ? "animate-pulse" : ""
                  }`}
                >
                  <div className={`[&>*]:w-8 [&>*]:h-8 lg:[&>*]:w-10 lg:[&>*]:h-10 ${
                    node.color === "gradient" ? "text-white" : `text-${node.color}-400`
                  }`}>
                    {node.icon}
                  </div>
                </div>

                {/* Timeline card - ESTRUCTURA NORMALIZADA */}
                <Card className={`w-full max-w-md bg-slate-800/80 backdrop-blur-sm border-slate-700 hover:border-${node.color}-500/50 transition-all duration-300 hover:scale-105 ${
                  visibleNodes.includes(node.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } transition-all duration-700`}>
                  <CardContent className="p-0">
                    <div className="p-6 flex flex-col min-h-[300px] lg:min-h-[320px]">
                      
                      {/* PERIOD HEADER - Diseño mejorado */}
                      <div className="flex items-start justify-between mb-5 -mt-1">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            node.color === "gradient"
                              ? "bg-gradient-to-r from-orange-500 to-cyan-400"
                              : `bg-${node.color}-400`
                          }`} />
                          <Badge 
                            variant="outline" 
                            className={`border-${node.color === "gradient" ? "orange" : node.color}-400 text-${node.color === "gradient" ? "orange" : node.color}-400 bg-${node.color === "gradient" ? "orange" : node.color}-500/10 px-3 py-1.5 text-sm font-medium`}
                          >
                            {node.period}
                          </Badge>
                        </div>
                        {node.badge && (
                          <Badge className={`${
                            node.badge === "CURRENT FOCUS"
                              ? "bg-gradient-to-r from-orange-500 to-cyan-400 animate-pulse"
                              : node.badge === "BREAKTHROUGH"
                                ? "bg-cyan-500 animate-bounce"
                                : node.badge === "CERTIFICATION"
                                  ? "bg-emerald-500"
                                  : "bg-purple-500 animate-pulse"
                          } text-white text-xs px-3 py-1.5 font-medium`}>
                            {node.badge}
                          </Badge>
                        )}
                      </div>

                      {/* TITLE & DESCRIPTION - Expandible pero limitado */}
                      <div className="mb-5">
                        <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3 line-clamp-2 leading-tight">
                          {node.title}
                        </h3>
                        <p className="text-slate-300 leading-relaxed line-clamp-4 text-base">
                          {node.description}
                        </p>
                      </div>

                      {/* QUOTE SECTION - Altura reservada */}
                      <div className="min-h-[70px] mb-5 flex items-start">
                        {node.quote ? (
                          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-slate-300 text-base leading-relaxed">
                            "{node.quote}"
                          </blockquote>
                        ) : (
                          <div className="h-0"></div>
                        )}
                      </div>

                      {/* TECHNOLOGIES - Altura controlada */}
                      <div className="mb-5 min-h-[64px]">
                        <div className="flex flex-wrap gap-2">
                          {node.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="text-sm bg-slate-700/80 text-slate-200 border-slate-600 px-3 py-1.5 hover:bg-slate-600 transition-colors"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* METRICS FOOTER - Altura fija */}
                      <div className="mt-auto pt-5 border-t border-slate-700/50 min-h-[84px] flex items-center">
                        {node.metrics ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
                            {node.metrics.map((metric) => (
                              <div key={metric.label} className="text-center">
                                <div className={`text-xl lg:text-2xl font-bold text-${node.color}-400 mb-1`}>
                                  {metric.value}
                                </div>
                                <div className="text-sm text-slate-400 font-medium">{metric.label}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="w-full text-center">
                            <div className="flex items-center justify-center h-8">
                              <span className="text-slate-500 text-lg">• • •</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Arsenal Section - RESPONSIVE MEJORADO */}
      <section className="py-16 lg:py-24 bg-slate-900">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Mi Arsenal Tecnológico{" "}
              <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">Actual</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Las herramientas que potencian mi desarrollo diario en la era de la IA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {techStackData.map((stack) => (
              <Card
                key={stack.category}
                className="group bg-slate-800/80 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-800/90"
              >
                <CardContent className="p-0">
                  <div className="p-6 flex flex-col min-h-[300px] lg:min-h-[320px]">
                    
                    {/* HEADER SECTION - Icono y título */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`p-3 rounded-xl bg-${stack.color}-500/20 group-hover:scale-110 transition-transform duration-300 flex-shrink-0 [&>*]:w-6 [&>*]:h-6 lg:[&>*]:w-7 lg:[&>*]:h-7`}>
                        <div className={`text-${stack.color}-400`}>
                          {stack.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-base lg:text-lg leading-tight line-clamp-2">
                          {stack.category}
                        </h3>
                      </div>
                    </div>

                    {/* CONTENT SECTION - Expandible */}
                    <div className="flex-1 space-y-4">
                      {/* Descripción */}
                      <p className="text-sm lg:text-base text-slate-300 leading-relaxed line-clamp-3">
                        {stack.description}
                      </p>

                      {/* Herramientas - Altura controlada */}
                      <div className="min-h-[80px] flex flex-wrap gap-2 items-start">
                        {stack.tools.map((tool) => (
                          <Badge 
                            key={tool} 
                            variant="secondary" 
                            className="text-sm bg-slate-700/80 text-slate-200 border-slate-600 px-3 py-1.5 hover:bg-slate-600 transition-colors"
                          >
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* FOOTER SECTION - Altura fija */}
                    <div className="mt-auto pt-5 border-t border-slate-700/50 min-h-[52px] flex items-center">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-400">Nivel:</span>
                          <span className={`text-sm font-semibold text-${stack.color}-400`}>
                            {stack.proficiency === "expert" ? "Experto" : stack.proficiency === "advanced" ? "Avanzado" : "Intermedio"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className={`w-5 h-2 rounded-full transition-colors ${stack.proficiency === 'intermediate' || stack.proficiency === 'advanced' || stack.proficiency === 'expert' ? `bg-${stack.color}-400` : 'bg-slate-600'}`} />
                          <div className={`w-5 h-2 rounded-full transition-colors ${stack.proficiency === 'advanced' || stack.proficiency === 'expert' ? `bg-${stack.color}-400` : 'bg-slate-600'}`} />
                          <div className={`w-5 h-2 rounded-full transition-colors ${stack.proficiency === 'expert' ? `bg-${stack.color}-400` : 'bg-slate-600'}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section - SPACING MEJORADO */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Mi Filosofía de{" "}
              <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
                Desarrollo
              </span>
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">Principios que guían mi trabajo en la era de la IA</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {philosophyData.map((philosophy) => (
              <Card
                key={philosophy.title}
                className="bg-slate-800/80 backdrop-blur-sm border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-[1.02]"
              >
                <CardContent className="p-0">
                  <div className="p-6 flex flex-col min-h-[240px]">
                    
                    {/* HEADER SECTION - Icono y título */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`p-3 rounded-xl bg-${philosophy.color}-500/20 flex-shrink-0 [&>*]:w-6 [&>*]:h-6`}>
                        <div className={`text-${philosophy.color}-400`}>{philosophy.icon}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-base lg:text-lg leading-tight line-clamp-2">
                          {philosophy.title}
                        </h3>
                      </div>
                    </div>

                    {/* CONTENT SECTION - Expandible */}
                    <div className="flex-1 space-y-4">
                      {/* Quote principal */}
                      <blockquote className="text-slate-300 italic text-base lg:text-lg leading-relaxed border-l-4 border-orange-500 pl-4 line-clamp-3">
                        "{philosophy.quote}"
                      </blockquote>

                      {/* Ejemplo/descripción */}
                      <p className="text-sm lg:text-base text-slate-400 leading-relaxed line-clamp-2">
                        {philosophy.example}
                      </p>
                    </div>

                    {/* FOOTER VISUAL - Altura fija */}
                    <div className="mt-auto pt-4 min-h-[20px] flex items-center justify-end">
                      <div className={`w-8 h-1 rounded-full bg-gradient-to-r from-${philosophy.color}-500 to-${philosophy.color}-400`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - RESPONSIVE MEJORADO */}
      <section id="contact" className="py-16 lg:py-24 bg-gradient-to-r from-orange-500 to-cyan-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 lg:px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-4 lg:space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              ¿Listo para Revolucionar tu Desarrollo?
            </h2>
            <p className="text-lg lg:text-xl text-white/90">
              Conectemos y construyamos el futuro de la tecnología juntos
            </p>

            <div className="flex justify-center">
              <Link href="mailto:ai@yobertyalej.com">
                <Button size="lg" className="min-h-[48px] bg-orange-500 text-slate-900 hover:bg-orange-400 font-semibold">
                  <Calendar className="mr-2 w-4 h-4" />
                  Charlemos sobre IA
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4 lg:gap-6 pt-4">
              <Link href="https://linkedin.com/in/yobertyalej" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="https://github.com/yobertyalej" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
                  <Github className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="https://twitter.com/yobertyalej" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
                  <Twitter className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="pt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={copyEmail} 
                className="text-white hover:bg-white/10 gap-2 min-h-[40px] cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                ai@yobertyalej.com
                {copiedEmail ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
