import Vue from 'vue';
import SvgIcon from '../views/components/SvgIcon.vue';

Vue.component('svg-icon', SvgIcon);

const req = require.context('./svg', false, /\.svg$/);
const requireAll = (rc) => rc.keys().map(rc);
requireAll(req);
