const bodyParser = require('body-parser')

// parse various different custom JSON types as JSON
const jsonParser = bodyParser.json({
  type: 'application/*+json',
  limit: '50mb'
})
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
  limit: '50mb'
})
// parse an HTML body into a string
const htmlParser = bodyParser.text({
  type: 'text/html',
  limit: '50mb'
})
module.exports = {
  jsonParser,
  urlencodedParser,
  htmlParser
}
