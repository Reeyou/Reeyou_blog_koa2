import Router from 'koa-router'
import Tag from '../../models/tag'
import ServerResponse from '../../common/serverResponse'

const router = new Router()

router.get('/getTagList', async (ctx:any) => {
    let data
    try {
        data = await Tag.find()

        data = ServerResponse.SUCCESS(data)
    } catch (e) {
        data = ServerResponse.ERROR()
    }
    ctx.response.body = data
})

module.exports = router
