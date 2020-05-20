import jwt from 'jsonwebtoken'
import config from '../config'

function getToken(obj:any) {
    const result = jwt.sign(obj, config.jwtSecret, { expiresIn: 60 })
    return result
}

async function checkTokenStatus(ctx:any, next:any) {
    const { url } = ctx.request
    if (url === '/admin/login' || url === '/admin/register') await next()
    else {
    // 规定token写在header 的 'autohrization'
        const token = ctx.request.headers.authorization
        if (token) {
            // 解析token
            try {
                jwt.verify(token.split(' ')[1], config.jwtSecret)
                await next()
            } catch (err) {
                console.log(err)
                const newToken = getToken({ token: 'newToken' })
                ctx.res.setHeader('authorization', `Bearer ${newToken}`)
                ctx.status = 201
                await next()
            }
        } else {
            ctx.status = 401
            ctx.body = {
                code: 401,
                message: '无权限访问',
            }
        }
    }
}

export {
    getToken,
    checkTokenStatus,
}
