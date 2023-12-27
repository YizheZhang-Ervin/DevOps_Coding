const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')()

// routes
router.get('/home', async (ctx, next) => {
    ctx.body = {
        code: 200,
        message: 'HEALTH OK',
        result: '',
    }
})

// error-handling
app.on('error', (err, ctx) => {
    ctx.status = 500
    ctx.body = err
    console.error('server error', err, ctx)
});

app.use(router.routes())

app.listen(3000);