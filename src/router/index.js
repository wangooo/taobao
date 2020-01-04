import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import Try from '@/views/Try'
import Oo from '@/views/Oo'
import Gg from '@/views/Gg'
import Login from '@/views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList,
    },
    {
      path:'/cart',
      name:'Cart',
      component:Cart
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/try',
      name:'Try',
      component:Try,
      children:[
        {
          path:'oo',
          name:'oo',
          component:Oo
        },{
          path:'gg',
          name:'gg',
          component:Gg
        }
      ]
    }
    // {
    //   path:'/oo',
    //   name:'oo',
    //   component:Oo,
    // },
    // {
    //   path:'/gg',
    //   name:'gg',
    //   component:Gg
    // }
  ]
})
