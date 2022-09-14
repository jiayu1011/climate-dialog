import Router from 'koa-router'
import fs from 'fs'
import { getStdFormatNowTime } from "../utils/utils";
import { USER_AVATAR_URL, ROBOT_AVATAR_URL } from "../config/config";
import { DIALOG_DB_HANDLER } from "../database/handler";

const router = new Router()

/**
 * 聊天室对话使用websocket通信
 */
router.all('/websocket/dialog/list', async (ctx: any) => {
    const [dialogList, err] = await DIALOG_DB_HANDLER.queryAllDialogList()
    if(err) console.log(err)
    ctx.websocket.send(JSON.stringify(dialogList))
    setInterval(async () => {
        const [dialogList, err] = await DIALOG_DB_HANDLER.queryAllDialogList()
        if(err) console.log(err)
        ctx.websocket.send(JSON.stringify(dialogList))
    }, 2000)

    ctx.websocket.on('message', (msg: any) => {
        console.log('前端发过来的数据：', msg)
    })
    ctx.websocket.on('close', () => {
        console.log('前端关闭了websocket')
    })
})


router.get('/dialog/list', async (ctx: any, next: any): Promise<any> => {
    const [dialogList, err] = await DIALOG_DB_HANDLER.queryAllDialogList()
    console.log(dialogList, err)
    ctx.body = {
        dialogList: dialogList
    }
})

router.post('/dialog/query', async (ctx: any, next: any) => {
    console.log(ctx.request.body)
    const { body } = ctx.request
    const { queryMsg } = body

    // TODO: handle function..
    let answerMsg = 'some answer...'
    const userItem = {
        isRobot: false,
        avatar: USER_AVATAR_URL,
        content: queryMsg,
        time: getStdFormatNowTime()
    }
    const robotItem = {
        isRobot: true,
        avatar: ROBOT_AVATAR_URL,
        content: answerMsg,
        time: getStdFormatNowTime()
    }
    const [insertUserItemRes, insertUserItemErr] = await DIALOG_DB_HANDLER.insertDialogItem(userItem)
    console.log(insertUserItemRes, insertUserItemErr)
    const [insertRobotItemRes, insertRobotItemErr] = await DIALOG_DB_HANDLER.insertDialogItem(robotItem)
    console.log(insertRobotItemRes, insertRobotItemErr)


    ctx.body = {
        isOk: true,
        errMsg: '',
    }

})



export default router