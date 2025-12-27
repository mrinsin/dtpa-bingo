import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import usersRouter from './routes/users'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.use('/api/users', usersRouter)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Serve static files from the dist directory in production
if (process.env.NODE_ENV === 'production') {
  // Use process.cwd() to get the project root directory
  const distPath = path.join(process.cwd(), 'dist')

  console.log('Current working directory:', process.cwd())
  console.log('Looking for dist at:', distPath)

  // Check if dist directory exists
  if (!fs.existsSync(distPath)) {
    console.error('ERROR: dist directory not found at:', distPath)
    console.error('Please ensure "npm run build" has been executed')
  } else {
    console.log('dist directory found!')
  }

  app.use(express.static(distPath))

  // Handle client-side routing - serve index.html for all non-API routes
  app.use((req, res, next) => {
    // Only serve index.html for non-API routes
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'))
    } else {
      next()
    }
  })
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
