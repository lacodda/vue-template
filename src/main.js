import Vue from 'vue';
import store from 'store';
import SvgIconComponent from 'components/svg-icon';
import App from 'components/App.vue';
import router from './router';
import 'styles/main.scss';

Vue.component('svg-icon', SvgIconComponent);

// Disable warnings about dev mode
Vue.config.productionTip = false;

// Initialize Vue
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
