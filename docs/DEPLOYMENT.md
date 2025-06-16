# Guía de Deployment - Portfolio yobertyalej.com

Esta guía documenta el proceso completo de deployment automatizado para el portfolio usando Digital Ocean, Terraform y GitHub Actions.

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

## 🎯 Flujo de Deployment

### 1. Trigger del Pipeline
- **Pull Request**: Ejecuta validación (tests, linting, build)
- **Push a main**: Ejecuta deployment completo
- **Manual**: Workflow dispatch disponible

### 2. Proceso de Validación
1. **Type Check**: Verificación de tipos TypeScript
2. **Linting**: ESLint + Prettier
3. **Build Test**: Compilación de Next.js

### 3. Proceso de Build
1. **Build de Producción**: Next.js optimizado
2. **Artifact Creation**: Tarball con archivos necesarios
3. **Upload**: Subida a GitHub Artifacts

### 4. Proceso de Deployment
1. **SSH Connection**: Conexión segura al Droplet
2. **File Transfer**: SCP del artifact al servidor
3. **Release Creation**: Directorio con timestamp
4. **Dependencies**: Instalación con pnpm
5. **PM2 Management**: Zero-downtime reload
6. **Symlink Update**: Actualización atómica
7. **Health Check**: Verificación post-deployment
8. **Cleanup**: Limpieza de releases antiguos

## 🛠️ Configuración Inicial

### Prerequisitos
- Droplet de Digital Ocean con Ubuntu 22.04
- Acceso SSH al Droplet
- Token de API de Digital Ocean
- Repositorio GitHub configurado

### 1. Configuración del Droplet

Ejecutar en el Droplet:
```bash
# Descargar y ejecutar script de setup
curl -o setup-droplet.sh https://raw.githubusercontent.com/tu-usuario/yobertyalej/main/scripts/setup-droplet.sh
chmod +x setup-droplet.sh
sudo ./setup-droplet.sh
```

El script instalará:
- ✅ Node.js 18.20.8
- ✅ pnpm 10.10.0  
- ✅ PM2 con configuración automática
- ✅ Estructura de directorios
- ✅ Firewall (UFW)
- ✅ Fail2ban para SSH
- ✅ Scripts de utilidad

### 2. Configuración de GitHub Secrets

En GitHub Repository > Settings > Secrets and variables > Actions:

| Secret | Descripción | Valor |
|--------|-------------|-------|
| `DROPLET_IP` | IP del Droplet | 192.241.137.162 |
| `SSH_USER` | Usuario SSH | root |
| `SSH_PRIVATE_KEY` | Clave SSH privada | Contenido completo de la clave |
| `DO_ACCESS_TOKEN` | Token de Digital Ocean | dop_v1_... |

### 3. Configuración de Terraform

```bash
# En tu máquina local
cd tf/
cp terraform.tfvars.example terraform.tfvars

# Editar terraform.tfvars con tus valores
# Especialmente: do_token

# Inicializar Terraform
terraform init

# Planificar cambios
terraform plan

# Aplicar configuración
terraform apply
```

## 🔧 Estructura de Directorios en el Servidor

```
/var/www/yobertyalej.com/
├── current/                 # Symlink al release actual
├── releases/               # Directorio de releases
│   ├── 20241215120000/    # Release con timestamp
│   ├── 20241215130000/
│   └── ...
├── shared/                # Archivos compartidos
│   ├── .env.local         # Variables de entorno
│   ├── logs/              # Logs de la aplicación
│   ├── config/            # Configuraciones
│   ├── backups/           # Backups automáticos
│   ├── health-check.sh    # Script de health check
│   └── backup.sh          # Script de backup
```

## 🚀 Comandos de Deployment

### Deployment Automático
```bash
# El deployment se ejecuta automáticamente en push a main
git push origin main
```

### Deployment Manual
```bash
# Desde GitHub Actions UI o usando GitHub CLI
gh workflow run deploy.yml
```

### Verificación Post-Deployment
```bash
# En el servidor
pm2 status                           # Estado de PM2
curl http://localhost:3000/api/health # Health check local
/var/www/yobertyalej.com/shared/health-check.sh # Script de verificación
```

## 🔄 Rollback

### Rollback Automático al Release Anterior
```bash
# En el servidor
/var/www/yobertyalej.com/shared/rollback.sh --previous
```

