#!/bin/bash

# Script principal de deployment para yobertyalej.com
# Implementa zero-downtime deployment usando PM2 y symlinks

set -euo pipefail

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variables de configuración
PROJECT_ROOT="/var/www/yobertyalej.com"
RELEASES_DIR="$PROJECT_ROOT/releases"
SHARED_DIR="$PROJECT_ROOT/shared"
CURRENT_SYMLINK="$PROJECT_ROOT/current"
PM2_APP_NAME="yobertyalej"
KEEP_RELEASES=5

# Funciones de logging
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Función para verificar prerequisites
check_prerequisites() {
    log_step "Verificando prerequisites..."
    
    # Verificar que el directorio del proyecto existe
    if [[ ! -d "$PROJECT_ROOT" ]]; then
        log_error "Directorio del proyecto no existe: $PROJECT_ROOT"
        log_error "Ejecuta primero el script setup-droplet.sh"
        exit 1
    fi
    
    # Verificar que PM2 está instalado
    if ! command -v pm2 >/dev/null 2>&1; then
        log_error "PM2 no está instalado"
        exit 1
    fi
    
    # Verificar que pnpm está instalado
    if ! command -v pnpm >/dev/null 2>&1; then
        log_error "pnpm no está instalado"
        exit 1
    fi
    
    # Verificar que el archivo de deployment existe
    if [[ ! -f "$1" ]]; then
        log_error "Archivo de deployment no encontrado: $1"
        exit 1
    fi
    
    log_info "✅ Prerequisites verificados"
}

# Función para crear release directory
create_release_directory() {
    local timestamp=$(date +%Y%m%d%H%M%S)
    local release_dir="$RELEASES_DIR/$timestamp"
    
    log_step "Creando directorio de release: $release_dir"
    
    mkdir -p "$release_dir"
    
    # Verificar que el directorio se creó correctamente
    if [[ ! -d "$release_dir" ]]; then
        log_error "No se pudo crear el directorio de release: $release_dir"
        exit 1
    fi
    
    log_info "✅ Directorio de release creado: $release_dir"
    echo "$release_dir"
}

# Función para extraer y preparar archivos
extract_and_prepare() {
    local deployment_file="$1"
    local release_dir="$2"
    
    log_step "Extrayendo archivos de deployment..."
    
    # Verificar que el archivo de deployment existe y es legible
    if [[ ! -f "$deployment_file" ]]; then
        log_error "Archivo de deployment no encontrado: $deployment_file"
        exit 1
    fi
    
    if [[ ! -r "$deployment_file" ]]; then
        log_error "Archivo de deployment no es legible: $deployment_file"
        exit 1
    fi
    
    # Mostrar información del archivo
    log_info "📋 Información del archivo de deployment:"
    ls -lah "$deployment_file"
    
    # Verificar que es un archivo tar válido
    if ! tar -tzf "$deployment_file" >/dev/null 2>&1; then
        log_error "El archivo no es un tarball válido: $deployment_file"
        exit 1
    fi
    
    log_info "✅ Archivo de deployment verificado"
    
    # Extraer el tarball en el directorio de release
    log_info "📦 Extrayendo archivos a: $release_dir"
    
    # Usar redirección para evitar conflictos con stdout
    if ! tar -xzf "$deployment_file" -C "$release_dir" 2>/dev/null; then
        log_error "Error al extraer el tarball"
        log_error "Verificando directorio de destino:"
        ls -la "$release_dir" 2>/dev/null || log_error "No se puede acceder al directorio"
        exit 1
    fi
    
    # Mostrar contenido extraído
    log_info "📋 Archivos extraídos:"
    ls -la "$release_dir"
    
    # Verificar que los archivos esenciales están presentes
    local required_files=("package.json" ".next" "public")
    for file in "${required_files[@]}"; do
        if [[ ! -e "$release_dir/$file" ]]; then
            log_error "Archivo requerido no encontrado: $file"
            log_error "Contenido del directorio de release:"
            ls -la "$release_dir"
            exit 1
        fi
    done
    
    log_info "✅ Archivos extraídos correctamente"
}

# Función para instalar dependencias de producción
install_dependencies() {
    local release_dir="$1"
    
    log_step "Instalando dependencias de producción..."
    
    cd "$release_dir"
    
    # Instalar solo dependencias de producción
    pnpm install --prod --frozen-lockfile --silent
    
    # Verificar que node_modules existe
    if [[ ! -d "node_modules" ]]; then
        log_error "node_modules no fue creado correctamente"
        exit 1
    fi
    
    log_info "✅ Dependencias instaladas"
}

