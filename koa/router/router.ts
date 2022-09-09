import Router from 'koa-router'
import fs from 'fs'
import { getStdFormatNowTime } from "../utils/utils";

const router = new Router()

const USER_AVATAR_URL = "https://ts1.cn.mm.bing.net/th/id/R-C.3da986748387a6a4f4168a7ac084fddc?rik=4dO%2bDXfZdKlsfw&riu=http%3a%2f%2fpic.sc.chinaz.com%2ffiles%2fpic%2fwebjs1%2f201604%2fjiaoben4136.jpg&ehk=eQXCTqLrf7FunjzWEP1BLjwiA0uV6V6otl1tJe2xK4A%3d&risl=&pid=ImgRaw&r=0"
const ROBOT_AVATAR_URL = "https://ts1.cn.mm.bing.net/th/id/R-C.3da986748387a6a4f4168a7ac084fddc?rik=4dO%2bDXfZdKlsfw&riu=http%3a%2f%2fpic.sc.chinaz.com%2ffiles%2fpic%2fwebjs1%2f201604%2fjiaoben4136.jpg&ehk=eQXCTqLrf7FunjzWEP1BLjwiA0uV6V6otl1tJe2xK4A%3d&risl=&pid=ImgRaw&r=0"


router.all('/websocket/dialog/list', async (ctx: any) => {
    ctx.websocket.send(fs.readFileSync('./koa/data/dialog_list.json', {encoding: "utf-8"}))
    setInterval(() => {
        ctx.websocket.send(fs.readFileSync('./koa/data/dialog_list.json', {encoding: "utf-8"}))
    }, 2000)

    ctx.websocket.on('message', (msg: any) => {
        console.log('前端发过来的数据：', msg)
    })
    ctx.websocket.on('close', () => {
        console.log('前端关闭了websocket')
    })
})


// router.get('/dialog/list', (ctx: any, next: any) => {
//     const dialogList: any = JSON.parse(fs.readFileSync('./koa/data/dialog_list.json', {encoding: "utf-8"}))
//     console.log(dialogList)
//     ctx.body = {
//         dialogList: dialogList
//     }
// })

router.post('/dialog/query', (ctx: any, next: any) => {
    console.log(ctx.request.body)
    const { body } = ctx.request
    const { queryMsg } = body
    const dialogList: any = JSON.parse(fs.readFileSync('./koa/data/dialog_list.json', {encoding: "utf-8"}))
    dialogList.push({
        isRobot: false,
        avatar: USER_AVATAR_URL,
        content: queryMsg,
        time: getStdFormatNowTime()
    })
    // TODO: handle function..
    let answerMsg = 'some answer...'
    dialogList.push({
        isRobot: true,
        avatar: ROBOT_AVATAR_URL,
        content: answerMsg,
        time: getStdFormatNowTime()
    })
    fs.writeFileSync('./koa/data/dialog_list.json', JSON.stringify(dialogList), {encoding: 'utf-8'})

    ctx.body = {
        isOk: true,
        errMsg: '',
    }

})



export default router