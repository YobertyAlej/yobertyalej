interface CallbackMap {
  [namespace: string]: {
    [event: string]: Function[]
  }
}

export default class EventEmitter {
  private callbacks: CallbackMap = {}

  constructor() {
    this.callbacks.base = {}
  }

  on(names: string, callback: Function): this {
    if (!names || !callback) {
      console.warn('EventEmitter: Invalid names or callback')
      return this
    }

    const resolvedNames = this.resolveNames(names)
    
    resolvedNames.forEach((name) => {
      const resolved = this.resolveName(name)
      
      if (!this.callbacks[resolved.namespace]) {
        this.callbacks[resolved.namespace] = {}
      }
      
      if (!this.callbacks[resolved.namespace][resolved.value]) {
        this.callbacks[resolved.namespace][resolved.value] = []
      }
      
      this.callbacks[resolved.namespace][resolved.value].push(callback)
    })

    return this
  }

  off(names: string): this {
    if (!names) return this

    const resolvedNames = this.resolveNames(names)
    
    resolvedNames.forEach((name) => {
      const resolved = this.resolveName(name)
      
      if (resolved.namespace !== 'base' && resolved.value === '') {
        delete this.callbacks[resolved.namespace]
      } else {
        if (resolved.namespace === 'base') {
          for (const namespace in this.callbacks) {
            if (this.callbacks[namespace][resolved.value]) {
              delete this.callbacks[namespace][resolved.value]
              if (Object.keys(this.callbacks[namespace]).length === 0) {
                delete this.callbacks[namespace]
              }
            }
          }
        } else if (this.callbacks[resolved.namespace]?.[resolved.value]) {
          delete this.callbacks[resolved.namespace][resolved.value]
          if (Object.keys(this.callbacks[resolved.namespace]).length === 0) {
            delete this.callbacks[resolved.namespace]
          }
        }
      }
    })

    return this
  }

  trigger(name: string, args: any[] = []): any {
    if (!name) return null

    const resolved = this.resolveName(name)
    let finalResult: any = null

    if (resolved.namespace === 'base') {
      for (const namespace in this.callbacks) {
        if (this.callbacks[namespace][resolved.value]) {
          this.callbacks[namespace][resolved.value].forEach((callback) => {
            const result = callback.apply(this, args)
            if (finalResult === null) finalResult = result
          })
        }
      }
    } else if (this.callbacks[resolved.namespace]?.[resolved.value]) {
      this.callbacks[resolved.namespace][resolved.value].forEach((callback) => {
        const result = callback.apply(this, args)
        if (finalResult === null) finalResult = result
      })
    }

    return finalResult
  }

  private resolveNames(names: string): string[] {
    return names
      .replace(/[^a-zA-Z0-9 ,/.]/g, '')
      .replace(/[,/]+/g, ' ')
      .split(' ')
      .filter(Boolean)
  }

  private resolveName(name: string) {
    const parts = name.split('.')
    return {
      original: name,
      value: parts[0],
      namespace: parts.length > 1 && parts[1] ? parts[1] : 'base'
    }
  }
} 