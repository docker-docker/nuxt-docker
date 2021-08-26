const dev = require('./dev')
const prod = require('./prod')

const isDev = process.env.NODE_ENV === 'development'
const cfg = Object.assign({
  apiPrefix: '/api',
  snowflake: {
    // worker_id 是 0-31的机器ID（用来配置分布式的多机器，最多支持32个机器）
    worker_id: 1,
    // datacenter_id 是 0-31的数据ID（用来配置某个机器下面的某某服务，每台机器最多支持32个服务）
    datacenter_id: 30
  }
}, isDev ? dev : prod)

module.exports = cfg
