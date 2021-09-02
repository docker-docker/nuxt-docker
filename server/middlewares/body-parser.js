const bodyParser = require('body-parser')
const cfg = require('../config')

// parse various different custom JSON types as JSON
const jsonParser = bodyParser.json({
  type: 'application/*+json',
  limit: cfg.bodySize
})
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
  limit: cfg.bodySize
})
// parse an HTML body into a string
const htmlParser = bodyParser.text({
  type: 'text/html',
  limit: cfg.bodySize
})
module.exports = {
  jsonParser,
  urlencodedParser,
  htmlParser
}
