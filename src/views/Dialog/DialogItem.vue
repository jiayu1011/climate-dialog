<template>
  <div class="item">
    <slot name="avatar" class="avatar">默认avatar</slot>
    <div class="content_part">
      <div class="name">
        <slot name="name">默认name</slot>
      </div>
      <div class="content">

        <slot name="content">默认content</slot>
      </div>
      <div class="time">
        <slot name="time">默认time</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
export default defineComponent({
  name: "DialogItem",
  setup() {
    return {

    }
  }
})
</script>

<style scoped lang="scss">
.item{

  .content_part{
    display: flex;
    flex-direction: column;

    .name{
      color: gray;
      font-size: 1rem;
    }
    .content{
      font-size: 1.3rem;
    }
    .time{
      font-size: 0.6rem;
    }
  }
}

.left_item{
  .content_part{
    align-items: flex-start;
  }
}

.right_item{
  .content_part{
    align-items: flex-end;
  }
}

</style>