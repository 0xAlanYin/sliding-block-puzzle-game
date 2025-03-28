import { useState } from 'react'
import GameBoard from './components/GameBoard'
import Instructions from './components/Instructions'
import './App.css'

function App() {
  const [showInstructions, setShowInstructions] = useState(false)

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>滑块解谜游戏</h1>
        <button className="instruction-button" onClick={toggleInstructions}>
          {showInstructions ? '返回游戏' : '游戏说明'}
        </button>
      </header>

      <main>
        {showInstructions ? (
          <Instructions />
        ) : (
          <GameBoard />
        )}
      </main>

      <footer className="app-footer">
        <p>© 2024 滑块解谜游戏 | 基于华容道的现代解谜游戏</p>
      </footer>
    </div>
  )
}

export default App
