// https://github.com/typeorm/javascript-example
const typeorm = require('typeorm')
const cfg = require('../config')
const logger = require('../middlewares/logger')
typeorm.createConnection({
  type: cfg.db.type,
  host: cfg.db.host,
  port: cfg.db.port,
  username: cfg.db.user,
  password: cfg.db.password,
  database: cfg.db.database,
  synchronize: true,
  logging: false,
  entities: [
    require('../entity/*.js')
  ]
}).then((connection) => {

}).catch(function (error) {
  logger.error('Error: ', error)
})
