/**
 * 通用返回结果
 * @type {{code: number, data: {}, success: boolean, message: string, timestamp: string}}
 */
class Result {
  // common response code
  CODE_SUCCESS = 0
  CODE_INVALID_PARAMS = 422
  CODE_INTERNAL_ERROR = 500

  constructor() {
    this.timestamp = new Date().toISOString()
    this.code = 0
    this.success = this.code === 0
    this.message = (this.code === 0 && '成功') || '失败'
    this.data = {}
  }

}

module.exports = Result
