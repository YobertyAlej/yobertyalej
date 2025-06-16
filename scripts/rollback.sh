#!/bin/bash

# Script de rollback para yobertyalej.com
# Permite realizar rollback rápido a releases anteriores

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
CURRENT_SYMLINK="$PROJECT_ROOT/current"
PM2_APP_NAME="yobertyalej"

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

# Función para mostrar el uso
show_usage() {
    echo "Uso: $0 [OPCIONES]"
    echo ""
    echo "Opciones:"
    echo "  -l, --list              Listar releases disponibles"
    echo "  -r, --rollback RELEASE  Hacer rollback a un release específico"
    echo "  -p, --previous          Hacer rollback al release anterior"
    echo "  -h, --help              Mostrar esta ayuda"
    echo ""
    echo "Ejemplos:"
    echo "  $0 --list                    # Listar releases disponibles"
    echo "  $0 --previous               # Rollback al release anterior"
    echo "  $0 --rollback 20241215123000 # Rollback a release específico"
}

# Función para verificar prerequisites
check_prerequisites() {
    log_step "Verificando prerequisites..."
    
    # Verificar que el directorio del proyecto existe
    if [[ ! -d "$PROJECT_ROOT" ]]; then
        log_error "Directorio del proyecto no existe: $PROJECT_ROOT"
        exit 1
    fi
    
    # Verificar que el directorio de releases existe
    if [[ ! -d "$RELEASES_DIR" ]]; then
        log_error "Directorio de releases no existe: $RELEASES_DIR"
        exit 1
    fi
    
    # Verificar que PM2 está instalado
    if ! command -v pm2 >/dev/null 2>&1; then
        log_error "PM2 no está instalado"
        exit 1
    fi
    
    log_info "✅ Prerequisites verificados"
}

# Función para listar releases disponibles
list_releases() {
    log_step "Releases disponibles:"
    echo ""
    
    if [[ ! -d "$RELEASES_DIR" ]] || [[ -z "$(ls -A "$RELEASES_DIR" 2>/dev/null)" ]]; then
        log_warn "No hay releases disponibles"
        return
    fi
    
    # Obtener el release actual
    local current_release=""
    if [[ -L "$CURRENT_SYMLINK" ]]; then
        current_release=$(basename "$(readlink "$CURRENT_SYMLINK")")
    fi
    
    # Listar releases con información
    echo "📋 Releases (del más nuevo al más antiguo):"
    echo "=================================================="
    
    local count=1
    for release in $(ls -t "$RELEASES_DIR"); do
        local release_path="$RELEASES_DIR/$release"
        local date_created=$(stat -c %y "$release_path" | cut -d' ' -f1,2 | cut -d'.' -f1)
        local status="  "
        
        if [[ "$release" == "$current_release" ]]; then
            status="✅ (actual)"
        fi
        
        printf "%2d. %s - %s %s\n" "$count" "$release" "$date_created" "$status"
        
        # Mostrar build info si existe
        if [[ -f "$release_path/build-info.json" ]]; then
            local commit=$(cat "$release_path/build-info.json" | jq -r '.commit // "N/A"' 2>/dev/null | cut -c1-8)
            local actor=$(cat "$release_path/build-info.json" | jq -r '.actor // "N/A"' 2>/dev/null)
            printf "    📊 Commit: %s | Deployed by: %s\n" "$commit" "$actor"
        fi
        
        ((count++))
    done
    
    echo "=================================================="
    echo ""
    
    if [[ -n "$current_release" ]]; then
        log_info "Release actual: $current_release"
    else
        log_warn "No hay release actual (symlink no existe)"
    fi
}

