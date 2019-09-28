const router = require('koa-router')()

const axios = require('axios')

router.post('/sendCode', async(ctx) => {
  const uriCode = ctx.request.body.code
  console.log(uriCode)
  let code, msg, data
  try{
    data = ctx.request.body
    code = 200
    msg = '查找成功'
  } catch (e) {
    code = -1
    msg = '查找失败'
  }
  const clientID = '310316c9d00ddccc32ef',
  clientSecret = 'adcfffb9e02749a57653a7881c40350cb9c66143'
  const tokenResponse = await axios({
    method: 'POST',
    url: 'https://github.com/login/oauth/access_token?' +
      `client_id=${clientID}&` +
      `client_secret=${clientSecret}&` +
      `code=${uriCode}`,
    headers: {
      accept: 'application/json'
    }
  });
  const accessToken = tokenResponse.data.access_token
  const result = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`
    }
  });
  console.log(result)
  ctx.response.body = {
    code: code,
    msg: msg,
    data: result.data,
  }
})
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
  console.log(ctx)
})

module.exports = router