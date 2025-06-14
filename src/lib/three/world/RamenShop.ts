import * as THREE from 'three'
import Experience from '../Experience'
import { Materials } from './Materials'

export class RamenShop {
  private experience: Experience
  private scene: THREE.Scene
  private resources: any
  private materials: Materials
  private model?: THREE.Group

  // Model parts
  private ramenShop?: THREE.Object3D
  private machines?: THREE.Object3D
  private floor?: THREE.Object3D
  private misc?: THREE.Object3D
  private graphics?: THREE.Object3D
  private jesseZhouJoined?: THREE.Object3D

  // Moving objects
  private fan1?: THREE.Object3D
  private fan2?: THREE.Object3D
  private dish?: THREE.Object3D
  private dishStand?: THREE.Object3D

  // Lights and signs
  private projectsRed?: THREE.Object3D
  private projectsWhite?: THREE.Object3D
  private articlesRed?: THREE.Object3D
  private articlesWhite?: THREE.Object3D
  private chinese?: THREE.Object3D
  private neonBlue?: THREE.Object3D
  private neonPink?: THREE.Object3D
  private neonYellow?: THREE.Object3D
  private neonGreen?: THREE.Object3D

  // Screens
  private bigScreen?: THREE.Object3D
  private tallScreen?: THREE.Object3D
  private sideScreen?: THREE.Object3D
  private arcadeScreen?: THREE.Object3D

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.materials = this.experience.world.getMaterials()!

    // Get the resource
    const resource = this.resources.items.ramenShopModel
    if (resource && resource.scene) {
      this.parseModel(resource.scene)
      this.addObjects()
      this.setMaterials()
    } else {
      console.warn('⚠️ RamenShop model not found')
    }

