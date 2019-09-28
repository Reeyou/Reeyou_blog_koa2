const mongoose = require('mongoose')

let count = 1;
let replySchma = new mongoose.Schema({
  article_id: {
    type: String,
    required: true
  },
  //回复用户id
  from_name: {
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
  }
},{timestamps: {createdAt: 'create_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('Reply', replySchma)