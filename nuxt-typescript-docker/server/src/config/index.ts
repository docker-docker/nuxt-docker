import dev from './dev'
import prod from './prod'

const isProd = process.env.NODE_ENV === 'production'
const cfg = Object.assign({
  apiUrlPrefix: '/api',
  snowflake: {
    // worker_id 是 0-31的机器ID（用来配置分布式的多机器，最多支持32个机器）
    worker_id: 1,
    // datacenter_id 是 0-31的数据ID（用来配置某个机器下面的某某服务，每台机器最多支持32个服务）
    datacenter_id: 30
  },
  bodySize: 1024 * 1024 * 1024
}, isProd ? prod : dev)
export default cfg
