import * as THREE from 'three'
import Experience from '../Experience'

export class Environment {
  private experience: Experience
  private scene: THREE.Scene
  private resources: any

  public ambientLight!: THREE.AmbientLight
  public directionalLight!: THREE.DirectionalLight

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.setupLighting()
    console.log('🌍 Environment initialized with lighting')
  }

  private setupLighting() {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    this.scene.add(ambientLight)
    
    // Directional light for definition
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    this.scene.add(directionalLight)
    
    // Additional light from the other side
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
    directionalLight2.position.set(-10, 5, -5)
    this.scene.add(directionalLight2)
    
    console.log('💡 Enhanced lighting setup complete')
  }
} 