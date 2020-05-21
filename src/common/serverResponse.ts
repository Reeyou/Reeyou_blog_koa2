
export default class ServerResponse {
    code: number

    data: any

    msg: string

    constructor(code: number, msg: string, data: any) {
        this.code = code
        this.msg = msg
        this.data = data
    }

    // 操作成功
    public static SUCCESS<T>(data: T) {
        return new ServerResponse(0, 'SUCCESS', data)
    }

    // 操作错误
    public static ERROR() {
        return new ServerResponse(1, 'ERROR', {})
    }

    // 未登录
    public static UN_LOGIN() {
        return new ServerResponse(10, 'UN_LOGIN', {})
    }

    // 参数错误
    public static ILLEGAL_ARGUMENT() {
        return new ServerResponse(2, 'ILLEGAL_ARGUMENT', {})
    }
}
