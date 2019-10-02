const router = require('koa-router')()

const Tag = require('../../models/tag')

 /**
  * @param pageSize 页数
  * @param limit    显示个数
  * 
  * @param skip     跳过文档数
  * @param  limit   数据个数
  */
router.get('/getTagList', async(ctx, next) => {
  let code, msg ,data
  try {
    data = await Tag.find()
    code = 200
    msg = '查找成功'
  } catch (e) {
    code = -1
    msg = '查找失败'
  }
  ctx.response.body = {
    code,
    msg,
    data
  }
})

module.exports = router
