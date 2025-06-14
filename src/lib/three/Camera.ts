import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import Experience from './Experience'

export default class Camera {
  public instance!: THREE.PerspectiveCamera
  public controls!: OrbitControls
  private experience: Experience
  private config: any
  private sizes: any
  private scene: THREE.Scene
  private canvas: HTMLCanvasElement

  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.config = this.experience.config

    this.setInstance()
    this.setControls()
    this.setCamAngles()
  }

  private setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.4,
      50
    )
    this.instance.position.set(15.9, 6.8, -11.4)
    this.scene.add(this.instance)
  }

  private setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
    this.controls.enablePan = false
    this.controls.rotateSpeed = 1.2
    this.controls.zoomSpeed = 0.8
    this.controls.target.z = -1
    this.controls.enableRotate = false
    this.controls.enableZoom = false
  }

  private setCamAngles() {
    // Configuraciones de cámara para diferentes vistas
    this.controls.minDistance = 7
    this.controls.maxDistance = 16
    this.controls.minAzimuthAngle = 0
    this.controls.maxAzimuthAngle = Math.PI * 1.9999
    this.controls.minPolarAngle = Math.PI * 0.2
    this.controls.maxPolarAngle = Math.PI * 0.55
  }

  public resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  public update() {
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
    const projectsDistance = this.config.vertical ? 4.6 : 4.2
    
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