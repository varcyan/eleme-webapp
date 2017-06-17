import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Goods from '@/components/main/con-goods'
import Ratings from '@/components/main/con-ratings'
import Seller from '@/components/main/con-seller'

import headerCss from 'assets/css/header'
import iconfontCss from 'assets/css/iconfont'
import base from 'assets/css/base'
import star from 'assets/css/star'
import goods from 'assets/css/goods'
import shopcar from 'assets/css/shopcar'

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    }
  ]
})
