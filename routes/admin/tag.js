const router = require('koa-router')()

const Tag = require('../../models/tag')

router.prefix('/admin')
router.post('/addTagName', async (ctx, next) => {
    const { tagname } = ctx.request.body

    const tag = new Tag({
        tagname,
    })
    let code; let
        msg
    try {
        await tag.save()
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
router.get('/getTagList', async (ctx, next) => {
    const { pageSize, limit } = ctx.request.query
    let code; let msg; let
        list
    try {
        list = await Tag.find({}, null, { lean: true })
            .skip((pageSize - 1) * limit)
            .limit(Number(limit))
        total = await Tag.countDocuments()
        code = 200
        msg = '查找成功'
    } catch (e) {
        code = -1
        msg = '查找失败'
    }
    ctx.response.body = {
        code,
        msg,
        data: {
            list,
            total,
        },
    }
})
router.post('/updateTagName', async (ctx) => {
    const { tagid, tagname } = ctx.request.body

    let code; let msg; let
        data
    try {
        data = await Tag.where({ tag_id: tagid }).update({ tagname })
        code = 200
        msg = '修改成功'
    } catch (e) {
        code = -1
        msg = '修改失败'
    }

    ctx.response.body = {
        code,
        msg,
        data: ctx.request.body,
    }
})
router.get('/deleteTagName', async (ctx) => {
    const { tagid } = ctx.request.query

    let code; let msg; let
        data
    try {
        data = await Tag.where({ _id: tagid }).remove()
        code = 200
        msg = '删除成功'
    } catch (e) {
        code = -1
        msg = '删除失败'
    }
    ctx.response.body = {
        code,
        msg,
        data,
    }
})

module.exports = router
