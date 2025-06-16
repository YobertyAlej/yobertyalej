# Configuración principal de Terraform para el portfolio yobertyalej.com

# Configurar el provider de Digital Ocean
provider "digitalocean" {
  token = var.do_token
}

# Data source para obtener información del Droplet existente
# Buscar por ID o por IP pública
data "digitalocean_droplets" "all" {}

locals {
  # Encontrar el droplet que tiene nuestra IP
  matching_droplets = [
    for droplet in data.digitalocean_droplets.all.droplets :
    droplet if droplet.ipv4_address == var.droplet_ip
  ]
  
  target_droplet = length(local.matching_droplets) > 0 ? local.matching_droplets[0] : null
}

# Validación para asegurar que encontramos el droplet
resource "null_resource" "validate_droplet" {
  count = local.target_droplet == null ? 1 : 0
  
  provisioner "local-exec" {
    command = "echo 'ERROR: No se encontró un droplet con la IP ${var.droplet_ip}' && exit 1"
  }
}

# Crear proyecto en Digital Ocean para organizar recursos
resource "digitalocean_project" "portfolio" {
  name        = var.project_name
  description = "Proyecto para el portfolio personal de Yoberty Alejandro"
  purpose     = "Web Application"
  environment = var.environment
  
  resources = [
    "do:droplet:${local.target_droplet.id}"
  ]
}

# Configurar firewall para el Droplet
resource "digitalocean_firewall" "portfolio" {
  name = "${var.project_name}-firewall"
  
  droplet_ids = [local.target_droplet.id]
  
  # Reglas de entrada (inbound)
  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }
  
  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }
  
  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }
  
  # Reglas de salida (outbound)
  outbound_rule {
    protocol              = "tcp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
  
  outbound_rule {
    protocol              = "udp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
  
  outbound_rule {
    protocol              = "icmp"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
  
  # tags = var.tags  # Deshabilitado temporalmente por permisos
}

# Data source para obtener información del dominio (DESHABILITADO - no necesario)
# data "digitalocean_domain" "portfolio" {
#   count = var.domain_name != "" ? 1 : 0
#   name  = var.domain_name
# }

# Registro A para el dominio principal (DESHABILITADO - ya configurado manualmente)
# resource "digitalocean_record" "main" {
#   count  = var.domain_name != "" ? 1 : 0
#   domain = data.digitalocean_domain.portfolio[0].id
#   type   = "A"
#   name   = "@"
#   value  = var.droplet_ip
#   ttl    = 300
# }

# Registro A para www (deshabilitado por conflicto con CNAME existente)
# resource "digitalocean_record" "www" {
#   count  = var.domain_name != "" ? 1 : 0
#   domain = data.digitalocean_domain.portfolio[0].id
#   type   = "A"
#   name   = "www"
#   value  = var.droplet_ip
#   ttl    = 300
# }

# Configurar monitoring si está habilitado (DESHABILITADO POR PERMISOS)
# resource "digitalocean_monitor_alert" "cpu_alert" {
#   count       = var.monitoring_enabled ? 1 : 0
#   window      = "5m"
#   type        = "v1/insights/droplet/cpu"
#   compare     = "GreaterThan"
#   value       = 80
#   enabled     = true
#   entities    = [local.target_droplet.id]
#   description = "CPU usage alert for ${var.domain_name}"
#   
#   alerts {
#     email = [var.alert_email]
#   }
# }

# resource "digitalocean_monitor_alert" "memory_alert" {
#   count       = var.monitoring_enabled ? 1 : 0
#   window      = "5m"
#   type        = "v1/insights/droplet/memory_utilization_percent"
#   compare     = "GreaterThan"
#   value       = 90
#   enabled     = true
#   entities    = [local.target_droplet.id]
#   description = "Memory usage alert for ${var.domain_name}"
#   
#   alerts {
#     email = [var.alert_email]
#   }
# }

# Habilitar backups si está configurado (DESHABILITADO POR PERMISOS)
# resource "digitalocean_droplet_snapshot" "portfolio_backup" {
#   count      = var.backup_enabled ? 1 : 0
#   droplet_id = local.target_droplet.id
#   name       = "${var.project_name}-snapshot-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
#   
#   lifecycle {
#     ignore_changes = [name]
#   }
# }

# Configurar tags en el Droplet existente (deshabilitado por permisos)
# resource "digitalocean_tag" "portfolio_tags" {
#   count = length(var.tags)
#   name  = var.tags[count.index]
# }

# Aplicar tags al Droplet existente
# Nota: Este recurso está comentado ya que requiere importar el Droplet existente
# Para habilitarlo, descomenta y ejecuta:
# terraform import digitalocean_droplet.portfolio_tagged <droplet_id>

# resource "digitalocean_droplet" "portfolio_tagged" {
#   name   = "yobertyalej-com"
#   size   = var.droplet_size
#   image  = "ubuntu-22-04-x64"
#   region = var.region
#   tags   = var.tags
# }

# Locals para cálculos
locals {
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
    Domain      = var.domain_name
  }
} 