/* eslint-disable no-undef */
import Message from '../models/message'
import MsgReply from '../models/msgReply'
import ServerResponse from '../common/serverResponse'

export default class MessageController {
    /**
     * 获取留言列表
     */
    static async getMessageList(ctx: any) {
        const { pageSize, limit } = utils.getPageAndLimit(ctx)
        logger.debug('get-Article-List handler start: ')

        try {
            const list: any = await Message.find()
                .skip((pageSize - 1) * limit)
                .limit(Number(limit))
            const msgIdArr = []
            for (let i = 0; i < list.length; i++) {
                msgIdArr.push(list[i]._id)
            }
            for (let i = 0; i < msgIdArr.length; i++) {
                const msgReply = MsgReply.find({ to_uid: msgIdArr[i] })
                list[i].reply = msgReply
            }
            const total = await Message.count(() => { })
            return ServerResponse.SUCCESS(ctx, Constants.MSG_SUCCESS, { list, total })
        } catch (e) {
            logger.error('🔥 request error: ', e)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, e)
        }
    }

    /**
     * 添加留言
     */
    static async addMessage(ctx: any) {
        logger.debug('add-Message handler start: ')
        try {
            const result = await new Message(ctx.request.body).save()

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
     * 回复留言
     */
    static async replyMessage(ctx: any) {
        logger.debug('reply-Message handler start: ')
        try {
            const result = await new MsgReply(ctx.request.body).save()

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
      * 删除留言
      */
    static async deleteMessage(ctx: any) {
        logger.debug('get-Article-List handler start: ')

        const { msgId }: { msgId: string } = ctx.request.body

        try {
            const result = await Message.remove({ _id: msgId })

            if (result) return ServerResponse.SUCCESS(ctx, Constants.MSG_SUCCESS_SAVE, {})
            logger.error('🔥 request error: ', result)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, result)
        } catch (e) {
            logger.error('🔥 request error: ', e)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, e)
        }
    }

    /**
       * 删除回复的留言
       */
    static async deleteReplyMessage(ctx: any) {
        logger.debug('get-Article-List handler start: ')

        const { replyMsgId } = ctx.request.body
        // const data = ctx.request.body

        try {
            const result = await MsgReply.remove({ _id: replyMsgId })

            if (result) return ServerResponse.SUCCESS(ctx, Constants.MSG_SUCCESS_SAVE, {})
            logger.error('🔥 request error: ', result)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, result)
        } catch (e) {
            logger.error('🔥 request error: ', e)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, e)
        }
    }
}
