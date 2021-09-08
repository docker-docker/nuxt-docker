// 外部js文件访问$axios实例的方案
let client

export function setClient (newclient) {
  client = newclient
}

// Request helpers
const httpClient = {}
const reqMethods = ['request', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch']
reqMethods.forEach((method) => {
  httpClient['$' + method] = function () {
    if (!client) {
      throw new Error('apiClient not installed')
    }
    return client[method].apply(null, arguments).then(res => res && res.data)
  }
})

export default httpClient
