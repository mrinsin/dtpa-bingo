import { useState } from 'react'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Email submitted:', email)
    // Handle login logic here
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
          />
          <button type="submit" className="login-button">
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
