const mongoose = require('mongoose')

let commentSchema = new mongoose.Schema({
  articleId: {
    type: String,
    required: true
  },
  //回复用户名
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  create_time: {
    type: String,
    default: Date.now()
  }
})

module.exports = mongoose.model('Comment', commentSchema)