import express from 'express'
import cfg from '../config'

const staticUrlPrefix = cfg.upload.staticUrlPrefix
const staticFileLocation = cfg.upload.location
const staticFileResponse = express.static(staticFileLocation, { index: ['index.html', 'index.htm'] })

export default {
  staticUrlPrefix,
  staticFileResponse
}
