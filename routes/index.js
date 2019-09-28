const article = require('./route/article')
const users = require('./route/users')
const tag = require('./route/tag')
const upload = require('./route/upload')
const login = require('./route/login')
const comment = require('./route/comment')
const message = require('./route/message')

module.exports = {
  article,
  users,
  tag,
  upload,
  login,
  comment,
  message
}
