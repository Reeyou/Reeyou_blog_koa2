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
  }
},{timestamps: {createdAt: 'create_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('Comment', commentSchema)