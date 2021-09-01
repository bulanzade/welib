import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home"
import MyBorrowing from "@/views/MyBorrowing"
import Login from "@/views/Login"
import User from "@/views/User"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/myborrowing',
    name: 'MyBorrowing',
    component: MyBorrowing
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/user',
    name: 'User',
    component: User
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login')
  {
    if (localStorage.getItem("USERID"))
    {
      next('/')
    }
    else
    {
      next()
    }
  }
  else if (localStorage.getItem("USERID"))
  {
    next()
  }
  else
  {
    next('/login')
  }
})

export default router
