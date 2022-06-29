import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const orders: AppRouteModule = {
  path: '/orders',
  name: 'Orders',
  component: LAYOUT,
  redirect: '/orders/list',
  meta: {
    orderNo: 4,
    hideChildrenInMenu: true,
    icon: 'ant-design:bars-outlined',
    title: '订单管理',
  },
  children: [
    {
      path: 'list',
      name: 'OrdersList',
      component: () => import('/@/views/orders/list/index.vue'),
      meta: {
        title: '订单管理',
      },
    },
    {
      path: 'list/edit/:id',
      name: 'OrdersListEdit',
      component: () => import('/@/views/orders/list/operation/edit/index.vue'),
      meta: {
        title: '编辑订单管理',
        hideMenu: true,
      },
    },
    {
      path: 'list/add',
      name: 'OrdersListAdd',
      component: () => import('/@/views/orders/list/operation/add/index.vue'),
      meta: {
        title: '添加订单管理',
        hideMenu: true,
      },
    },
    {
      path: 'list/details/:id',
      name: 'OrdersListDetails',
      component: () => import('/@/views/orders/list/details/index.vue'),
      meta: {
        title: '订单管理详情',
        hideMenu: true,
      },
    },
  ],
};

export default orders;
