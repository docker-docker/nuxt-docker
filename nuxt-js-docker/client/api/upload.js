import config from '@/config'
import http from '@/assets/js/HttpClient'

const FILE_UPLOAD_URL = config.baseUrl + '/file/upload'
const FILE_DELETE_URL = config.baseUrl + '/file/del'
const FILE_LIST_URL = config.baseUrl + '/file/token'

const upload = {
  uploadFile: (data) => {
    return http.$post(FILE_UPLOAD_URL, data, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  delFile: (data) => {
    return http.$post(FILE_DELETE_URL, data)
  },
  getFileList: (data) => {
    return http.$post(FILE_LIST_URL, data)
  }
}

export default upload
