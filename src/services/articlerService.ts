import ArticleModel from '../models/article'

export default class ArticleService {
    constructor() {

    }

    public getArticleList(pageSize, limit) {
        const list = ArticleModel.find().skip((pageSize - 1) * limit).limit(Number(limit))
        const total = await Article.count()
    }
}
