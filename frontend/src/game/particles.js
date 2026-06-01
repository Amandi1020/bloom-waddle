export let particles = []

export function spawnParticles(x, y, points) {
  const colors = ['#ff6b9d', '#ffd93d', '#6bcb77', '#4d96ff', '#ff922b']
  
  for (let i = 0; i < 8; i++) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6 - 2,
      alpha: 1,
      size: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    })
  }

  // Score pop text
  particles.push({
    x,
    y,
    vx: 0,
    vy: -2,
    alpha: 1,
    size: 16,
    color: '#ffffff',
    text: `+${points}`,
    isText: true,
  })
}

export function updateParticles() {
  particles.forEach(p => {
    p.x += p.vx
    p.y += p.vy
    p.alpha -= 0.03
  })
  particles = particles.filter(p => p.alpha > 0)
}

export function drawParticles(ctx) {
  particles.forEach(p => {
    ctx.save()
    ctx.globalAlpha = p.alpha

    if (p.isText) {
      ctx.font = `bold ${p.size}px Segoe UI`
      ctx.fillStyle = p.color
      ctx.textAlign = 'center'
      ctx.fillText(p.text, p.x, p.y)
    } else {
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.restore()
  })
}