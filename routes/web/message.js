const router = require('koa-router')()

const Message = require('../../models/message')
const MsgReply = require('../../models/msgReply')

router.post('/addMessage', async(ctx) => {
  const { name, content } = ctx.request.body
  const message = new Message({
    name,
    content
  })
  let code, msg;
  try {
    await message.save()
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

router.get('/getMessage', async(ctx) => {
  const { pageSize, limit } = ctx.request.query
  pageSize ? pageSize : 1
  limit? limit : 10
  let code, msg, data, msgReply;
  try {
    data = await Message.find({},null,{lean: true})
                        .skip((pageSize-1)*limit)
                        .limit(Number(limit))
    let msgIdArr = []
    for(var i = 0; i < data.length; i++) {
      msgIdArr.push(data[i]._id)
    }
    for(var i = 0; i < msgIdArr.length; i++) {
      msgReply = await MsgReply.find({to_uid: msgIdArr[i]})
      data[i]['reply'] = msgReply
    }

    code = 200
    msg = '查询成功'
  } catch (e) {
    console.log(e)
    code = -1
    msg = '查询失败'
  }
  ctx.response.body = {
    code: code,
    msg: msg,
    data: data
  }
})

router.post('/deleteMessage', async(ctx) => {
  const { msgId } = ctx.request.body
  let code, msg, data;
  try {
    data = await Message.remove({_id: msgId})
    code = 200
    msg = '删除成功'
  } catch (e) {
    code = -1
    msg = '删除失败'
  }
  ctx.response.body = {
    code: code,
    msg: msg,
    data: data
  }
})

router.post('/replyMessage', async(ctx) => {
  const { fromName, toUid, content } = ctx.request.body
  const msgReply = new MsgReply ({
    from_name: fromName,
    to_uid: toUid,
    content
  })
  let code, msg
  try {
    await msgReply.save()
    code = 200
    msg = '添加成功'
  }catch(e) {
    console.log(e)
    code = -1
    msg = '添加失败'
  }

  ctx.response.body = {
    code: code,
    msg: msg,
    data: ctx.request.body
  }
})

router.post('/deleteReplyMessage', async(ctx) => {
  const { replyMsgId } = ctx.request.body
  let code, msg, data;
  try {
    data = await MsgReply.remove({_id: replyMsgId})
    code = 200
    msg = '删除成功'
  } catch (e) {
    code = -1
    msg = '删除失败'
  }
  ctx.response.body = {
    code: code,
    msg: msg,
    data: data
  }
})

module.exports = router