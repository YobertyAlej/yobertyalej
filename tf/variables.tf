# Variables para la configuración de Terraform

variable "do_token" {
  description = "Token de API de Digital Ocean"
  type        = string
  sensitive   = true
}

variable "droplet_ip" {
  description = "IP del Droplet existente"
  type        = string
  default     = "192.241.137.162"
}

variable "domain_name" {
  description = "Nombre del dominio principal"
  type        = string
  default     = "yobertyalej.com"
}

variable "ssh_private_key_path" {
  description = "Ruta a la clave SSH privada para conexión al Droplet"
  type        = string
  default     = "~/.ssh/id_rsa"
}

variable "project_name" {
  description = "Nombre del proyecto en Digital Ocean"
  type        = string
  default     = "yobertyalej-portfolio"
}

variable "region" {
  description = "Región de Digital Ocean"
  type        = string
  default     = "nyc1"
}

variable "droplet_size" {
  description = "Tamaño del Droplet (para referencia)"
  type        = string
  default     = "s-1vcpu-1gb"
}

variable "environment" {
  description = "Entorno de deployment (development, staging, production)"
  type        = string
  default     = "production"
}

variable "backup_enabled" {
  description = "Habilitar backups automáticos del Droplet"
  type        = bool
  default     = false  # Deshabilitado por permisos del token
}

variable "monitoring_enabled" {
  description = "Habilitar monitoreo del Droplet"
  type        = bool
  default     = false  # Deshabilitado por permisos del token
}

variable "tags" {
  description = "Tags a aplicar a los recursos"
  type        = list(string)
  default = [
    "portfolio",
    "nextjs",
    "production"
  ]
}

variable "alert_email" {
  description = "Email para recibir alertas de monitoreo"
  type        = string
  default     = "gyoberty@gmail.com"
} 