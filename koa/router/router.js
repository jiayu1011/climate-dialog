import Router from 'koa-router'
import fs from 'fs'
import {nextTick} from "vue";

const router = new Router()

router.get('/dialog/list', (ctx, next) => {

    let data = fs.readFileSync('./koa/mock/mockData.json', {encoding: "utf-8"})
    data = JSON.parse(data)
    // console.log(data)
    ctx.body = {
        dialogList: data.mockDialogList
    }
})



export default router