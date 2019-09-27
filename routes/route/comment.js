const router = require('koa-router')()

const Comment = require('../../models/comment')

router.post('/addComment', async(ctx) => {
  const { articleId, name, content } = ctx.request.body
  const comment = new Comment({
    articleId,
    name,
    content
  })
  let code, msg;
  try {
    await comment.save()
    code = 200
    msg = '添加成功'
  } catch (e) {
    code = -1
    msg = '添加失败'
  }
  ctx.response.body = {
    code: code,
    msg: msg,
    data: ctx.request.body
  }
})

router.get('/getComment/:articleId', async(ctx) => {
  const articleId = ctx.params.articleId
  let code, msg, data;
  try {
    data = await Comment.find({articleId: articleId})
    code = 200
    msg = '查询成功'
  } catch (e) {
    code = -1
    msg = '查询失败'
  }
  ctx.response.body = {
    code: code,
    msg: msg,
    data: data
  }
})

module.exports = router