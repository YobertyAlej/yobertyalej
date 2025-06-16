#!/bin/bash

# Script de configuración inicial del Droplet para el proyecto yobertyalej.com
# Instala PM2, crea estructura de directorios y configura permisos

set -euo pipefail

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Variables de configuración
PROJECT_ROOT="/var/www/yobertyalej.com"
SHARED_DIR="$PROJECT_ROOT/shared"
RELEASES_DIR="$PROJECT_ROOT/releases"
LOGS_DIR="$SHARED_DIR/logs"

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Función para verificar si el comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Función para instalar paquetes del sistema
install_system_packages() {
    log_info "Actualizando paquetes del sistema..."
    apt-get update -y
    
    log_info "Instalando paquetes necesarios..."
    apt-get install -y \
        build-essential \
        git \
        curl \
        wget \
        unzip \
        fail2ban \
        ufw \
        htop \
        tree
}

# Función para instalar/actualizar Node.js y pnpm
setup_nodejs() {
    local required_node_version="18.20.8"
    local required_pnpm_version="10.10.0"
    
    log_info "Verificando instalación de Node.js..."
    
    if command_exists node; then
        local current_node_version=$(node --version | sed 's/v//')
        log_info "Node.js ya está instalado (versión: $current_node_version)"
        
        if [[ "$current_node_version" != "$required_node_version" ]]; then
            log_warn "Se recomienda usar Node.js $required_node_version"
        fi
    else
        log_info "Instalando Node.js $required_node_version usando NodeSource..."
        curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
        apt-get install -y nodejs
    fi
    
    log_info "Verificando instalación de pnpm..."
    if command_exists pnpm; then
        local current_pnpm_version=$(pnpm --version)
        log_info "pnpm ya está instalado (versión: $current_pnpm_version)"
    else
        log_info "Instalando pnpm $required_pnpm_version..."
        npm install -g pnpm@$required_pnpm_version
    fi
}

# Función para instalar y configurar PM2
setup_pm2() {
    log_info "Verificando instalación de PM2..."
    
    if command_exists pm2; then
        log_info "PM2 ya está instalado"
        pm2 --version
    else
        log_info "Instalando PM2 globalmente..."
        npm install -g pm2@latest
    fi
    
    log_info "Configurando PM2 para iniciar con el sistema..."
    pm2 startup systemd -u root --hp /root || true
    
    # Crear directorio para logs de PM2
    mkdir -p /home/pm2/.pm2/logs
    
    log_info "Configurando logrotate para PM2..."
    pm2 install pm2-logrotate
    pm2 set pm2-logrotate:max_size 10M
    pm2 set pm2-logrotate:retain 30
    pm2 set pm2-logrotate:compress true
}

# Función para crear estructura de directorios
create_directory_structure() {
    log_info "Creando estructura de directorios en $PROJECT_ROOT..."
    
    # Crear directorios principales
    mkdir -p "$PROJECT_ROOT"
    mkdir -p "$RELEASES_DIR"
    mkdir -p "$SHARED_DIR"
    mkdir -p "$LOGS_DIR"
    mkdir -p "$SHARED_DIR/config"
    
    # Crear archivo .env.local de ejemplo si no existe
    if [[ ! -f "$SHARED_DIR/.env.local" ]]; then
        log_info "Creando archivo .env.local de ejemplo..."
        cat > "$SHARED_DIR/.env.local" << EOF
# Configuración de producción para yobertyalej.com
NODE_ENV=production
PORT=3000

# Añadir aquí las variables de entorno específicas del proyecto
# NEXT_PUBLIC_API_URL=
# DATABASE_URL=
# JWT_SECRET=
EOF
    fi
    
    # Crear directorio para backups
    mkdir -p "$SHARED_DIR/backups"
    
    log_info "Estructura de directorios creada:"
    tree -L 3 "$PROJECT_ROOT" || ls -la "$PROJECT_ROOT"
}

# Función para configurar permisos
setup_permissions() {
    log_info "Configurando permisos..."
    
    # Configurar propietario
    chown -R root:root "$PROJECT_ROOT"
    
    # Configurar permisos de directorios
    find "$PROJECT_ROOT" -type d -exec chmod 755 {} \;
    
    # Configurar permisos de archivos
    find "$PROJECT_ROOT" -type f -exec chmod 644 {} \;
    
    # Permisos especiales para logs
    chmod 755 "$LOGS_DIR"
    
    # Hacer que el archivo .env.local sea solo legible por root
    chmod 600 "$SHARED_DIR/.env.local"
    
    log_info "Permisos configurados correctamente"
}

