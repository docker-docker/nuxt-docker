const express = require('express')
const middlewares = require('./middlewares')
const routes = require('./routes')
const cfg = require('./config')
const logger = require('./middlewares/logger')
const app = express()
// 1. middlewares
middlewares(app)
logger.info('Start application now...')
// 2. static router path
const staticFileLocation = cfg.upload.location
const staticFilePrefix = cfg.upload.prefix
app.use('/' + staticFilePrefix, express.static(staticFileLocation, { index: ['index.html', 'index.htm'] }))
// 3. api router path
app.use(routes)
// output the routes
const routesTable = app._router.stack.reduce(
  (acc, val) => acc.concat(
    val.route
      ? [val.route.path]
      : val.name === 'router'
        ? val.handle.stack.filter(
          x => x.route).map(
          (x) => {
            return {
              method: Object.keys(x.route.methods)[0].toUpperCase(),
              path: cfg.apiPrefix + (x.route.path === '/' ? '' : x.route.path),
              controller: x.route.stack.filter(s => !s.name.toLowerCase().endsWith('middleware'))[0].name
            }
          })
        : []), []).sort()
logger.info(`Application routers:\n ${JSON.stringify(routesTable, null, 4)}`)
module.exports = app
