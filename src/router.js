import Vue from 'vue';
import VueRouter from 'vue-router';
import PageHome from './components/page/PageHome.vue';
import PageArticle from './components/page/PageArticle.vue';
import PageList from './components/page/PageList.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: PageHome,
    },
    {
      name: 'article',
      path: '/article',
      component: PageArticle,
    },
    {
      name: 'list',
      path: '/list',
      component: PageList,
    },
  ],
  mode: 'history',
});
