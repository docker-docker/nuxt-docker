import { getManager } from 'typeorm'
import logger from '../utils/logger'
import { FileUpload } from '../entities/FileUpload'
import idGenerator from '../utils/id-generator'

const fileService = {
  upload: async (data, uploadPath, userId) => {
    logger.info('Saving uploaded file data: %s', JSON.stringify(data))
    const fileUpload = new FileUpload()
    fileUpload.id = idGenerator.nextId().toString()
    fileUpload.fileToken = data.token
    fileUpload.originalName = data.original
    fileUpload.fileName = data.filename
    fileUpload.filePath = uploadPath
    fileUpload.url = data.url
    fileUpload.createBy = userId
    fileUpload.updateBy = userId
    await getManager().save(fileUpload)
    return fileUpload
  },
  deleteFile: (data) => {
    logger.info('Deleting file data: %s', JSON.stringify(data))
  },
  getFilesByToken: (token) => {
  }
}
export default fileService
