/* eslint-disable no-undef */
import User from '../models/user'
import ServerResponse from '../common/serverResponse'
import { getToken } from '../middleware/checkToken'

export default class UserController {
    static async login(ctx: any) {
        const { username, password } = ctx.request.body

        try {
            const result: any = User.findOne({ username }, null, { lean: true })
            if (!result) return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, {})
            if (result.password === password) {
                const jwtToken = getToken({ name: username })
                const data = {
                    userInfo: {
                        username: result.username,
                    },
                    token: jwtToken,
                }
                return ServerResponse.SUCCESS(ctx, Constants.MSG_SUCCESS, { data })
            }
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, {})
        } catch (e) {
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, e)
        }
    }
}
