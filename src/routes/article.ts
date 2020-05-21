import Router from 'koa-router'
import ArticleController from '../controller/articleController'

const router = new Router()

// router.prefix('/admin')

router.post('/addArticle', ArticleController.addArticle)

router.get('/getArticleList', ArticleController.getArticleList)

router.get('/getArticleDetail', ArticleController.getArticleDetail)


export default router
