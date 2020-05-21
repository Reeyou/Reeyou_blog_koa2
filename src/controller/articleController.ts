/* eslint-disable no-undef */
import Article from '../models/article'
import ServerResponse from '../common/serverResponse'

export default class ArticleController {
    static async getArticleList(ctx: any) {
        console.log(ctx.url)
        let data
        const { pageSize, limit } = ctx.request.body
        const _pageSize = parseInt(pageSize, 10) || 1
        const _limit = limit || 10
        logger.debug('get-Article-List endpoint: %o', 'url:', ctx.url)
        try {
            const list = await Article.find()
                .skip((_pageSize - 1) * limit)
                .limit(Number(_limit))
            const total = await Article.count(() => { })
            data = ServerResponse.SUCCESS({ list, total })
            logger.info('✌ request success', 'url:', ctx.url)
        } catch (e) {
            data = ServerResponse.ERROR()
            logger.error('🔥 request error: %o', 'url:', ctx.url, e)
        }
        ctx.response.body = data
    }

    // 获取文章详情
    static async getArticleDetail(ctx: any) {
        const { id } = ctx.request.query
        let data
        logger.debug('get-Article-Detail endpoint: %o', 'url:', ctx.url)
        try {
            const result = await Article.findOne({ _id: id })
            data = ServerResponse.SUCCESS(result)
            logger.info('✌ request success', 'url:', ctx.url)
        } catch (e) {
            data = ServerResponse.ERROR()
            logger.error('🔥 request error: %o', e)
        }
        ctx.response.body = data
    }

    // 添加文章
    static async addArticle(ctx: any) {
        let data
        const { title } = ctx.request.body
        const hasArticle = await Article.findOne({
            where: {
                title,
            },
        })

        if (hasArticle) {
            data = ServerResponse.ERROR()
        }
        logger.debug('add-Article endpoint: %o', 'url:', ctx.url, 'body:')
        try {
            const result = await new Article(ctx.request.body).save()

            if (result) {
                data = ServerResponse.SUCCESS({})
                logger.info('✌ request success', 'url:', ctx.url)
            } else {
                data = ServerResponse.ERROR()
                logger.error('🔥 request error: %o', data)
            }
        } catch (e) {
            data = ServerResponse.ERROR()
            logger.error('🔥 request error: %o', e)
        }
        ctx.response.body = data
    }
}
