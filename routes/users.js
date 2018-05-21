const router = require('koa-router')()
const fs = require('fs')

router.prefix('/user')

router.get('/get', async function (ctx) {
    console.log(ctx.query)
    let data = fs.readFileSync('./data/user.json', 'utf8')
    ctx.body = JSON.parse(data);

});

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
