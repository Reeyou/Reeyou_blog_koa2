/* eslint-disable no-undef */
import Article from '../models/article'
import ServerResponse from '../common/serverResponse'

export default class ArticleController {
    /**
     *  获取文章列表
    */
    static async getArticleList(ctx: any) {
        const { pageSize, limit } = ctx.request.body
        const _pageSize = parseInt(pageSize, 10) || 1
        const _limit = limit || 10
        logger.debug('get-Article-List endpoint: %o')

        try {
            const list = await Article.find()
                .skip((_pageSize - 1) * limit)
                .limit(Number(_limit))
            const total = await Article.count(() => { })
            return ServerResponse.SUCCESS(ctx, Constants.MSG_SUCCESS, { list, total })
        } catch (e) {
            logger.error('🔥 request error: %o', e)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR)
        }
    }

    /**
     * 获取文章详情
    */
    static async getArticleDetail(ctx: any) {
        const { id } = ctx.request.query

        logger.debug('get-Article-Detail endpoint: %o')
        try {
            const result = await Article.findOne({ _id: id })
            return ServerResponse.SUCCESS(ctx, Constants.MSG_SUCCESS, result)
        } catch (e) {
            logger.error('🔥 request error: %o', e)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR)
        }
    }

    /**
     *  添加文章
    */
    static async addArticle(ctx: any) {
        const { title } = ctx.request.body
        const hasArticle = await Article.findOne({
            where: {
                title,
            },
        })

        if (hasArticle) {
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR)
        }
        logger.debug('add-Article endpoint: %o')
        try {
            const result = await new Article(ctx.request.body).save()

            if (result) {
                return ServerResponse.SUCCESS(ctx, Constants.MSG_SUCCESS_SAVE, {})
            }
            logger.error('🔥 request error: %o', result)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR)
        } catch (e) {
            logger.error('🔥 request error: %o', e)
            return ServerResponse.ERROR(ctx, Constants.MSG_ERROR)
        }
    }
}
