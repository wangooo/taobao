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
import Shopkeeper from '@/views/Shopkeeper'
import GoodForm from '@/views/goodForm'
import Fans from '@/views/fans'
import AddShop from '@/views/AddShop'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
      path: '/addshop',
      name: 'AddShop',
      component: AddShop,
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
      path: '/shopkeeper',
      name: 'Shopkeeper',
      component: Shopkeeper,
    },
    {
      path: '/fans',
      name: 'Fans',
      component: Fans,
    },
    {
      path:'/',
      name:'Try',
      component:Gg
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