# Función para configurar firewall básico
setup_firewall() {
    log_info "Configurando firewall básico con UFW..."
    
    # Resetear UFW
    ufw --force reset
    
    # Políticas por defecto
    ufw default deny incoming
    ufw default allow outgoing
    
    # Permitir SSH (puerto 22)
    ufw allow 22/tcp
    
    # Permitir HTTP y HTTPS
    ufw allow 80/tcp
    ufw allow 443/tcp
    
    # Habilitar UFW
    ufw --force enable
    
    log_info "Firewall configurado y habilitado"
}

# Función para configurar fail2ban
setup_fail2ban() {
    log_info "Configurando fail2ban para SSH..."
    
    # Crear configuración local para SSH
    cat > /etc/fail2ban/jail.d/ssh-custom.conf << EOF
[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 5
bantime = 3600
findtime = 600
EOF
    
    # Reiniciar fail2ban
    systemctl restart fail2ban
    systemctl enable fail2ban
    
    log_info "fail2ban configurado para proteger SSH"
}

# Función para crear script de health check
create_health_check_script() {
    log_info "Creando script de health check..."
    
    cat > "$SHARED_DIR/health-check.sh" << 'EOF'
#!/bin/bash

# Script de health check para yobertyalej.com
# Verifica que la aplicación esté respondiendo correctamente

HEALTH_URL="http://localhost:3000/api/health"
TIMEOUT=10

# Realizar petición HTTP
response=$(curl -s -w "%{http_code}" --max-time $TIMEOUT "$HEALTH_URL" -o /dev/null)

if [[ "$response" == "200" ]]; then
    echo "✅ Aplicación saludable (HTTP 200)"
    exit 0
else
    echo "❌ Aplicación no responde correctamente (HTTP $response)"
    exit 1
fi
EOF
    
    chmod +x "$SHARED_DIR/health-check.sh"
    
    log_info "Script de health check creado en $SHARED_DIR/health-check.sh"
}

# Función para crear script de backup
create_backup_script() {
    log_info "Creando script de backup..."
    
    cat > "$SHARED_DIR/backup.sh" << 'EOF'
#!/bin/bash

# Script de backup para configuración compartida
# Respalda archivos importantes del directorio shared

set -euo pipefail

BACKUP_DIR="/var/www/yobertyalej.com/shared/backups"
SHARED_DIR="/var/www/yobertyalej.com/shared"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/shared_backup_$TIMESTAMP.tar.gz"

# Crear directorio de backups si no existe
mkdir -p "$BACKUP_DIR"

# Crear backup
echo "Creando backup en $BACKUP_FILE..."
tar -czf "$BACKUP_FILE" \
    -C "$SHARED_DIR" \
    --exclude="backups" \
    --exclude="logs" \
    .

# Mantener solo los últimos 10 backups
cd "$BACKUP_DIR"
ls -t shared_backup_*.tar.gz | tail -n +11 | xargs -r rm

echo "✅ Backup completado: $BACKUP_FILE"
echo "📁 Backups disponibles:"
ls -lah shared_backup_*.tar.gz 2>/dev/null || echo "No hay backups previos"
EOF
    
    chmod +x "$SHARED_DIR/backup.sh"
    
    log_info "Script de backup creado en $SHARED_DIR/backup.sh"
}

# Función principal
main() {
    log_info "🚀 Iniciando configuración del Droplet para yobertyalej.com"
    log_info "=================================================="
    
    # Verificar que se ejecuta como root
    if [[ $EUID -ne 0 ]]; then
        log_error "Este script debe ejecutarse como root"
        exit 1
    fi
    
    # Ejecutar configuraciones paso a paso
    install_system_packages
    setup_nodejs
    setup_pm2
    create_directory_structure
    setup_permissions
    setup_firewall
    setup_fail2ban
    create_health_check_script
    create_backup_script
    
    log_info "=================================================="
    log_info "✅ Configuración del Droplet completada exitosamente!"
    log_info ""
    log_info "📁 Estructura creada en: $PROJECT_ROOT"
    log_info "🔧 PM2 configurado y listo para usar"
    log_info "🔒 Firewall y fail2ban configurados"
    log_info "💾 Scripts de utilidad creados en: $SHARED_DIR"
    log_info ""
    log_info "Próximos pasos:"
    log_info "1. Configurar las variables de entorno en: $SHARED_DIR/.env.local"
    log_info "2. Ejecutar el primer deployment desde GitHub Actions"
    log_info "3. Verificar que la aplicación funciona correctamente"
    log_info ""
    log_info "Comandos útiles:"
    log_info "- Ver logs: pm2 logs yobertyalej"
    log_info "- Estado PM2: pm2 status"
    log_info "- Health check: $SHARED_DIR/health-check.sh"
    log_info "- Crear backup: $SHARED_DIR/backup.sh"
}

# Ejecutar función principal
main "$@" 