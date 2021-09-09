const cors = require('./cors')
const {
  jsonParser,
  urlencodedParser,
  htmlParser
} = require('./body-parser')
const robots = require('./robots')
// const logger = require('./logger')
module.exports = (app) => {
  app.use(cors)
  // body-parser
  app.use(jsonParser)
  app.use(urlencodedParser)
  app.use(htmlParser)
  app.use(robots)
  // app.use(require('morgan')('combined', { stream: logger.stream }))
}
