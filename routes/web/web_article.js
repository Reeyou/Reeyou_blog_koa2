const router = require('koa-router')()

const Article = require('../../models/article')

 /**
  * @param pageSize 页数
  * @param limit    显示个数
  * 
  * @param skip     跳过文档数
  * @param  limit   数据个数
  */
router.get('/getArticleList', async(ctx) => {
  const { pageSize, limit } = ctx.request.query
  pageSize ? pageSize : 1
  limit ? limit : 5
  let code, msg, data
  try{
    data = await Article.find()
                        .skip((pageSize-1)*limit)
                        .limit(Number(limit))
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