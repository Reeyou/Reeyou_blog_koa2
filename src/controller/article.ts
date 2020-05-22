/* eslint-disable no-undef */
import Article from '../models/article'
import ServerResponse from '../common/serverResponse'

export default class ArticleController {
    /**
     *  获取文章列表
    */
    static async getArticleList(ctx: any) {
        const { pageSize, limit } = utils.getPageAndLimit(ctx)
        logger.debug('get-Article-List handler start: ')

        try {
            const list = await Article.find()
                .skip((pageSize - 1) * limit)
                .limit(Number(limit))
            const total = await Article.count(() => { })
            return ServerResponse.SUCCESS(ctx, Constants.MSG_SUCCESS, { list, total })
        } catch (e) {
            logger.error('🔥 request error: ', e)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, e)
        }
    }

    /**
     * 获取文章详情
    */
    static async getArticleDetail(ctx: any) {
        const { id } = ctx.request.query

        logger.debug('get-Article-Detail handler start: ')
        if (!id) {
            return ServerResponse.ILLEGAL_ARGUMENT(ctx)
        }
        try {
            const result = await Article.findOne({ _id: id })
            return ServerResponse.SUCCESS(ctx, Constants.MSG_SUCCESS, result)
        } catch (e) {
            logger.error('🔥 request error: ', e)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR, e)
        }
    }

    /**
     *  添加文章
    */
    static async addArticle(ctx: any) {
        logger.debug('add-Article handler start: ')
        try {
            const result = await new Article(ctx.request.body).save()

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
