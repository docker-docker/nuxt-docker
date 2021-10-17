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
    fileUpload.remark = ''
    await getManager().save(fileUpload)
    return fileUpload
  },
  deleteFile: async (url) => {
    logger.info('Deleting file url: %s', url)
    const deleteResult = await getManager()
      .createQueryBuilder()
      .delete()
      .from(FileUpload)
      .where('url=:url', { url })
      .execute()
    // if deleteResult success
    const queryResult = await getManager()
      .createQueryBuilder()
      .select()
      .from(FileUpload, 'fu')
      .where('fu.url=:url', { url })
      .getRawMany()
    if (queryResult.length > 0) {
      queryResult.forEach((result) => {
        fileService.deleteLocalFile(result.file_path)
      })
    }
    return deleteResult
  },
  getFilesByToken: async (params: any[]) => {

  },
  listUploadFiles: async () => {
    const result = await getManager()
      // .query(' SELECT * FROM "file_upload" "fu" WHERE "fu"."status"=1 ORDER BY "fu"."create_time" DESC')
      .createQueryBuilder()
      .select()
      .from(FileUpload, 'fu')
      .where('fu.status=1')
      .orderBy('fu.create_time', 'DESC')
      .getRawMany()
    return result
  },
  assemblyUploadFilePath: (uploadPath) => {
    let separator = '/'
    const windowsSeparator = '\\'

    if (uploadPath.includes(windowsSeparator)) {
      separator = windowsSeparator
    }
    return uploadPath.split(separator).slice(-2).join('/')
  },
  deleteLocalFile: (filePath) => {
    const fs = require('fs')
    fs.stat(filePath, (err, stats) => {
      if (err) {
        return
      }
      fs.unlink(filePath, (err) => {
        if (err && err.code === 'ENOENT') {
          // file doens't exist
          return console.log(err)
        } else if (err) {
          // other errors, e.g. maybe we don't have enough permission
        } else {
          // success deleted
        }
      })
    })
  }
}
export default fileService
