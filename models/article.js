const mongoose = require('mongoose')

let count = 1;
let articleSchema = new mongoose.Schema({
  // id: {
  //   type: String,
  //   default: () => count++
  // },
  // tag_id: {
  //   type: String,
  //   required: true
  // },
  title: {
    type: String,
    required: true
  },
  desc: {
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
},{timestamps: {createdAt: 'create_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('Article', articleSchema)