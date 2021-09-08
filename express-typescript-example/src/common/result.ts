/**
 * 通用返回结果
 * @type {{code: number, data: {}, success: boolean, message: string, timestamp: string}}
 */

export class Result {
    timestamp: string;
    code: number;
    success: boolean;
    message: string;
    data: {};

    constructor() {
        this.timestamp = new Date().toISOString()
        this.code = 0
        this.success = this.code === 0
        this.message = (this.code === 0 && '成功') || '失败'
        this.data = {}
    }
}

export class ResultCode {
    // common response code
    static CODE_SUCCESS = 0
    static CODE_INVALID_PARAMS = 422
    static CODE_INTERNAL_ERROR = 500
}
