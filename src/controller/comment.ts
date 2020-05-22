/* eslint-disable no-undef */
import Comment from '../models/comment'
import Reply from '../models/reply'
import ServerResponse from '../common/serverResponse'

export default class CommentController {
    /**
     * 获取评论列表
     */
    static async getCommentList(ctx: any) {
        const { pageSize, limit } = utils.getPageAndLimit(ctx)
        logger.debug('get-Comment-List handler start: ')

        try {
            const list = await Comment.find()
                .skip((pageSize - 1) * limit)
                .limit(Number(limit))
            const total = await Comment.count(() => { })
            return ServerResponse.SUCCESS(ctx, Constants.MSG_SUCCESS, { list, total })
        } catch (e) {
            logger.error('🔥 request error: ', e)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, e)
        }
    }

    /**
      * 添加评论
      */
    static async addComment(ctx: any) {
        logger.debug('add-Comment handler start: ')
        try {
            const result = await new Comment(ctx.request.body).save()

            if (result) {
                return ServerResponse.SUCCESS(ctx, Constants.MSG_SUCCESS_SAVE, {})
            }
            logger.error('🔥 request error: ', result)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, result)
        } catch (e) {
            logger.error('🔥 request error: ', e)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, e)
        }
    }

    /**
       * 删除评论
       */
    static async deleteCommnet(ctx: any) {
        logger.debug('add-Comment handler start: ')
        const { commentId } = ctx.request.body

        try {
            const result = await Comment.remove({ _id: commentId })

            if (result) {
                return ServerResponse.SUCCESS(ctx, Constants.MSG_SUCCESS_SAVE, {})
            }
            logger.error('🔥 request error: ', result)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, result)
        } catch (e) {
            logger.error('🔥 request error: ', e)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, e)
        }
    }

    /**
        * 评论回复
        */
    static async replyComment(ctx: any) {
        logger.debug('reply-Comment handler start: ')
        try {
            const result = await new Reply(ctx.request.body).save()

            if (result) {
                return ServerResponse.SUCCESS(ctx, Constants.MSG_SUCCESS_SAVE, {})
            }
            logger.error('🔥 request error: ', result)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, result)
        } catch (e) {
            logger.error('🔥 request error: ', e)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, e)
        }
    }
}
