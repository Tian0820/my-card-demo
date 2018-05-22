const router = require('koa-router')()
const fs = require('fs')

router.prefix('/api/user')

router.get('/get', async function (ctx) {
    console.log(ctx.query);
    let name = ctx.query.name;
    let data = JSON.parse(fs.readFileSync('./data/user.json', 'utf8'));
    let info = null;

    data.users.forEach(user => {
        if(user.name === name) {
            info = user;
        }
    })
    ctx.body = info

});

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