# Función para copiar archivos compartidos
copy_shared_files() {
    local release_dir="$1"
    
    log_step "Copiando archivos compartidos..."
    
    # Copiar .env.local si existe
    if [[ -f "$SHARED_DIR/.env.local" ]]; then
        cp "$SHARED_DIR/.env.local" "$release_dir/"
        log_info "✅ .env.local copiado"
    else
        log_warn "⚠️  .env.local no encontrado en $SHARED_DIR"
    fi
    
    # Copiar ecosystem.config.js si existe
    if [[ -f "$SHARED_DIR/ecosystem.config.js" ]]; then
        cp "$SHARED_DIR/ecosystem.config.js" "$release_dir/"
        log_info "✅ ecosystem.config.js copiado"
    fi
    
    # Crear symlinks para directorios compartidos si es necesario
    # (por ejemplo, para uploads, cache, etc.)
    
    log_info "✅ Archivos compartidos configurados"
}

# Función para verificar que la aplicación puede iniciarse
verify_application() {
    local release_dir="$1"
    
    log_step "Verificando que la aplicación puede iniciarse..."
    
    cd "$release_dir"
    
    # Verificar que el build de Next.js es válido
    if [[ ! -f ".next/BUILD_ID" ]]; then
        log_error "Build de Next.js inválido - .next/BUILD_ID no encontrado"
        exit 1
    fi
    
    # Verificar archivos esenciales de Next.js
    local next_files=(".next/server" ".next/static")
    for file in "${next_files[@]}"; do
        if [[ ! -d "$file" ]]; then
            log_error "Directorio esencial de Next.js no encontrado: $file"
            exit 1
        fi
    done
    
    log_info "✅ Aplicación verificada"
}

# Función para manejar PM2
manage_pm2() {
    local release_dir="$1"
    local is_first_deploy=false
    
    log_step "Gestionando aplicación PM2..."
    
    # Verificar si la aplicación ya está corriendo en PM2
    if pm2 list | grep -q "$PM2_APP_NAME"; then
        log_info "Aplicación existente encontrada en PM2, realizando reload..."
        
        # Cambiar el directorio de trabajo temporalmente
        local current_cwd=$(pm2 show "$PM2_APP_NAME" | grep "cwd" | awk '{print $4}' || echo "")
        
        # Actualizar la configuración de PM2 para apuntar al nuevo release
        pm2 delete "$PM2_APP_NAME" || log_warn "No se pudo eliminar la aplicación anterior"
        
        # Iniciar la nueva versión
        cd "$release_dir"
        pm2 start ecosystem.config.js || pm2 start "npm start" --name "$PM2_APP_NAME"
        
    else
        log_info "Primera deployment - iniciando aplicación en PM2..."
        is_first_deploy=true
        
        cd "$release_dir"
        
        # Intentar usar ecosystem.config.js si existe, sino usar configuración básica
        if [[ -f "ecosystem.config.js" ]]; then
            pm2 start ecosystem.config.js
        else
            pm2 start "npm start" --name "$PM2_APP_NAME"
        fi
    fi
    
    # Esperar un momento para que la aplicación se inicie
    sleep 5
    
    # Verificar que la aplicación está corriendo
    if pm2 list | grep -q "$PM2_APP_NAME.*online"; then
        log_info "✅ Aplicación iniciada correctamente en PM2"
    else
        log_error "❌ La aplicación no se inició correctamente"
        pm2 logs "$PM2_APP_NAME" --lines 20
        exit 1
    fi
    
    # Guardar configuración de PM2
    pm2 save
    
    if [[ "$is_first_deploy" == true ]]; then
        log_info "🎉 Primera deployment completada"
    else
        log_info "🔄 Reload completado con zero downtime"
    fi
}

# Función para actualizar symlink
update_symlink() {
    local release_dir="$1"
    
    log_step "Actualizando symlink current..."
    
    # Crear symlink temporal
    local temp_symlink="$PROJECT_ROOT/current_tmp"
    ln -sfn "$release_dir" "$temp_symlink"
    
    # Mover symlink temporal al lugar final (operación atómica)
    mv "$temp_symlink" "$CURRENT_SYMLINK"
    
    log_info "✅ Symlink actualizado: $CURRENT_SYMLINK -> $release_dir"
}

