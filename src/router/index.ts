import { createRouter,createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import adRouter from './model/ChRouter'
import index from '../views/index.vue'
import login from '../views/login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: index,
    redirect:'/user',
    children: adRouter
  },
  {
    path: '/login',
    name: 'login',
    component:login,
  }
]


const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
