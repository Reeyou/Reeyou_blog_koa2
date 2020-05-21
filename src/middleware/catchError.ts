/**
 * 全局异常捕获
 * @param ctx
 * @param next
 */
const catchError = async (ctx:any, next:any) => {
    try {
        await next()
    } catch (error) {
        if (error.errorCode) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`,
            }
        } else {
            // 未知异常
            ctx.body = {
                msg: 'We are sorry that made a unknow mistake.',
            }
        }
    }
}
export default catchError
