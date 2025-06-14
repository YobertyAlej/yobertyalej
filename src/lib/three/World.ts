import * as THREE from 'three'
import Experience from './Experience'

export default class World {
  private experience: Experience
  private scene: THREE.Scene
  private resources: any

  // Demo objects
  private testCube?: THREE.Mesh
  private ambientLight?: THREE.AmbientLight
  private directionalLight?: THREE.DirectionalLight

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    // Wait for resources to be ready (even if empty)
    this.resources.on('ready', () => {
      this.setupLights()
      this.setupTestObjects()
    })

    // If no resources to load, setup immediately
    if (this.resources.toLoad === 0) {
      this.setupLights()
      this.setupTestObjects()
    }
  }

  private setupLights() {
    // Ambient light
    this.ambientLight = new THREE.AmbientLight('#b9d5ff', 0.4)
    this.scene.add(this.ambientLight)

    // Directional light
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

  private setupTestObjects() {
    // Create a simple rotating cube for testing
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshStandardMaterial({ 
      color: '#3b82f6',
      metalness: 0.3,
      roughness: 0.7
    })
    
    this.testCube = new THREE.Mesh(geometry, material)
    this.testCube.castShadow = true
    this.testCube.receiveShadow = true
    this.testCube.position.set(0, 1, 0)
    this.scene.add(this.testCube)

    // Add a ground plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20)
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: '#404040',
      metalness: 0,
      roughness: 1
    })
    
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.receiveShadow = true
    ground.rotation.x = -Math.PI * 0.5
    this.scene.add(ground)
  }

  public update() {
    // Animate test cube
    if (this.testCube) {
      this.testCube.rotation.x += 0.01
      this.testCube.rotation.y += 0.015
      this.testCube.position.y = 1 + Math.sin(this.experience.time.elapsed * 0.001) * 0.5
    }
  }
} 