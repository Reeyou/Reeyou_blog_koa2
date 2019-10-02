const router = require('koa-router')()

const axios = require('axios')

router.post('/sendCode', async(ctx) => {
  const uriCode = ctx.request.body.code
  let code, msg
  // const clientID = '8f2c841682b05c643d90',
  // clientSecret = 'b3a0be535d3b67b4145dd5decde862408b036bc2'
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
  ctx.response.body = {
    code: code,
    msg: msg,
    data: result.data,
  }
})

module.exports = router