import Experience from '../Experience'

export default class Sounds {
  private experience: Experience
  private sounds: { [key: string]: HTMLAudioElement } = {}

  constructor() {
    this.experience = new Experience()
    
    this.setupSounds()
    console.log('🔊 Sounds system initialized')
  }

  private setupSounds() {
    // Add basic ambient sound
    try {
      // You can add sound files to public/sounds/ directory
      // this.sounds.ambient = new Audio('/sounds/ambient.mp3')
      // this.sounds.hologram = new Audio('/sounds/hologram.mp3')
      
      console.log('🎵 Sound files ready (add audio files to public/sounds/)')
    } catch (error) {
      console.log('🔇 No sound files found - running in silent mode')
    }
  }

  playHologram() {
    if (this.sounds.hologram) {
      this.sounds.hologram.currentTime = 0
      this.sounds.hologram.play().catch(() => {
        console.log('🔇 Could not play hologram sound')
      })
    }
  }

  playAmbient() {
    if (this.sounds.ambient) {
      this.sounds.ambient.loop = true
      this.sounds.ambient.volume = 0.3
      this.sounds.ambient.play().catch(() => {
        console.log('🔇 Could not play ambient sound')
      })
    }
  }

  stopAll() {
    Object.values(this.sounds).forEach(sound => {
      sound.pause()
      sound.currentTime = 0
    })
  }
} 