const Koa = require('koa');
const Router = require('koa-router');
const AV = require('leanengine');
const app = new Koa();
const router = new Router();

AV.init({
    appId: process.env.LEANCLOUD_APP_ID || 'GLd1iHuvtxpzpWilAoasYC57-gzGzoHsz',
    appKey: process.env.LEANCLOUD_APP_KEY || '3P54ey1zeTwTEXmmDeKCpr0H',
    masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || 'rQuB50Lo92FJD9es4KHTQC9x'
});

app.use(require('koa-bodyparser')());
app.use(AV.koa());
// app.listen(process.env.LEANCLOUD_APP_PORT);

// app.use(serve(path.resolve('public')));

app.use(async (ctx) => {
    if (ctx.url === `/api/user/get` && ctx.method === 'POST') {
        let response = {
            message: 'success'
        }

        if (ctx.request.body.name === '刘昊然') {
            response.info = '1111'
        } else if (ctx.request.body.name === '吴彦祖') {
            response.info = '2222'
        } else if (ctx.request.body.name === '吴磊') {
            response.info = '3333'
        } else {
            response.info = '????'
        }

        ctx.body = response
    }
    else { // 404
        ctx.body = '404 Not Found!!!'
    }
})


app.on('error', function (err, ctx) {
    console.log('server error', err);
});

app.listen(3000);

module.exports = app;
