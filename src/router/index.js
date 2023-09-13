import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { storeToRefs } from 'pinia'
import { useMusicStore } from '@/stores/index.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/itemMusic',
    name: 'itemMusic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/ItemMusic.vue')
  },
  {
    path: '/searchView',
    name: 'searchView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "searchview" */ '../views/SearchView.vue')
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    beforeEnter: (to, from, next) => {
      // 由于执行顺序前后问题，在守卫中提取仓库数据
      const { isLogin,token } = storeToRefs(useMusicStore())
      if (isLogin.value || token.value || localStorage.getItem('token') ) {
        next()
      } else {
        next('/login')
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "userInfo" */ '../views/UserInfo.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,form)=>{
  const { isFooterMusic } = storeToRefs(useMusicStore())
  if (to.path=='/login') {
    isFooterMusic.value=false
    //console.log(isFooterMusic.value)
  } else {
    isFooterMusic.value=true
  }
})
export default router
