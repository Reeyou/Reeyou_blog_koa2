import Article from '../models/article'

export default class ArticleController {
    static async getArticleList(ctx: any) {
        const { pageSize, limit } = ctx.request.body
        const _pageSize = parseInt(pageSize, 10) || 1
        const _limit = limit || 10

        const list = await Article.find()
            .skip((_pageSize - 1) * limit)
            .limit(Number(_limit))
        const total = await Article.count(() => { })
        return {
            list,
            total,
        }
    }

    // 获取文章详情
    static async getArticleDetail(id:number) {
        const data = await Article.findOne({ _id: id })
        return data
    }

    // 添加文章
    static async addArticle(query:any) {
        const hasArticle = await Article.findOne({
            where: {
                title: query.title,
            },
        })

        if (hasArticle) {
            console.log('文章已存在')
        }

        return new Article(query).save()
    }
}
