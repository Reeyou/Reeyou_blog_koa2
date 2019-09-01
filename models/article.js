const mongoose = require('mongoose')

let articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  poster: {
    type: String
  },
  tag: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Article', articleSchema)