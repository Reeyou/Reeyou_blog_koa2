const router = require('koa-router')()

const Article = require('../../models/article')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
  console.log(ctx)
})

router.post('/addArticle', async (ctx, next) => {
  const { title, desc, poster, tag, content } = ctx.request.body
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
  // let limit = 6, size = 1
  try{
    data = await Article.find()
    // console.log(data)
    // data = await Article.find({}).skip(1).limit(2)
    code = 200
    msg = '查找成功'
  } catch (e) {
    code = -1
    msg = '查找失败'
  }
  ctx.body = {
    code: code,
    msg: msg,
    data,
  }
})
router.get('/getArticleDetail/:id', async(ctx) => {
  const id = ctx.params.id
  console.log(id)
  let code, msg, data
  try{
    data = await Article.findOne({_id: id})
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
