const router = require('koa-router')()

const Article = require('../../models/article')

/**
  * @param pageSize 页数
  * @param limit    显示个数
  *
  * @param skip     跳过文档数
  * @param  limit   数据个数
  */
router.get('/getArticleList', async (ctx) => {
    const { pageSize = 1, limit = 5 } = ctx.request.query

    let code; let msg; let list; let
        total
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
router.get('/getArticleDetail', async (ctx) => {
    const { id } = ctx.request.query
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
