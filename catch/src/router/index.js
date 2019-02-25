import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index2'
import CONFIG from './../config'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'index',
      path: '/catch',
      component: CONFIG.isAlipayOpen ? r => require.ensure([], () => r(require('@/components/alipaytip'))) :  CONFIG.isTmallOpen ? r => require.ensure([], () => r(require('@/components/tmalltip'))) : index
      // component: index
      // component: r => require.ensure([], () => r(require('@/components/index2')))
    },
    {
      path: '/404',
      component: r => require.ensure([], () => r(require('@/components/notcomponent')))
    },
    {
      path: '/',
      redirect: '/catch'
    }
  ]
})
