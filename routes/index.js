const article = require('./admin/article')
const users = require('./admin/users')
const tag = require('./admin/tag')
const upload = require('./admin/upload')
const adminMessage = require('./admin/message')

const login = require('./web/login')
const comment = require('./web/comment')
const webMessage = require('./web/message')
const webArticle = require('./web/web_article')
const webTag = require('./web/web_Tag')

module.exports = {
  article,
  users,
  tag,
  upload,
  login,
  comment,
  adminMessage,
  webMessage,
  webArticle,
  webTag
}
