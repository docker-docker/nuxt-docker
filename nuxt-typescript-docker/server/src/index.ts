import logger from './utils/logger'
import app from './app'

function startServer () {
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

startServer()
