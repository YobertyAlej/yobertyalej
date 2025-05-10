# VERSIONING.md

# Guía de Versionamiento Semántico para Portfolio Iterativo

Este documento describe la estrategia de versionamiento semántico utilizada en este proyecto de portfolio iterativo y experimental. Su propósito es establecer un enfoque estandarizado para el control de versiones, la creación de ramas, tags, y la nomenclatura de commits.

## 1. Estructura de Versionamiento Semántico

Nuestro proyecto sigue los estándares de SemVer con la estructura:

```
X.Y.Z-[pre-release]+[metadata]
```

Donde:
- **X (MAJOR)**: Cambios que transforman la arquitectura o experiencia del usuario
- **Y (MINOR)**: Nuevas funcionalidades manteniendo compatibilidad
- **Z (PATCH)**: Correcciones y mejoras incrementales
- **pre-release**: Etiquetas como alpha/beta/rc para versiones experimentales
- **metadata**: Información adicional como número de compilación o rama

### 1.1 Interpretación de versiones en nuestro contexto

| Versión | Significado |
|---------|-------------|
| 0.1.0 - 0.3.0 | Milestone 1: Fundación - MVP y estructura básica del portfolio |
| 1.0.0 | Milestone 2: Primer Release Público - Portfolio completo con diseño pulido |
| 1.1.0 - 2.0.0 | Milestone 3: AI Playground - Desde fundación hasta implementación completa |
| 1.3.0 - 3.0.0 | Milestone 4: Globalización - Sistema de internacionalización progresivo |

## 2. Estructura de Ramas

Utilizamos un modelo de Git Flow adaptado a nuestro proceso iterativo:

```
main              # Versiones estables publicadas (production-ready)
develop           # Integración de características (pre-producción)
feature/*         # Características en desarrollo
experiment/*      # Ideas experimentales que pueden o no integrarse
release/*         # Preparación de versiones para publicación
hotfix/*          # Correcciones urgentes sobre main
```

### 2.1 Flujo de trabajo con ramas

1. **Desarrollo de funcionalidades**:
   - Las nuevas funcionalidades se desarrollan en ramas `feature/*` desde `develop`
   - Una vez completadas, se fusionan de vuelta a `develop`

2. **Experimentación**:
   - Las ideas experimentales se desarrollan en ramas `experiment/*`
   - Si resultan exitosas, se integran a `develop`

3. **Preparación de versiones**:
   - Cuando `develop` contiene suficientes características para una versión, se crea una rama `release/vX.Y.Z`
   - Se realizan los últimos ajustes y correcciones en esta rama
   - Finalmente, se fusiona a `main` y se etiqueta con la versión correspondiente

4. **Correcciones urgentes**:
   - Las correcciones críticas se realizan en ramas `hotfix/*` desde `main`
   - Una vez completadas, se fusionan a `main` y a `develop`

## 3. Nomenclatura de Commits

Todos los commits deben seguir el formato de Conventional Commits adaptado para nuestro proyecto:

```
<tipo>(<ámbito>): <descripción corta>

[cuerpo opcional con más detalles]

[notas de pie opcionales]
```

### 3.1 Tipos de Commits

- **feat**: Nueva funcionalidad
- **fix**: Corrección de error
- **docs**: Cambios en documentación
- **style**: Cambios de formato, espaciado, etc. (no afectan código)
- **refactor**: Refactorización de código existente
- **perf**: Mejoras de rendimiento
- **test**: Añadir o corregir tests
- **chore**: Tareas de mantenimiento, gestión de paquetes
- **i18n**: Relacionado con internacionalización
- **ai**: Componentes relacionados con IA
- **exp**: Implementaciones experimentales e iterativas

### 3.2 Ámbitos Específicos

- **core**: Componentes fundamentales del portfolio
- **blog**: Sistema de blog
- **ui**: Interfaz de usuario y componentes
- **three**: Visualizaciones 3D
- **playground**: AI Playground
- **i18n**: Sistema de internacionalización

### 3.3 Ejemplos de Commits

```
feat(playground): añadir primera demo de IA conversacional
fix(i18n): corregir detección automática del idioma del navegador
docs(core): actualizar documentación de arquitectura
perf(three): optimizar renderizado de escena 3D para móviles
exp(i18n): implementar traducción en tiempo real con Claude
refactor(blog): migrar sistema de gestión de contenido a Contentlayer
chore(deps): actualizar dependencias de Three.js a v150
```

## 4. Gestión de Tags y Releases

### 4.1 Estrategia de Etiquetado

Para cada versión significativa, se crea una etiqueta siguiendo el patrón:

```
v[major].[minor].[patch]
```

Para pre-releases experimentales:
```
v[major].[minor].[patch]-[alpha/beta/rc][número]
```

### 4.2 Proceso de Release

1. Crear una rama `release/vX.Y.Z` desde `develop`
2. Realizar los últimos ajustes y correcciones
3. Actualizar el número de versión en archivos relevantes
4. Actualizar CHANGELOG.md
5. Fusionar con `main` usando `--no-ff`
6. Crear tag en `main`
7. Fusionar cambios de vuelta a `develop`

### 4.3 Ejemplos de Tags

```
v0.1.0        # MVP Fundacional
v0.2.0        # Showcase Técnico Básico
v0.3.0        # Fundación Blog
v1.0.0        # Release Público Inicial
v1.1.0-alpha1 # Experimento inicial del AI Playground
v1.1.0        # AI Playground Fundacional
v1.3.0-beta2  # Prueba de i18n con varios idiomas
v1.3.0        # i18n Fundacional
```

## 5. Enfoque Experimental e Iterativo

Nuestro proyecto sigue un enfoque de desarrollo iterativo donde:

1. **Cada versión aporta valor**: Incluso las versiones tempranas deben proporcionar utilidad
2. **El proceso es transparente**: El desarrollo mismo es parte del showcase
3. **Se prioriza la experimentación**: Las ramas `experiment/*` permiten probar ideas sin compromiso
4. **La integración es incremental**: Las funcionalidades exitosas se incorporan gradualmente
5. **La documentación evoluciona**: Este documento mismo se actualizará con el proyecto

### 5.1 Gestión de Experimentos

Para funcionalidades experimentales:

1. Crear rama `experiment/nombre-experimento` desde `develop`
2. Usar el tipo de commit `exp` para cambios experimentales
3. Documentar claramente el propósito y alcance del experimento
4. Evaluar resultados y decidir si se integra a `develop` o se descarta

## 6. Herramientas y Automatización

Para facilitar este flujo de trabajo, utilizamos:

1. **.cursor/rules/**: Reglas para asistir en la generación de mensajes de commit
2. **Changelog**: Para generar automáticamente el registro de cambios

## 7. Evaluación y Adaptación

Este sistema de versionamiento está sujeto a mejoras continuas. Se revisará y actualizará según evolucione el proyecto para asegurar que sigue cumpliendo con sus objetivos de claridad, trazabilidad y valor demostrativo.

---

*Este documento forma parte de la meta-documentación del proyecto, que busca transparentar el proceso de desarrollo como parte del valor demostrativo del portfolio.*