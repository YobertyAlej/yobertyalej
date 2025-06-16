import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

// Interfaz para la respuesta de health check
interface HealthCheckResponse {
  status: 'ok' | 'error'
  timestamp: string
  uptime: number
  version: string
  environment: string
  build: {
    commit?: string
    buildTime?: string
    buildNumber?: string
    deployedBy?: string
  }
  system: {
    platform: string
    nodeVersion: string
    memory: {
      used: number
      total: number
      free: number
      usagePercent: number
    }
    cpu: {
      loadAverage: number[]
    }
  }
  services: {
    nextjs: 'ok' | 'error'
    database?: 'ok' | 'error'
    external?: 'ok' | 'error'
  }
  deployment: {
    releaseId?: string
    deployedAt?: string
    environment: string
  }
}

// Función para obtener información del build
function getBuildInfo() {
  try {
    // Intentar leer el archivo build-info.json creado durante el deployment
    const buildInfoPath = join(process.cwd(), 'build-info.json')
    const buildInfo = JSON.parse(readFileSync(buildInfoPath, 'utf-8'))
    return {
      commit: buildInfo.commit?.substring(0, 8) || 'unknown',
      buildTime: buildInfo.build_time || 'unknown',
      buildNumber: buildInfo.workflow_run || 'unknown',
      deployedBy: buildInfo.actor || 'unknown'
    }
  } catch (error) {
    return {
      commit: 'unknown',
      buildTime: 'unknown',
      buildNumber: 'unknown',
      deployedBy: 'unknown'
    }
  }
}

// Función para obtener información del package.json
function getPackageInfo() {
  try {
    const packagePath = join(process.cwd(), 'package.json')
    const packageInfo = JSON.parse(readFileSync(packagePath, 'utf-8'))
    return {
      version: packageInfo.version || '0.0.0',
      name: packageInfo.name || 'unknown'
    }
  } catch (error) {
    return {
      version: '0.0.0',
      name: 'unknown'
    }
  }
}

// Función para obtener información del sistema
function getSystemInfo() {
  const memoryUsage = process.memoryUsage()
  const totalMemory = process.env.NODE_OPTIONS?.includes('max-old-space-size') 
    ? parseInt(process.env.NODE_OPTIONS.match(/max-old-space-size=(\d+)/)?.[1] || '0') * 1024 * 1024
    : 1024 * 1024 * 1024 // Default 1GB
  
  return {
    platform: process.platform,
    nodeVersion: process.version,
    memory: {
      used: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
      total: Math.round(totalMemory / 1024 / 1024), // MB
      free: Math.round((totalMemory - memoryUsage.heapUsed) / 1024 / 1024), // MB
      usagePercent: Math.round((memoryUsage.heapUsed / totalMemory) * 100)
    },
    cpu: {
      loadAverage: (process as any).loadavg ? (process as any).loadavg() : [0, 0, 0]
    }
  }
}

// Función para obtener información del deployment
function getDeploymentInfo() {
  const releaseId = process.env.RELEASE_ID || 'unknown'
  const deployedAt = process.env.DEPLOYED_AT || new Date().toISOString()
  
  return {
    releaseId,
    deployedAt,
    environment: process.env.NODE_ENV || 'unknown'
  }
}

// Función para verificar servicios externos
async function checkServices() {
  const services = {
    nextjs: 'ok' as const,
    // Aquí puedes añadir más verificaciones de servicios
    // database: await checkDatabase(),
    // external: await checkExternalAPI()
  }
  
  return services
}

// Función para verificar si hay problemas críticos
function checkCriticalIssues(systemInfo: any) {
  const issues = []
  
  // Verificar uso de memoria
  if (systemInfo.memory.usagePercent > 90) {
    issues.push('High memory usage')
  }
  
  // Verificar carga de CPU
  if (systemInfo.cpu.loadAverage[0] > 2) {
    issues.push('High CPU load')
  }
  
  return issues
}

// Handler para GET requests
export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Obtener información del sistema y aplicación
    const packageInfo = getPackageInfo()
    const buildInfo = getBuildInfo()
    const systemInfo = getSystemInfo()
    const deploymentInfo = getDeploymentInfo()
    const services = await checkServices()
    
    // Verificar problemas críticos
    const criticalIssues = checkCriticalIssues(systemInfo)
    const hasErrors = criticalIssues.length > 0
    
    // Construir respuesta
    const healthResponse: HealthCheckResponse = {
      status: hasErrors ? 'error' : 'ok',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      version: packageInfo.version,
      environment: process.env.NODE_ENV || 'unknown',
      build: buildInfo,
      system: systemInfo,
      services,
      deployment: deploymentInfo
    }
    
    // Añadir información de problemas si existen
    if (hasErrors) {
      (healthResponse as any).issues = criticalIssues
    }
    
    // Calcular tiempo de respuesta
    const responseTime = Date.now() - startTime
    ;(healthResponse as any).responseTime = responseTime
    
    // Determinar código de estado HTTP
    const statusCode = hasErrors ? 503 : 200
    
    // Log para debugging (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.log(`Health check completed in ${responseTime}ms - Status: ${healthResponse.status}`)
    }
    
    return NextResponse.json(healthResponse, { 
      status: statusCode,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
        'X-Health-Check': 'true',
        'X-Response-Time': responseTime.toString()
      }
    })
    
  } catch (error) {
    console.error('Health check error:', error)
    
    // Respuesta de error
    const errorResponse = {
      status: 'error',
      timestamp: new Date().toISOString(),
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
        type: 'health_check_error'
      },
      responseTime: Date.now() - startTime
    }
    
    return NextResponse.json(errorResponse, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
        'X-Health-Check': 'true'
      }
    })
  }
}

// Handler para HEAD requests (para verificaciones rápidas)
export async function HEAD(request: NextRequest) {
  try {
    const systemInfo = getSystemInfo()
    const criticalIssues = checkCriticalIssues(systemInfo)
    const hasErrors = criticalIssues.length > 0
    
    return new NextResponse(null, {
      status: hasErrors ? 503 : 200,
      headers: {
        'X-Health-Status': hasErrors ? 'error' : 'ok',
        'X-Health-Check': 'true',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
  } catch (error) {
    return new NextResponse(null, {
      status: 500,
      headers: {
        'X-Health-Status': 'error',
        'X-Health-Check': 'true',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
  }
}

// Exportar métodos soportados
export const dynamic = 'force-dynamic' 