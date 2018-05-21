const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

const AV = require('leanengine');
AV.init({
    appId: process.env.LEANCLOUD_APP_ID || 'GLd1iHuvtxpzpWilAoasYC57-gzGzoHsz',
    appKey: process.env.LEANCLOUD_APP_KEY || '3P54ey1zeTwTEXmmDeKCpr0H',
    masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || 'rQuB50Lo92FJD9es4KHTQC9x'
});

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// app.use(async (ctx) => {
//     if (ctx.url === '/user/get' && ctx.method === 'GET') {
//         let response = {
//             message: 'success'
//         }
//
//         ctx.body = response
//     }
//     else { // 404
//         ctx.body = '404 Not Found!!!'
//     }
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
