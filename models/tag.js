const mongoose = require('mongoose')

let count = 1
let tagSchema = new mongoose.Schema({
  tag_id: {
    type: String,
    default: () => `0${count++}`
  },
  tagname: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Tag', tagSchema)