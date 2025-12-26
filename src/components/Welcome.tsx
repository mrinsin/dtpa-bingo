import './Welcome.css'

interface WelcomeProps {
  user: { id: number; email: string; name: string }
}

function Welcome({ user }: WelcomeProps) {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1 className="welcome-title">Welcome to DTPA Bingo!</h1>
        <p className="welcome-email">{user.email}</p>
      </div>
    </div>
  )
}

export default Welcome
