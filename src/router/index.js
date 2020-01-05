import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import Try from '@/views/Try'
import Oo from '@/views/Oo'
import Gg from '@/views/Gg'
import Login from '@/views/Login'
import Home from '@/views/Home'
import MyShop from '@/views/MyShop'
import ShopManage from '@/views/ShopManage'
import Access from '@/views/Access'
import Audit from '@/views/Audit'
import GoodForm from '@/views/goodForm'

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
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/access',
      name: 'Access',
      component: Access,
    },
    {
      path: '/myShop',
      name: 'MyShop',
      component: MyShop,
    },
    {
      path: '/shopManage',
      name: 'ShopManage',
      component: ShopManage,
    },
    {
      path: '/goodform',
      name: 'GoodForm',
      component: GoodForm,
    },
    {
      path: '/Audit',
      name: 'Audit',
      component: Audit,
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
