import { createRouter, createWebHashHistory } from 'vue-router'
import Todo from '../views/Todo.vue'

const routes = [
  {
    path: '/',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/finished',
    name: 'Finished',
    component: () => import(/* webpackChunkName: "finished" */ '../views/Finished.vue')
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import(/* webpackChunkName: "add" */ '../views/Add.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
