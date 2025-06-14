import * as THREE from 'three'
import Experience from './Experience'

export default class Renderer {
  public experience: Experience
  public canvas: HTMLCanvasElement
  public sizes: any
  public scene: THREE.Scene
  public camera: any
  public instance!: THREE.WebGLRenderer

  constructor(experience: Experience) {
    this.experience = experience
    this.canvas = this.experience.canvas
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.camera = this.experience.camera

    this.setInstance()
  }

  private setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      powerPreference: 'high-performance'
    })

    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    this.instance.outputColorSpace = THREE.SRGBColorSpace
    
    console.log('🎨 Renderer configured with simplified settings')
  }

  public resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }

  public update() {
    this.instance.render(this.scene, this.camera.instance)
  }
} 