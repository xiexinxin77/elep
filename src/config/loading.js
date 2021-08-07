import _ from 'lodash'
import Vue from 'vue'
let requestCount = 0

const startLoading = (header = {}) => {
  let vue = Vue
  Vue.prototype.$loading.show(header.text || '加载中...')
}

const endLoading = _.debounce(() => {
  Vue.prototype.$loading.close()
}, 300)

export const showScreenLoading = (header) => {
  if (requestCount == 0) {
    startLoading(header)
  }
  requestCount++
}

export const hideScreenLoading = () => {
  if (requestCount <=0 ) return
  requestCount--
  requestCount = Math.max(requestCount, 0)
  if (requestCount == 0) {
    endLoading()
  }
}
