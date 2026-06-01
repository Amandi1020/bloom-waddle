const duckImg = new Image()
duckImg.src = '/assets/duck.png'

export const duck = {
  x: 350,
  y: 320,
  width: 80,
  height: 80,
  speed: 3,
  direction: 'right',
  moving: false,
  frame: 0,
  frameTimer: 0,
  framerate: 10,
}

export const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
}

export function setupControls() {
  window.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.key)) {
      keys[e.key] = true
      e.preventDefault()
    }
  })
  window.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.key)) {
      keys[e.key] = false
    }
  })
}

export function updateDuck(canvasWidth, canvasHeight) {
  duck.moving = false

  if (keys.ArrowLeft) {
    duck.x -= duck.speed
    duck.direction = 'left'
    duck.moving = true
  }
  if (keys.ArrowRight) {
    duck.x += duck.speed
    duck.direction = 'right'
    duck.moving = true
  }
  if (keys.ArrowUp) {
    duck.y -= duck.speed
    duck.moving = true
  }
  if (keys.ArrowDown) {
    duck.y += duck.speed
    duck.moving = true
  }

  // Keep duck inside canvas bounds
  duck.x = Math.max(0, Math.min(canvasWidth - duck.width, duck.x))
  duck.y = Math.max(canvasHeight * 0.55, Math.min(canvasHeight - duck.height, duck.y))

  // Waddle animation
  if (duck.moving) {
    duck.frameTimer++
    if (duck.frameTimer >= duck.framerate) {
      duck.frame = duck.frame === 0 ? 1 : 0
      duck.frameTimer = 0
    }
  } else {
    duck.frame = 0
    duck.frameTimer = 0
  }
}

export function drawDuck(ctx) {
  ctx.save()

  // Waddle effect — slight bounce when moving
  const bounce = duck.moving && duck.frame === 1 ? -4 : 0

  // Flip image if moving left
  if (duck.direction === 'left') {
    ctx.translate(duck.x + duck.width, duck.y + bounce)
    ctx.scale(-1, 1)
    ctx.drawImage(duckImg, 0, 0, duck.width, duck.height)
  } else {
    ctx.drawImage(duckImg, duck.x, duck.y + bounce, duck.width, duck.height)
  }

  ctx.restore()
}