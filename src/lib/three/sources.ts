export interface Source {
  name: string
  type: 'gltfModel' | 'KTX2Texture' | 'texture' | 'videoTexture'
  path: string
}

// SOURCES SIMPLIFICADO PARA VALIDACIÓN INICIAL
// Solo recursos esenciales para verificar que el sistema funciona
export default [
  // Modelos principales - empezar solo con uno
  {
    name: 'ramenShopModel',
    type: 'gltfModel',
    path: 'models/ramenShop/glTF/ramenShop.gltf'
  },
  
  // Modelo alternativo en caso de problemas con DRACO
  {
    name: 'ramenHologram',
    type: 'gltfModel', 
    path: 'models/ramenShop/glTF/ramenHologram.gltf'
  },
  
  // Baked Textures
  {
    name: 'ramenShopBakedTexture',
    type: 'KTX2Texture',
    path: 'textures/baked/ramenShopBaked1024.ktx2'
  },
  {
    name: 'machinesBakedTexture',
    type: 'KTX2Texture',
    path: 'textures/baked/machinesBaked1024.ktx2'
  },
  {
    name: 'floorBakedTexture',
    type: 'KTX2Texture',
    path: 'textures/baked/floorBaked1024.ktx2'
  },
  {
    name: 'miscBakedTexture',
    type: 'KTX2Texture',
    path: 'textures/baked/miscBaked1024.ktx2'
  },
  {
    name: 'graphicsBakedTexture',
    type: 'KTX2Texture',
    path: 'textures/baked/graphicsBaked512.ktx2'
  },
  
  // Matcap Textures
  {
    name: 'dishMatcapTexture',
    type: 'KTX2Texture',
    path: 'textures/matcaps/dishMatCap.ktx2'
  },
  {
    name: 'fanMatcapTexture',
    type: 'KTX2Texture',
    path: 'textures/matcaps/fanMatCap.ktx2'
  },
  {
    name: 'lightMatcapTexture',
    type: 'texture',
    path: 'textures/matcaps/lightMatcap.png'
  },
  {
    name: 'neonBlueMatcapTexture',
    type: 'KTX2Texture',
    path: 'textures/matcaps/neonBlueMatCap.ktx2'
  },
  {
    name: 'neonGreenMatcapTexture',
    type: 'KTX2Texture',
    path: 'textures/matcaps/neonGreenMatCap.ktx2'
  }
] as Source[] 