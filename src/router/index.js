import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const createView = relativePath => () => import('@/views/' + relativePath)

/**
 * 创建可用于组建一级菜单及其子菜单的路由
 * @param {Object[]} routes - 菜单下的子菜单路由集合
 * @param {String=} name - 菜单名称，为空时其子菜单将与该菜单同级
 * @param {String=} icon - 菜单图标
 */
const createMenuRoutes = (routes, name, icon) => ({
  path: '/',
  component: Layout,
  children: routes,
  name,
  icon
})


export default new Router({
  mode: 'history',
  routes: [
    { path: '/login', component: createView('Login'), hidden: true },
    createMenuRoutes([{ path: '/', redirect: '/order', hidden: true }]),
    createMenuRoutes(
      [
        { path: '/order', component: createView('order/Index'), name: '订单列表' },
        {
          path: '/order/edit/:id',
          component: createView('order/Edit'),
          name: '编辑订单',
          hidden: true
        }
      ],
      '订单',
      'list'
    )
  ]
})
