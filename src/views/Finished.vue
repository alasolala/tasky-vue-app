<template>
  <h2>今日已完成任务</h2>
  <ul class="tasks task-finished">
    <li class="task-item" v-for="(item,index) in finishedArray" :key="index">
      <span class="task-text">{{item.name}}</span>
      <span class="flag-icon"></span>
    </li>
  </ul>
  <p>你已经对自己信守承诺<span class="keep-times">{{keepTimes}}</span>次，继续加油哦！</p>
</template>
<script>
import { getCurrentInstance } from 'vue'
import { useFinished, useKeepTimes } from '../utils/useData.js'
export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const { finishedArray } = useFinished(proxy)
    const { keepTimes } = useKeepTimes(proxy)
    return {
      finishedArray,
      keepTimes
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/tasks.scss";
@include task-common-style;
.flag-icon{
  display: inline-block;
  height:20px;
  width: 20px;
  background: url('../assets/flag.png') no-repeat;
  background-size: cover;
}
.keep-times{
  color: #31c27c;
  margin:  0 4px;
}
</style>
