let pm = (function() {
  let TIMEOUT = 5000
  let pMonitor = {}

  pMonitor.getLoadTime = () => {
    const [{ domComplete }] = performance.getEntriesByType('navigation')
    return domComplete
  }

  pMonitor.getTimeOutRes = () => {
    const resources = performance.getEntriesByType('resource')
    const getLoadTime = ({startTime, responseEnd }) => responseEnd - startTime
    const isTimeOut = limit => limit > TIMEOUT
    const getName = ({name}) => name
    return resources.filter(item => isTimeOut(getLoadTime(item))).map(getName)
  }

  pMonitor.logPackage = () => {
    const domComplete = pMonitor.getLoadTime()
    const timeoutRes = pMonitor.getTimeOutRes()
    console.log('页面加载时间', domComplete)
    console.log('超时的资源', timeoutRes)
  }

  pMonitor.bindEvent = () => {
    let onOldLoad = window.onload
    window.onload = e => {
      if (onOldLoad && typeof onOldLoad === 'function') {
        onOldLoad()
      }
      // 尽量不影响页面主线程
      if (window.requestIdleCallback) {
        window.requestIdleCallback(pMonitor.logPackage)
      } else {
        setTimeout(pMonitor.logPackage)
      }
    }
  }

  pMonitor.init = () => {
    pMonitor.bindEvent()
  }
  return pMonitor
})()

export default pm