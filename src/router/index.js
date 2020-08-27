import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'

import NotFound from '../views/NotFound.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/',
      component: () => import( /* webpackChunkName: "Dashbord" */ '../views/Dashbord.vue'),
      children: [{
        path: '/home',
        name: 'home',
        component: () => import( /* webpackChunkName: "Home" */ '../views/Home.vue'),
      }, {
        path: '/category',
        name: 'category',
        component: () => import( /* webpackChunkName: "Category" */ '../views/Category.vue'),
      }, {
        path: '/order',
        name: 'order',
        component: () => import( /* webpackChunkName: "Order" */ '../views/Order.vue')
      }, {
        path: '/order/orderList/:id',
        name: 'orderList',
        component: () => import( /* webpackChunkName: "OrderList" */ '../views/OrderList.vue'),
      }, {
        path: '/user',
        name: 'user',
        component: () => import( /* webpackChunkName: "User" */ '../views/User.vue'),
      }, {
        path: '/product',
        name: 'product',
        component: () => import( /* webpackChunkName: "Product" */ '../views/Product.vue'),
      }, {
        path: '/product/productadd', 
        name: 'productadd',
        component: () => import( /* webpackChunkName: "ProductAdd" */ '../views/Productadd.vue'),
      }, {
        path: '/product/productDetai/:id', 
        name: 'ProductDetai',
        component: () => import( /* webpackChunkName: "productDetai" */ '../views/ProductDetai.vue'),
      }, {
        path: '/product/productUpdate/:id', 
        name: 'productUpdate',
        component: () => import( /* webpackChunkName: "productUpdate" */ '../views/UpdateProduct.vue'),
      }, {
        path: '/spec',
        name: 'spec',
        component: () => import( /* webpackChunkName: "Spec" */ '../views/Spec.vue'),
      }, {
        path: '/role',
        name: 'role',
        component: () => import( /* webpackChunkName: "Role" */ '../views/Role.vue'),
      }]
    },
    {
      path: ''
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  // ${to and from are Route Object,next() must be called to resolve the hook}

  // to 将要访问的路劲
  // from 代表从哪里啦
  // next 

  if (to.path === '/login') return next()

  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()


})

export default router
