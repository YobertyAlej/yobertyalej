import * as THREE from 'three'
import Experience from '../Experience'

export class Materials {
  private experience: Experience
  private scene: THREE.Scene
  private resources: any
  private _isReady: boolean = false

  // Basic materials
  public greenSignMaterial?: THREE.MeshBasicMaterial
  public redSignMaterial?: THREE.MeshBasicMaterial
  public whiteSignMaterial?: THREE.MeshBasicMaterial
  public blackSignMaterial?: THREE.MeshBasicMaterial
  public pinkSignMaterial?: THREE.MeshBasicMaterial
  public blueSignMaterial?: THREE.MeshBasicMaterial
  public orangeSignMaterial?: THREE.MeshBasicMaterial
  public redLedMaterial?: THREE.MeshBasicMaterial
  public greenLedMaterial?: THREE.MeshBasicMaterial

  // Neon materials
  public neonYellowMaterial?: THREE.MeshBasicMaterial
  public neonPinkMaterial?: THREE.MeshBasicMaterial
  public neonBlueMaterial?: THREE.MeshBasicMaterial
  public poleLightMaterial?: THREE.MeshBasicMaterial
  public neonGreenMaterial?: THREE.MeshBasicMaterial

  // Baked texture materials
  public ramenShopMaterial?: THREE.MeshBasicMaterial
  public machinesMaterial?: THREE.MeshBasicMaterial
  public floorMaterial?: THREE.MeshBasicMaterial
  public miscMaterial?: THREE.MeshBasicMaterial
  public graphicsMaterial?: THREE.MeshBasicMaterial

  // Matcap materials
  public dishMatcapMaterial?: THREE.MeshMatcapMaterial
  public fanMatcapMaterial?: THREE.MeshMatcapMaterial

  // Shader materials
  public hologramBaseMaterial?: THREE.Material

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.mapColors()

    // Wait for textures
    this.resources.on('ready', () => {
      this.mapTextures()
    })

    console.log('🎨 Materials initialized')
  }

  public get isReady(): boolean {
    return this._isReady
  }

  private mapColors() {
    // Non-glowing lights
    this.greenSignMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('#1EFF51') })
    this.redSignMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('#FF0033') })
    this.whiteSignMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('#FFFFFF') })
    this.blackSignMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('#000000') })
    this.pinkSignMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('#FF2FD5') })
    this.blueSignMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('#01DDFF') })
    this.orangeSignMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('#FF5100') })
    this.redLedMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('#FF112B') })
    this.greenLedMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('#00FF00') })

    // Glowing lights
    this.neonYellowMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('#FFF668') })
    this.neonPinkMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('#FF3DCB') })
    this.neonBlueMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('#00BBFF') })
    this.poleLightMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('#FF5EF1') })
    this.neonGreenMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('#56FF54') })
  }

  private mapTextures() {
    console.log('🖼️ Mapping textures...')
    
    // Verify all textures are loaded
    const requiredTextures = [
      'ramenShopBakedTexture', 'machinesBakedTexture', 'floorBakedTexture', 
      'miscBakedTexture', 'graphicsBakedTexture', 'dishMatcapTexture', 'fanMatcapTexture'
    ]
    
    const missingTextures = requiredTextures.filter(name => !this.resources.items[name])
    if (missingTextures.length > 0) {
      console.warn('⚠️ Missing textures:', missingTextures)
    }
    
    // Map baked textures
    this.ramenShopMaterial = new THREE.MeshBasicMaterial({ 
      map: this.resources.items.ramenShopBakedTexture 
    })
    this.machinesMaterial = new THREE.MeshBasicMaterial({ 
      map: this.resources.items.machinesBakedTexture 
    })
    this.floorMaterial = new THREE.MeshBasicMaterial({ 
      map: this.resources.items.floorBakedTexture 
    })
    this.miscMaterial = new THREE.MeshBasicMaterial({ 
      map: this.resources.items.miscBakedTexture 
    })
    this.graphicsMaterial = new THREE.MeshBasicMaterial({ 
      map: this.resources.items.graphicsBakedTexture 
    })

    // Map matcap materials
    this.dishMatcapMaterial = new THREE.MeshMatcapMaterial({ 
      matcap: this.resources.items.dishMatcapTexture,
      side: THREE.DoubleSide 
    })
    this.fanMatcapMaterial = new THREE.MeshMatcapMaterial({ 
      matcap: this.resources.items.fanMatcapTexture 
    })

    // Hologram material with shader-like appearance
    this.hologramBaseMaterial = new THREE.MeshBasicMaterial({ 
      color: new THREE.Color('#42f2ff'),
      transparent: true,
      opacity: 0.5
    })

    this._isReady = true
    console.log('✅ Textures mapped with real assets - Materials are ready!')
    this.resources.trigger('texturesMapped')
  }

  update() {
    // Update shader uniforms if needed
  }
} 