import { useRef, useCallback, useState, useEffect } from 'react'
import { useGameLoop } from './useGameLoop'
import { drawMeadow } from './meadow'
import { duck, setupControls, updateDuck, drawDuck } from './duck'
import { flowers, updateFlowers, drawFlowers, spawnFlower } from './flower'
import { checkCollisions } from './collision'
import { particles, spawnParticles, updateParticles, drawParticles } from './particles'

export default function GameCanvas() {
  const canvasRef = useRef(null)
  const [theme, setTheme] = useState('day')
  const [score, setScore] = useState(0)
  const [flowerCount, setFlowerCount] = useState(0)
  const themeRef = useRef('day')
  const scoreRef = useRef(0)
  const flowerCountRef = useRef(0)

  useEffect(() => {
    setupControls()
    // Spawn a few flowers at start
    setTimeout(() => {
      const canvas = canvasRef.current
      if (canvas) {
        for (let i = 0; i < 5; i++) {
          spawnFlower(canvas.width, canvas.height)
        }
      }
    }, 500)
  }, [])

  const handleCollect = useCallback((flower) => {
    scoreRef.current += flower.points
    flowerCountRef.current += 1
    setScore(scoreRef.current)
    setFlowerCount(flowerCountRef.current)
    spawnParticles(
      flower.x + flower.size / 2,
      flower.y,
      flower.points
    )
  }, [])

  const render = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas

    ctx.clearRect(0, 0, width, height)

    drawMeadow(ctx, width, height, themeRef.current)

    updateFlowers(width, height)
    drawFlowers(ctx)

    updateDuck(width, height)
    drawDuck(ctx)

    checkCollisions(handleCollect)

    updateParticles()
    drawParticles(ctx)

  }, [handleCollect])

  useGameLoop(render)

  const changeTheme = (newTheme) => {
    themeRef.current = newTheme
    setTheme(newTheme)
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        style={{
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          display: 'block'
        }}
      />

      {/* Score HUD */}
      <div style={{
        position: 'absolute',
        top: 12,
        left: 12,
        background: 'rgba(0,0,0,0.5)',
        color: 'white',
        padding: '6px 14px',
        borderRadius: '12px',
        fontSize: '14px',
        display: 'flex',
        gap: '14px'
      }}>
        <span>⭐ {score}</span>
        <span>🌸 {flowerCount}</span>
      </div>

      {/* Theme buttons */}
      <div style={{
        position: 'absolute',
        top: 12,
        right: 12,
        display: 'flex',
        gap: '6px'
      }}>
        {['day','night','rain','snow'].map(t => (
          <button
            key={t}
            onClick={() => changeTheme(t)}
            style={{
              padding: '4px 10px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              background: theme === t ? '#ff6b9d' : 'rgba(255,255,255,0.7)',
              fontWeight: theme === t ? 'bold' : 'normal'
            }}
          >
            {t === 'day' ? '☀️' : t === 'night' ? '🌙' : t === 'rain' ? '🌧️' : '❄️'}
          </button>
        ))}
      </div>

      {/* Controls hint */}
      <div style={{
        position: 'absolute',
        bottom: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.4)',
        color: 'white',
        padding: '4px 14px',
        borderRadius: '12px',
        fontSize: '12px'
      }}>
        🎮 Use arrow keys to move the duck
      </div>
    </div>
  )
}