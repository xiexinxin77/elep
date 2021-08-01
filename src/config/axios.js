import axios from 'axios'
import { baseUrl } from "./env";
axios.defaults.baseURL = baseUrl
axios.interceptors.response.use(function(res) {
  return res.data;
})
let fetch = function(url, data = {}, method = 'GET') {
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
  return axios({url, method, data})
}

export default fetch