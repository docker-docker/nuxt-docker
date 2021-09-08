// const bodyParser = require('body-parser')
import * as express from 'express'
import cfg from '../config'

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
export default {
    jsonParser,
    urlencodedParser,
    htmlParser
}
