<template>
  <h2>今日待完成任务</h2>
  <ul class="tasks">
    <li class="task-item" v-for="(item,index) in todoArray" :key="index">
      <span class="task-text">{{item.name}}&nbsp;&nbsp;&nbsp; {{item.time}} </span>
      <span>
        <span class="btns enable-click" @click="finishFunc(index)">完成</span>
        <span class="btns enable-click" @click="deleteFunc(index)">删除</span>
      </span>
    </li>
  </ul>
</template>
<script>
import { getCurrentInstance } from 'vue'
import { useTodo, useFinished, useKeepTimes } from '../utils/useData.js'
export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const { todoArray, updateTodo } = useTodo(proxy)
    const { finishedArray, updateFinished } = useFinished(proxy)
    const { keepTimes, updateKeepTimes } = useKeepTimes(proxy)

    function finishFunc (index) {
      const todos = [...todoArray.value]
      const finisheds = [...finishedArray.value]

      finisheds.push(todos[index])
      updateFinished(finisheds)

      todos.splice(index, 1)
      updateTodo(todos)

      updateKeepTimes(keepTimes.value + 1)

      proxy.$router.push({
        path: '/finished'
      })
    }
    function deleteFunc (index) {
      const todos = [...todoArray.value]
      todos.splice(index, 1)
      updateTodo(todos)
    }
    return {
      todoArray,
      finishFunc,
      deleteFunc
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
@import "../scss/tasks.scss";
@include task-common-style;
.btns{
  color: #03a9f4;
  cursor: pointer;
  margin-left: 5px;
}
</style>
