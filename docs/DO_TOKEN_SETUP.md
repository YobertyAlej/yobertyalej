# Configuración del Token de Digital Ocean

Esta guía te ayudará a crear y configurar correctamente el token de API de Digital Ocean necesario para el pipeline CI/CD.

## 🎯 ¿Qué es el Token de Digital Ocean?

El token de API de Digital Ocean es una clave de autenticación que permite a Terraform y otras herramientas acceder a tu cuenta de Digital Ocean para gestionar recursos como Droplets, dominios, firewalls, etc.

## 🔧 Pasos para Crear el Token

### 1. Acceder al Panel de Digital Ocean

1. Ve a [https://cloud.digitalocean.com](https://cloud.digitalocean.com)
2. Inicia sesión con tu cuenta
3. En el panel izquierdo, haz clic en **"API"**
4. Selecciona la pestaña **"Tokens"**

### 2. Generar Nuevo Token

1. Haz clic en **"Generate New Token"**
2. Completa los campos:
   - **Token Name**: `yobertyalej-terraform-token`
   - **Expiration**: `No expiration` (recomendado para CI/CD)
   - **Scopes**: 
     - ✅ **Read** (requerido)
     - ✅ **Write** (requerido)

### 3. Copiar y Guardar el Token

⚠️ **IMPORTANTE**: El token solo se mostrará una vez. Asegúrate de copiarlo completamente.

El token tendrá el formato: `dop_v1_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## 🔐 Configuración de Seguridad

### GitHub Secrets (Recomendado para CI/CD)

1. Ve a tu repositorio en GitHub
2. Navega a **Settings** > **Secrets and variables** > **Actions**
3. Haz clic en **"New repository secret"**
4. Configura:
   - **Name**: `DO_ACCESS_TOKEN`
   - **Secret**: Pega el token completo
5. Haz clic en **"Add secret"**

### Terraform Local (Para desarrollo)

1. Crea el archivo `tf/terraform.tfvars`:
```bash
cd tf/
cp terraform.tfvars.example terraform.tfvars
```

2. Edita `terraform.tfvars` y añade:
```hcl
do_token = "dop_v1_tu_token_aqui"
```

3. **NUNCA** commits este archivo al repositorio:
```bash
# Verificar que está en .gitignore
echo "tf/terraform.tfvars" >> .gitignore
```

## 🧪 Verificación del Token

### Usando curl
```bash
curl -X GET \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer dop_v1_tu_token_aqui" \
  "https://api.digitalocean.com/v2/account"
```

Respuesta esperada:
```json
{
  "account": {
    "droplet_limit": 25,
    "floating_ip_limit": 5,
    "email": "tu-email@example.com",
    "uuid": "b6fr89dbf6d9156cace5f3c78dc9851d957381ef",
    "status": "active"
  }
}
```

### Usando Terraform
```bash
cd tf/
terraform init
terraform plan
```

Si el token funciona, verás la planificación sin errores de autenticación.

## 🔑 Permisos del Token

El token debe tener acceso a estos recursos:

### ✅ Recursos que Terraform Gestiona
- **Droplets**: Leer información del Droplet existente
- **Projects**: Crear y gestionar proyectos
- **Firewalls**: Configurar reglas de firewall
- **Domains**: Gestionar registros DNS (si el dominio está en DO)
- **Monitoring**: Configurar alertas
- **Snapshots**: Crear backups automáticos

### ❌ Recursos que NO Necesita
- **Spaces**: Solo si planeas migrar el estado de Terraform
- **Load Balancers**: No usado en este setup
- **Databases**: No usado actualmente
- **Kubernetes**: No usado en este proyecto

## 📊 Límites y Consideraciones

### Rate Limits de la API
- **Requests por hora**: 5,000
- **Requests por minuto**: 250
- **Burst**: 50 requests

Para CI/CD normal, estos límites son suficientes.

### Seguridad del Token
- ✅ **Usar GitHub Secrets** para CI/CD
- ✅ **Rotar tokens** cada 6-12 meses
- ✅ **Monitorear uso** en el panel de DO
- ❌ **Nunca exponer** en código fuente
- ❌ **Nunca compartir** por email/chat

## 🔄 Rotación del Token

### Cuándo Rotar
- Cada 6-12 meses como práctica de seguridad
- Si sospechas que fue comprometido
- Si cambia el equipo de desarrollo
- Si el token fue expuesto accidentalmente

### Cómo Rotar
1. **Crear nuevo token** siguiendo esta guía
2. **Actualizar GitHub Secrets**:
   - Ve a Settings > Secrets and variables > Actions
   - Edita `DO_ACCESS_TOKEN`
   - Pega el nuevo token
3. **Actualizar terraform.tfvars** local (si aplica)
4. **Probar** que funciona:
   ```bash
   terraform plan
   ```
5. **Revocar token anterior**:
   - En el panel de DO > API > Tokens
   - Haz clic en el token anterior
   - Selecciona "Revoke"

## 🐛 Troubleshooting

### Error: "Unable to authenticate you"
```
Error: Error loading Account info: GET https://api.digitalocean.com/v2/account: 401 Unable to authenticate you
```

**Soluciones**:
1. Verificar que el token es correcto
2. Verificar que el token no ha expirado
3. Verificar que el token tiene permisos de lectura
4. Intentar generar un nuevo token

### Error: "Rate limit exceeded"
```
Error: Error creating firewall: POST https://api.digitalocean.com/v2/firewalls: 429 Rate limit exceeded
```

**Soluciones**:
1. Esperar unos minutos antes de reintentar
2. Reducir la frecuencia de `terraform plan/apply`
3. Verificar que no hay otros procesos usando la API

### Error: "Resource not found"
```
Error: Error retrieving droplet: GET https://api.digitalocean.com/v2/droplets/123456789: 404 Not Found
```

**Soluciones**:
1. Verificar que el Droplet existe en tu cuenta
2. Verificar que el nombre del Droplet es correcto en `main.tf`
3. Verificar que el token tiene acceso a la cuenta correcta

## 📝 Configuración Recomendada

### Para Equipos Pequeños (1-3 personas)
- Token sin expiración
- Compartido via GitHub Secrets
- Rotación manual cada 6 meses

### Para Equipos Grandes (4+ personas)
- Múltiples tokens por ambiente
- Rotación automática cada 3 meses
- Monitoring de uso de API

### Para Desarrollo Local
- Token separado para desarrollo
- Expiraciones más cortas (3 meses)
- Permisos mínimos necesarios

## 🔗 Enlaces Útiles

- [Digital Ocean API Documentation](https://docs.digitalocean.com/reference/api/)
- [Terraform Digital Ocean Provider](https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs)
- [API Rate Limits](https://docs.digitalocean.com/reference/api/api-reference/#section/Introduction/Rate-Limit)
- [Best Practices para API Keys](https://docs.digitalocean.com/reference/api/create-personal-access-token/)

## 📞 Soporte

Si tienes problemas con el token:
1. Revisar esta guía completa
2. Verificar los mensajes de error específicos
3. Probar con curl para aislar el problema
4. Crear un nuevo token si es necesario
5. Contactar soporte de Digital Ocean si persiste

---

**Nota**: Mantén siempre tu token seguro y nunca lo expongas en repositorios públicos o logs. 