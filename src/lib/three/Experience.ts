import * as THREE from 'three'
import Sizes from './utils/Sizes'
import Time from './utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import Resources from './utils/Resources'
import Sounds from './utils/Sounds'
import { World } from './World'
import sources from './sources'
import EventEmitter from './utils/EventEmitter'

export default class Experience extends EventEmitter {
  public canvas!: HTMLCanvasElement
  public scene!: THREE.Scene
  public sizes!: Sizes
  public time!: Time
  public camera!: Camera
  public renderer!: Renderer
  public resources!: Resources
  public sounds!: Sounds
  public world!: World
  public config!: { touch: boolean; vertical: boolean }

  constructor(canvas?: HTMLCanvasElement) {
    super()

    // Global access (solo en development)
    if (process.env.NODE_ENV === 'development') {
      ;(window as any).experience = this
      ;(window as any).unlockCamera = () => this.camera.unlockCamera()
      console.log('🔧 Debug mode: Use window.unlockCamera() to unlock camera controls')
    }

    // Validación del canvas
    if (!canvas) {
      console.error('❌ Canvas element not found!')
      return
    }

    this.canvas = canvas

    // Config
    this.config = {
      touch: false,
      vertical: false
    }

    // Touch detection
    window.addEventListener('touchstart', () => {
      this.config.touch = true
    }, { once: true })

    // Setup
    this.scene = new THREE.Scene()
    this.sizes = new Sizes()
    
    // Determinar orientación
    this.config.vertical = this.sizes.width / this.sizes.height <= 1

    this.time = new Time()
    
    // Setup in correct order of dependency
    this.camera = new Camera(this)
    this.renderer = new Renderer(this)
    this.resources = new Resources(this, sources)
    this.sounds = new Sounds(this)
    this.world = new World(this)

    // Events
    this.sizes.on('resize', () => this.resize())
    this.time.on('tick', () => this.update())

    // Ready event
    this.resources.on('ready', () => {
      console.log('Resources loaded!')
      
      // Debug scene info after everything is loaded
      this.debugSceneInfo()
    })

    console.log('✅ Experience initialized successfully')
    console.log('🎮 Camera controls should now be interactive!')
  }

  private resize() {
    this.config.vertical = this.sizes.width / this.sizes.height <= 1
    this.camera.resize()
    this.renderer.resize()
  }

  private update() {
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }

  private debugSceneInfo(): void {
    console.log('🔍 SCENE DEBUG INFO:')
    console.log('📦 Scene children count:', this.scene.children.length)
    console.log('🎥 Camera position:', this.camera.instance.position)
    console.log('🎯 Camera looking at:', this.camera.controls.target)
    console.log('🖼️ Canvas size:', this.canvas.width, 'x', this.canvas.height)
    console.log('🎨 Renderer info:', this.renderer.instance.info)
    
    // List all scene objects
    this.scene.children.forEach((child, index) => {
      console.log(`🧩 Scene child ${index}:`, child.type, child.name || 'unnamed', child.position)
    })
  }

  public destroy() {
    this.sizes.off('resize')
    this.time.off('tick')

    // Stop sounds
    if (this.sounds) {
      this.sounds.stopAll()
    }

    // Dispose of camera controls
    if(this.camera) {
      this.camera.destroy()
    }

    // Cleanup Three.js resources
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        if (Array.isArray(child.material)) {
          child.material.forEach(material => material.dispose())
        } else {
          child.material.dispose()
        }
      }
    })

    this.renderer.instance.dispose()
  }
} 