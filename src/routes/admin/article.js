const router = require('koa-router')()

const Article = require('../../models/article')

router.prefix('/admin')
router.post('/addArticle', async (ctx, next) => {
    const { title, desc, poster, tag, content } = ctx.request.body
    const article = new Article({
        title,
        desc,
        poster,
        tag,
        content,
    })

    let code; let
        msg
    try {
        await article.save()
        code = 200
        msg = '添加成功'
    } catch (e) {
        code = -1
        msg = '添加失败'
    }
    ctx.response.body = {
        code,
        msg,
        data: ctx.request.body,
    }
})

router.get('/getArticleList', async (ctx) => {
    const { pageSize, limit } = ctx.request.query
    let code; let msg; let
        list
    try {
        list = await Article.find()
            .skip((pageSize - 1) * limit)
            .limit(Number(limit))
        total = await Article.count()
        code = 200
        msg = '查找成功'
    } catch (e) {
        console.log(e)
        code = -1
        msg = '查找失败'
    }
    ctx.body = {
        code,
        msg,
        data: {
            list,
            total,
        },
    }
})

router.get('/getArticleDetail/:id', async (ctx) => {
    const { id } = ctx.params
    console.log(id)
    let code; let msg; let
        data
    try {
        data = await Article.findOne({ _id: id })
        code = 200
        msg = '查找成功'
    } catch (e) {
        code = -1
        msg = '查找失败'
    }
    ctx.response.body = {
        code,
        msg,
        data,
    }
})

module.exports = router
