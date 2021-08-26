const {validationResult} = require('express-validator')
const Result = require('../commons/result')
const file = {
  upload: (req, res, next) => {
    // 首先会被multer自动保存在指定的目录, 通过 req.files[0] 访问文件数组
    // console.log('fieldname - 表单提交的文件名(input控件的name属性)： ' + req.files[0].fieldname)
    // console.log('originalname - 文件在用户设备中的原始名称： ' + req.files[0].originalname)
    // console.log('encoding - 文件的编码类型： ' + req.files[0].encoding)
    // console.log('mimetype - 文件的Mime类型： ' + req.files[0].mimetype)
    // console.log('size - 文件的大小： ' + req.files[0].size)
    // console.log('destination - 文件的保存目录(DiskStorage)： ' + req.files[0].destination)
    // console.log('filename - 文件在destination中的名称(DiskStorage)： ' + req.files[0].filename)
    // console.log('path - 上传文件的全路径(DiskStorage)： ' + req.files[0].path)
    // console.log('size - 文件对象的Size(MemoryStorage)： ' + req.files[0].size)
    const result = new Result()
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      result.code = result.CODE_INVALID_PARAMS
      result.data = errors.array()
      return res.json(result)
    }
    try {
      const token = req.body.token || ''
      const userId = req.body.userId || ''
      const files = req.files
      let resData = {}

      files.forEach((file) => {
        const uploadOriginalName = file.originalname
        const uploadFileName = file.filename
        const uploadSize = file.size
        const uploadPath = file.path

        // url 路径
        const baseUrl = req.protocol + '://' + req.get('host') + config.prefix + '/' + config.uploadUrlPrefix
        const filePath = file.getFileUrl(uploadPath)
        const uploadUrl = baseUrl + '/' + filePath
        // 返回结果
        resData = {
          token,
          originalname: uploadOriginalName,
          filename: uploadFileName,
          size: uploadSize,
          url: uploadUrl
        }
        // 插入数据库
      })
      result.code = result.CODE_SUCCESS
      result.data = resData
      res.json(result)
    } catch (err) {
      result.code = result.CODE_INTERNAL_ERROR
      result.message = JSON.stringify(err)
      res.json(result)
    }
  },
  delete: (req, res) => {
    const result = new Result()
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      result.code = result.INVALID_PARAMS
      result.data = errors.array()
      return res.json(result)
    }
    try {
      const url = req.body.url
      const token = req.body.token
      console.log(`delete file: ${url}, token: ${token}`)
      // 插入数据库
    } catch (err) {
      result.code = 500
      result.message = JSON.stringify(err)
      res.json(result)
    }
  },
  getFileListByToken: (req, res) => {
    const result = new Result()
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      result.code = 422
      result.data = errors.array()
      return res.json(result)
    }
    try {
      const token = req.body.token
      // 插入数据库
      const params = [token]
    } catch (err) {
      result.code = 500
      result.message = JSON.stringify(err)
      res.json(result)
    }
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
module.exports = file
