const cors = require('./cors')
const {
  jsonParser,
  urlencodedParser,
  htmlParser
} = require('./body-parser')
const responseTime = require('./response-time')
const robots = require('./robots')
module.exports = (app) => {
  app.use(cors)
  // body-parser
  app.use(jsonParser)
  app.use(urlencodedParser)
  app.use(htmlParser)
  app.use(responseTime)
  app.use(robots)
}
