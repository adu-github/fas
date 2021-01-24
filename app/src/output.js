import Vue from 'vue';
import store from './store';
import router from './router/output';
import _ from './icons/index';
import ElementUI from 'element-ui';
import Output from './views/Output.vue';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(Output),
}).$mount('#app');
