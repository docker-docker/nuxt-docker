// const bodyParser = require('body-parser')
import express from 'express'
import cfg from '../config'

// parse various different custom JSON types as JSON
const jsonParser = express.json({
  limit: cfg.bodySize
})
// create application/x-www-form-urlencoded parser
const urlencodedParser = express.urlencoded({
  extended: true,
  limit: cfg.bodySize
})
// parse an HTML body into a string
const htmlParser = express.text({
  limit: cfg.bodySize
})
export default {
  jsonParser,
  urlencodedParser,
  htmlParser
}
