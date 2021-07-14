<template>
  <h2>新建任务</h2>
  <div class="form-item">
    <label for="taskName">设置任务</label>
    <input type="text" id="taskName" class="enable-click" v-model="task.name"/>
  </div>
  <div class="form-item">
    <label for="taskTime">设置时间</label>
    <input type="time" id="taskTime" class="enable-click" v-model="task.time">
  </div>
  <div class="form-item">
    <span class="submit-task enable-click" @click="addFunc">确定</span>
  </div>
</template>
<script>
import { setTaskTimer } from '../utils/useIPC.js'
import { getCurrentInstance, reactive } from 'vue'
import { useTodo } from '../utils/useData.js'
export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const { todoArray, updateTodo } = useTodo(proxy)
    const task = reactive({
      name: '',
      time: ''
    })
    function addFunc () {
      if (!task.name) return

      const todos = [...todoArray.value]
      todos.push(task)
      updateTodo(todos)

      setTaskTimer(task.time, task.name)

      proxy.$router.push({
        path: '/'
      })
    }
    return {
      task,
      addFunc
    }
  }
}
</script>
<style lang="scss" scoped>
.form-item{
  margin-top: 40px;
}
.form-item input{
  margin-left: 20px;
}
.submit-task{
  background-color: #31c27c;
  color: #fff;
  padding: 6px 15px;
  border-radius: 3px;
  cursor: pointer;
}
</style>
