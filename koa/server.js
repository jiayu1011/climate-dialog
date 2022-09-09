import koa from 'koa'
import router from './router/router.js'
import koaLogger from 'koa-logger'

const app = new koa()

app.use(koaLogger())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
    console.log('running on 3000.....')

})