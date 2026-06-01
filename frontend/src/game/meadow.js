export const THEMES = {
  day: {
    sky: '#87CEEB',
    ground: '#90EE90',
    groundDark: '#228B22',
  },
  night: {
    sky: '#1a1a2e',
    ground: '#2d5a27',
    groundDark: '#1a3a15',
  },
  rain: {
    sky: '#708090',
    ground: '#5a8a5a',
    groundDark: '#3a6a3a',
  },
  snow: {
    sky: '#e8f4f8',
    ground: '#ffffff',
    groundDark: '#c8e6f0',
  }
}

export function drawMeadow(ctx, width, height, theme = 'day') {
  const colors = THEMES[theme]

  const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.7)
  skyGradient.addColorStop(0, colors.sky)
  skyGradient.addColorStop(1, '#ffffff55')
  ctx.fillStyle = skyGradient
  ctx.fillRect(0, 0, width, height * 0.7)

  const groundGradient = ctx.createLinearGradient(0, height * 0.65, 0, height)
  groundGradient.addColorStop(0, colors.ground)
  groundGradient.addColorStop(1, colors.groundDark)
  ctx.fillStyle = groundGradient
  ctx.fillRect(0, height * 0.65, width, height * 0.35)

  ctx.beginPath()
  ctx.ellipse(width / 2, height * 0.65, width * 0.6, 30, 0, 0, Math.PI * 2)
  ctx.fillStyle = colors.ground
  ctx.fill()

  if (theme === 'day') {
    drawCloud(ctx, 100, 60, 60)
    drawCloud(ctx, 300, 40, 45)
    drawCloud(ctx, 550, 70, 55)
  }

  if (theme === 'night') {
    drawStars(ctx, width, height)
  }
}

function drawCloud(ctx, x, y, size) {
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  ctx.beginPath()
  ctx.arc(x, y, size * 0.5, 0, Math.PI * 2)
  ctx.arc(x + size * 0.4, y - size * 0.1, size * 0.35, 0, Math.PI * 2)
  ctx.arc(x + size * 0.8, y, size * 0.45, 0, Math.PI * 2)
  ctx.fill()
}

function drawStars(ctx, width, height) {
  ctx.fillStyle = 'rgba(255,255,255,0.8)'
  const stars = [
    [50, 30], [120, 50], [200, 20], [280, 60], [350, 35],
    [430, 55], [500, 25], [580, 45], [650, 30], [720, 60]
  ]
  stars.forEach(([x, y]) => {
    ctx.beginPath()
    ctx.arc(x, y, 2, 0, Math.PI * 2)
    ctx.fill()
  })
}