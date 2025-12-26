import { useState } from 'react'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name: '' }),
      })

      if (!response.ok) {
        throw new Error('Failed to login')
      }

      const data = await response.json()
      console.log('Login successful:', data)

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data.user))

      // TODO: Navigate to main app
      alert(data.isNew ? 'Welcome! Account created.' : 'Welcome back!')
    } catch (err) {
      console.error('Login error:', err)
      setError('Failed to login. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">DTPA Bingo</h1>
        <p className="login-subtitle">Enter your email to get started</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
            autoFocus
            disabled={loading}
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Loading...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
