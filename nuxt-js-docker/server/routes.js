const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
// ------------------1. 上传文件接口
const multerUpload = require('./middlewares/multer')
const fileController = require('./controllers/file')
router.post('/file/upload', multerUpload.any(), fileController.upload)
router.post('/file/del', [
  check('url').notEmpty().withMessage('file url should not empty'),
  check('token').notEmpty().withMessage('file token should not empty')
], fileController.delete)
router.post('/file/token', [
  check('token').notEmpty().withMessage('file token should not empty')
], fileController.getFileListByToken)
// ------------------2. 其他接口
module.exports = router
