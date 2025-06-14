import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import EventEmitter from './EventEmitter'

interface Source {
  name: string
  type: 'gltfModel' | 'texture' | 'KTX2Texture'
  path: string
}

export default class Resources extends EventEmitter {
  public sources: Source[]
  public items: { [key: string]: any } = {}
  public toLoad: number
  public loaded: number
  private loaders: { [key: string]: any } = {}

  constructor(sources: Source[]) {
    super()

    this.sources = sources
    this.toLoad = this.sources.length
    this.loaded = 0

    this.setLoaders()
    this.startLoading()
  }

  private setLoaders() {
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.textureLoader = new THREE.TextureLoader()
    this.loaders.ktx2Loader = new KTX2Loader()
    
    // Set decoder path for KTX2
    this.loaders.ktx2Loader.setTranscoderPath('/three/basis/')
  }

  private startLoading() {
    // If no sources, trigger ready immediately
    if (this.toLoad === 0) {
      this.trigger('ready')
      return
    }

    for (const source of this.sources) {
      switch (source.type) {
        case 'gltfModel':
          this.loaders.gltfLoader.load(
            source.path,
            (file: any) => this.sourceLoaded(source, file),
            (progress: any) => this.sourceProgress(source, progress),
            (error: any) => this.sourceError(source, error)
          )
          break

        case 'texture':
          this.loaders.textureLoader.load(
            source.path,
            (file: any) => this.sourceLoaded(source, file),
            (progress: any) => this.sourceProgress(source, progress),
            (error: any) => this.sourceError(source, error)
          )
          break

        case 'KTX2Texture':
          this.loaders.ktx2Loader.load(
            source.path,
            (file: any) => this.sourceLoaded(source, file),
            (progress: any) => this.sourceProgress(source, progress),
            (error: any) => this.sourceError(source, error)
          )
          break
      }
    }
  }

  private sourceLoaded(source: Source, file: any) {
    this.items[source.name] = file
    this.loaded++

    this.trigger('sourceLoaded', [source, file])

    if (this.loaded === this.toLoad) {
      this.trigger('ready')
    }
  }

  private sourceProgress(source: Source, progress: any) {
    this.trigger('sourceProgress', [source, progress])
  }

  private sourceError(source: Source, error: any) {
    console.error(`Error loading ${source.name}:`, error)
    this.trigger('sourceError', [source, error])
  }
} 