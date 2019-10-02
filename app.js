const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body');
const logger = require('koa-logger')

const mongoose = require('mongoose')
const dbs = require('./config/db.config')

const routers = require('./routes/index')

const checkTokenStatus = require('./middleware/checkToken')

// error handler
onerror(app)
app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}));
// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

mongoose.connect(dbs.dbs, {
  useNewUrlParser: true
})

var db = mongoose.connection;
//输出连接日志
db.on('error', function callback() {
	console.log("Connection error");
});
 
db.once('open', function callback() {
	console.log("Mongo working!");
})


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
const { article,users,tag,upload,login,comment,message } = routers
app.use(article.routes(), article.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(tag.routes(), tag.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(login.routes(), login.allowedMethods())
app.use(comment.routes(), comment.allowedMethods())
app.use(message.routes(), message.allowedMethods())

// token校验
app.use(checkTokenStatus)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


module.exports = app
