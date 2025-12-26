import { useState, useEffect } from 'react'
import Login from './components/login/Login'
import './App.css'
import BingoBoard from './components/bingo-board/BingoBoard'

interface User {
  id: number
  email: string
  name: string
}

function App() {
  const [user, setUser] = useState<User | null>(null)

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (err) {
        console.error('Failed to parse stored user:', err)
        localStorage.removeItem('user')
      }
    }
  }, [])

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser)
  }

  if (user) {
    return <BingoBoard user={user} />
  }

  return <Login onLogin={handleLogin} />
}

export default App
