import {
  RECORD_ADDRESS,
  SAVE_GEOHASH
} from './mutations-type'

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
  }
}