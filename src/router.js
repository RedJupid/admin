import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Home from './views/Home'
import Test from './views/Test'
import Upload from './views/Upload'
import User from './views/User'

Vue.use(Router)

export default new Router({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes : [
    // { path: '/', component: Home, children:[
    //   { path: '/page1', component: Page1 },
    //   { path: '/page2', component: Page2 },
    //   { path: '/user', component: User },
    //   { path: '/upload', component: Upload }
    // ]},
    { path: '/login', component: Login },
    { path: '/', component: Home, children:[
      {path: '/test', component: Test},
      {path: '/upload', component: Upload},
      {path: '/user', component: User},
    ]},
  ]
})
