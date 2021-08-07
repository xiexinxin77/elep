import axios from 'axios'
import config from '../../config';
import { baseUrl } from "./env";
import {showScreenLoading, hideScreenLoading} from './loading'
axios.defaults.baseURL = baseUrl
axios.interceptors.request.use(config => {
  if (config.headers.showLoading == true) {
    showScreenLoading(config.headers)
  }
  return config
}, error => {
  if (config.header.showLoading == true) {
    hideScreenLoading()
  }
})
axios.interceptors.response.use(response => {
  if (response.status == 200) {
    setTimeout(() => {
      if (response.config.headers.showLoading == true) {
        hideScreenLoading()
      }
    }, 200)
    return response
  }
})
axios.interceptors.response.use(function(res) {
  return res.data;
})
let fetch = function(url, data = {}, method = 'GET', headers = {showLoading: true}) {
  method = method.toUpperCase()
  if (method === 'GET') {
    let dataSrc = ''
    Object.keys(data).forEach(key => {
      dataSrc += key + '=' + data[key] + '&'
    })
    if (dataSrc) {
      dataSrc = dataSrc.substr(0, dataSrc.lastIndexOf('&'))
      url = url + '?' + dataSrc
    }
  }
  if (method == 'POST') {
      data = JSON.stringify(data)
  }
  return axios({url, method, data, headers})
}

export default fetch