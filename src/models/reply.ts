import { Schema, model } from 'mongoose'

const replySchma = new Schema({
    article_id: {
        type: String,
        required: true,
    },
    // 回复用户id
    from_name: {
        type: String,
        required: true,
    },
    // 目标用户id
    to_uid: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: { createdAt: 'create_time', updatedAt: 'update_time' } })

const Reply = model('Reply', replySchma)

export default Reply
