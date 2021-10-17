import paths from '../../paths'

const cfg = {
  logs: '/www/logs',
  upload: {
    staticUrlPrefix: '/static',
    maxSize: 1024 * 1024 * 1024,
    location: '/www/upload'
  },
  db: {
    // 连接池设
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // 连接设置
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: paths.dbPath,
    connectTimeout: 10 * 1000,
    supportBigNumbers: true,
    bigNumberStrings: true,
    timezone: '+10:00',
    stringifyObjects: false,
    multipleStatements: true,
    typeCast: true,
    dateStrings: true
  }
}
export default cfg
