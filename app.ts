import config from './config'

const Koa = require('koa')

const app = new Koa()
const json = require('koa-json')
const koaBody = require('koa-body')
const logger = require('koa-logger')

const mongoose = require('mongoose')

const routers = require('./routes/index')

// const checkTokenStatus = require('./middleware/checkToken')

// error handler
// onerror(app)
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    },
}))
// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
app.use(json())
app.use(logger())
app.use(require('koa-static')(`${__dirname}/public`))


console.log(config.database)
mongoose.connect(config.database, {
    useNewUrlParser: true,
})

const db = mongoose.connection
// 输出连接日志
db.on('error', () => {
    console.log('Connection error')
})

db.once('open', () => {
    console.log('Mongo working!')
})


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