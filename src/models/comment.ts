import { Schema, model } from 'mongoose'

const commentSchema = new Schema({
    articleId: {
        type: String,
        required: true,
    },
    // 回复用户名
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: { createdAt: 'create_time', updatedAt: 'update_time' } })

const Comment = model('Comment', commentSchema)

export default Comment
