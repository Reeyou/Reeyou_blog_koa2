const jwt = require('jsonwebtoken')
const key = require('../config/key')

async function checkTokenStatus(ctx, next) {
  let url = ctx.request.url
  if (url == "/admin/login") await next()
  else {
    // 规定token写在header 的 'autohrization' 
    let token = ctx.request.headers["authorization"].split(' ')[1];
    console.log(token)
    if (token) {
      // 解析token
      jwt.verify(token, key.secretKey, async function(err,payload) {
        // 过期
        if(err) {
          console.log(err)
          ctx.status = 401
          ctx.body = {
            code: 401,
            message: 'token 已过期'
          };
        } else {
          await next();
        }
      });
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