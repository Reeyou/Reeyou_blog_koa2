const router = require('koa-router')()

const Article = require('../../models/article')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
  console.log(ctx)
})

router.post('/addArticle', async (ctx, next) => {
  const { title,desc,poster,tag,content } = ctx.request.body
  const article = new Article({
    title,
    desc,
    poster,
    tag,
    content
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
router.get('/getArticleList', async(ctx) => {
  let code, msg, data
  try{
    data = await Article.find()
    code = 200
    msg = '查找成功'
  } catch (e) {
    code = -1
    msg = '查找失败'
  }
  ctx.response.body = {
    code: code,
    msg: msg,
    data,
  }
})

module.exports = router
