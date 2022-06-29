import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const account: AppRouteModule = {
  path: '/account',
  name: 'Account',
  component: LAYOUT,
  redirect: '/account/list',
  meta: {
    orderNo: 2,
    hideChildrenInMenu: true,
    icon: 'ant-design:user-outlined',
    title: '用户管理',
  },
  children: [
    {
      path: 'list',
      name: 'AccountList',
      component: () => import('/@/views/accounts/account/index.vue'),
      meta: {
        title: '用户管理',
      },
    },
    {
      path: 'edit/:id',
      name: 'AccountEdit',
      component: () => import('/@/views/accounts/account/operation/edit/index.vue'),
      meta: {
        title: '编辑用户管理',
        hideMenu: true,
      },
    },
    {
      path: 'add',
      name: 'AccountAdd',
      component: () => import('/@/views/accounts/account/operation/add/index.vue'),
      meta: {
        title: '添加用户管理',
        hideMenu: true,
      },
    },
    {
      path: 'details/:id',
      name: 'AccountDetails',
      component: () => import('/@/views/accounts/account/details/index.vue'),
      meta: {
        title: '用户管理详情',
        hideMenu: true,
      },
    },
  ],
};

export default account;
