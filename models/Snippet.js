const mongoose = require('mongoose')
const Prism = require('prismjs')

// Supported languages
require('prismjs/components/prism-javascript')
require('prismjs/components/prism-python')
require('prismjs/components/prism-java')
require('prismjs/components/prism-go')
require('prismjs/components/prism-rust')
require('prismjs/components/prism-swift')
require('prismjs/components/prism-typescript')

const snippetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true    
  },
  language: {
    type: String,
    required: true    
  },
  tags: [{type: String}],
  category: {type: String},
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }  
})

snippetSchema.pre('save', function (next) {
  // Add syntax highlighting to the code using Prism.js before saving
  this.code = Prism.highlight(this.code, Prism.languages[this.language], this.language)
  next()
})

const Snippet = mongoose.model('Snippet', snippetSchema)

module.exports = Snippet