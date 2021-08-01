import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)

const state = {
  latitude: '', // 当前位置纬度
	longitude: '', // 当前位置经度
  userInfo: '', // 客户信息
  geohash: '', //city geohash
  login: true,
  addAddress: '', //详细地址
  addressList: '' // 收货地址
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})