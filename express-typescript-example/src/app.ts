import * as express from 'express'
import logger from "./utils/logger"
import middleware from './middleware'
import "./utils/orm"
// Create Express server
const app = express()
middleware(app)
logger.info('Start application now...')
export default app
