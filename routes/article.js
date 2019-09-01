const router = require('koa-router')()

const Article = require('../models/article')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
  console.log(ctx)
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
router.post('/addArticle', async (ctx, next) => {
  const params = ctx.request.body
  console.log(params)
  const article = new Article({
    title: params.title,
    subtitle: params.subtitle,
    poster: params.poster,
    tag: params.tag,
    content: params.content
  })

  let code, msg;
  try {
    await article.save()
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

module.exports = router
