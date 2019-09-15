const router = require('koa-router')()

const User = require('../../models/user')

router.prefix('/users')

router.post('/login', async(ctx, next) => {
  const params = ctx.request.body
  console.log(params)
  const user = new User({
    username: params.username,
    password: params.password
  })
  let code, msg
  try {
    await user.save()
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

module.exports = router
