const mongoose = require('mongoose')

let count = 1;
let replySchma = new mongoose.Schema({
  id: {
    type: String,
    default: () => count++
  },
  article_id: {
    type: String,
    required: true
  },
  //回复用户id
  from_uid: {
    type: String,
    required: true
  },
  //目标用户id
  to_uid: {
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

module.exports = mongoose.model('Reply', replySchma)