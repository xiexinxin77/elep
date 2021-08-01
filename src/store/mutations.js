import {
  RECORD_ADDRESS,
  SAVE_GEOHASH,
  RECORD_USERINFO,
  GET_USERINFO,
  RESET_NAME,
  OUT_LOGIN,
  SAVE_ADDDETAIL,
  SAVE_ADDRESS,
  ADD_ADDRESS
} from './mutations-type'
import {setStore} from '../config/mUtils'
export default {
  // 记录当前经度纬度
	[RECORD_ADDRESS](state, {
		latitude,
		longitude
	}) {
		state.latitude = latitude;
		state.longitude = longitude;
	},
  [SAVE_GEOHASH](state, geohash) {
    state.geohash = geohash
  },
  [RECORD_USERINFO](state, userInfo) {
    state.userInfo = userInfo
    state.login = true
    setStore('user_id', userInfo.user_id)
  },
  	//获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		if (state.userInfo && (state.userInfo.username !== info.username)) {
      state.userInfo = Object.assign({}, state.userInfo,{username: state.userInfo.username})
			return;
		};
		if (!state.login) {
			return
		}
		if (!info.message) {
			state.userInfo = {...info};
		} else {
			state.userInfo = null;
		}
	},
  	//修改用户名
	[RESET_NAME](state,username) {
		state.userInfo = Object.assign({}, state.userInfo,{username})
	},
  [OUT_LOGIN](state) {
    state.userInfo = {}
    state.login = false
  },
  [SAVE_ADDDETAIL](state, addAddress) {
    state.addAddress = addAddress
  },
  [SAVE_ADDRESS](state, newAddress) {
    state.addressList = newAddress
  },
  [ADD_ADDRESS](state, address) {
    state.addressList =  [address, ...state.addressList]
  }
}