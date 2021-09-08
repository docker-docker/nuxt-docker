import express from 'express'
import multerUpload from './middleware/multer'
// import all the controllers here
import fileController from './controller/file'
import cfg from './config'
import logger from './utils/logger'

const router = express.Router()
// ------------------1. file upload api
router.post('/file/upload', multerUpload.fields([
  { name: 'file', maxCount: 1 }
]), fileController.upload)
router.post('/file/del', fileController.delete)
router.post('/file/token', fileController.getFileListByToken)

export const routesPath = (app) => {
  const routesTable = app._router.stack.reduce(
    (acc: any, val: any) => acc.concat(
      val.route
        ? [val.route.path]
        : val.name === 'router'
          ? val.handle.stack.filter(
            (x: any) => x.route).map(
            (x: any) => {
              return {
                method: Object.keys(x.route.methods)[0].toUpperCase(),
                url: cfg.apiUrlPrefix + (x.route.path === '/' ? '' : x.route.path),
                controller: x.route.stack.filter((s: any) => !s.name.toLowerCase().endsWith('middleware'))[0].name
              }
            })
          : []), []).sort()
  logger.info(`Application routers:\n ${JSON.stringify(routesTable, null, 4)}`)
}
export default router
