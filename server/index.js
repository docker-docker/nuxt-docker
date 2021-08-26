const express = require('express')
const middlewares = require('./middlewares')
const routes = require('./routes')
const app = express()
// 1. middlewares
middlewares(app)
// 2. static router path
// const staticPath = path.join(process.cwd(), config.uploadFolder)
// app.use('/' + config.uploadUrlPrefix, express.static(staticPath, { index: ['index.html', 'index.htm'] }))
// 3. api router path
app.use(routes)
