import core from 'express-serve-static-core'
import routes, { routesPath } from '../routes'
import corsMiddleware from './cors'
import bodyParser from './body-parser'
import gzip from './gzip'
import assets from './assets'
import ErrorHandler from './error-handler'
import '../utils/orm'
// full express middlewares: http://expressjs.com/en/resources/middleware/compression.html
export default (app: core.Express) => {
  app.use(corsMiddleware)
  app.use(bodyParser.jsonParser)
  app.use(bodyParser.urlencodedParser)
  app.use(bodyParser.htmlParser)
  app.use(gzip)
  // static files
  app.use(assets.staticUrlPrefix, assets.staticFileResponse)
  // routes
  app.use(routes)
  routesPath(app)
  // error handler
  ErrorHandler(app)
}
