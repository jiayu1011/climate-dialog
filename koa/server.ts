import koa from 'koa'
import router from './router/router'
import koaLogger from 'koa-logger'
import bodyParser from "koa-bodyparser";
import webSockify from "koa-websocket";


const app = webSockify(new koa())


app.ws.use(koaLogger())
app.ws.use(bodyParser())
// @ts-ignore
app.ws.use(router.routes()).use(router.allowedMethods())

app.use(koaLogger())
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())


app.listen(3000, () => {
    console.log('koa server running on 3000.....')
})