import Vue from 'vue';
import VueRouter from 'vue-router';
import PageHome from 'components/Page/PageHome';
import PageArticle from 'components/Page/PageArticle';
import PageList from 'components/Page/PageList';

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
