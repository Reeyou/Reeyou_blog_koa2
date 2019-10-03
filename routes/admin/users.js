const router = require('koa-router')()

const User = require('../../models/user')

const getToken = require('../../middleware/getToken')

router.prefix('/admin')
router.post('/login', async(ctx, next) => {
  const username = ctx.request.body.username
  const password = ctx.request.body.password
  let data
  try {
    data = await User.findOne({username},null,{lean:true})
    if(!data) { 
      ctx.body = {
        code: -1,
        message: '用户名不存在'
      }
    } else if (data.password === password) {
      let jwt_token = getToken({name: username})
      ctx.body = {
        code: 200,
        message: '登录成功',
        data:{
          userinfo: {
            username: data.username,
            role: data.role
          },
          token: jwt_token
        }
      }
    } else if (data.password !== password) {
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
router.post('/register', async(ctx,next) => {
  const { username,password } = ctx.request.body

  let user = new User({
    username,
    password,
    role: 'guest'
  })
  try {
    data = await user.save()
    code = 200
    msg = '注册成功'
  } catch(e) {
    code = -1
    msg = '注册失败'
  }
  ctx.response.body = {
    code,
    msg,
    data
  }
})
router.get('/getUserList', async(ctx,next) => {
  const { pageSize, limit } = ctx.request.query
  let code, msg, list
  try {
    list = await User.find()
                        .skip((pageSize-1)*limit)
                        .limit(Number(limit))
    total = await User.count()
    code = 200
    msg = '查找成功'
  } catch(e) {
    code = -1
    msg = '注册查找失败失败'
  }
  ctx.response.body = {
    code,
    msg,
    data: {
      list,
      total
    },
  }
})

module.exports = router
