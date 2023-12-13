require('dotenv').config()
const express = require('express')
const cors = require('cors')

const connectMongoDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const snippetRoutes = require('./routes/snippetRoutes')

const app = express()
const PORT = process.env.PORT || 3000

// Connect MongoDB
connectMongoDB()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Snippet Garden.' })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/snippets', snippetRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})