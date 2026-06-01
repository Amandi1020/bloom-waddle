import { useRef, useCallback, useState, useEffect } from 'react'
import { useGameLoop } from './useGameLoop'
import { drawMeadow } from './meadow'
import { duck, setupControls, updateDuck, drawDuck } from './duck'

export default function GameCanvas() {
  const canvasRef = useRef(null)
  const [theme, setTheme] = useState('day')
  const themeRef = useRef('day')

  useEffect(() => {
    setupControls()
  }, [])

  const render = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas

    // Clear
    ctx.clearRect(0, 0, width, height)

    // Draw meadow background
    drawMeadow(ctx, width, height, themeRef.current)

    // Update and draw duck
    updateDuck(width, height)
    drawDuck(ctx)

  }, [])

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