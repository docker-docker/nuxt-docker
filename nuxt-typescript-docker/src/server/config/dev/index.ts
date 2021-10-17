import paths from '../../paths'

const cfg = {
  logs: 'D:\\logs',
  upload: {
    staticUrlPrefix: '/static',
    maxSize: 1024 * 1024 * 1024,
    location: 'D:\\upload'
  },
  db: {
    // 连接池设置
    type: 'mysql',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // 连接设置
    host: 'localhost',
    port: 3306,
    user: 'syscorer',
    password: 's6s@#@!L0ngh',
    database: paths.dbPath,
    connectTimeout: 10 * 1000,
    supportBigNumbers: true,
    bigNumberStrings: true,
    timezone: '+08:00',
    stringifyObjects: false,
    multipleStatements: true,
    typeCast: true,
    dateStrings: true
  }
}
export default cfg
