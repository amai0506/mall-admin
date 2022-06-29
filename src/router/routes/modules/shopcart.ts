import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const shopcart: AppRouteModule = {
  path: '/shopcart',
  name: 'Shopcart',
  component: LAYOUT,
  redirect: '/shopcart/list',
  meta: {
    orderNo: 4,
    hideChildrenInMenu: true,
    icon: 'ant-design:bars-outlined',
    title: '购物车',
  },
  children: [
    {
      path: 'list',
      name: 'ShopcartList',
      component: () => import('/@/views/shopcart/list/index.vue'),
      meta: {
        title: '购物车',
      },
    },
    {
      path: 'list/edit/:id',
      name: 'ShopcartListEdit',
      component: () => import('/@/views/shopcart/list/operation/edit/index.vue'),
      meta: {
        title: '编辑购物车',
        hideMenu: true,
      },
    },
    {
      path: 'list/add',
      name: 'ShopcartListAdd',
      component: () => import('/@/views/shopcart/list/operation/add/index.vue'),
      meta: {
        title: '添加购物车',
        hideMenu: true,
      },
    },
    {
      path: 'list/details/:id',
      name: 'ShopcartListDetails',
      component: () => import('/@/views/shopcart/list/details/index.vue'),
      meta: {
        title: '购物车详情',
        hideMenu: true,
      },
    },
  ],
};

export default shopcart;
