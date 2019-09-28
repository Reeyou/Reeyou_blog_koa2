const mongoose = require('mongoose')

let msgReplySchma = new mongoose.Schema({
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

module.exports = mongoose.model('msgReply', msgReplySchma)