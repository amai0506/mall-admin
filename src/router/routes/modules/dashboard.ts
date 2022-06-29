import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 1,
    icon: 'ion:grid-outline',
    title: '首页',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'analysis',
      name: 'analysis',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: '控制台',
      },
    },
  ],
};

export default dashboard;
