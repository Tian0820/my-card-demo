const Koa = require('koa');
const router = require('koa-router')(); // 引入各种依赖

const path =require('path')
    , serve = require('koa-static');

const app = new Koa();

app.use(require('koa-bodyparser')());

app.use(function* (next){
    let start = new Date;
    yield next;
    let ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms); // 显示执行的时间
});

app.use(serve(path.resolve('public')));

app.on('error', function(err, ctx){
    console.log('server error', err);
});

app.listen(8889,() => {
    console.log('Koa is listening in 8889');
});

module.exports = app;
