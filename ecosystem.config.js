module.exports = {
  apps: [{
    name: 'yobertyalej',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/var/www/yobertyalej.com/current',
    instances: 1,
    exec_mode: 'cluster',
    
    // Variables de entorno
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      // Optimizaciones de Next.js
      NEXT_TELEMETRY_DISABLED: 1,
      // Configuración de memoria
      NODE_OPTIONS: '--max-old-space-size=1024'
    },
    
    // Configuración de logs
    error_file: '/var/www/yobertyalej.com/shared/logs/err.log',
    out_file: '/var/www/yobertyalej.com/shared/logs/out.log',
    log_file: '/var/www/yobertyalej.com/shared/logs/combined.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Configuración de memoria y CPU
    max_memory_restart: '1G',
    
    // Configuración de reinicio automático
    restart_delay: 4000,
    max_restarts: 10,
    min_uptime: '10s',
    
    // Configuración de cluster
    kill_timeout: 5000,
    wait_ready: true,
    listen_timeout: 10000,
    
    // Health check configuración
    health_check_http: {
      url: 'http://localhost:3000/api/health',
      interval: 30000,
      timeout: 5000
    },
    
    // Configuración avanzada
    autorestart: true,
    watch: false,
    ignore_watch: [
      'node_modules',
      '.next',
      'logs',
      '*.log'
    ],
    
    // Configuración para zero-downtime deployments
    reload_delay: 2000,
    
    // Configuración de señales
    kill_retry_time: 100,
    
    // Configuración de logs rotativos
    log_rotation: {
      max_size: '10M',
      retain: 30,
      compress: true,
      dateFormat: 'YYYY-MM-DD_HH-mm-ss',
      workerInterval: 30,
      rotateInterval: '0 0 * * *'
    },
    
    // Configuración de monitoreo
    monitoring: {
      http: true,
      https: false,
      port: 9615
    },
    
    // Configuración de merge logs
    merge_logs: true,
    
    // Configuración de timezone
    time: true,
    
    // Configuración de source map support
    source_map_support: true,
    
    // Configuración de Node.js flags
    node_args: [
      '--harmony',
      '--max-old-space-size=1024'
    ],
    
    // Configuración de instance variables
    instance_var: 'INSTANCE_ID',
    
    // Configuración de post-deploy hooks
    post_update: [
      'npm install --production',
      'pm2 reload ecosystem.config.js --update-env'
    ],
    
    // Configuración de dependencies
    dependencies: [
      'next',
      'react',
      'react-dom'
    ],
    
    // Configuración de automated restart
    cron_restart: '0 4 * * *', // Reinicio diario a las 4 AM
    
    // Configuración de experimental features
    exp_backoff_restart_delay: 100,
    
    // Configuración de graceful shutdown
    shutdown_with_message: true,
    wait_ready_timeout: 10000,
    
    // Configuración de visualization
    vizion: true,
    
    // Configuración de auto-git-pull
    autoPull: false,
    
    // Configuración de environment-specific overrides
    env_development: {
      NODE_ENV: 'development',
      PORT: 3000,
      instances: 1
    },
    
    env_staging: {
      NODE_ENV: 'staging', 
      PORT: 3000,
      instances: 1
    },
    
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      instances: 1,
      NODE_OPTIONS: '--max-old-space-size=1024'
    }
  }],
  
  // Configuración de deployment (opcional para CI/CD manual)
  deploy: {
    production: {
      user: 'root',
      host: '192.241.137.162',
      ref: 'origin/main',
      repo: 'git@github.com:username/yobertyalej.git',
      path: '/var/www/yobertyalej.com',
      'pre-deploy-local': '',
      'post-deploy': 'npm install --production && pm2 reload ecosystem.config.js --update-env',
      'pre-setup': '',
      'ssh_options': 'StrictHostKeyChecking=no'
    }
  }
}; 