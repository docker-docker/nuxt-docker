import config from '@/config'
import http from '@/assets/js/HttpClient'

const FILE_UPLOAD_URL = config.baseUrl + '/file/upload'
const FILE_DELETE_URL = config.baseUrl + '/file/del'
const FILE_TOKEN_URL = config.baseUrl + '/file/token'
const FILE_LIST_URL = config.baseUrl + '/file/list'

const upload = {
  uploadFile: (data) => {
    return http.$post(FILE_UPLOAD_URL, data, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  delFile: (data) => {
    return http.$post(FILE_DELETE_URL, data)
  },
  getFileTokenList: (data) => {
    return http.$post(FILE_TOKEN_URL, data)
  },
  getFilesList: (data) => {
    return http.$post(FILE_LIST_URL, data)
  }
}

export default upload
