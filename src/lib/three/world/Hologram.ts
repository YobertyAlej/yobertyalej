import * as THREE from 'three'
import Experience from '../Experience'

export class Hologram {
  private experience: Experience
  private scene: THREE.Scene
  private resources: any
  private time: any
  private mesh?: THREE.Points
  private data?: any
  private animate: boolean = true
  private started: boolean = false

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time

    // Get the hologram resource
    const ramenHologram = this.resources.items.ramenHologram
    if (ramenHologram && ramenHologram.scene) {
      this.setupHologram(ramenHologram.scene)
    } else {
      console.warn('⚠️ Hologram model not found')
    }

    console.log('✨ Hologram initialized')
  }

  private setupHologram(hologramScene: THREE.Group) {
    // Combine all geometry positions into a single buffer
    const positions = this.combineBuffer(hologramScene, 'position')
    
    // Create the hologram mesh with corrected position and scale
    this.createMesh(positions, 0.08, 0, 1.2, -0.5) // scale, x, y, z
    
    // Start the animation after a delay
    setTimeout(() => {
      this.raiseHologram()
      this.started = true
    }, 100)
  }

  private combineBuffer(model: THREE.Group, bufferName: string): THREE.BufferAttribute {
    let totalCount = 0

    // Count total vertices
    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const buffer = mesh.geometry.attributes[bufferName]
        if (buffer) {
          totalCount += buffer.array.length
        }
      }
    })

    // Combine all position data
    const combined = new Float32Array(totalCount)
    let offset = 0

    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const buffer = mesh.geometry.attributes[bufferName]
        if (buffer) {
          combined.set(buffer.array, offset)
          offset += buffer.array.length
        }
      }
    })

    return new THREE.BufferAttribute(combined, 3)
  }

  private createMesh(positions: THREE.BufferAttribute, scale: number, x: number, y: number, z: number) {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', positions.clone())
    geometry.setAttribute('initialPosition', positions.clone())
    const positionAttr = geometry.attributes.position as THREE.BufferAttribute
    positionAttr.setUsage(THREE.DynamicDrawUsage)

    const material = new THREE.PointsMaterial({ 
      size: 0.01, 
      color: new THREE.Color(0x00ffff) 
    })

    this.mesh = new THREE.Points(geometry, material)
    this.mesh.scale.setScalar(scale)
    this.mesh.position.set(x, y, z)

    this.scene.add(this.mesh)

    // Setup animation data
    this.data = {
      mesh: this.mesh,
      verticesDown: 0,
      verticesUp: 0,
      direction: 0,
      speed: 15,
      delay: 500,
      start: 10
    }

    console.log('✨ Hologram mesh created')
  }

  private raiseHologram() {
    if (this.data && this.data.verticesDown >= this.getVertexCount()) {
      this.data.direction = 1
      this.data.speed = 5
      this.data.verticesDown = 0
      this.data.delay = 1000
    }
  }

  private breakHologram() {
    if (this.data && this.data.verticesUp >= this.getVertexCount() && this.animate) {
      this.data.direction = -1
      this.data.speed = 15
      this.data.verticesUp = 0
      this.data.delay = 50
    }
  }

  private getVertexCount(): number {
    if (!this.mesh) return 0
    return this.mesh.geometry.attributes.position.count
  }

  update() {
    if (!this.mesh || !this.data || !this.time) return

    const positions = this.mesh.geometry.attributes.position
    const initialPositions = this.mesh.geometry.attributes.initialPosition
    const count = positions.count

    if (this.data.start > 0) {
      this.data.start -= 1
    } else {
      if (this.data.direction === 0 && !this.started) {
        this.data.direction = -1
      }
    }

    // Animate particles
    for (let i = 0; i < count; i++) {
      const px = positions.getX(i)
      const py = positions.getY(i)
      const pz = positions.getZ(i)

      // Falling down
      if (this.data.direction < 0) {
        if (py > 0) {
          positions.setXYZ(
            i,
            px + 1.5 * (0.50 - Math.random()) * this.data.speed * this.time.delta * 0.01,
            py + 3.0 * (0.25 - Math.random()) * this.data.speed * this.time.delta * 0.01,
            pz + 1.5 * (0.50 - Math.random()) * this.data.speed * this.time.delta * 0.01
          )
        } else {
          this.data.verticesDown += 1
        }
      }

      // Rising up
      if (this.data.direction > 0) {
        const ix = initialPositions.getX(i)
        const iy = initialPositions.getY(i)
        const iz = initialPositions.getZ(i)

        const dx = Math.abs(px - ix)
        const dy = Math.abs(py - iy)
        const dz = Math.abs(pz - iz)
        const d = dx + dy + dz

        if (d > 1) {
          positions.setXYZ(
            i,
            px - (px - ix) / dx * this.data.speed * this.time.delta * (0.85 - Math.random()) * 0.01,
            py - (py - iy) / dy * this.data.speed * this.time.delta * (1 + Math.random()) * 0.01,
            pz - (pz - iz) / dz * this.data.speed * this.time.delta * (0.85 - Math.random()) * 0.01
          )
        } else {
          this.data.verticesUp += 1
        }
      }
    }

    positions.needsUpdate = true

    // Check for state changes
    this.raiseHologram()
    this.breakHologram()
  }
} 