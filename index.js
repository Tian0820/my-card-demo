const Koa = require('koa');
const router = require('koa-router')(); // 引入各种依赖

const path =require('path')
    , serve = require('koa-static');

const host = process.env.HOST || '0.0.0.0'
const port = process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000

const NODE_ENV = process.env.NODE_ENV || 'development';
if (NODE_ENV === 'development') {
    // 当前环境为「开发环境」，是由命令行工具启动的
} else if(NODE_ENV == 'production') {
    // 当前环境为「生产环境」，是线上正式运行的环境
} else {
    // 当前环境为「预备环境」
}

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
