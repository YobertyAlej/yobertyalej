terraform {
  required_version = ">= 1.0"
  
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "~> 3.2"
    }
  }
  
  # Configuración del backend (inicialmente local)
  # Para migrar a Spaces más tarde, descomentar:
  # backend "s3" {
  #   endpoints = {
  #     s3 = "https://nyc3.digitaloceanspaces.com"
  #   }
  #   bucket                      = "yobertyalej-terraform-state"
  #   key                         = "portfolio/terraform.tfstate"
  #   region                      = "us-east-1"
  #   skip_credentials_validation = true
  #   skip_metadata_api_check     = true
  # }
} 