const cfg = {
  upload: {
    prefix: 'static',
    location: '/www/upload'
  },
  db: {
    // 连接池设置
    acquireTimeout: 10 * 1000,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // 连接设置
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'test',
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
module.exports = cfg
