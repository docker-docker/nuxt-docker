const path = require('path')
const fs = require('fs')
const multer = require('multer')
// 设置对应的文件名
const Snowflake = require('better-snowflake')
const cfg = require('../config')
const idWorker = new Snowflake(cfg.snowflake.worker_id, cfg.snowflake.datacenter_id)
// 文件目录
// const rootPwd = process.cwd()
const uploadDirectory = cfg.upload.location
fs.existsSync(uploadDirectory) || fs.mkdirSync(uploadDirectory)
/**
 * 参考： https://vince.xin/2017/07/06/%E8%AF%A6%E8%A7%A3Express%E7%9A%84%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6%E4%B8%AD%E9%97%B4%E4%BB%B6Multer/
 *
 * 使用方法: enctype必须要为”multipart/form-data”
 * 在调用的router中使用:
 * 1. 单文件上传: upload.single('file'), 参数为file对象的name属性
 * 2. 多文件上传: upload.array('logo', 2), 同时支持2张图片上传，并且 name 属性为 logo
 *
 * response中获取返回的文件对象
 * const file = req.file;
 * file.fieldname
 * file.originalname
 * file.encoding
 * file.mimetype
 * file.size
 * file.destination
 * file.path
 * file.buffer
 * @type {Multer|undefined}
 */
const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, res, cb) => {
      const newDate = new Date()
      const mm = newDate.getMonth() + 1
      const dd = newDate.getDate()
      const now = (newDate.getFullYear() + ((mm > 9 ? '' : '0') + mm) + ((dd > 9 ? '' : '0') + dd)).toString()
      const newDirectory = path.join(uploadDirectory, now)
      fs.existsSync(newDirectory) || fs.mkdirSync(newDirectory, { recursive: true })
      cb(null, newDirectory)
    },
    filename: (req, file, cb) => {
      // 原始文件名称 file.originalname
      cb(null, idWorker.nextId().toString() + path.extname(file.originalname))
    }
  }),
  limits: {
    // 1024M
    fileSize: cfg.upload.maxSize
  },
  fileFilter: (req, file, cb) => {
    cb(null, true)
    // if (
    //   file.mimetype === 'audio/mpeg' ||
    //   file.mimetype === 'audio/wave' ||
    //   file.mimetype === 'audio/wav' ||
    //   file.mimetype === 'audio/mp3'
    // ) {
    //   cb(null, true)
    // } else {
    //   cb(null, false)
    // }
  }
})

module.exports = multerUpload
