<template>
  <span class="close enable-click" @click="closeRemind">知道了</span>
  <div class="reminder">
    <span>{{remindMsg}}</span>的时间到啦！
  </div>
  <div class="background"
      :style="{
        backgroundImage: 'url(./img/' + imgs[bgIndex] + ')',
        backgroundSize:'contain'}">
  </div>
</template>
<script>
import { closeRemind, setRemindMsg } from '../../utils/useIPC.js'
export default {
  setup () {
    const remindMsg = setRemindMsg()
    return {
      closeRemind,
      remindMsg,
      bgIndex: parseInt(Math.random() * 5),
      imgs: [
        'background_1.jfif',
        'background_2.png',
        'background_3.jpg',
        'background_4.jfif',
        'background_5.jfif'
      ]
    }
  }
}
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.reminder{
  text-align: center;
  margin: 100px auto;
  font-size: 30px;
  width: 280px;
  color:gold
}
.background{
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  filter: blur(3px) opacity(0.2);
}
.close{
  position: absolute;
  font-size: 14px;
  color:dodgerblue;
  right: 30px;
  bottom: 30px;
  cursor: pointer;
  z-index: 1;
}
</style>
