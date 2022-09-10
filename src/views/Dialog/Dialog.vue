<template>
  <div class="dialog">
    <div class="dialog_container">
      <div class="dialog_header">气象智能机器人</div>
      <div class="dialog_body" ref="dialogListRef">
        <div class="dialog_list">
          <dialog-item :class="item.isRobot? 'left_item':'right_item'" v-for="(item, index) in dialogList" :key="index">
            <template #avatar class="item_avatar">
              <van-image
                  :src="item.isRobot? 'https://ts1.cn.mm.bing.net/th/id/R-C.2ad8f6ede1242bf4be99a8cdebbde3a6?rik=n4Wtger92nfaEw&riu=http%3a%2f%2fimg.duoziwang.com%2f2018%2f18%2f06011824505597.jpg&ehk=KuyndoGPkqGIahxavIH8hDVIobcQTSrwPeKeB86yY4Q%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1':'https://ts1.cn.mm.bing.net/th/id/R-C.3da986748387a6a4f4168a7ac084fddc?rik=4dO%2bDXfZdKlsfw&riu=http%3a%2f%2fpic.sc.chinaz.com%2ffiles%2fpic%2fwebjs1%2f201604%2fjiaoben4136.jpg&ehk=eQXCTqLrf7FunjzWEP1BLjwiA0uV6V6otl1tJe2xK4A%3d&risl=&pid=ImgRaw&r=0'"
                  fit="contain"
                  round
                  width="3rem"
                  height="3rem"
              />
            </template>
            <template #name>{{ item.isRobot ? '机器人' : '我' }}</template>
            <template #content>{{ item.content }}</template>
            <template #time>{{ item.time }}</template>
          </dialog-item>
        </div>
      </div>


      <!--TODO: position:fixed-->
      <div class="text_editor">
        <van-field
            placeholder="请输入聊天内容.."
            v-model="queryMsg"
            type="textarea"
            autosize
            maxlength="40"
            show-word-limit
        >
        </van-field>
        <van-button
            class="send_btn"
            plain
            type="primary"
            @click="handleMsgSend"
        >发送
        </van-button>
      </div>
    </div>


  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch, nextTick, Ref} from "vue";
import DialogItem from "@/views/Dialog/DialogItem.vue";
import axios from "@/utils/axios";
import {AxiosError, AxiosResponse } from "axios";

interface DiaLogItem {
  isRobot: boolean,
  avatar: string,
  content: string,
  time: string
}

export default defineComponent({
  name: "Dialog",
  components: {
    DialogItem
  },
  setup(props, ctx) {
    const count = ref<number>(1)
    const dialogList = ref<Array<DiaLogItem>>([])
    const queryMsg = ref<string>('')
    const dialogListRef = ref<Element | null>(null)

    watch(dialogList, () => {
      // scrollToBottom()
    })

    const scrollToBottom = () => {
      // 使用ref操作dom
      if(!dialogListRef.value) return
      dialogListRef.value.scrollTop = dialogListRef.value.scrollHeight
    }

    const getDialogList = () => {
       return axios.get('/dialog/list')
           .then((res: AxiosResponse) => {
             console.log('聊天记录:', dialogList.value = res.data.dialogList)
           })
           .catch((err: AxiosError) => {
             console.log(err)
           })
    }
    const wsGetDialogList = () => {
      const webSocket: WebSocket = new WebSocket('ws://localhost:3000/websocket/dialog/list')
      webSocket.onopen = () => {
        console.log('websocket连接成功')
        webSocket.send('websocket连接成功')
      }
      webSocket.onmessage = (event: any) => {
        const res = JSON.parse(event.data)
        console.log('聊天记录:', dialogList.value = res)
      }
      webSocket.onclose = () => {
        console.log('websocket连接关闭')
      }
    }

    const sendMsg = () => {
      return axios.post('/dialog/query', {
        queryMsg: queryMsg.value
      })
    }

    const handleMsgSendClick = async () => {
      const res: AxiosResponse = await sendMsg()
      console.log('发送查询:', res)
      if (res.data.isOk) {
        queryMsg.value = ''
        await getDialogList()
        scrollToBottom()
      }
    }
    const init = async () => {
      await getDialogList()
      scrollToBottom()
      wsGetDialogList()
    }
    const reset = () => {

    }

    init()

    return {
      count,
      queryMsg,
      dialogList,
      dialogListRef,
      handleMsgSend: handleMsgSendClick,
    }
  }
})
</script>

<style scoped lang="scss">
.dialog {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(
          115deg,
          rgba(64, 89, 173, 0.8),
          rgba(122, 122, 189, 0.7)
  ), url(https://cdn.freecodecamp.org/testable-projects-fcc/images/survey-form-background.jpeg);

  .dialog_container {
    width: 30rem;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: hidden;

    .dialog_header {
      height: 4rem;
      width: 100%;
      line-height: 4rem;
      background-color: #00BDFEFF;
      color: white;
      text-align: center;
      font-size: 1.5rem;
    }

    .dialog_body {
      flex: 1;
      overflow-y: auto;
      .dialog_list {
        padding: 0.5rem;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        .left_item, .right_item {
          display: flex;
          min-height: 4rem;
        }

        .left_item {
          align-self: start;
          flex-direction: row;
        }

        .right_item {
          align-self: end;
          flex-direction: row-reverse;
        }
      }

    }

    .dialog_body::-webkit-scrollbar {
      width: 0;
    }

    .text_editor {
      min-height: 5rem;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-top: 1px solid #d9d9d9;
      overflow-y: auto;

      .send_btn {
        margin-top: 0.5rem;
        width: 5rem;
        height: 2rem;
        border-radius: 0.2rem;
        margin-right: 0.2rem;
      }

    }

  }
}

</style>