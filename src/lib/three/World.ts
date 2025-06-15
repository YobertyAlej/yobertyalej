import * as THREE from 'three'
import Experience from './Experience'
import { RamenShop } from './world/RamenShop'
import { Hologram } from './world/Hologram'
import { Materials } from './world/Materials'
import { Environment } from './world/Environment'

export class World {
  private experience: Experience
  private scene: THREE.Scene
  private resources: any
  private ramenShop?: RamenShop
  private hologram?: Hologram
  private materials?: Materials
  private environment?: Environment

  constructor(experience: Experience) {
    this.experience = experience
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    // Initialize environment first (lights)
    this.environment = new Environment(this.experience)

    // Initialize materials and wait for them to be ready
    this.materials = new Materials(this.experience)

    // Wait for resources to be ready
    this.resources.on('ready', () => {
      console.log('🏪 Setting up complete Ramen Shop scene...')
      
      // Small delay to ensure materials are fully processed
      setTimeout(() => {
        this.setupWorldComponents()
      }, 50)
    })
  }

  private setupWorldComponents() {
    // Setup world components after materials are ready
    this.ramenShop = new RamenShop(this.experience)
    this.hologram = new Hologram(this.experience)
    
    console.log('🎉 Complete Ramen Shop scene loaded!')
    
    // Debug scene after everything is loaded
    setTimeout(() => {
      console.log('🔍 Final scene check - Children count:', this.scene.children.length)
      this.scene.children.forEach((child, index) => {
        console.log(`  ${index}: ${child.type} - ${child.name || 'unnamed'}`)
      })
    }, 100)
  }

  update() {
    if (this.ramenShop) {
      this.ramenShop.update()
    }
    if (this.hologram) {
      this.hologram.update()
    }
    if (this.materials) {
      this.materials.update()
    }
  }

  getMaterials() {
    return this.materials
  }
} 