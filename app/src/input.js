import Vue from 'vue';
import store from './store';
import _ from './icons/index';
import ElementUI from 'element-ui';
import router from './router/input';
import Input from './views/Input.vue';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(Input),
}).$mount('#app');
