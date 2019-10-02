const router = require('koa-router')()

const User = require('../../models/user')

const getToken = require('../../middleware/getToken')

router.prefix('/admin')
router.post('/login', async(ctx, next) => {
  const username = ctx.request.body.username
  const password = ctx.request.body.password
  let responseData
  try {
    responseData = await User.findOne({username},null,{lean:true})
    if(!responseData) { 
      ctx.body = {
        code: -1,
        message: '用户名不存在'
      }
    } else if (responseData.password === password) {
      let jwt_token = getToken({name: username})
      ctx.body = {
        code: 200,
        message: '登录成功',
        data:{
          token: jwt_token
        }
      }
    } else if (responseData.password !== password) {
      ctx.body = {
        code: 400,
        message: '密码错误'
      }
    }
  } catch (e) {
    console.log(e)
    ctx.body = {
      code: -1,
      message: '登陆错误'
    }
  }
})
router.get('/refreshToken', async(ctx,next) => {
  let newToken
  await getToken({token: 'newToken'})
  ctx.body = {
    code: 200,
    message: '刷新token成功',
    data: newToken
  }
})

module.exports = router
