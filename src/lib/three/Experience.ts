import * as THREE from 'three'
import Sizes from './utils/Sizes'
import Time from './utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import Resources from './utils/Resources'
import World from './World'
import sources from './sources'

let instance: Experience | null = null

export default class Experience {
  public canvas!: HTMLCanvasElement
  public scene!: THREE.Scene
  public sizes!: Sizes
  public time!: Time
  public camera!: Camera
  public renderer!: Renderer
  public resources!: Resources
  public world!: World
  public config!: { touch: boolean; vertical: boolean }

  constructor(canvas?: HTMLCanvasElement) {
    // Singleton
    if (instance) {
      return instance
    }
    instance = this

    // Global access (solo en development)
    if (process.env.NODE_ENV === 'development') {
      ;(window as any).experience = this
    }

    // Validación del canvas
    if (!canvas) {
      throw new Error('Canvas element is required')
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
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.resources = new Resources(sources)
    this.world = new World()

    // Events
    this.sizes.on('resize', () => this.resize())
    this.time.on('tick', () => this.update())
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

  public destroy() {
    this.sizes.off('resize')
    this.time.off('tick')

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
    instance = null
  }
} 