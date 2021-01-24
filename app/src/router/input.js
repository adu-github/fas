import Vue from 'vue';
import VueRouter from 'vue-router';
import Account from '../views/Input/Account.vue';
import Welcome from '../views/Input/Welcome.vue';
import Medium from '../views/Input/Medium.vue';
import Choice from '../views/Input/Choice.vue';
import Confirm from '../views/Input/Confirm.vue';
import Upload from '../views/Input/Upload.vue';
import Complete from '../views/Input/Complete.vue';
import ErrorPage from '../views/components/ErrorPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'account',
    component: Account,
    meta: {
      title: '身份验证',
    },
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: Welcome,
    meta: {
      title: '欢迎你',
    },
  },
  {
    path: '/medium',
    name: 'medium',
    component: Medium,
    meta: {
      title: '插入存储媒介',
    },
  },
  {
    path: '/choice',
    name: 'choice',
    component: Choice,
    meta: {
      title: '选择导入的文件',
    },
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: Confirm,
    meta: {
      title: '确认你的选择',
    },
  },
  {
    path: '/upload',
    name: 'upload',
    component: Upload,
    meta: {
      title: '正在上传文件',
    },
  },
  {
    path: '/complete',
    name: 'complete',
    component: Complete,
    meta: {
      title: '已完成',
    },
  },
  {
    path: '/error',
    name: 'error',
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
  document.title = `文件导入终端 - ${to.meta.title}`;
  next();
});

export default router;
