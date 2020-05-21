/* eslint max-classes-per-file: ["error", 2] */
class HttpException extends Error {
    errorCode: number

    code: number

    msg: string

    constructor(msg = '服务器异常', errorCode = 10000, code = 500) {
        super()
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}

class NotFound extends HttpException {
    constructor(msg:string, errorCode:number) {
        super()
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 10000
        this.code = 404
    }
}

export {
    HttpException,
    NotFound,
}
