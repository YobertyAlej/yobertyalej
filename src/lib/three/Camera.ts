import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import Experience from './Experience'

export default class Camera {
  public experience: Experience
  public sizes: any
  public scene: THREE.Scene
  public canvas: HTMLCanvasElement
  public instance!: THREE.PerspectiveCamera
  public controls!: OrbitControls
  public config: any

  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.config = this.experience.config

    this.setInstance()
    this.setControls()
  }

  private setInstance(): void {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    )
    
    // Closer position for debugging
    this.instance.position.set(8, 3, 7)
    
    this.scene.add(this.instance)
    
    console.log('📷 Camera positioned for BALANCED scale view')
    console.log(`📍 Camera position: (8, 3, 7) - closer for debugging`)
  }

  private setControls(): void {
    this.controls = new OrbitControls(this.instance, this.canvas)
    
    // Target center of the ramen shop
    this.controls.target.set(0, 0, -1)
    
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.enablePan = false
    this.controls.rotateSpeed = 1.2
    this.controls.zoomSpeed = 0.8
    
    // Distance limits optimized for the scene
    this.controls.minDistance = 3
    this.controls.maxDistance = 20
    
    // Angle limits to keep focus on the shop
    this.controls.minAzimuthAngle = 0 
    this.controls.maxAzimuthAngle = Math.PI * 1.9999
    this.controls.minPolarAngle = Math.PI * 0.2
    this.controls.maxPolarAngle = Math.PI * 0.65
    
    // Enable controls
    this.controls.enableRotate = true
    this.controls.enableZoom = true
    
    console.log('🎮 Camera controls ENABLED with optimized settings!')
    console.log('📐 Camera angles configured for perfect ramen shop view')
  }

  // Method to unlock camera for free exploration (debug mode)
  unlockCamera(): void {
    this.controls.maxDistance = 30
    this.controls.minDistance = 0
    this.controls.minAzimuthAngle = 0
    this.controls.maxAzimuthAngle = Math.PI * 1.999
    this.controls.minPolarAngle = 0
    this.controls.maxPolarAngle = Math.PI
    this.controls.enablePan = true
    
    console.log('🔓 Camera unlocked for free exploration!')
  }

  resize(): void {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update(): void {
    this.controls.update()
  }

  // Transition methods from boilerplate
  public async transitionToDefault(duration: number = 1.5) {
    this.controls.enableRotate = false
    this.controls.enableZoom = false

    gsap.to(this.instance.position, { 
      duration: duration, 
      ease: "power1.inOut",
      x: -11.1,
      y: -1,
      z: -7.6
    })
    
    gsap.to(this.controls.target, { 
      duration: duration, 
      ease: "power1.inOut",
      x: 0,
      y: 0,
      z: -1
    })

    await this.sleep(duration * 1000)
    this.controls.enableRotate = true
    this.controls.enableZoom = true
  }

  public async transitionToProjects(duration: number = 1.5) {
    const projectsDistance = this.experience.config.vertical ? 4.6 : 4.2
    
    this.controls.enableRotate = false
    this.controls.enableZoom = false

    gsap.to(this.instance.position, { 
      duration: duration, 
      ease: "power1.inOut",
      x: 1.15,
      y: -1.2,
      z: projectsDistance
    })
    
    gsap.to(this.controls.target, { 
      duration: duration, 
      ease: "power1.inOut",
      x: 1.15,
      y: -1.2,
      z: 1.7
    })

    await this.sleep(duration * 1000)
    this.controls.enableZoom = true
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
} 