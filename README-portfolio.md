# Portfolio Personal - Yoberty Alejandro 🚀

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&duration=3000&pause=1000&color=38B2AC&center=true&vCenter=true&random=false&width=600&lines=Interactive+3D+Portfolio;Next.js+%2B+TypeScript;Full+CI%2FCD+Pipeline;Zero-Downtime+Deployments" alt="Portfolio Typing SVG" />
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_14+-000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js"/>
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Digital_Ocean-0080FF?style=for-the-badge&logo=digitalocean&logoColor=white" alt="Digital Ocean"/>
  <img src="https://img.shields.io/badge/Terraform-623CE4?style=for-the-badge&logo=terraform&logoColor=white" alt="Terraform"/>
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions"/>
  <img src="https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=pm2&logoColor=white" alt="PM2"/>
</p>

Portfolio interactivo con experiencias 3D desarrollado con Next.js 14+, TypeScript y Three.js, featuring un pipeline CI/CD completo con GitHub Actions, Terraform y Digital Ocean.

## 🏗️ Arquitectura de Deployment

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│   GitHub Repo   │ -> │  GitHub Actions  │ -> │   Digital Ocean     │
│                 │    │                  │    │                     │
│ - Source Code   │    │ - Build & Test   │    │ - Ubuntu Droplet    │
│ - CI/CD Config  │    │ - Deploy         │    │ - PM2 Process Mgr   │
│ - Terraform     │    │ - Health Check   │    │ - Nginx Proxy       │
└─────────────────┘    └──────────────────┘    └─────────────────────┘
```

## 🚀 Características Principales

- **🎮 Experiencias 3D Inmersivas**: Three.js con React Three Fiber
- **⚡ Zero-Downtime Deployments**: PM2 con reload automático  
- **🏗️ Infraestructura como Código**: Terraform + Digital Ocean
- **🔄 CI/CD Automatizado**: Pipeline completo con GitHub Actions
- **📊 Monitoreo Integrado**: Health checks y alertas en tiempo real
- **🌐 Internacionalización**: Soporte multiidioma con next-intl
- **📱 Responsive Design**: Optimizado para todos los dispositivos

## 🛠️ Stack Tecnológico

### Frontend & 3D
- **Next.js 14+**: Framework React con App Router
- **TypeScript**: Tipado estático completo
- **Three.js + R3F**: Gráficos 3D interactivos
- **Framer Motion**: Animaciones fluidas
- **Tailwind CSS**: Estilos utilitarios

### DevOps & Infrastructure
- **Digital Ocean**: Ubuntu 22.04 Droplet
- **Terraform**: Infrastructure as Code
- **GitHub Actions**: CI/CD Pipeline automatizado
- **PM2**: Process manager con clustering
- **Nginx**: Reverse proxy + SSL (Let's Encrypt)

## 📊 Pipeline CI/CD Status

<div align="center">
  
[![Deploy to Production](https://github.com/yoberty/yobertyalej/actions/workflows/deploy.yml/badge.svg)](https://github.com/yoberty/yobertyalej/actions/workflows/deploy.yml)
[![Health Check](https://img.shields.io/website?down_color=red&down_message=offline&up_color=green&up_message=online&url=https%3A%2F%2Fyobertyalej.com)](https://yobertyalej.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org/)

</div>

## 🎯 Flujo de CI/CD

### 1. Pull Request → Validación 🔍
- ✅ **Type Check**: Verificación TypeScript
- ✅ **Linting**: ESLint + Prettier  
- ✅ **Build Test**: Compilación optimizada
- 📋 **Auto Comment**: Reporte en PR

### 2. Push to Main → Deployment 🚀
- 🏗️ **Production Build**: Next.js optimizado
- 📦 **Artifact Creation**: Tarball comprimido
- 🚀 **Zero-Downtime Deploy**: PM2 reload
- 🔍 **Health Verification**: Verificación automática
- 🧹 **Cleanup**: Limpieza de releases antiguos

### 3. Rollback (si necesario) ⚡
- 🔄 **Instant Rollback**: Cambio de symlink
- ✅ **Auto Verification**: Health check post-rollback

## 🏗️ Estructura del Proyecto

```
├── src/                    # Código fuente de la aplicación
│   ├── app/               # App Router (Next.js 14+)
│   ├── components/        # Componentes reutilizables
│   │   ├── three/         # Componentes 3D
│   │   └── ui/            # Componentes de interfaz
│   └── lib/               # Utilidades y configuraciones
├── scripts/               # Scripts de deployment
│   ├── setup-droplet.sh   # Configuración inicial del servidor
│   ├── deploy.sh          # Deployment con zero-downtime
│   └── rollback.sh        # Rollback rápido
├── tf/                    # Terraform configuration
│   ├── main.tf            # Recursos de infraestructura
│   ├── variables.tf       # Variables configurables
│   └── outputs.tf         # Outputs útiles
├── .github/workflows/     # GitHub Actions
│   └── deploy.yml         # Pipeline CI/CD completo
├── docs/                  # Documentación técnica
│   ├── DEPLOYMENT.md      # Guía completa de deployment
│   └── DO_TOKEN_SETUP.md  # Setup de Digital Ocean
└── ecosystem.config.js    # Configuración PM2
```

## 🚦 Quick Start

### Desarrollo Local
```bash
# Clonar repositorio
git clone https://github.com/yoberty/yobertyalej.git
cd yobertyalej

# Instalar dependencias
pnpm install

