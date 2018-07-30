import Vue from 'vue'
import Router from 'vue-router'
import PageHome from 'components/PageHome'
import PageCity from 'components/PageCity'

Vue.use(Router)

export default new Router({
  routes: [
   {
    path: '/',
    component: PageHome
   },
   {
     path: '/city',
     component: PageCity
   }
  ]
})
