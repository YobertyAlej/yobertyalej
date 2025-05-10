# VERSIONING.md

# Guía de Versionamiento Semántico para Portfolio Iterativo con JIRA

Este documento describe la estrategia de versionamiento semántico utilizada en este proyecto de portfolio iterativo y experimental. Su propósito es establecer un enfoque estandarizado para el control de versiones, la creación de ramas, tags, y la nomenclatura de commits integrado con JIRA.

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

## 2. Estructura de Ramas con JIRA

Utilizamos un modelo de Git Flow adaptado a nuestro proceso iterativo e integrado con JIRA:

```
main # Versiones estables publicadas (production-ready)
develop # Integración de características (pre-producción)
feature/YA-<número>/descripcion # Características en desarrollo vinculadas a tickets JIRA
experiment/YA-<número>/descripcion # Ideas experimentales vinculadas a tickets JIRA
release/vX.Y.Z # Preparación de versiones para publicación
hotfix/YA-<número>/descripcion # Correcciones urgentes vinculadas a tickets JIRA
```

### 2.1 Flujo de trabajo con ramas y JIRA

1. **Desarrollo de funcionalidades**:
   - Crear rama `feature/YA-<número>/descripcion` desde `develop` para el ticket asignado
   - Una vez completada, fusionar de vuelta a `develop`
   - JIRA rastreará automáticamente los commits asociados al ticket

2. **Experimentación**:
   - Desarrollar ideas experimentales en ramas `experiment/YA-<número>/descripcion`
   - Si resultan exitosas, integrar a `develop`

3. **Preparación de versiones**:
   - Cuando `develop` contiene suficientes características para una versión, crear rama `release/vX.Y.Z`
   - Realizar los últimos ajustes y correcciones en esta rama
   - Finalmente, fusionar a `main` y etiquetar con la versión correspondiente

4. **Correcciones urgentes**:
   - Realizar correcciones críticas en ramas `hotfix/YA-<número>/descripcion` desde `main`
   - Una vez completadas, fusionar a `main` y a `develop`

## 3. Nomenclatura de Commits con JIRA

Todos los commits deben seguir el formato de Conventional Commits adaptado para integración con JIRA:

```
YA-<número> - <tipo>(<ámbito>): <descripción corta>

[cuerpo opcional con más detalles]

[notas de pie opcionales]
```

Donde `YA-<número>` es el identificador del ticket en JIRA (ej: YA-5, YA-11).

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

### 3.3 Ejemplos de Commits con JIRA

```
YA-5 - feat(core): configuración del proyecto Next.js con TypeScript
YA-6 - feat(ui): implementación del sistema de estilos con Tailwind
YA-7 - chore(core): implementación de ESLint y Prettier
YA-10 - fix(ui): corregir modo claro/oscuro en navegadores Safari
YA-9 - feat(ui): implementación del sistema de navegación principal
YA-11 - perf(ui): optimización de maquetación responsive para dispositivos móviles
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

### 4.2 Proceso de Release con JIRA

1. Crear un ticket en JIRA para la actualización de versión (ej: YA-XX)
2. Crear una rama `release/vX.Y.Z` desde `develop`
3. Realizar los últimos ajustes y correcciones, referenciando tickets JIRA correspondientes
4. Actualizar el número de versión en archivos relevantes
5. Actualizar CHANGELOG.md con referencias a tickets JIRA
6. Fusionar con `main` usando `--no-ff` con mensaje `YA-XX: chore(release): preparar versión X.Y.Z`
7. Crear tag en `main`
8. Fusionar cambios de vuelta a `develop`
9. Cerrar el ticket de versión en JIRA

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
6. **La trazabilidad es clave**: Cada cambio está vinculado a un ticket de JIRA

### 5.1 Gestión de Experimentos con JIRA

Para funcionalidades experimentales:

1. Crear un ticket en JIRA etiquetado como "Experimental"
2. Crear rama `experiment/YA-<número>/descripcion` desde `develop`
3. Usar el tipo de commit `exp` para cambios experimentales, siempre incluyendo la referencia YA-XX
4. Documentar claramente el propósito y alcance del experimento
5. Evaluar resultados y decidir si se integra a `develop` o se descarta
6. Actualizar el ticket de JIRA con la decisión y resultados

## 6. Integración con JIRA

La integración con JIRA proporciona trazabilidad completa del desarrollo:

1. **Vinculación automática**: Al incluir la clave del ticket (YA-XX) en commits y ramas, JIRA los vincula automáticamente
2. **Seguimiento de desarrollo**: JIRA muestra todos los commits, ramas y pull requests asociados a cada ticket
3. **Transiciones automáticas**: Se pueden configurar transiciones automáticas de estado en tickets basadas en acciones de Git
4. **Referencias cruzadas**: El CHANGELOG incluye referencias a tickets JIRA para completa trazabilidad

### 6.1 Flujo típico de un ticket en JIRA

1. Ticket creado en estado "Por hacer" (To Do)
2. Desarrollador asigna el ticket y lo mueve a "En progreso" (In Progress)
3. Crea rama desde JIRA o manualmente con formato `feature/YA-<número>-descripcion`
4. Realiza commits con formato `YA-<número>: tipo(ámbito): descripción`
5. Crea pull request cuando está listo, referenciando el ticket
6. Después de revisión y aprobación, se fusiona a `develop`
7. El ticket se mueve a "Hecho" (Done) 
8. Los cambios se incluyen en el CHANGELOG con formato `[YA-<número>] Descripción del cambio`

## 7. Herramientas y Automatización

Para facilitar este flujo de trabajo, utilizamos:

1. **.cursor/rules/**: Reglas para asistir en la generación de mensajes de commit con formato JIRA
2. **Changelog**: Para generar automáticamente el registro de cambios con referencias a JIRA

## 8. Evaluación y Adaptación

Este sistema de versionamiento está sujeto a mejoras continuas. Se revisará y actualizará según evolucione el proyecto para asegurar que sigue cumpliendo con sus objetivos de claridad, trazabilidad y valor demostrativo.

---

*Este documento forma parte de la meta-documentación del proyecto, que busca transparentar el proceso de desarrollo como parte del valor demostrativo del portfolio.*