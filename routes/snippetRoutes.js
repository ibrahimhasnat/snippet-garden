const express = require('express')
const Snippet = require('../models/Snippet')

const router = express.Router()

// Middleware to verify JWT token
const verifyToken = require('../middleware/verifyToken')

// Get all snippets
router.get('/', verifyToken, async (req, res) => {

  try {

    const snippets = await Snippet.find({ user: req.userId }).sort('-createdAt')
    res.json({ snippets })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

})

// Create a new snippet
router.post('/', verifyToken, async (req, res) => {

  try {

    const { title, code, language, tags, category } = req.body
    const snippet = new Snippet({
      user: req.userId,
      title,
      code,
      language,
      tags,
      category
    })

    await snippet.save()
    res.json({ message: 'Snippet created successfully!' })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

})

// Update a snippet
router.put('/:id', verifyToken, async (req, res) => {

  try {

    const { title, code, language, tags, category } = req.body
    const snippet = await Snippet.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, code, language, tags, category, updatedAt: Date.now() },
      { new: true }
    )

    if (!snippet) {
      res.status(404).json({ message: 'Snippet not found' })
      return
    }

    res.json({ message: 'Snippet updated successfully!' })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

})

// Delete a snippet
router.delete('/:id', verifyToken, async (req, res) => {

  try {

    const result = await Snippet.deleteOne({
      _id: req.params.id, 
      user: req.userId
    })

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Snippet not found' })
      return
    }

    res.json({ message: 'Snippet deleted successfully!' })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

})

// Endpoint for filtering snippets by language
router.get('/:language', verifyToken, async (req, res) => {

  try {

    const { language } = req.params
    const filter = { user: req.userId }

    if (language) {
      filter.language = language
    }

    const snippets = await Snippet.find(filter).sort('-createdAt')
    res.json({ snippets })    

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

})

module.exports = router