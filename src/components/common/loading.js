import loading from './loading.vue'
const Loading = {}
Loading.install = function(Vue) {

  // 生成一个Vue的子类,同时这个子类也是组件
  const LoadingConstructor = Vue.extend(loading)
  const instance = new LoadingConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  Vue.prototype.$loading = {
    show(loadingText) {
      instance.loadingText = loadingText
      instance.show = true
    },
    close() {
      instance.show = false
      instance.loadingText = ''
    }
  }
}

export default Loading