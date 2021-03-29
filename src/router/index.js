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
      },
      {
        path: '/genZz',
        name: 'genZz',
        component: () => import('@/views/genZz/genZz.vue')
      },
      {
        path: '/genYz',
        name: 'genYz',
        component: () => import('@/views/genYz/genYz.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
