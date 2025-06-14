import * as THREE from 'three'
import Experience from '../Experience'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import EventEmitter from './EventEmitter'

export interface Source {
  name: string
  type: 'gltfModel' | 'texture' | 'basisTexture' | 'KTX2Texture' | 'videoTexture'
  path: string
}

interface Loaders {
  dracoLoader: DRACOLoader
  gltfLoader: GLTFLoader
  gltfLoaderNoDraco: GLTFLoader // Fallback without DRACO
  textureLoader: THREE.TextureLoader
  cubeTextureLoader: THREE.CubeTextureLoader
  // basisTextureLoader: BasisTextureLoader
  KTX2TextureLoader: KTX2Loader
}

export default class Resources extends EventEmitter {
  public experience: Experience
  public sources: Source[]
  public renderer: THREE.WebGLRenderer
  public items: { [key: string]: any } = {}
  public toLoad: number
  public loaded: number = 0
  public video: { [key: string]: HTMLVideoElement } = {}
  public videoTexture: { [key: string]: THREE.VideoTexture } = {}
  public mychromavideotexturematerial: { [key: string]: any } = {}
  public carousel1: THREE.Texture[] = []
  public carousel2: THREE.Texture[] = []
  private loaders!: Loaders

  constructor(sources: Source[]) {
    super()

    this.experience = new Experience()
    this.sources = sources
    this.renderer = this.experience.renderer.instance

    this.toLoad = this.sources.length

    this.setLoaders()
    this.startLoading()
  }

  setLoaders(): void {
    this.loaders = {} as Loaders
    
    // Configure DRACO Loader with CDN for better compatibility
    this.loaders.dracoLoader = new DRACOLoader()
    
    // Try CDN first (more reliable and updated)
    this.loaders.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
    
    // Alternative: Use local files if CDN fails
    // this.loaders.dracoLoader.setDecoderPath('/draco/gltf/')
    
    // Configure GLTF Loader with DRACO
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
    
    // Configure fallback GLTF Loader without DRACO
    this.loaders.gltfLoaderNoDraco = new GLTFLoader()
    
    this.loaders.textureLoader = new THREE.TextureLoader()
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()

    // this.loaders.basisTextureLoader = new BasisTextureLoader()
    // this.loaders.basisTextureLoader.setTranscoderPath('/basis/')
    // this.loaders.basisTextureLoader.detectSupport(this.renderer)

    this.loaders.KTX2TextureLoader = new KTX2Loader()
    this.loaders.KTX2TextureLoader.setTranscoderPath('/basis/')
    this.loaders.KTX2TextureLoader.detectSupport(this.renderer)
  }

  startLoading(): void {
    // Load each source
    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loadGLTFModel(source)
      }
      else if (source.type === 'texture') {
        this.loaders.textureLoader.load(
          source.path,
          (file) => {
            file.flipY = false
            file.colorSpace = THREE.SRGBColorSpace
            this.sourceLoaded(source, file)
          },
          undefined,
          (error) => {
            console.error('❌ Texture loading error:', source.name, error)
            this.handleLoadError(source)
          }
        )
      }
      // else if (source.type === 'basisTexture') {
      //   this.loaders.basisTextureLoader.load(
      //     source.path,
      //     (file) => {
      //       file.colorSpace = THREE.SRGBColorSpace
      //       this.sourceLoaded(source, file)

      //       if (source.path.includes("smallScreen1")) {
      //         this.carousel1.push(file)
      //       }

      //       if (source.path.includes("smallScreen2")) {
      //         this.carousel2.push(file)
      //       }
      //     }
      //   )
      // }
      else if (source.type === 'KTX2Texture') {
        this.loaders.KTX2TextureLoader.load(
          source.path,
          (file) => {
            file.colorSpace = THREE.SRGBColorSpace
            this.sourceLoaded(source, file)

            // if(source.path.includes("smallScreen1"))
            // {this.carousel1.push(file)}

            // if(source.path.includes("smallScreen2"))
            // {this.carousel2.push(file)}
          },
          undefined,
          (error) => {
            console.error('❌ KTX2 loading error:', source.name, error)
            this.handleLoadError(source)
          }
        )
      }
      else if (source.type === 'videoTexture') {
        this.video[source.name] = document.createElement('video')
        
        this.video[source.name].src = source.path
        this.video[source.name].muted = true
        this.video[source.name].playsInline = true
        this.video[source.name].autoplay = true
        this.video[source.name].loop = true
        // this.video[source.name].play()
        
        this.videoTexture[source.name] = new THREE.VideoTexture(this.video[source.name])
        this.videoTexture[source.name].flipY = false
        this.videoTexture[source.name].minFilter = THREE.NearestFilter
        this.videoTexture[source.name].magFilter = THREE.NearestFilter
        this.videoTexture[source.name].generateMipmaps = false
        this.videoTexture[source.name].colorSpace = THREE.SRGBColorSpace

        this.sourceLoaded(source, this.videoTexture[source.name])
      }
    }
  }

  private loadGLTFModel(source: Source): void {
    console.log(`🚀 Loading GLTF model: ${source.name} from ${source.path}`)
    
    // First try with DRACO support
    this.loaders.gltfLoader.load(
      source.path,
      (file) => {
        console.log('✅ GLTF loaded successfully with DRACO:', source.name)
        this.sourceLoaded(source, file)
      },
      (progress) => {
        console.log('📥 Loading progress:', source.name, progress)
      },
      (error) => {
        console.warn('⚠️ DRACO loading failed for:', source.name, 'Trying without DRACO...')
        console.error('DRACO Error details:', error)
        
        // Fallback: Try loading without DRACO
        this.loaders.gltfLoaderNoDraco.load(
          source.path,
          (file) => {
            console.log('✅ GLTF loaded successfully without DRACO:', source.name)
            this.sourceLoaded(source, file)
          },
          (progress) => {
            console.log('📥 Loading progress (no DRACO):', source.name, progress)
          },
          (fallbackError) => {
            console.error('❌ GLTF loading completely failed:', source.name, fallbackError)
            this.handleLoadError(source)
          }
        )
      }
    )
  }

  private handleLoadError(source: Source): void {
    // Mark as loaded anyway to prevent hanging
    this.loaded++
    console.log(`⏭️ Skipping failed resource: ${source.name} (${this.loaded}/${this.toLoad})`)
    
    if (this.loaded === this.toLoad) {
      this.trigger('ready')
    }
  }

  sourceLoaded(source: Source, file: any): void {
    this.trigger('itemLoaded')

    this.items[source.name] = file
    this.loaded++
    
    console.log(`✅ Resource loaded: ${source.name} (${this.loaded}/${this.toLoad})`)

    if (this.loaded === this.toLoad) {
      console.log('🎉 All resources loaded!')
      this.trigger('ready')
    }
  }
} 