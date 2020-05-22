/* eslint-disable no-undef */

import ServerResponse from '../common/serverResponse'

export default class Utils {
    static async getPageAndLimit(ctx: any) {
        const { pageSize, limit } = ctx.request.body

        if (!pageSize || !limit) return ServerResponse.ERROR(ctx, Constants.ILLEGAL_ARGUMENT, {})
        const _pageSize = parseInt(pageSize, 10) || 1
        const _limit = limit || 10
        return { _pageSize, _limit }
    }
}
