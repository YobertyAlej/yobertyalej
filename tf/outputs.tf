# Outputs de Terraform para información útil del deployment

output "droplet_ip" {
  description = "IP pública del Droplet"
  value       = local.target_droplet.ipv4_address
}

output "droplet_id" {
  description = "ID del Droplet en Digital Ocean"
  value       = local.target_droplet.id
}

output "droplet_urn" {
  description = "URN del Droplet para recursos relacionados"
  value       = local.target_droplet.urn
}

output "droplet_name" {
  description = "Nombre del Droplet encontrado"
  value       = local.target_droplet.name
}

output "project_url" {
  description = "URL principal del proyecto"
  value       = "https://${var.domain_name}"
}

output "www_url" {
  description = "URL con www del proyecto"
  value       = "https://www.${var.domain_name}"
}

output "ssh_connection" {
  description = "Comando SSH para conectarse al Droplet"
  value       = "ssh root@${local.target_droplet.ipv4_address}"
  sensitive   = false
}

output "project_name" {
  description = "Nombre del proyecto en Digital Ocean"
  value       = digitalocean_project.portfolio.name
}

output "project_id" {
  description = "ID del proyecto en Digital Ocean"
  value       = digitalocean_project.portfolio.id
}

output "firewall_id" {
  description = "ID del firewall configurado"
  value       = digitalocean_firewall.portfolio.id
}

output "deployment_info" {
  description = "Información útil para el deployment"
  value = {
    project_root    = "/var/www/${var.domain_name}"
    current_symlink = "/var/www/${var.domain_name}/current"
    releases_dir    = "/var/www/${var.domain_name}/releases"
    shared_dir      = "/var/www/${var.domain_name}/shared"
    logs_dir        = "/var/www/${var.domain_name}/shared/logs"
    pm2_app_name    = "yobertyalej"
  }
}

output "health_check_urls" {
  description = "URLs para verificar el estado de la aplicación"
  value = {
    health_endpoint = "https://${var.domain_name}/api/health"
    main_site       = "https://${var.domain_name}"
    www_site        = "https://www.${var.domain_name}"
  }
}

output "monitoring_info" {
  description = "Información sobre el monitoreo configurado"
  value = {
    cpu_alert_enabled    = false
    memory_alert_enabled = false
    monitoring_enabled   = "false (disabled due to token permissions)"
    alert_thresholds = {
      cpu_percent    = "Not configured - upgrade token permissions"
      memory_percent = "Not configured - upgrade token permissions"
    }
  }
}

output "backup_info" {
  description = "Información sobre los backups configurados"
  value = {
    snapshots_enabled = "false (disabled due to token permissions)"
    backup_schedule   = "Not configured - upgrade token permissions"
  }
}

output "github_actions_vars" {
  description = "Variables necesarias para GitHub Actions"
  value = {
    DROPLET_IP   = local.target_droplet.ipv4_address
    SSH_USER     = "root"
    PROJECT_ROOT = "/var/www/${var.domain_name}"
    PM2_APP_NAME = "yobertyalej"
    DOMAIN_NAME  = var.domain_name
  }
  sensitive = false
}

output "terraform_state_info" {
  description = "Información sobre el estado de Terraform"
  value = {
    state_location = "local (migrate to DO Spaces later)"
    workspace      = terraform.workspace
    last_updated   = timestamp()
  }
} 