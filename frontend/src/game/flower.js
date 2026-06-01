const flowerImages = {
  daisy: loadImage('/assets/flower-daisy.png'),
  sunflower: loadImage('/assets/flower-sunflower.png'),
  tulip: loadImage('/assets/flower-tulip.png'),
  rose: loadImage('/assets/flower-rose.png'),
  rainbow: loadImage('/assets/flower-rainbow.png'),
}

function loadImage(src) {
  const img = new Image()
  img.src = src
  return img
}

export const FLOWER_TYPES = [
  { type: 'daisy',     points: 1,  weight: 40, size: 70  },
  { type: 'sunflower', points: 2,  weight: 30, size: 80  },
  { type: 'tulip',     points: 3,  weight: 20, size: 75  },
  { type: 'rose',      points: 4,  weight: 8,  size: 70  },
  { type: 'rainbow',   points: 10, weight: 2,  size: 85  },
]

export let flowers = []
let spawnTimer = 0
const SPAWN_INTERVAL = 120 // frames

function randomFlowerType() {
  const totalWeight = FLOWER_TYPES.reduce((s, f) => s + f.weight, 0)
  let rand = Math.random() * totalWeight
  for (const f of FLOWER_TYPES) {
    rand -= f.weight
    if (rand <= 0) return f
  }
  return FLOWER_TYPES[0]
}

export function spawnFlower(canvasWidth, canvasHeight) {
  const type = randomFlowerType()
  flowers.push({
    id: Date.now() + Math.random(),
    type: type.type,
    points: type.points,
    size: type.size,
    x: Math.random() * (canvasWidth - 60) + 30,
    y: canvasHeight * 0.62 + Math.random() * (canvasHeight * 0.2),
    scale: 0,        // starts small, grows in
    collected: false,
  })
}

export function updateFlowers(canvasWidth, canvasHeight) {
  spawnTimer++
  if (spawnTimer >= SPAWN_INTERVAL) {
    spawnFlower(canvasWidth, canvasHeight)
    spawnTimer = 0
  }

  // Grow flowers in smoothly
  flowers.forEach(f => {
    if (f.scale < 1) f.scale = Math.min(1, f.scale + 0.05)
  })

  // Remove collected flowers
  flowers = flowers.filter(f => !f.collected)

  // Max 15 flowers on screen
  if (flowers.length > 15) flowers.shift()
}

export function drawFlowers(ctx) {
  flowers.forEach(f => {
    const img = flowerImages[f.type]
    const drawSize = f.size * f.scale
    const offset = (f.size - drawSize) / 2

    // Rainbow flower glows
    if (f.type === 'rainbow') {
      ctx.save()
      ctx.shadowColor = 'rgba(255, 200, 0, 0.8)'
      ctx.shadowBlur = 15
    }

    ctx.drawImage(img, f.x + offset, f.y + offset, drawSize, drawSize)

    if (f.type === 'rainbow') ctx.restore()
  })
}