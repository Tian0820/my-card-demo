const Koa = require('koa');
const router = require('koa-router')(); // 引入各种依赖

const path =require('path')
    , serve = require('koa-static');

const AV = require('leanengine');

AV.init({
    appId: process.env.LEANCLOUD_APP_ID || 'GLd1iHuvtxpzpWilAoasYC57-gzGzoHsz',
    appKey: process.env.LEANCLOUD_APP_KEY || '3P54ey1zeTwTEXmmDeKCpr0H',
    masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || 'rQuB50Lo92FJD9es4KHTQC9x'
});

const app = new Koa();

app.use(require('koa-bodyparser')());
app.use(AV.koa());
app.listen(process.env.LEANCLOUD_APP_PORT);

app.use(function *(next) {
    if (this.url === '/todos') {
        return new AV.Query('Todo').find().then(todos => {
            this.body = todos;
        });
    } else {
        yield next;
    }
});

app.use(serve(path.resolve('public')));

app.on('error', function(err, ctx){
    console.log('server error', err);
});

// app.listen(8889,() => {
//     console.log('Koa is listening in 8889');
// });

module.exports = app;
