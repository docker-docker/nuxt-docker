import dev from './dev'
import prod from './prod'

const isDev = process.env.NODE_ENV === 'development'
const cfg = Object.assign({
  site: {
    name: 'Site Name',
    description: 'Site Description',
    keywords: ''
  },
  store: {
    key: 'app',
    secretEnabled: false,
    secretKey: 'b2c17b46e2Yx0ab5a82869856c'
  },
  iconfont: [],
  http: {
    timeout: 60000
  }
}, isDev ? dev : prod)
export default cfg
