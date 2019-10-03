const router = require('koa-router')()

const Message = require('../../models/message')

router.prefix('/admin')
router.get('/getMessageList', async(ctx) => {
  const { pageSize, limit } = ctx.request.query
  let code, msg, list
  try{
    menulist = await Message.find()
                        .skip((pageSize-1)*limit)
                        .limit(Number(limit))
    total = await Message.count()
    code = 200
    msg = '查找成功'
  } catch (e) {
    console.log(e)
    code = -1
    msg = '查找失败'
  }
  ctx.body = {
    code: code,
    msg: msg,
    data: {
      list: menulist,
      total
    },
  }
})

module.exports = router
