import { Router, Request, Response } from 'express'
import pool from '../db'

const router = Router()

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching users:', err)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// Get user by email
router.get('/:email', async (req: Request, res: Response) => {
  try {
    const { email } = req.params
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(result.rows[0])
  } catch (err) {
    console.error('Error fetching user:', err)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// Create or update user (login/register)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    // Check if user exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    if (existingUser.rows.length > 0) {
      // User exists, return existing user
      return res.json({ user: existingUser.rows[0], isNew: false })
    }

    // Create new user
    const result = await pool.query(
      'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *',
      [email, name || '']
    )

    res.status(201).json({ user: result.rows[0], isNew: true })
  } catch (err) {
    console.error('Error creating user:', err)
    res.status(500).json({ error: 'Failed to create user' })
  }
})

// Update user name
router.put('/:email', async (req: Request, res: Response) => {
  try {
    const { email } = req.params
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ error: 'Name is required' })
    }

    const result = await pool.query(
      'UPDATE users SET name = $1 WHERE email = $2 RETURNING *',
      [name, email]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(result.rows[0])
  } catch (err) {
    console.error('Error updating user:', err)
    res.status(500).json({ error: 'Failed to update user' })
  }
})

export default router
