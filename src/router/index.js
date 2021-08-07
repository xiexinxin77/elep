import App from '../App.vue'
const test = r => require.ensure([], () => r(require('../pages/test/index.vue')), 'test')
const home = r => require.ensure([], () => r(require('../pages/home/home.vue')), 'home')
const city = r => require.ensure([], () => r(require('../pages/city/city.vue')), 'city')
const msite = r => require.ensure([], () => r(require('../pages/msite/msite.vue')), 'msite')
const login = r => require.ensure([], () => r(require('../pages/login/login.vue')), 'login')
const profile = r => require.ensure([], () => r(require('../pages/profile/profile.vue')), 'profile')
const info = r => require.ensure([], () => r(require('../pages/profile/children/info.vue')), 'info')
const setusername = r => require.ensure([], () => r(require('../pages/profile/children/children/setusername.vue')), 'setusername')
const address = r => require.ensure([], () => r(require('../pages/profile/children/children/address.vue')), 'address')
const addAddress = r => require.ensure([], () => r(require('../pages/profile/children/children/children/add.vue')), 'addAddress')
const addDetail = r => require.ensure([], () => r(require('../pages/profile/children/children/children/children/addDetail.vue')), 'addDetail')
const blance = r => require.ensure([], () => r(require('../pages/blance/blance')), 'blance')
const benefit = r => require.ensure([], () => r(require('../pages/benefit/benefit')), 'benefit')
const search = r => require.ensure([], () => r(require('../pages/search/search')), 'search')
const food = r => require.ensure([], () => r(require('../pages/food/food')), 'food')
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
        component: msite,
        meta: {
          keepAlive: false
        }
      },
      {
        path: '/login',
        component: login
      },
      {
        path: '/profile',
        component: profile,
        children: [{
          path: 'info',
          component: info,
          children: [{
            path: 'setusername',
            component: setusername
          }, {
            path: 'address',
            component: address,
            children: [{
              path: 'add',
              component: addAddress,
              children: [{
                path: 'addDetail',
                component: addDetail
              }]
            }]
          }]
        }]
      },
      {
        path:  '/blance',
        component: blance
      },
      {
        path: '/benefit',
        component: benefit
      },
      {
        path: '/search/:geohash',
        component: search,
      },
      {
        path: '/food',
        component: food,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/test',
        component: test
      }
    ]
  }
]