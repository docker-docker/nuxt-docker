import express from 'express'
import logger from './utils/logger'
import middleware from './middleware'
import cfg from './config'
import routes from './routes'
// Create Express server
const app = express()
middleware(app)
logger.info(`Start application with path: ${app.mountpath}`)
// Export express index
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  process.env.NODE_ENV = 'development'
  const port = process.env.PORT || 3000
  app.use(cfg.apiUrlPrefix, routes)
  app.listen(port, () => {
    logger.info(`
      ################################################
       [  Server listening on port： http://localhost:${port}${cfg.apiUrlPrefix} ]
      ################################################
    `)
  }).on('error', (err) => {
    logger.error(`Express Server starting exception: ${JSON.stringify(err)}`)
    process.exit(1)
  })
}
