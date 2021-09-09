import express from 'express'
import logger from './utils/logger'
import middleware from './middleware'
// Create Express server
const app = express()
middleware(app)
logger.info(`Start application with mountpath: ${app.mountpath}`)
// Export express index
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3000
  app.listen(port, () => {
    logger.info(`
      ################################################
       <  Server listening on port: ${port} >
      ################################################
    `)
  }).on('error', (err) => {
    logger.error(`Express Server starting exception: ${JSON.stringify(err)}`)
    process.exit(1)
  })
}
