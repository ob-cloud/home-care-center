import Vue from 'vue'
import Router from 'vue-router'
import state from '../store/state'

// 引入一级组件
import Dashboard from '../views/dashboard/Dashboard.vue'

// 懒加载二级组件 Tarbar
const Home = () => import('../views/home/Home.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Mine = () => import('../views/mine/Mine.vue')
const Service = () => import('@/views/service/Service.vue')
const Shop = () => import('@/views/shop/Shop.vue')

const Login = () => import('../views/login/Login.vue')
const SettleIn = () => import('../views/settle/SettleIn.vue')

// 解决多次点击重复路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

const router = new Router({
  // 解决路由跳转页面没有置顶
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  // !!注意: 二级路由不需要加 '/'
  routes: [{
      path: '/',
      redirect: '/dashboard',
      // 是否数据缓存
      meta: {
        keepAlive: true
      },
    }, {
      // 根页面
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [{
        path: '/dashboard',
        redirect: '/dashboard/home',
        // 是否数据缓存
        meta: {
          keepAlive: true
        },
      }, {
        // 主页
        path: 'home',
        name: 'home',
        component: Home,
        // 是否数据缓存
        meta: {
          keepAlive: true
        }
      }, {
        // 服务
        path: 'service',
        name: 'service',
        component: Service,
        meta: {
          keepAlive: true
        }
      }, {
        // 商店
        path: 'shop',
        name: 'shop',
        component: Shop,
        meta: {
          keepAlive: true
        }
      }, {
        // 购物车
        path: 'cart',
        name: 'cart',
        component: Cart,
        meta: {
          keepAlive: true
        }
      }, {
        // 我的
        path: 'mine',
        name: 'mine',
        component: Mine,
        children: []
      }]
    },
    {
      // 登录
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      // 入驻申请
      path: '/Settle',
      name: 'settle',
      component: SettleIn
    }
  ]
})
//路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (state.userInfo.token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
