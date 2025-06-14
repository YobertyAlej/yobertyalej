import * as THREE from 'three'
import Experience from '../Experience'

export default class Environment {
  private experience: Experience
  private scene: THREE.Scene
  private resources: any

  public ambientLight!: THREE.AmbientLight
  public directionalLight!: THREE.DirectionalLight

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.setAmbientLight()
    this.setDirectionalLight()
  }

  private setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight('#b9d5ff', 0.4)
    this.scene.add(this.ambientLight)
  }

  private setDirectionalLight() {
    this.directionalLight = new THREE.DirectionalLight('#b9d5ff', 1)
    this.directionalLight.castShadow = true
    this.directionalLight.shadow.camera.far = 15
    this.directionalLight.shadow.camera.left = -7
    this.directionalLight.shadow.camera.top = 7
    this.directionalLight.shadow.camera.right = 7
    this.directionalLight.shadow.camera.bottom = -7
    this.directionalLight.position.set(5, 5, 5)
    this.scene.add(this.directionalLight)
  }
} 