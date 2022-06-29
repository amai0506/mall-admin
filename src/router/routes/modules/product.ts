import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const product: AppRouteModule = {
  path: '/product',
  name: 'Product',
  component: LAYOUT,
  redirect: '/product/list',
  meta: {
    orderNo: 3,
    icon: 'ant-design:shopping-outlined',
    title: '商品管理',
  },
  children: [
    {
      path: 'list',
      name: 'ProductList',
      component: () => import('/@/views/product/list/index.vue'),
      meta: {
        title: '商品列表',
      },
    },
    {
      path: 'list/edit/:id',
      name: 'ProductListEdit',
      component: () => import('/@/views/product/list/operation/edit/index.vue'),
      meta: {
        title: '编辑商品列表',
        hideMenu: true,
      },
    },
    {
      path: 'list/add',
      name: 'ProductListAdd',
      component: () => import('/@/views/product/list/operation/add/index.vue'),
      meta: {
        title: '添加商品列表',
        hideMenu: true,
      },
    },
    {
      path: 'list/details/:id',
      name: 'ProductListDetails',
      component: () => import('/@/views/product/list/details/index.vue'),
      meta: {
        title: '商品列表详情',
        hideMenu: true,
      },
    },
    {
      path: 'sort',
      name: 'Sort',
      component: () => import('/@/views/product/sort/index.vue'),
      meta: {
        title: '商品分类',
      },
    },
    {
      path: 'sort/edit/:id',
      name: 'SortEdit',
      component: () => import('/@/views/product/sort/operation/edit/index.vue'),
      meta: {
        title: '编辑商品分类',
        hideMenu: true,
      },
    },
    {
      path: 'sort/add',
      name: 'SortAdd',
      component: () => import('/@/views/product/sort/operation/add/index.vue'),
      meta: {
        title: '添加商品分类',
        hideMenu: true,
      },
    },
    {
      path: 'sort/details/:id',
      name: 'SortDetails',
      component: () => import('/@/views/product/sort/details/index.vue'),
      meta: {
        title: '商品分类详情',
        hideMenu: true,
      },
    },
    {
      path: 'model',
      name: 'Model',
      component: () => import('/@/views/product/model/index.vue'),
      meta: {
        title: '商品型号',
      },
    },
    {
      path: 'model/edit/:id',
      name: 'ModelEdit',
      component: () => import('/@/views/product/model/operation/edit/index.vue'),
      meta: {
        title: '编辑商品型号',
        hideMenu: true,
      },
    },
    {
      path: 'model/add',
      name: 'ModelAdd',
      component: () => import('/@/views/product/model/operation/add/index.vue'),
      meta: {
        title: '添加商品型号',
        hideMenu: true,
      },
    },
    {
      path: 'model/details/:id',
      name: 'ModelDetails',
      component: () => import('/@/views/product/model/details/index.vue'),
      meta: {
        title: '商品型号详情',
        hideMenu: true,
      },
    },
  ],
};

export default product;