# Servidor de desarrollo
pnpm dev
```

### Deployment en Producción
Ver la [📖 Guía Completa de Deployment](docs/DEPLOYMENT.md)

## 📝 Scripts Disponibles

```bash
# Desarrollo
pnpm dev           # Servidor de desarrollo (puerto 3000)
pnpm build         # Build optimizado de producción
pnpm start         # Servidor de producción
pnpm lint          # Linting con ESLint
pnpm type-check    # Verificación de tipos TypeScript

# Deployment (en servidor)
./scripts/setup-droplet.sh      # Setup inicial del servidor
./scripts/deploy.sh             # Deployment manual
./scripts/rollback.sh --list    # Ver releases disponibles
./scripts/rollback.sh --previous # Rollback al anterior
```

## 🌐 URLs en Producción

- **🏠 Portfolio**: [https://yobertyalej.com](https://yobertyalej.com)
- **❤️ Health Check**: [https://yobertyalej.com/api/health](https://yobertyalej.com/api/health)
- **🔧 GitHub Actions**: [Ver Pipeline](https://github.com/yoberty/yobertyalej/actions)

## 🎮 Experiencias 3D Destacadas

### Escritorio Interactivo
- **Modelado Custom**: Diseñado en Blender
- **Interacciones Intuitivas**: Click, hover, navegación
- **Performance Optimized**: 60 FPS en dispositivos móviles
- **Responsive**: Adaptado a diferentes resoluciones

### Playground de IA
- **Demos Interactivas**: Casos de uso reales de LLMs
- **Visualizaciones 3D**: Representación de datos con Three.js
- **Integración AI**: OpenAI API + LangChain

## 📊 Monitoreo y Observabilidad

### Health Check API
Endpoint `/api/health` proporciona:
- ✅ Estado de aplicación y servicios
- 📊 Métricas de memoria y CPU  
- 🔢 Uptime y versión actual
- 🏗️ Información del build
- 🚀 Detalles del deployment

### Logging
```bash
# Logs en tiempo real
pm2 logs yobertyalej

# Logs detallados en servidor
tail -f /var/www/yobertyalej.com/shared/logs/out.log
tail -f /var/www/yobertyalej.com/shared/logs/err.log
```

## 🔐 Seguridad & Reliability

- ✅ **SSH Hardening**: Fail2ban + UFW firewall
- ✅ **HTTPS**: Let's Encrypt SSL automático
- ✅ **Environment Variables**: Gestión segura de secrets
- ✅ **GitHub Secrets**: CI/CD sin exposición de tokens
- ✅ **Automated Backups**: Snapshots de Digital Ocean
- ✅ **Zero-Downtime**: Deployments sin interrupción

## 🐛 Troubleshooting Rápido

### Deployment Issues
```bash
# Check deployment status
pm2 status

# View application logs
pm2 logs yobertyalej --lines 50

# Health check manual
curl https://yobertyalej.com/api/health

# Rollback if needed
./scripts/rollback.sh --previous
```

Ver [🔧 Guía Completa de Troubleshooting](docs/DEPLOYMENT.md#troubleshooting)

## 📚 Documentación Técnica

- 📖 [**Guía de Deployment**](docs/DEPLOYMENT.md) - Setup completo y troubleshooting
- 🔑 [**Digital Ocean Token Setup**](docs/DO_TOKEN_SETUP.md) - Configuración de API
- 🏗️ [**Arquitectura CI/CD**](docs/DEPLOYMENT.md#arquitectura-de-deployment) - Flujo detallado

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Para contribuir:

1. **Fork** el proyecto
2. **Branch**: `git checkout -b feature/YA-123/amazing-feature`  
3. **Commit**: `YA-123: feat(component): add amazing feature`
4. **Push**: `git push origin feature/YA-123/amazing-feature`
5. **Pull Request**: Descripción detallada

### Convenciones de Commits
```bash
YA-123: feat(ui): add new navigation component
YA-124: fix(api): resolve health check endpoint
YA-125: docs(deployment): update CI/CD guide
```

## 🎯 Roadmap

- [ ] **Migración Terraform Backend** → Digital Ocean Spaces
- [ ] **Monitoring Avanzado** → Prometheus + Grafana
- [ ] **Multi-environment** → Staging environment
- [ ] **Performance Metrics** → Core Web Vitals tracking
- [ ] **AI Features** → Enhanced playground integrations

## 💡 Inspirado por el Poder de los LLMs

Este proyecto demuestra cómo integro herramientas de IA en todo el ciclo de desarrollo:

- 🔍 **Planning**: Análisis de requerimientos con Claude
- 🎨 **Design**: Prototipado de componentes  
- 💻 **Development**: Pair programming con AI
- 🧪 **Testing**: Generación de test cases
- 📄 **Documentation**: Documentación clara y útil
- 🚀 **DevOps**: Automatización de deployment workflows

## 📞 Conectemos

<p align="center">
  <a href="https://yobertyalej.com"><img src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Portfolio"/></a>
  <a href="mailto:ai@yobertyalej.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/></a>
  <a href="https://www.linkedin.com/in/yobertyalej"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
  <a href="https://github.com/yoberty"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
</p>

<div align="center">
  <img src="https://komarev.com/ghpvc/?username=yoberty&color=brightgreen&style=for-the-badge" alt="Profile Views"/>
</div>

---

<p align="center">
  ⭐ Si encuentras este proyecto útil, ¡dale una estrella! ⭐<br/>
  🚀 <strong>Live Demo:</strong> <a href="https://yobertyalej.com">yobertyalej.com</a> 🚀
</p> 