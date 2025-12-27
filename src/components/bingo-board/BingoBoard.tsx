import { useState } from 'react'
import './BingoBoard.css'
import bingoData from '../../data/bingoItems.json'
import dtpaBaseImage from '../../assets/dtpa-base.JPG'

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
  const [hasWon, setHasWon] = useState(false)

  const checkWin = (updatedBoard: typeof board) => {
    // Check rows
    for (let i = 0; i < 5; i++) {
      if (updatedBoard.slice(i * 5, i * 5 + 5).every(cell => cell.isMarked)) {
        return true
      }
    }

    // Check columns
    for (let i = 0; i < 5; i++) {
      if ([0, 1, 2, 3, 4].every(row => updatedBoard[row * 5 + i].isMarked)) {
        return true
      }
    }

    // Check diagonal (top-left to bottom-right)
    if ([0, 6, 12, 18, 24].every(id => updatedBoard[id].isMarked)) {
      return true
    }

    // Check diagonal (top-right to bottom-left)
    if ([4, 8, 12, 16, 20].every(id => updatedBoard[id].isMarked)) {
      return true
    }

    return false
  }

  const toggleCell = (id: number) => {
    const updatedBoard = board.map(cell =>
      cell.id === id ? { ...cell, isMarked: !cell.isMarked } : cell
    )
    setBoard(updatedBoard)

    if (checkWin(updatedBoard)) {
      setHasWon(true)
    } else {
      setHasWon(false)
    }
  }

  const resetBoard = () => {
    setBoard(createBoard())
    setHasWon(false)
  }

  const rowLabels = ['A', 'B', 'C', 'D', 'E']
  const columnLabels = ['1', '2', '3', '4', '5']

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="board-title">{user.name}'s DTPA Bingo Board</h1>

        {hasWon && (
          <div className="win-overlay">
            <div className="win-message">
              <div className="win-text">BINGO!</div>
              <div className="win-subtext">You won!</div>
              <button className="reset-button" onClick={resetBoard}>
                Play Again
              </button>
            </div>
          </div>
        )}

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
                  {cell.id === 12 ? (
                    <img src={dtpaBaseImage} alt="DTPA Base" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                  ) : (
                    <span className="cell-text">{cell.text}</span>
                  )}
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
