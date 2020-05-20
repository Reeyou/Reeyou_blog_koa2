const router = require('koa-router')()

const Comment = require('../../models/comment')
const Reply = require('../../models/reply')

router.post('/addComment', async (ctx) => {
    const { articleId, name, content } = ctx.request.body
    const comment = new Comment({
        articleId,
        name,
        content,
    })
    let code; let
        msg
    try {
        await comment.save()
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

router.get('/getComment', async (ctx) => {
    const { pageSize, limit, articleId } = ctx.request.query
    let code; let msg; let data; let
        reply
    try {
        list = await Comment.find({ articleId }, null, { lean: true })
            .skip((pageSize - 1) * limit)
            .limit(Number(limit))
        total = await Comment.count()
        const replyIdArr = []
        for (var i = 0; i < data.length; i++) {
            replyIdArr.push(data[i]._id)
        }
        for (var i = 0; i < replyIdArr.length; i++) {
            reply = await Reply.find({ to_uid: replyIdArr[i] })
            data[i].reply = reply
        }

        code = 200
        msg = '查询成功'
    } catch (e) {
        code = -1
        msg = '查询失败'
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

router.post('/deleteComment', async (ctx) => {
    const { commentId } = ctx.request.body
    let code; let msg; let
        data
    try {
        data = await Comment.remove({ _id: commentId })
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

router.post('/replyComment', async (ctx) => {
    const { articleId, fromName, toUid, content } = ctx.request.body
    const reply = new Reply({
        article_id: articleId,
        from_name: fromName,
        to_uid: toUid,
        content,
    })
    let code; let
        msg
    try {
        await reply.save()
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

router.post('/deleteReply', async (ctx) => {
    const { replyId } = ctx.request.body
    let code; let msg; let
        data
    try {
        data = await Reply.remove({ _id: replyId })
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
