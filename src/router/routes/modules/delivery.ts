import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const delivery: AppRouteModule = {
  path: '/delivery',
  name: 'Delivery',
  component: LAYOUT,
  redirect: '/delivery/settings',
  meta: {
    orderNo: 5,
    icon: 'ion:grid-outline',
    title: '店铺设置',
  },
  children: [
    {
      path: 'settings',
      name: 'DeliverySettings',
      component: () => import('/@/views/delivery/settings/index.vue'),
      meta: {
        title: '快递设置',
      },
    },
    {
      path: 'list',
      name: 'DeliveryList',
      component: () => import('/@/views/delivery/list/index.vue'),
      meta: {
        title: '快递公司',
        hideMenu: true,
      },
    },
    // {
    //   path: 'list/edit/:id',
    //   name: 'DeliveryListEdit',
    //   component: () => import('/@/views/delivery/list/operation/edit/index.vue'),
    //   meta: {
    //     title: '编辑快递公司',
    //     hideMenu: true,
    //   },
    // },
    // {
    //   path: 'list/add',
    //   name: 'DeliveryListAdd',
    //   component: () => import('/@/views/delivery/list/operation/add/index.vue'),
    //   meta: {
    //     title: '添加快递公司',
    //     hideMenu: true,
    //   },
    // },
    // {
    //   path: 'list/details/:id',
    //   name: 'DeliveryListDetails',
    //   component: () => import('/@/views/delivery/list/details/index.vue'),
    //   meta: {
    //     title: '快递公司详情',
    //     hideMenu: true,
    //   },
    // },

    {
      path: 'fares',
      name: 'Fares',
      component: () => import('/@/views/delivery/fares/index.vue'),
      meta: {
        title: '运费模板',
      },
    },
    {
      path: 'fares/edit/:id',
      name: 'FaresEdit',
      component: () => import('/@/views/delivery/fares/operation/edit/index.vue'),
      meta: {
        title: '编辑运费模板',
        hideMenu: true,
      },
    },
    {
      path: 'fares/add',
      name: 'FaresAdd',
      component: () => import('/@/views/delivery/fares/operation/add/index.vue'),
      meta: {
        title: '添加运费模板',
        hideMenu: true,
      },
    },
    {
      path: 'fares/details/:id',
      name: 'FaresDetails',
      component: () => import('/@/views/delivery/fares/details/index.vue'),
      meta: {
        title: '运费模板详情',
        hideMenu: true,
      },
    },
  ],
};

export default delivery;
