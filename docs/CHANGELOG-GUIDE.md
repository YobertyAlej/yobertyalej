# Guía para gestionar el CHANGELOG

Este documento describe cómo mantener y actualizar el archivo CHANGELOG.md de la raíz del proyecto.

## Estructura del Changelog

El Changelog sigue la estructura recomendada por [Keep a Changelog](https://keepachangelog.com/):

1. **[Unreleased]**: Cambios que se han añadido a la rama principal pero que aún no son parte de un release
2. **[X.Y.Z]**: Sección para cada versión publicada, con la fecha de lanzamiento

Cada sección de versión debe agrupar los cambios en categorías:

- **Añadido**: Nuevas características
- **Cambiado**: Cambios en funcionalidades existentes
- **Eliminado**: Características eliminadas
- **Corregido**: Corrección de errores
- **Seguridad**: Correcciones de seguridad
- **Experimental**: Características en fase experimental

## Cuándo actualizar el Changelog

1. **Desarrollo diario**: Agregar entradas a la sección [Unreleased] mientras se desarrolla
2. **En cada release**: Crear una nueva sección para la versión y mover los cambios de [Unreleased]

## Formato de las entradas

Las entradas del Changelog deben ser:

1. **Concisas**: Una línea por entrada, explicando el cambio claramente
2. **Orientadas al usuario**: Describir el cambio desde la perspectiva del usuario
3. **Agrupadas**: Categorizar bajo Añadido, Cambiado, etc.
4. **Informativas**: Incluir tickets/issues relacionados cuando sea relevante

## Proceso de actualización en releases

Cuando se prepara una nueva versión:

1. Cambiar [Unreleased] a [X.Y.Z]
2. Añadir la fecha de lanzamiento
3. Crear una nueva sección [Unreleased] vacía
4. Actualizar los enlaces de comparación al final del documento

## Ejemplos de buenas entradas

´´´md
### Añadido

- Nuevo sistema de navegación en la página de inicio
- Soporte para modo oscuro/claro con detección automática

### Cambiado

- Mejorada la responsividad del componente de tarjetas
- Optimizado el rendimiento de las animaciones en dispositivos móviles

### Corregido

- Solucionado problema con la carga de imágenes en Safari
- Corregido error tipográfico en la página Acerca de
´´´md

## Enlaces de comparación

- Mantener actualizados los enlaces de comparación al final del documento
- Estos enlaces permiten ver fácilmente los cambios entre versiones.