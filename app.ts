import config from './src/config'
import { mongodb } from './src/loaders'
import catchError from './src/middleware/catchError'
import Init from './init'
import router from './src/routes'

const Koa = require('koa')

const app = new Koa()
const json = require('koa-json')
const koaBody = require('koa-body')

Init.initManage(app)
// const checkTokenStatus = require('./middleware/checkToken')

// error handler
app.use(catchError)

// onerror(app)
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    },
}))

app.use(json())

app.use(require('koa-static')(`${__dirname}/public`))

// mongodb
mongodb(config.database)


// logger
// app.use(async (ctx, next) => {
//     const start = new Date()
//     await next()
//     const ms = new Date() - start
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// token校验
// app.use(checkTokenStatus)

// routes
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err:any, ctx:any) => {
    console.error('server error', err, ctx)
})


export default app
