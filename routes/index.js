const router = require('koa-router')()

router.get('/', function *(next) {
    console.log(this.request.query)
    console.log(this.query)

    yield this.render('index', {
        title: 'Hello World Koa!'
    });
});


router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
