<template>
  <div class="dialog">
    <div class="dialog_container">
      <div class="dialog_header">智能机器人</div>

      <div class="dialog_body">
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
              <template #name>{{item.isRobot? '机器人':'我'}}</template>
              <template #content>{{item.content}}</template>
              <template #time>{{item.time}}</template>
            </dialog-item>
        </div>
      </div>


      <!--TODO: position:fixed-->
      <div class="text_editor">
        <van-field
            placeholder="请输入聊天内容.."
            type="textarea"
            autosize
        >
        </van-field>
        <van-button
            class="send_btn"
            plain
            type="primary"
        >发送
        </van-button>
      </div>
    </div>


  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import DialogItem from "@/views/Dialog/DialogItem.vue";
import axios from "@/utils/axios";

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
  setup() {
    const count = ref<number>(1)
    const dialogList = ref<Array<DiaLogItem>>([])

    const getDialogList = () => {
      axios.get('/dialog/list')
      .then(res => {
        console.log('dialogList:', res)

      })
    }

    const init = () => {
      getDialogList()
    }

    init()

    return {
      count,
      dialogList
    }
  }
})
</script>

<style scoped lang="scss">
.dialog{
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

  .dialog_container{
    width: 30rem;
    height: 100%;
    overflow-y: auto;
    padding-top: 4rem;
    background-color: white;

    .dialog_header{
      position: fixed;
      top: 0;
      height: 4rem;
      width: inherit;
      line-height: 4rem;
      background-color: #00BDFEFF;
      color: white;
      text-align: center;
      font-size: 1.5rem;
      z-index: 2;
    }

    .dialog_list{
      padding: 0.5rem;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .left_item, .right_item{
        display: flex;
        min-height: 4rem;
      }

      .left_item{
        align-self: start;
        flex-direction: row;
      }
      .right_item{
        align-self: end;
        flex-direction: row-reverse;
      }

    }



    .text_editor{
      position: fixed;
      bottom: 0;
      min-height: 3rem;
      width: inherit;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #d9d9d9;
      z-index: 2;

      .send_btn{
        width: 5rem;
        height: 2rem;
        border-radius: 0.2rem;
        margin-right: 0.2rem;
      }

    }

  }
}

</style>