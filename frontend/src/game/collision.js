import { duck } from './duck'
import { flowers } from './flower'

export function checkCollisions(onCollect) {
  flowers.forEach(flower => {
    if (flower.collected) return

    // Simple box collision
    const duckCenterX = duck.x + duck.width / 2
    const duckCenterY = duck.y + duck.height / 2
    const flowerCenterX = flower.x + flower.size / 2
    const flowerCenterY = flower.y + flower.size / 2

    const distX = Math.abs(duckCenterX - flowerCenterX)
    const distY = Math.abs(duckCenterY - flowerCenterY)

    const hitRange = (duck.width / 2 + flower.size / 2) * 0.7

    if (distX < hitRange && distY < hitRange) {
      flower.collected = true
      onCollect(flower)
    }
  })
}