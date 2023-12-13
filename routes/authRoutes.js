const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')

const router = express.Router()

// Register a new user
router.post('/register', async (req, res) => {

  try {

    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user
    const user = new User({ username, password: hashedPassword })
    await user.save()
    res.json({ message: 'User registered successfully!' })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

})

// Login and get a JWT token
router.post('/login', async (req, res) => {

  try {

    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }

    const user = await User.findOne({ username })

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials.' })
      return
    }    

    // Check if the provided password is correct
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      res.status(401).json({ error: 'Invalid credentials.' })
      return
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({ token })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

})

module.exports = router