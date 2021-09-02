const express = require('express')
const middlewares = require('./middlewares')
const routes = require('./routes')
const cfg = require('./config')
const app = express()
// 1. middlewares
middlewares(app)
// 2. static router path
const staticFileLocation = cfg.upload.location
const staticFilePrefix = cfg.upload.prefix
app.use('/' + staticFilePrefix, express.static(staticFileLocation, { index: ['index.html', 'index.htm'] }))
// 3. api router path
app.use(routes)
module.exports = app
