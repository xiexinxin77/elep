import {
	getUser,
	getAddressList
} from '../service/getData'
import {
	GET_USERINFO,
	SAVE_ADDRESS
} from './mutations-type.js'
export default {
  async getUserInfo({
		commit,
		state
	}) {
		let res = await getUser();
		commit(GET_USERINFO, res)
	},

  async getAddressList({commit, state}) {
    if (state.addressList.length) return;
    let addressList = await getAddressList(state.userInfo.user_id)
    commit(SAVE_ADDRESS, addressList)
  }
}