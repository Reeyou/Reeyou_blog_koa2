import Router from 'koa-router'
import {
    article,
    comment,
    login,
    message,
    tag,
    upload,
    user,
} from '../controller'

const router = new Router()

/**
 * Article
 */
router.get('/getArticleList', article.getArticleList)
router.get('/getArticleDetail', article.getArticleDetail)
router.post('/addArticle', article.addArticle)

/**
 * Comment
 */
router.get('/getCommentList', comment.getCommentList)
router.post('/addComment', comment.addComment)
router.post('/deleteCommnet', comment.deleteCommnet)
router.post('/replyComment', comment.replyComment)

/**
 * Login
 */
router.post('/senCode', login.senCode)

/**
 * Message
 */
router.post('/addMessage', message.addMessage)
router.get('/getMessageList', message.getMessageList)
router.post('/deleteMessage', message.deleteMessage)
router.post('/replyMessage', message.replyMessage)
router.post('/deleteReplyMessage', message.deleteReplyMessage)
/**
 * Tag
 */
router.post('/addTagName', tag.addTagName)
router.post('/deleteTagName', tag.deleteTagName)
router.get('/getTagList', tag.getTagList)
router.post('/updateTagName', tag.updateTagName)
/**
* Upload
*/
router.post('/uploadImg', upload.uploadImg)
/**
 * User
 */
router.post('/login', user.login)

export default router
