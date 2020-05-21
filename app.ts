import config from './src/config'
import { mongodb } from './src/loaders'
import catchError from './src/middleware/catchError'
import Init from './init'

const Koa = require('koa')

const app = new Koa()
const json = require('koa-json')
const koaBody = require('koa-body')


const routers = require('./src/routes/index')

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
const {
    article, users, tag, upload, login, comment, adminMessage, webMessage, webArticle, webTag,
} = routers
app.use(article.routes(), article.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(tag.routes(), tag.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(login.routes(), login.allowedMethods())
app.use(comment.routes(), comment.allowedMethods())
app.use(adminMessage.routes(), adminMessage.allowedMethods())
app.use(webMessage.routes(), webMessage.allowedMethods())
app.use(webArticle.routes(), webArticle.allowedMethods())
app.use(webTag.routes(), webTag.allowedMethods())

// // token校验
// app.use(checkTokenStatus)

// error-handling
app.on('error', (err:any, ctx:any) => {
    console.error('server error', err, ctx)
})


module.exports = app