### Rollback a Release Específico
```bash
# Listar releases disponibles
./rollback.sh --list

# Rollback a release específico
./rollback.sh --rollback 20241215120000
```

### Rollback desde GitHub Actions
```bash
# Ejecutar workflow con skip_deploy para evitar nuevo deployment
gh workflow run deploy.yml -f skip_deploy=true
```

## 📊 Monitoreo y Salud

### Health Check Endpoint
- **URL**: https://yobertyalej.com/api/health
- **Información**: Estado, uptime, memoria, versión, etc.
- **PM2 Integration**: Verificación automática cada 30 segundos

### Logs de la Aplicación
```bash
# Logs en tiempo real
pm2 logs yobertyalej

# Logs específicos
pm2 logs yobertyalej --lines 100

# Logs por archivo
tail -f /var/www/yobertyalej.com/shared/logs/out.log
tail -f /var/www/yobertyalej.com/shared/logs/err.log
```

### Comandos de Monitoreo
```bash
# Estado general
pm2 status
pm2 monit

# Información del sistema
htop
df -h
free -h

# Verificación de puertos
netstat -tlnp | grep 3000
```

## 🔐 Seguridad

### SSH
- ✅ Fail2ban configurado (5 intentos, 1 hora de ban)
- ✅ UFW firewall (puertos 22, 80, 443)
- ✅ Claves SSH sin password login
- ✅ SSH timeout configurado

### Aplicación
- ✅ Variables de entorno en archivos seguros
- ✅ HTTPS obligatorio (Let's Encrypt)
- ✅ Headers de seguridad en Nginx
- ✅ Rate limiting configurado

### Backups
- ✅ Snapshots automáticos en Digital Ocean
- ✅ Backup de configuración compartida
- ✅ Retención de releases (5 más recientes)

## 🐛 Troubleshooting

### Problemas Comunes

#### 1. Deployment Falla en Health Check
```bash
# Verificar logs de PM2
pm2 logs yobertyalej --lines 50

# Verificar si el puerto está libre
sudo netstat -tlnp | grep 3000

# Reiniciar manualmente
pm2 restart yobertyalej
```

#### 2. SSH Connection Failed
```bash
# Verificar conexión SSH local
ssh root@192.241.137.162

# Verificar firewall en el servidor
sudo ufw status

# Verificar fail2ban
sudo fail2ban-client status sshd
```

#### 3. Build Failures
```bash
# Verificar espacio en disco
df -h

# Limpiar node_modules y rebuild
rm -rf node_modules
pnpm install
pnpm run build
```

#### 4. High Memory Usage
```bash
# Verificar uso de memoria
free -h
pm2 monit

# Reiniciar PM2 si es necesario
pm2 restart yobertyalej
```

### Health Check Failures
```bash
# Verificar endpoint manualmente
curl -I http://localhost:3000/api/health

# Verificar logs de Next.js
pm2 logs yobertyalej | grep -i error

# Verificar configuración de nginx
sudo nginx -t
sudo systemctl status nginx
```

## 📈 Optimizaciones

### Performance
- ✅ Next.js con optimizaciones de producción
- ✅ Compresión gzip en Nginx
- ✅ Static assets caching
- ✅ Image optimization habilitado

### Reliability
- ✅ PM2 cluster mode
- ✅ Auto-restart en crashes
- ✅ Memory limits configurados
- ✅ Health check monitoring

### Deployment Speed
- ✅ pnpm cache en GitHub Actions
- ✅ Build artifact reutilización
- ✅ Parallel jobs en CI/CD
- ✅ Zero-downtime deployments

## 🔗 Enlaces Útiles

- **Sitio Web**: https://yobertyalej.com
- **Health Check**: https://yobertyalej.com/api/health
- **Digital Ocean Panel**: https://cloud.digitalocean.com
- **GitHub Actions**: https://github.com/tu-usuario/yobertyalej/actions
- **Terraform State**: Local (migrar a DO Spaces)

## 📞 Soporte

Para problemas o preguntas:
1. Revisar logs con los comandos documentados
2. Verificar health check endpoint
3. Consultar esta documentación
4. Crear issue en el repositorio GitHub

---

**Nota**: Esta documentación debe mantenerse actualizada con cualquier cambio en la configuración de deployment. 