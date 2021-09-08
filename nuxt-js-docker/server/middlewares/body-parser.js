// const bodyParser = require('body-parser')
const express = require('express')
const cfg = require('../config')

// parse various different custom JSON types as JSON
const jsonParser = express.json({
  type: 'application/*+json',
  limit: cfg.bodySize
})
// create application/x-www-form-urlencoded parser
const urlencodedParser = express.urlencoded({
  extended: false,
  limit: cfg.bodySize
})
// parse an HTML body into a string
const htmlParser = express.text({
  type: 'text/html',
  limit: cfg.bodySize
})
module.exports = {
  jsonParser,
  urlencodedParser,
  htmlParser
}
