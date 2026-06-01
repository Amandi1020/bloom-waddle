import { useState } from 'react'
import './App.css'

function App() {
  const [started, setStarted] = useState(false)

  return (
    <div className="app">
      {!started ? (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            🌸 Bloom & Waddle
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#ffd93d' }}>
            Collect flowers. Grow your duck. 🦆
          </p>
          <button
            onClick={() => setStarted(true)}
            style={{
              padding: '12px 32px',
              fontSize: '1.1rem',
              background: '#ff6b9d',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
            }}
          >
            Start Playing 🌼
          </button>
        </div>
      ) : (
        <div style={{ color: 'white', fontSize: '1.5rem' }}>
          🎮 Game canvas coming next!
        </div>
      )}
    </div>
  )
}

export default App
