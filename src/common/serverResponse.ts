import Constants from './constants'

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
    public static SUCCESS<T>(ctx: any, msg: string, data: T) {
        ctx.response.body = new ServerResponse(0, msg, data)
        return ctx.response.body
    }

    // 操作错误
    public static ERROR<T>(ctx: any, msg: string, data: T) {
        ctx.response.body = new ServerResponse(1, msg, data)
        return ctx.response.body
    }

    // 未登录
    public static UN_LOGIN(ctx :any) {
        ctx.response.body = new ServerResponse(10, 'UN_LOGIN', {})
        return ctx.response.body
    }

    // 参数错误
    public static ILLEGAL_ARGUMENT(ctx: any) {
        ctx.response.body = new ServerResponse(400, Constants.ILLEGAL_ARGUMENT, {})
        return ctx.response.body
    }
}
