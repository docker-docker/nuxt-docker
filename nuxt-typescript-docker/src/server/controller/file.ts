import { NextFunction, Request, Response } from 'express'
import { check, checkSchema, validationResult } from 'express-validator'
import logger from '../utils/logger'
import fileService from '../service/file'
import cfg from '../config'
import { Result, ResultCode } from '../common/result'

const fileController = {
  upload: async (req: Request, res: Response, next: NextFunction) => {
    await check('token', 'token cannot be blank').not().isEmpty().run(req)
    await checkSchema({
      file: {
        custom: {
          options: (value, { req, location, path }) => !!req.files[path],
          errorMessage: 'You should upload a file up to 50Mb'
        }
      }
    }).run(req)
    const errors = validationResult(req)
    const result = new Result()
    if (!errors.isEmpty()) {
      result.code = ResultCode.CODE_INVALID_PARAMS
      result.data = errors.array()
      logger.error('Upload file validation errors: ', errors.array())
      return res.json(result)
    }
    try {
      const token = req.body.token || ''
      const userId = req.body.userId || ''
      logger.info(`Upload file token is: ${token}, userId is: ${userId}`)
      const files:any = req.files
      const file = files.file[0]

      const originalFileName = file.originalname
      const fileName = file.filename
      const uploadSize = file.size
      // upload file into server local path, could be: ....\upload\20210826\223017226284568576.jpg
      const uploadPath = file.path
      // base upload url,like http://localhost:3000/api/static
      const baseUrl = req.protocol + '://' + req.get('host') + cfg.apiUrlPrefix + cfg.upload.staticUrlPrefix
      // could be: 20210826/223017226284568576.jpg
      const filePath = fileController.getFileUrl(uploadPath)
      const uploadUrl = baseUrl + '/' + filePath
      // 返回结果
      const resData = {
        token,
        original: originalFileName,
        filename: fileName,
        size: uploadSize,
        url: uploadUrl
      }
      // 插入数据库
      // const saveResponse = await fileService.upload(resData, uploadPath, userId)
      // logger.info(`Saving file: ${JSON.stringify(saveResponse)}`)

      result.code = ResultCode.CODE_SUCCESS
      result.data = resData
      return res.json(result)
    } catch (err) {
      result.code = ResultCode.CODE_INTERNAL_ERROR
      result.message = JSON.stringify(err.message)
      logger.error('Upload file errors: %s', JSON.stringify(err.message))
      return res.json(result)
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    await check('url').not().isEmpty().withMessage('url should not blank').run(req)

    const errors = validationResult(req)
    const result = new Result()
    if (!errors.isEmpty()) {
      result.code = ResultCode.CODE_INVALID_PARAMS
      result.data = errors.array()
      logger.error('Delete file validation errors: %s', errors.array())
      return res.json(result)
    }
    try {
      const url = req.body.url
      const token = req.body.token
      console.log(`delete file: ${url}, token: ${token}`)
      // 删除数据库
      const delResponse = fileService.deleteFile(url)
      logger.info(`Delete file return: ${JSON.stringify(delResponse)}`)
      result.code = ResultCode.CODE_SUCCESS
      const resData = { url, token }
      result.data = resData
      return res.json(result)
    } catch (err) {
      result.code = ResultCode.CODE_INTERNAL_ERROR
      result.message = JSON.stringify(err)
      logger.error('Delete file errors: %s', JSON.stringify(err))
      return res.json(result)
    }
  },
  getFileListByToken: async (req: Request, res: Response, next: NextFunction) => {
    await check('token').not().isEmpty().withMessage('token should not blank').run(req)

    const errors = validationResult(req)
    const result = new Result()
    if (!errors.isEmpty()) {
      result.code = ResultCode.CODE_INVALID_PARAMS
      result.data = errors.array()
      logger.error('Get file list validation errors: %s', errors.array())
      return res.json(result)
    }
    try {
      const token = req.body.token
      // 查询数据库
      const params = [token]
      const listResponse = fileService.getFilesByToken(params)
      logger.info(`Get file list: ${JSON.stringify(listResponse)}`)
    } catch (err) {
      result.code = ResultCode.CODE_INTERNAL_ERROR
      result.message = JSON.stringify(err)
      logger.error('Get file list errors: %s', JSON.stringify(err))
      return res.json(result)
    }
  },
  getFileUrl: (path) => {
    let separator = '/'
    const windowsSeparator = '\\'

    if (path.includes(windowsSeparator)) {
      separator = windowsSeparator
    }
    return path.split(separator).slice(-2).join('/')
  },
  deleteFile: (filePath) => {
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
export default fileController
