import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Fenlei from './views/Fenlei.vue'
import Jingxuan from './views/Jingxuan.vue'
import Wode from './views/Wode.vue'
import Paihang from './views/Paihang.vue'
import Zhifenlei from './views/Zhifenlei.vue'
import Mulu from './views/Mulu.vue'
import Reader from './views/Reader.vue'
import Search from './views/Search.vue'
import Searchmore from './views/Searchmore.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Mylook from './views/Mylook.vue'
import Mylike from './views/Mylike.vue'
import Paihmore from './views/Paihmore.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/home',name: 'home',component: Home},
    {path: '/',name: 'fenlei', component: Fenlei},
    {path: '/paihmore',name: 'paihmore', component: Paihmore},
    {path: '/jingxuan',name: 'jingxuan', component: Jingxuan},
    {path: '/wode',name: 'wode', component: Wode},
    {path: '/paihang',name: 'paihang', component: Paihang},
    {path: '/mulu',name: 'mulu', component: Mulu},
    {path: '/reader',name: 'reader', component: Reader},
    {path: '/zhifenlei',name: 'zhifenlei', component: Zhifenlei},
    {path: '/search',name: 'search', component: Search},
    {path: '/searchmore',name: 'searchmore', component: Searchmore},
    {path: '/login',name: 'login', component: Login},
    {path: '/register',name: 'register', component: Register},
    {path: '/mylook',name: 'mylook', component: Mylook},
    {path: '/mylike',name: 'mylike', component: Mylike},
    {path: '/about',name: 'about', component: About},
  ]
})
