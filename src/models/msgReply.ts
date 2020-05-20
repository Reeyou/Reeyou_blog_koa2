import { Schema, model } from 'mongoose'

const msgReplySchma = new Schema({
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

const msgReply = model('msgReply', msgReplySchma)

export default msgReply
