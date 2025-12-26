import { useState } from 'react'
import './BingoBoard.css'

interface BingoBoardProps {
  user: { id: number; email: string; name: string }
}

function BingoBoard({ user }: BingoBoardProps) {
  // Create 5x5 grid with placeholder content (center cell is "FREE")
  const createBoard = () => {
    const board = []
    for (let i = 0; i < 25; i++) {
      board.push({
        id: i,
        text: i === 12 ? 'FREE' : `Item ${i + 1}`,
        isMarked: i === 12, // Free space is pre-marked
      })
    }
    return board
  }

  const [board, setBoard] = useState(createBoard())

  const toggleCell = (id: number) => {
    setBoard(board.map(cell =>
      cell.id === id ? { ...cell, isMarked: !cell.isMarked } : cell
    ))
  }

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="board-title">{user.name}'s DTPA Bingo Board</h1>

        <div className="bingo-board">
          {board.map((cell) => (
            <button
              key={cell.id}
              className={`bingo-cell ${cell.isMarked ? 'marked' : ''} ${cell.id === 12 ? 'free' : ''}`}
              onClick={() => toggleCell(cell.id)}
            >
              {cell.isMarked ? cell.text : ''}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BingoBoard
