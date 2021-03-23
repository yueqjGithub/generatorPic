import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/genDbs',
    component: () => import('@/layouts/mainLayout.vue'),
    children: [
      {
        path: '/genDbs',
        name: 'genDbs',
        component: () => import('@/views/genDbs/dbs.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
