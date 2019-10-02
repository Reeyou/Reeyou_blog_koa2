const article = require('./admin/article')
const users = require('./admin/users')
const tag = require('./admin/tag')
const upload = require('./admin/upload')
const login = require('./web/login')
const comment = require('./web/comment')
const message = require('./web/message')

module.exports = {
  article,
  users,
  tag,
  upload,
  login,
  comment,
  message
}
