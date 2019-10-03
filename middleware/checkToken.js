const jwt = require('jsonwebtoken')
const key = require('../config/key')
const getToken = require('../middleware/getToken')

async function checkTokenStatus(ctx, next) {
  let url = ctx.request.url
  if (url == "/admin/login" || url == "/admin/register") await next()
  else {
    // 规定token写在header 的 'autohrization' 
    let token = ctx.request.headers["authorization"];
    if (token) {
      // 解析token
      try {
        jwt.verify(token.split(' ')[1], key.secretKey)
        await next()
      } catch(err) {
        console.log(err)
        let newToken = getToken({token: 'newToken'})
        ctx.res.setHeader('authorization', `Bearer ${newToken}`);
        ctx.status = 201
        await next()
      }
    } else {
      ctx.status = 401
      ctx.body = {
        code: 401,
        message: '无权限访问'
      };
    }
  }
}
module.exports = checkTokenStatus