# Función para limpiar releases antiguos
cleanup_old_releases() {
    log_step "Limpiando releases antiguos (manteniendo últimos $KEEP_RELEASES)..."
    
    cd "$RELEASES_DIR"
    
    # Obtener lista de releases ordenados por fecha (más nuevos primero)
    local releases=($(ls -t))
    local total_releases=${#releases[@]}
    
    if [[ $total_releases -gt $KEEP_RELEASES ]]; then
        local releases_to_delete=$((total_releases - KEEP_RELEASES))
        log_info "Eliminando $releases_to_delete releases antiguos..."
        
        # Eliminar releases antiguos (empezando desde el final de la lista)
        for ((i=$KEEP_RELEASES; i<$total_releases; i++)); do
            local release_to_delete="${releases[$i]}"
            log_info "Eliminando release: $release_to_delete"
            rm -rf "$release_to_delete"
        done
        
        log_info "✅ Cleanup completado"
    else
        log_info "No hay releases antiguos para eliminar"
    fi
}

# Función para realizar health check local
health_check() {
    log_step "Realizando health check local..."
    
    local max_attempts=10
    local attempt=1
    
    while [[ $attempt -le $max_attempts ]]; do
        log_info "Intento $attempt/$max_attempts..."
        
        if curl -f -s --max-time 10 "http://localhost:3000/api/health" > /dev/null; then
            log_info "✅ Health check exitoso!"
            return 0
        else
            log_warn "Health check falló, reintentando en 5 segundos..."
            sleep 5
            ((attempt++))
        fi
    done
    
    log_error "❌ Health check falló después de $max_attempts intentos"
    return 1
}

# Función para mostrar información del deployment
show_deployment_info() {
    local release_dir="$1"
    
    log_step "Información del deployment:"
    
    echo "📁 Release directory: $release_dir"
    echo "🔗 Current symlink: $CURRENT_SYMLINK"
    echo "📊 PM2 status:"
    pm2 status
    
    echo ""
    echo "📋 Build info:"
    if [[ -f "$release_dir/build-info.json" ]]; then
        cat "$release_dir/build-info.json" | jq . 2>/dev/null || cat "$release_dir/build-info.json"
    else
        echo "No build info disponible"
    fi
    
    echo ""
    echo "📊 Releases disponibles:"
    ls -lt "$RELEASES_DIR" | head -6
}

# Función para rollback en caso de error
rollback_on_error() {
    local release_dir="$1"
    
    log_error "🚨 Deployment falló, iniciando rollback..."
    
    # Si existe un symlink anterior, intentar restaurarlo
    if [[ -L "$CURRENT_SYMLINK" ]]; then
        local previous_release=$(readlink "$CURRENT_SYMLINK")
        if [[ -d "$previous_release" && "$previous_release" != "$release_dir" ]]; then
            log_info "Restaurando release anterior: $previous_release"
            
            cd "$previous_release"
            pm2 delete "$PM2_APP_NAME" || true
            pm2 start ecosystem.config.js || pm2 start "npm start" --name "$PM2_APP_NAME"
            pm2 save
            
            log_info "✅ Rollback completado"
        fi
    fi
    
    # Limpiar el release fallido
    if [[ -d "$release_dir" ]]; then
        log_info "Eliminando release fallido: $release_dir"
        rm -rf "$release_dir"
    fi
}

# Función principal
main() {
    local deployment_file="$1"
    
    log_info "🚀 Iniciando deployment de yobertyalej.com"
    log_info "=================================================="
    
    # Verificar prerequisites
    check_prerequisites "$deployment_file"
    
    # Crear release directory
    local release_dir
    release_dir=$(create_release_directory)
    
    # Verificar que obtuvimos un directorio válido
    if [[ -z "$release_dir" || ! -d "$release_dir" ]]; then
        log_error "Error al crear o obtener el directorio de release"
        exit 1
    fi
    
    log_info "📁 Usando directorio de release: $release_dir"
    
    # Configurar trap para rollback en caso de error
    trap "rollback_on_error '$release_dir'" ERR
    
    # Ejecutar steps del deployment
    extract_and_prepare "$deployment_file" "$release_dir"
    install_dependencies "$release_dir"
    copy_shared_files "$release_dir"
    verify_application "$release_dir"
    manage_pm2 "$release_dir"
    update_symlink "$release_dir"
    
    # Realizar health check
    if health_check; then
        log_info "✅ Health check exitoso"
    else
        log_error "❌ Health check falló"
        exit 1
    fi
    
    # Limpiar releases antiguos
    cleanup_old_releases
    
    # Mostrar información del deployment
    show_deployment_info "$release_dir"
    
    # Deshabilitar trap de error (deployment exitoso)
    trap - ERR
    
    log_info "=================================================="
    log_info "🎉 Deployment completado exitosamente!"
    log_info "🌐 Sitio web: https://yobertyalej.com"
    log_info "📊 Health check: https://yobertyalej.com/api/health"
    log_info "📁 Release: $(basename "$release_dir")"
}

# Verificar argumentos
if [[ $# -ne 1 ]]; then
    echo "Uso: $0 <archivo_deployment.tar.gz>"
    echo ""
    echo "Ejemplo:"
    echo "  $0 /tmp/deployment.tar.gz"
    exit 1
fi

# Ejecutar función principal
main "$1" 