# Función para obtener el release anterior
get_previous_release() {
    if [[ ! -L "$CURRENT_SYMLINK" ]]; then
        log_error "No hay release actual (symlink no existe)"
        return 1
    fi
    
    local current_release
    current_release=$(basename "$(readlink "$CURRENT_SYMLINK")")
    
    # Obtener lista de releases ordenados por fecha (más nuevos primero)
    local releases=($(ls -t "$RELEASES_DIR"))
    
    # Encontrar el release actual y devolver el siguiente
    for ((i=0; i<${#releases[@]}; i++)); do
        if [[ "${releases[$i]}" == "$current_release" ]]; then
            if [[ $((i+1)) -lt ${#releases[@]} ]]; then
                echo "${releases[$((i+1))]}"
                return 0
            else
                log_error "No hay release anterior disponible"
                return 1
            fi
        fi
    done
    
    log_error "Release actual no encontrado en la lista"
    return 1
}

# Función para validar que el release existe
validate_release() {
    local release="$1"
    local release_path="$RELEASES_DIR/$release"
    
    if [[ ! -d "$release_path" ]]; then
        log_error "Release no encontrado: $release"
        log_info "Releases disponibles:"
        ls -1 "$RELEASES_DIR" 2>/dev/null || echo "No hay releases disponibles"
        return 1
    fi
    
    # Verificar que el release tiene los archivos necesarios
    local required_files=("package.json" ".next")
    for file in "${required_files[@]}"; do
        if [[ ! -e "$release_path/$file" ]]; then
            log_error "Release incompleto: falta $file en $release"
            return 1
        fi
    done
    
    return 0
}

# Función para hacer rollback
perform_rollback() {
    local target_release="$1"
    local release_path="$RELEASES_DIR/$target_release"
    
    log_step "Iniciando rollback a release: $target_release"
    
    # Obtener release actual para mostrar información
    local current_release=""
    if [[ -L "$CURRENT_SYMLINK" ]]; then
        current_release=$(basename "$(readlink "$CURRENT_SYMLINK")")
        log_info "Release actual: $current_release"
    fi
    
    log_info "Release destino: $target_release"
    
    # Confirmar rollback
    echo ""
    read -p "¿Estás seguro de hacer rollback? (y/N): " -n 1 -r
    echo ""
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Rollback cancelado"
        exit 0
    fi
    
    # Realizar backup del estado actual antes del rollback
    create_rollback_backup
    
    # Cambiar directorio de trabajo
    cd "$release_path"
    
    # Actualizar PM2 para usar el release anterior
    log_step "Actualizando PM2..."
    
    # Detener la aplicación actual
    pm2 delete "$PM2_APP_NAME" || log_warn "No se pudo detener la aplicación anterior"
    
    # Iniciar con el release de rollback
    if [[ -f "ecosystem.config.js" ]]; then
        pm2 start ecosystem.config.js
    else
        pm2 start "npm start" --name "$PM2_APP_NAME"
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
    
    # Actualizar symlink
    log_step "Actualizando symlink..."
    
    local temp_symlink="$PROJECT_ROOT/current_tmp"
    ln -sfn "$release_path" "$temp_symlink"
    mv "$temp_symlink" "$CURRENT_SYMLINK"
    
    log_info "✅ Symlink actualizado: $CURRENT_SYMLINK -> $release_path"
    
    # Guardar configuración de PM2
    pm2 save
    
    # Realizar health check
    if health_check; then
        log_info "✅ Health check exitoso después del rollback"
    else
        log_warn "⚠️  Health check falló después del rollback"
    fi
    
    # Mostrar información del rollback
    show_rollback_info "$target_release" "$current_release"
}

# Función para crear backup antes del rollback
create_rollback_backup() {
    log_step "Creando backup antes del rollback..."
    
    local backup_dir="$PROJECT_ROOT/shared/rollback-backups"
    mkdir -p "$backup_dir"
    
    if [[ -L "$CURRENT_SYMLINK" ]]; then
        local current_release
        current_release=$(basename "$(readlink "$CURRENT_SYMLINK")")
        local timestamp=$(date +%Y%m%d_%H%M%S)
        local backup_file="$backup_dir/rollback_backup_${current_release}_${timestamp}.txt"
        
        cat > "$backup_file" << EOF
Rollback Backup Information
==========================
Date: $(date)
Current Release: $current_release
PM2 Status:
$(pm2 status)

Release Path: $(readlink "$CURRENT_SYMLINK")
EOF
        
        log_info "✅ Backup creado: $backup_file"
    fi
}

# Función para realizar health check
health_check() {
    log_step "Realizando health check..."
    
    local max_attempts=5
    local attempt=1
    
    while [[ $attempt -le $max_attempts ]]; do
        if curl -f -s --max-time 10 "http://localhost:3000/api/health" > /dev/null; then
            return 0
        else
            sleep 5
            ((attempt++))
        fi
    done
    
    return 1
}

# Función para mostrar información del rollback
show_rollback_info() {
    local target_release="$1"
    local previous_release="$2"
    
    log_step "Información del rollback:"
    echo ""
    echo "📋 Rollback completado:"
    echo "  Desde: $previous_release"
    echo "  Hacia: $target_release"
    echo ""
    echo "📊 Estado actual de PM2:"
    pm2 status
    echo ""
    echo "🔗 Symlink actual:"
    ls -la "$CURRENT_SYMLINK"
    echo ""
    
    # Mostrar build info del release actual
    local release_path="$RELEASES_DIR/$target_release"
    if [[ -f "$release_path/build-info.json" ]]; then
        echo "📋 Información del release:"
        cat "$release_path/build-info.json" | jq . 2>/dev/null || cat "$release_path/build-info.json"
    fi
}

# Función principal
main() {
    case "${1:-}" in
        -l|--list)
            check_prerequisites
            list_releases
            ;;
        -p|--previous)
            check_prerequisites
            local previous_release
            if previous_release=$(get_previous_release); then
                if validate_release "$previous_release"; then
                    perform_rollback "$previous_release"
                fi
            fi
            ;;
        -r|--rollback)
            if [[ $# -lt 2 ]]; then
                log_error "Especifica el release para rollback"
                show_usage
                exit 1
            fi
            
            check_prerequisites
            local target_release="$2"
            
            if validate_release "$target_release"; then
                perform_rollback "$target_release"
            fi
            ;;
        -h|--help|"")
            show_usage
            ;;
        *)
            log_error "Opción desconocida: $1"
            show_usage
            exit 1
            ;;
    esac
}

# Verificar que se proporcionaron argumentos
if [[ $# -eq 0 ]]; then
    show_usage
    exit 0
fi

# Ejecutar función principal
main "$@" 