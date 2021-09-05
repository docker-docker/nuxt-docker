const logger = require('../middlewares/logger')
const fileService = {
  saveFile: (data) => {
    logger.info('Saving uploaded file data: %s', JSON.stringify(data))
  },
  deleteFile: (data) => {
    logger.info('Deleting file data: %s', JSON.stringify(data))
  },
  getFilesByToken: (token) => {

  }
}

module.exports = fileService
