import { useState } from 'react'
import './BingoBoard.css'
import bingoData from '../../data/bingoItems.json'

interface BingoBoardProps {
  user: { id: number; email: string; name: string }
}

function BingoBoard({ user }: BingoBoardProps) {
  // Create 5x5 grid with content from JSON file (center cell is "FREE")
  const createBoard = () => {
    const board = []
    for (let i = 0; i < 25; i++) {
      board.push({
        id: i,
        text: bingoData.items[i] || `Item ${i + 1}`,
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

  const rowLabels = ['A', 'B', 'C', 'D', 'E']
  const columnLabels = ['1', '2', '3', '4', '5']

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="board-title">{user.name}'s DTPA Bingo Board</h1>

        <div className="bingo-board">
          {/* Empty corner cell */}
          <div className="bingo-header empty"></div>

          {/* Column headers */}
          {columnLabels.map((label) => (
            <div key={`col-${label}`} className="bingo-header">
              {label}
            </div>
          ))}

          {/* Rows with row headers and cells */}
          {rowLabels.map((rowLabel, rowIndex) => (
            <>
              {/* Row header */}
              <div key={`row-${rowLabel}`} className="bingo-header">
                {rowLabel}
              </div>

              {/* Cells in this row */}
              {board.slice(rowIndex * 5, (rowIndex + 1) * 5).map((cell) => (
                <button
                  key={cell.id}
                  className={`bingo-cell ${cell.isMarked ? 'marked' : ''} ${cell.id === 12 ? 'free' : ''}`}
                  onClick={() => toggleCell(cell.id)}
                >
                  {cell.isMarked ? cell.text : ''}
                </button>
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BingoBoard
