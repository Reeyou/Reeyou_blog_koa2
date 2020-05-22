/* eslint-disable no-undef */
import Tag from '../models/tag'
import ServerResponse from '../common/serverResponse'

export default class TagController {
    /**
     * 获取标签列表
     */
    static async getTagList(ctx: any) {
        const { pageSize, limit } = utils.getPageAndLimit(ctx)
        logger.debug('get-Article-List handler start: ')

        try {
            const list = await Tag.find()
                .skip((pageSize - 1) * limit)
                .limit(Number(limit))
            const total = await Tag.count(() => { })
            return ServerResponse.SUCCESS(ctx, Constants.MSG_SUCCESS, { list, total })
        } catch (e) {
            logger.error('🔥 request error: ', e)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, e)
        }
    }

    /**
     * 添加标签
     */
    static async addTagName(ctx: any) {
        logger.debug('get-Article-List handler start: ')

        try {
            const result = await new Tag(ctx.request.body).save()

            if (result) return ServerResponse.SUCCESS(ctx, Constants.MSG_SUCCESS_SAVE, {})
            logger.error('🔥 request error: ', result)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, result)
        } catch (e) {
            logger.error('🔥 request error: ', e)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, e)
        }
    }

    /**
      * 修改标签
      */
    static async updateTagName(ctx: any) {
        logger.debug('get-Article-List handler start: ')

        const { tagId, tagName } = ctx.request.body

        try {
            const result = await Tag.findOne({ tagId }).update({ tagName })

            if (result) return ServerResponse.SUCCESS(ctx, Constants.MSG_SUCCESS_SAVE, {})
            logger.error('🔥 request error: ', result)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, result)
        } catch (e) {
            logger.error('🔥 request error: ', e)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, e)
        }
    }

    /**
       * 删除标签
       */
    static async deleteTagName(ctx: any) {
        logger.debug('get-Article-List handler start: ')

        const { tagId } = ctx.request.body

        try {
            const result = await Tag.remove({ _id: tagId })

            if (result) return ServerResponse.SUCCESS(ctx, Constants.MSG_SUCCESS_SAVE, {})
            logger.error('🔥 request error: ', result)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, result)
        } catch (e) {
            logger.error('🔥 request error: ', e)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, e)
        }
    }
}
