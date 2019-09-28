const router = require('koa-router')()

const User = require('../../models/user')

router.prefix('/admin')
router.post('/login', async(ctx, next) => {
  const params = ctx.request.body

  const username = params.username
  const password = params.password
  let code, msg
  try {
    await User.find({username},function(err, data) {
      if(data.length === 0) {
        code = -1
        msg = '用户不存在'
      } else if (data[0].password === password) {
        code = 200
        msg = '登录成功'
      } else if (data[0].password !== password) {
        code = 400
        msg = '密码错误'
      }
    })
  } catch (e) {
    code = -1
    msg = '登录失败'
  }

  ctx.response.body = {
    code: code,
    msg: msg,
    // data: ctx.request.body
  }
})

module.exports = router
