import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const views = name => () => import(`@/views/${name}.vue`)

const routes = [
   {
      path: '/',
      name: 'Home',
      component: views('Home')
   },
   {
      path: '/user',
      name: 'User',
      component: views("User"),
      children: [
         {
            path: 'profile',
            component: views("Profile")
         },
         {
            path: 'trips',
            component: views("Trips")
         }
      ]
   },
   {
      path: '/login',
      name: 'Login',
      component: views("Login")
   },
   {
      path: '/register',
      name: 'Register',
      component: views("Register")
   },
   {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: views("ForgotPassword")
   },
   {
      path: '/faq',
      name: 'FAQ',
      component: views("FAQ")
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

export default router
