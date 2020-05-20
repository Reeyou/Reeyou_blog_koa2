import { getToken } from '../../middleware/checkToken'

const router = require('koa-router')()

const User = require('../../models/user')

router.prefix('/admin')
router.post('/login', async (ctx:any) => {
    const { username } = ctx.request.body
    const { password } = ctx.request.body
    let data
    try {
        data = await User.findOne({ username }, null, { lean: true })
        if (!data) {
            ctx.body = {
                code: -1,
                message: '用户名不存在',
            }
        } else if (data.password === password) {
            const jwtToken = getToken({ name: username })
            ctx.body = {
                code: 200,
                message: '登录成功',
                data: {
                    userinfo: {
                        username: data.username,
                        role: data.role,
                    },
                    token: jwtToken,
                },
            }
        } else if (data.password !== password) {
            ctx.body = {
                code: 400,
                message: '密码错误',
            }
        }
    } catch (e) {
        console.log(e)
        ctx.body = {
            code: -1,
            message: '登陆错误',
        }
    }
})

module.exports = router
