import App from '../App.vue'
const test = r => require.ensure([], () => r(require('../pages/test/index.vue')), 'test')
const home = r => require.ensure([], () => r(require('../pages/home/home.vue')), 'home')
const city = r => require.ensure([], () => r(require('../pages/city/city.vue')), 'city')
const msite = r => require.ensure([], () => r(require('../pages/msite/msite.vue')), 'msite')
export default [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        component: home
      },
      {
        path: '/city/:cityid',
        component: city
      },
      {
        path: '/msite',
        component: msite
      },
      {
        path: '/test',
        component: test
      }
    ]
  }
]