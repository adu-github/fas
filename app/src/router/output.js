import Vue from 'vue';
import VueRouter from 'vue-router';

import Account from '../views/Output/Account.vue';
import Welcome from '../views/Output/Welcome.vue';
import Choice from '../views/Output/Choice.vue';
import Confirm from '../views/Output/Confirm.vue';
import Download from '../views/Output/Download.vue';
import Complete from '../views/Output/Complete.vue';
import ErrorPage from '../views/components/ErrorPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Account',
    component: Account,
    meta: {
      title: '身份验证',
    },
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome,
    meta: {
      title: '欢迎你',
    },
  },
  {
    path: '/choice',
    name: 'Choice',
    component: Choice,
    meta: {
      title: '选择导出项',
    },
  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: Confirm,
    meta: {
      title: '确认导出项',
    },
  },
  {
    path: '/download',
    name: 'Download',
    component: Download,
    meta: {
      title: '下载文件',
    },
  },
  {
    path: '/complete',
    name: 'Complete',
    component: Complete,
    meta: {
      title: '导出文件完成',
    },
  },
  {
    path: '/errorPage',
    name: 'ErrorPage',
    component: ErrorPage,
    meta: {
      title: '出错啦',
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `文件导出终端- ${to.meta.title}`;
  next();
});

export default router;
