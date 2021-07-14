import { computed } from 'vue'

export function useTodo (proxy) {
  const todoArray = computed(() => proxy.$store.state.todoArray)
  const updateTodo = (payload) => {
    proxy.$store.commit('SET_TODO_ARRAY', payload)
  }
  return {
    todoArray,
    updateTodo
  }
}

export function useFinished (proxy) {
  const finishedArray = computed(() => proxy.$store.state.finishedArray)
  const updateFinished = (payload) => {
    proxy.$store.commit('SET_FINISHED_ARRAY', payload)
  }
  return {
    finishedArray,
    updateFinished
  }
}

export function useKeepTimes (proxy) {
  const keepTimes = computed(() => proxy.$store.state.keepTimes)
  const updateKeepTimes = (payload) => {
    proxy.$store.commit('SET_KEEP_TIMES', payload)
  }
  return {
    keepTimes,
    updateKeepTimes
  }
}