    console.log('🏪 RamenShop initialized')
  }

  private parseModel(modelScene: THREE.Group) {
    this.model = modelScene
    this.model.name = 'RamenShopModel'

    // Find all the named objects from the model
    this.ramenShop = this.model.children.find(child => child.name === 'ramenShopJoined')
    this.machines = this.model.children.find(child => child.name === 'machinesJoined')
    this.floor = this.model.children.find(child => child.name === 'floor')
    this.misc = this.model.children.find(child => child.name === 'miscJoined')
    this.graphics = this.model.children.find(child => child.name === 'graphicsJoined')
    this.jesseZhouJoined = this.model.children.find(child => child.name === 'jesseZhouJoined')

    // Moving objects
    this.fan1 = this.model.children.find(child => child.name === 'fan1')
    this.fan2 = this.model.children.find(child => child.name === 'fan2')
    this.dish = this.model.children.find(child => child.name === 'dish')
    this.dishStand = this.model.children.find(child => child.name === 'dishStand')

    // Lights and signs
    this.projectsRed = this.model.children.find(child => child.name === 'projectsRed')
    this.projectsWhite = this.model.children.find(child => child.name === 'projectsWhite')
    this.articlesRed = this.model.children.find(child => child.name === 'articlesRed')
    this.articlesWhite = this.model.children.find(child => child.name === 'articlesWhite')
    this.chinese = this.model.children.find(child => child.name === 'chinese')
    this.neonBlue = this.model.children.find(child => child.name === 'neonBlue')
    this.neonPink = this.model.children.find(child => child.name === 'neonPink')
    this.neonYellow = this.model.children.find(child => child.name === 'neonYellow')
    this.neonGreen = this.model.children.find(child => child.name === 'neonGreen')

    // Screens
    this.bigScreen = this.model.children.find(child => child.name === 'bigScreen')
    this.tallScreen = this.model.children.find(child => child.name === 'tallScreen')
    this.sideScreen = this.model.children.find(child => child.name === 'sideScreen')
    this.arcadeScreen = this.model.children.find(child => child.name === 'arcadeScreen')

    console.log('📦 RamenShop model parsed')
    console.log('🔍 Found components:', {
      ramenShop: !!this.ramenShop,
      machines: !!this.machines,
      floor: !!this.floor,
      misc: !!this.misc,
      graphics: !!this.graphics,
      neonBlue: !!this.neonBlue,
      neonPink: !!this.neonPink
    })
  }

  private addObjects() {
    // Add any additional objects here
  }

  private setMaterials() {
    // Fix race condition: Check if textures are already mapped
    if (this.materials && this.materials.isReady) {
      console.log('🎨 Materials already ready, applying immediately')
      this.applyMaterials()
      this.addModelToScene()
    } else {
      console.log('⏳ Waiting for materials to be ready...')
      // Wait for materials to be ready
      this.resources.on('texturesMapped', () => {
        console.log('🎨 Materials ready, applying now')
        this.applyMaterials()
        this.addModelToScene()
      })
    }
  }

  private addModelToScene() {
    if (this.model) {
      // BALANCED scale - visible but not too big (0.08 = optimal visibility)
      this.model.scale.setScalar(0.08)
      
      // BETTER position - slightly raised for optimal view
      this.model.position.set(0, -1.5, 0)
      
      // Ensure the model is visible by checking its bounds
      const box = new THREE.Box3().setFromObject(this.model)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())
      
      console.log('📦 Model bounds:')
      console.log(`  Size: ${size.x.toFixed(2)} x ${size.y.toFixed(2)} x ${size.z.toFixed(2)}`)
      console.log(`  Center: ${center.x.toFixed(2)}, ${center.y.toFixed(2)}, ${center.z.toFixed(2)}`)
      
      this.scene.add(this.model)
      
      console.log('🎭 RamenShop added to scene with BALANCED settings!')
      console.log(`📏 Scale: 0.08 (optimal for visibility)`)
      console.log(`📍 Position: (0, -1.5, 0) - raised for better view`)
      console.log(`🧩 Model children count: ${this.model.children.length}`)
      
      // Debug: List model components
      this.model.children.forEach((child, index) => {
        console.log(`  ${index}: ${child.name || 'unnamed'} (${child.type})`)
      })
    } else {
      console.error('❌ Cannot add model to scene - model is undefined')
    }
  }

  private applyMaterials() {
    if (!this.materials) return

    console.log('🎨 Applying materials to components...')

    // Apply materials to main objects
    if (this.ramenShop && this.materials.ramenShopMaterial) {
      (this.ramenShop as THREE.Mesh).material = this.materials.ramenShopMaterial
      console.log('✅ RamenShop material applied')
    }
    if (this.machines && this.materials.machinesMaterial) {
      (this.machines as THREE.Mesh).material = this.materials.machinesMaterial
      console.log('✅ Machines material applied')
    }
    if (this.floor && this.materials.floorMaterial) {
      (this.floor as THREE.Mesh).material = this.materials.floorMaterial
      console.log('✅ Floor material applied')
    }
    if (this.misc && this.materials.miscMaterial) {
      (this.misc as THREE.Mesh).material = this.materials.miscMaterial
      console.log('✅ Misc material applied')
    }
    if (this.graphics && this.materials.graphicsMaterial) {
      (this.graphics as THREE.Mesh).material = this.materials.graphicsMaterial
      console.log('✅ Graphics material applied')
    }

    // Apply materials to moving objects
    if (this.fan1 && this.materials.fanMatcapMaterial) {
      (this.fan1 as THREE.Mesh).material = this.materials.fanMatcapMaterial
    }
    if (this.fan2 && this.materials.fanMatcapMaterial) {
      (this.fan2 as THREE.Mesh).material = this.materials.fanMatcapMaterial
    }
    if (this.dish && this.materials.dishMatcapMaterial) {
      (this.dish as THREE.Mesh).material = this.materials.dishMatcapMaterial
    }

    // Apply materials to neon lights
    if (this.neonBlue && this.materials.neonBlueMaterial) {
      (this.neonBlue as THREE.Mesh).material = this.materials.neonBlueMaterial
      console.log('✅ Neon Blue material applied')
    }
    if (this.neonPink && this.materials.neonPinkMaterial) {
      (this.neonPink as THREE.Mesh).material = this.materials.neonPinkMaterial
      console.log('✅ Neon Pink material applied')
    }
    if (this.neonYellow && this.materials.neonYellowMaterial) {
      (this.neonYellow as THREE.Mesh).material = this.materials.neonYellowMaterial
      console.log('✅ Neon Yellow material applied')
    }
    if (this.neonGreen && this.materials.neonGreenMaterial) {
      (this.neonGreen as THREE.Mesh).material = this.materials.neonGreenMaterial
      console.log('✅ Neon Green material applied')
    }

    // Apply materials to signs and interactive elements
    if (this.projectsRed && this.materials.redSignMaterial) {
      (this.projectsRed as THREE.Mesh).material = this.materials.redSignMaterial
      console.log('✅ Projects Red material applied')
    }
    if (this.projectsWhite && this.materials.whiteSignMaterial) {
      (this.projectsWhite as THREE.Mesh).material = this.materials.whiteSignMaterial
      console.log('✅ Projects White material applied')
    }
    if (this.articlesRed && this.materials.redSignMaterial) {
      (this.articlesRed as THREE.Mesh).material = this.materials.redSignMaterial
      console.log('✅ Articles Red material applied')
    }
    if (this.articlesWhite && this.materials.whiteSignMaterial) {
      (this.articlesWhite as THREE.Mesh).material = this.materials.whiteSignMaterial
      console.log('✅ Articles White material applied')
    }
    if (this.chinese && this.materials.whiteSignMaterial) {
      (this.chinese as THREE.Mesh).material = this.materials.whiteSignMaterial
      console.log('✅ Chinese text material applied')
    }

    console.log('🎨 All materials applied successfully!')
  }
} 