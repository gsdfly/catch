import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index2'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name:'index',
      path: document.URL.indexOf('www') !== -1 ? '/catch/*' : '/taobao/*',
      component: index
      // component: r => require.ensure([], () => r(require('@/components/index2')))
    },
    {
      path: '/tencent',
      component: r => require.ensure([], () => r(require('@/components/tencent')))
    },
    {
      path: '/404',
      component: r => require.ensure([], () => r(require('@/components/notcomponent')))
    },
    {
      path:'/',
      redirect:'/catch'
    }
  ]
})
